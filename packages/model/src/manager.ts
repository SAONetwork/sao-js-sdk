import * as jsonpatch from "fast-json-patch";
import * as u8a from "uint8arrays";
import stringify from "fast-json-stable-stringify";
import {
  GetNodeApiClient,
  ChainApiClient,
  QueryMetadataProposal,
  Proposal,
  QueryProposal,
  RenewProposal,
  UpdatePermissionProposal,
  OrderRenewProposal,
  PermissionProposal,
  ClientOrderProposal,
} from "@sao-js-sdk/api-client";
import { SidManager } from "@sao-js-sdk/sid";
import { ModelConfig, ModelDef, ModelProviderConfig } from "./types";
import { CalculateCid, GenerateDataId, stringToUint8Array } from "@sao-js-sdk/common";
import { ModelProvider } from ".";

const defaultModelConfig: ModelConfig = {
  duration: 365 * 60 * 60 * 24 * 1000000000,
  replica: 1,
  timeout: 60 * 60 * 24,
  operation: 1,
};
export class ModelManager {
  private defaultModelProvider: ModelProvider;
  private modelProviders: Record<string, ModelProvider>;
  private sidManager: SidManager;
  private chainApiClient: ChainApiClient;

  constructor(config: ModelProviderConfig, sidManager: SidManager) {
    const nodeApiClient = GetNodeApiClient({
      baseURL: config.nodeApiUrl || process.env.SAO_NODE_API_URL || "http://localhost:8888",
      headers: {
        Authorization: "Bearer " + config.nodeApiToken,
      },
    });

    const chainApiClient = new ChainApiClient({
      apiURL: config.chainApiUrl,
      rpcURL: config.chainRpcUrl,
      prefix: config.chainPrefix || "cosmos",
      signer: config.signer,
    });

    this.defaultModelProvider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient, chainApiClient);
    this.modelProviders = {};
    this.modelProviders[config.ownerDid] = this.defaultModelProvider;

    this.sidManager = sidManager;
  }

  private getModelProvider(ownerDid: string): ModelProvider {
    return this.modelProviders[ownerDid];
  }

  async init() {
    await this.defaultModelProvider.init();
  }

  addModelProvider(config: ModelProviderConfig) {
    const nodeApiClient = GetNodeApiClient({
      baseURL: config.nodeApiUrl,
      headers: {
        Authorization: "Bearer " + config.nodeApiToken,
      },
    });

    const chainApiClient = new ChainApiClient({
      apiURL: config.chainApiUrl,
      rpcURL: config.chainRpcUrl,
      prefix: config.chainPrefix || "cosmos",
      signer: config.signer,
    });

    const provider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient, chainApiClient);
    this.modelProviders[config.ownerDid] = provider;
  }

  async buildQueryRequest(proposal: QueryProposal) {
    const lastValidHeight = 100;
    const peerInfo = "";

    proposal.lastValidHeight = lastValidHeight;
    proposal.gateway = peerInfo;

    const sidProvider = await this.sidManager.getSidProvider();
    if (sidProvider === null) {
      throw new Error("failed to get sid provider");
    }

    const clientProposal = await sidProvider.createJWS({
      payload: u8a.toString(stringToUint8Array(stringify(proposal)), "base64url"),
    });

    console.log("sig:", clientProposal.signatures[0]);
    console.log("payload:", stringify(proposal));

    const queryMetadataProposal: QueryMetadataProposal = {
      Proposal: proposal,
      JwsSignature: clientProposal.signatures[0],
    };
    return queryMetadataProposal;
  }

  async createModel<T>(
    def: ModelDef<T>,
    modelConfig: ModelConfig = defaultModelConfig,
    ownerDid?: string
  ): Promise<string> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }
    console.log("NodeAddress: ", provider.getNodeAddress());

    const dataBytes = stringToUint8Array(stringify(def.data));

    const dataId = GenerateDataId();
    const cid = await CalculateCid(dataBytes);
    const proposal: Proposal = {
      owner: ownerDid || provider.getOwnerSid(),
      provider: provider.getNodeAddress(),
      groupId: provider.getGroupId(),
      duration: modelConfig.duration,
      replica: modelConfig.replica,
      timeout: modelConfig.timeout,
      alias: def.alias,
      dataId,
      commitId: dataId,
      tags: def.tags,
      cid,
      rule: def.rule,
      extendInfo: def.extendInfo,
      size: dataBytes.length,
      operation: modelConfig.operation,
    };

    const sidProvider = await this.sidManager.getSidProvider();
    if (sidProvider === null) {
      throw new Error("failed to get sid provider");
    }

    const clientProposal = await sidProvider.createJWS({
      payload: u8a.toString(stringToUint8Array(stringify(proposal)), "base64url"),
    });

    console.log("sig:", clientProposal.signatures[0]);
    console.log("payload:", stringify(proposal));

    if (!provider.validate(proposal)) {
      throw new Error("invalid provider");
    }

    const query = await this.buildQueryRequest({
      owner: proposal.owner,
      keyword: proposal.dataId,
      groupId: def.groupId || provider.getGroupId(),
      lastValidHeight: 0,
      gateway: "",
    });

    const clientOrderProposal: ClientOrderProposal = {
      Proposal: proposal,
      JwsSignature: clientProposal.signatures[0],
    };

    const orderId = await provider.store(clientOrderProposal);

    const model = await provider.create(query, clientOrderProposal, orderId, Array.from(dataBytes));

    return model.dataId;
  }

  async updateModel<T>(
    def: ModelDef<T>,
    modelConfig: ModelConfig = defaultModelConfig,
    ownerDid?: string
  ): Promise<string> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    let keyword = def.dataId;
    if (keyword === undefined) {
      keyword = def.alias;
      if (keyword === undefined) {
        throw new Error("Neither dataId nor alias is specified.");
      }
    }

    const query = await this.buildQueryRequest({
      owner: ownerDid || provider.getOwnerSid(),
      keyword,
      groupId: def.groupId || provider.getGroupId(),
      lastValidHeight: 0,
      gateway: "",
    });

    const originModel = await provider.load(query);

    const origin = originModel.cast();

    const patch = jsonpatch.compare(origin, def.data);
    console.log("Patch: ", stringify(patch));

    const target = jsonpatch.applyPatch(origin, patch).newDocument;
    const dataBytes = stringToUint8Array(stringify(patch));
    const targetDataBytes = stringToUint8Array(stringify(target));
    const cid = await CalculateCid(targetDataBytes);

    const proposal: Proposal = {
      owner: ownerDid || provider.getOwnerSid(),
      provider: provider.getNodeAddress(),
      groupId: provider.getGroupId(),
      duration: modelConfig.duration,
      replica: modelConfig.replica,
      timeout: modelConfig.timeout,
      alias: originModel.alias,
      dataId: originModel.dataId,
      commitId: GenerateDataId(),
      tags: originModel.tags,
      cid,
      rule: originModel.rule,
      extendInfo: originModel.extendInfo,
      size: dataBytes.length,
      operation: modelConfig.operation,
    };

    const sidProvider = await this.sidManager.getSidProvider();
    if (sidProvider === null) {
      throw new Error("failed to get sid provider");
    }
    const clientProposal = await sidProvider.createJWS({
      payload: u8a.toString(stringToUint8Array(stringify(proposal)), "base64url"),
    });

    if (!provider.validate(proposal)) {
      throw new Error("invalid provider");
    }

    const clientOrderProposal: ClientOrderProposal = {
      Proposal: proposal,
      JwsSignature: clientProposal.signatures[0],
    };

    const orderId = await provider.store(clientOrderProposal);

    const model = await provider.update(query, clientOrderProposal, orderId, Array.from(dataBytes));
    return model.dataId;
  }

  async loadModel<T>(keyword: string, ownerDid?: string, groupId?: string): Promise<T> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const query = await this.buildQueryRequest({
      owner: ownerDid || provider.getOwnerSid(),
      keyword,
      groupId: groupId || provider.getGroupId(),
      lastValidHeight: 0,
      gateway: "",
    });

    const model = await provider.load(query);

    console.log(String(model.content));

    return model.cast();
  }

  async loadModelByCommitId<T>(keyword: string, commitId: string, ownerDid?: string, groupId?: string): Promise<T> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const query = await this.buildQueryRequest({
      owner: ownerDid || provider.getOwnerSid(),
      keyword,
      groupId: groupId || provider.getGroupId(),
      commitId,
      lastValidHeight: 0,
      gateway: "",
    });

    const model = await provider.load(query);

    return model.cast();
  }

  async loadModelByVersion<T>(keyword: string, version: string, ownerDid?: string, groupId?: string): Promise<T> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const query = await this.buildQueryRequest({
      owner: ownerDid || provider.getOwnerSid(),
      keyword,
      groupId: groupId || provider.getGroupId(),
      version,
      lastValidHeight: 0,
      gateway: "",
    });

    const model = await provider.load(query);

    return model.cast();
  }

  async updateModelPermission(
    dataId: string,
    readonlyDids?: string[],
    readwriteDids?: string[],
    ownerDid?: string
  ): Promise<string> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const proposal: PermissionProposal = {
      owner: ownerDid || provider.getOwnerSid(),
      dataId,
      readonlyDids,
      readwriteDids,
    };

    const sidProvider = await this.sidManager.getSidProvider();
    if (sidProvider === null) {
      throw new Error("failed to get sid provider");
    }

    const permissionProposal = await sidProvider.createJWS({
      payload: u8a.toString(stringToUint8Array(stringify(proposal)), "base64url"),
    });

    console.log("sig:", permissionProposal.signatures[0]);
    console.log("payload:", stringify(proposal));

    const request: UpdatePermissionProposal = {
      Proposal: proposal,
      JwsSignature: permissionProposal.signatures[0],
    };

    await provider.updatePermission(request);

    return;
  }

  async renewModel(
    dataIds: string[],
    modelConfig: ModelConfig = defaultModelConfig,
    ownerDid?: string
  ): Promise<string> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const proposal: RenewProposal = {
      owner: ownerDid || provider.getOwnerSid(),
      duration: modelConfig.duration,
      timeout: modelConfig.timeout,
      data: dataIds,
    };

    const sidProvider = await this.sidManager.getSidProvider();
    if (sidProvider === null) {
      throw new Error("failed to get sid provider");
    }

    const renewProposal = await sidProvider.createJWS({
      payload: u8a.toString(stringToUint8Array(stringify(proposal)), "base64url"),
    });

    console.log("sig:", renewProposal.signatures[0]);
    console.log("payload:", stringify(proposal));

    const request: OrderRenewProposal = {
      Proposal: proposal,
      JwsSignature: renewProposal.signatures[0],
    };

    await provider.renew(request);

    return;
  }
}
