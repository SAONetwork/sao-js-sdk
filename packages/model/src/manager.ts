import * as jsonpatch from "fast-json-patch";
import * as u8a from "uint8arrays";
import stringify from "fast-json-stable-stringify";
import {
  GetNodeApiClient,
  ChainApiClient,
  QueryMetadataProposal,
  SaoTypes,
  UpdatePermissionProposal,
  OrderRenewProposal,
  OrderTerminateProposal,
  ClientOrderProposal,
} from "@sao-js-sdk/api-client";
import { SidManager } from "@sao-js-sdk/sid";
import { ModelConfig, ModelDef, ModelProviderConfig } from "./types";
import { CalculateCid, GenerateDataId, stringToUint8Array } from "@sao-js-sdk/common";
import { ModelProvider } from ".";

const defaultModelConfig: ModelConfig = {
  duration: 365 * 60 * 60 * 24,
  replica: 1,
  timeout: 60 * 60 * 24,
  operation: 1,
};
export class ModelManager {
  private defaultModelProvider: ModelProvider;
  private modelProviders: Record<string, ModelProvider>;
  private sidManager: SidManager;

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

  async buildQueryRequest(provider: ModelProvider, proposal: SaoTypes.QueryProposal) {
    const lastHeight: number = await provider.getLatestHeight();
    const lastValidHeight: number = 200 + lastHeight;
    const peerInfo: string = await provider.getPeerInfo();

    proposal.lastValidHeight = lastValidHeight;
    proposal.gateway = peerInfo;

    const sidProvider = await this.sidManager.getSidProvider();
    if (sidProvider === null) {
      throw new Error("failed to get sid provider");
    }

    const clientProposal = await sidProvider.createJWS({
      payload: u8a.toString(SaoTypes.QueryProposal.encode(SaoTypes.QueryProposal.fromPartial(proposal)).finish(), "base64url"),
    });

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
    const dataBytes = stringToUint8Array(stringify(def.data));

    const dataId = GenerateDataId();
    const cid = await CalculateCid(dataBytes);
    const proposal: SaoTypes.Proposal = {
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
      payload: u8a.toString(SaoTypes.Proposal.encode(SaoTypes.Proposal.fromPartial(proposal)).finish(), "base64url"),
    });

    if (!provider.validate(proposal)) {
      throw new Error("invalid provider");
    }

    const query = await this.buildQueryRequest(provider, {
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

    // const orderId = await provider.store(clientOrderProposal);
    // console.log("orderId:",orderId)

    const model = await provider.create(query, clientOrderProposal, 0, Array.from(dataBytes));

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
    let keywordType = 1;
    if (keyword === undefined) {
      keyword = def.alias;
      keywordType = 2;
      if (keyword === undefined) {
        throw new Error("Neither dataId nor alias is specified.");
      }
    }

    const query = await this.buildQueryRequest(provider, {
      owner: ownerDid || provider.getOwnerSid(),
      keyword,
      keywordType,
      groupId: def.groupId || provider.getGroupId(),
      lastValidHeight: 0,
      gateway: "",
    });

    const originModel = await provider.load(query);

    const origin = originModel.cast();

    const patch = jsonpatch.compare(origin, def.data);
    const target = jsonpatch.applyPatch(origin, patch).newDocument;
    const dataBytes = stringToUint8Array(stringify(patch));
    const targetDataBytes = stringToUint8Array(stringify(target));
    const cid = await CalculateCid(targetDataBytes);

    const proposal: SaoTypes.Proposal = {
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
      size: targetDataBytes.length,
      operation: modelConfig.operation,
    };

    const sidProvider = await this.sidManager.getSidProvider();
    if (sidProvider === null) {
      throw new Error("failed to get sid provider");
    }
    const clientProposal = await sidProvider.createJWS({
      payload: u8a.toString(SaoTypes.Proposal.encode(SaoTypes.Proposal.fromPartial(proposal)).finish(), "base64url"),
    });

    if (!provider.validate(proposal)) {
      throw new Error("invalid provider");
    }

    const clientOrderProposal: ClientOrderProposal = {
      Proposal: proposal,
      JwsSignature: clientProposal.signatures[0],
    };

    // const orderId = await provider.store(clientOrderProposal);

    const model = await provider.update(query, clientOrderProposal, 0, Array.from(dataBytes));
    return model.dataId;
  }

  async loadModel<T>(keyword: string, keywordType?: number, ownerDid?: string, groupId?: string): Promise<T> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const query = await this.buildQueryRequest(provider, {
      owner: ownerDid || provider.getOwnerSid(),
      keyword,
      keywordType: keywordType || 1,
      groupId: groupId || provider.getGroupId(),
      lastValidHeight: 0,
      gateway: "",
    });

    const model = await provider.load(query);

    return model.cast();
  }

  async loadModelByCommitId<T>(
    keyword: string,
    commitId: string,
    keywordType?: number,
    ownerDid?: string,
    groupId?: string
  ): Promise<T> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const query = await this.buildQueryRequest(provider, {
      owner: ownerDid || provider.getOwnerSid(),
      keyword,
      keywordType: keywordType || 1,
      groupId: groupId || provider.getGroupId(),
      commitId,
      lastValidHeight: 0,
      gateway: "",
    });

    const model = await provider.load(query);

    return model.cast();
  }

  async loadModelByVersion<T>(
    keyword: string,
    version: string,
    keywordType?: number,
    ownerDid?: string,
    groupId?: string
  ): Promise<T> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const query = await this.buildQueryRequest(provider, {
      owner: ownerDid || provider.getOwnerSid(),
      keyword,
      keywordType: keywordType || 1,
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

    const proposal: SaoTypes.PermissionProposal = {
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
      payload: u8a.toString(SaoTypes.PermissionProposal.encode(SaoTypes.PermissionProposal.fromPartial(proposal)).finish(), "base64url"),
    });

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

    const proposal: SaoTypes.RenewProposal = {
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
      payload: u8a.toString(SaoTypes.RenewProposal.encode(SaoTypes.RenewProposal.fromPartial(proposal)).finish(), "base64url"),
    });

    const request: OrderRenewProposal = {
      Proposal: proposal,
      JwsSignature: renewProposal.signatures[0],
    };

    await provider.renew(request);

    return;
  }

  async deleteModel(dataId: string, ownerDid?: string): Promise<string> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const proposal: SaoTypes.TerminateProposal = {
      owner: ownerDid || provider.getOwnerSid(),
      dataId,
    };

    const sidProvider = await this.sidManager.getSidProvider();
    if (sidProvider === null) {
      throw new Error("failed to get sid provider");
    }

    const terminateProposal = await sidProvider.createJWS({
      payload: u8a.toString(SaoTypes.TerminateProposal.encode(SaoTypes.TerminateProposal.fromPartial(proposal)).finish(), "base64url"),
    });

    const request: OrderTerminateProposal = {
      Proposal: proposal,
      JwsSignature: terminateProposal.signatures[0],
    };

    await provider.terminate(request);

    return;
  }
}
