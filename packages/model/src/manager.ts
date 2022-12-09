import * as jsonpatch from "fast-json-patch";
import * as u8a from "uint8arrays";
import stringify from "fast-json-stable-stringify";
import { GetNodeApiClient } from "@sao-js-sdk/api-client";
import { SidManager } from "@sao-js-sdk/sid";
import { ModelConfig, ModelDef, ModelProviderConfig, Proposal } from "./types";
import {Proposal as SaoProposal} from "sao-chain-client/dist/saonetwork.sao.sao"
import { CalculateCid, GenerateDataId, stringToUint8Array } from "@sao-js-sdk/common";
import { ModelProvider } from ".";

const defaultModelConfig: ModelConfig = {
  duration: 365,
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
      baseURL: config.nodeApiUrl,
      headers: {
        Authorization: "Bearer " + config.nodeApiToken,
      },
    });

    this.defaultModelProvider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient);
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

    const provider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient);
    this.modelProviders[config.ownerDid] = provider;
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
      owner: provider.getOwnerSid(),
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
      payload: u8a.toString(SaoProposal.encode(SaoProposal.fromPartial(proposal)).finish(),"base64url"),
    });

    console.log("sig:", clientProposal.signatures[0]);
    console.log("payload:", stringify(proposal));

    if (!provider.validate(proposal)) {
      throw new Error("invalid provider");
    }

    const model = await provider.create(
      {
        Proposal: proposal,
        JwsSignature: clientProposal.signatures[0],
      },
      0,
      Array.from(dataBytes)
    );

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

    const originModel = await provider.load({
      keyword,
      publicKey: provider.getOwnerSid(),
      groupId: def.groupId,
    });

    const origin = originModel.cast();

    const patch = jsonpatch.compare(origin, def.data);
    console.log("Patch: ", stringify(patch));

    const target = jsonpatch.applyPatch(origin, patch).newDocument;
    const dataBytes = stringToUint8Array(stringify(patch));
    const targetDataBytes = stringToUint8Array(stringify(target));
    const cid = await CalculateCid(targetDataBytes);

    const proposal: Proposal = {
      owner: provider.getOwnerSid(),
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
      payload: u8a.toString(SaoProposal.encode(SaoProposal.fromPartial(proposal)).finish(),"base64url"),
    });

    if (!provider.validate(proposal)) {
      throw new Error("invalid provider");
    }

    const model = await provider.update(
      {
        Proposal: proposal,
        JwsSignature: clientProposal.signatures[0],
      },
      0,
      Array.from(dataBytes)
    );
    return model.dataId;
  }

  async loadModel<T>(keyword: string, ownerDid?: string, groupId?: string): Promise<T> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const model = await provider.load({
      keyword,
      publicKey: provider.getOwnerSid(),
      groupId,
    });

    console.log(String(model.content));

    return model.cast();
  }

  async loadModelByCommitId<T>(keyword: string, commitId: string, ownerDid?: string, groupId?: string): Promise<T> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const model = await provider.load({
      keyword,
      publicKey: provider.getOwnerSid(),
      groupId,
      commitId,
    });

    return model.cast();
  }

  async loadModelByVersion<T>(keyword: string, version: string, ownerDid?: string, groupId?: string): Promise<T> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const model = await provider.load({
      keyword,
      publicKey: provider.getOwnerSid(),
      groupId,
      version,
    });

    return model.cast();
  }
}
