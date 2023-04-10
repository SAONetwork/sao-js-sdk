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
} from "@saonetwork/api-client";
import { SidManager } from "@saonetwork/sid";
import { ModelConfig, ModelDef, FileDef, ModelProviderConfig } from "./types";
import { CalculateCid, GenerateDataId, stringToUint8Array } from "@saonetwork/common";
import { ModelProvider } from ".";
import { encodeArrayBuffer, decodeArrayBuffer } from "./utils";
import { webTransport } from "@libp2p/webtransport";
import { EventEmitter } from "@libp2p/interfaces/events";
import { UpgraderEvents } from "@libp2p/interface-transport";
import { multiaddr } from "@multiformats/multiaddr";
import CID from "cids";
import multihashing from "multihashing-async";
import { pipe } from "it-pipe";
import all from "it-all";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

const DefaultModelConfig: ModelConfig = {
  duration: 365 * 60 * 60 * 24,
  replica: 3,
  timeout: 60 * 60 * 24,
  operation: 1,
  isPublish: false,
};
export class ModelManager {
  private defaultModelConfig: ModelConfig;
  private defaultModelProvider: ModelProvider;
  private modelProviders: Record<string, ModelProvider>;
  private sidManager: SidManager;

  constructor(config: ModelProviderConfig, sidManager: SidManager, defaultModelConfig: ModelConfig = DefaultModelConfig) {
    const nodeApiClient = GetNodeApiClient({
      baseURL: config.nodeApiUrl,
      headers: {
        Authorization: "Bearer " + config.nodeApiToken,
      },
    });

    const chainApiClient = new ChainApiClient({
      apiURL: config.chainApiUrl,
      rpcURL: config.chainRpcUrl,
      prefix: config.chainPrefix || "sao",
      signer: config.signer,
    });

    this.defaultModelConfig = defaultModelConfig;
    this.defaultModelProvider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient, chainApiClient);
    this.modelProviders = {};
    this.modelProviders[config.ownerDid] = this.defaultModelProvider;

    this.sidManager = sidManager;
  }

  /**
   * get the model provider by DID stringt.
   *
   * @param ownerDid DID string.
   * @returns the model provider.
   */
  private getModelProvider(ownerDid: string): ModelProvider {
    return this.modelProviders[ownerDid];
  }

  /**
   * initialize the data model manager.
   *
   */
  async init() {
    await this.defaultModelProvider.init();
  }

  /**
   * add a model provider.
   *
   * @param config model provider configuration.
   */
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
      prefix: config.chainPrefix || "sao",
      signer: config.signer,
    });

    const provider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient, chainApiClient);
    this.modelProviders[config.ownerDid] = provider;
  }

  /**
   * build query requst proposal.
   *
   * @param provider data model provider.
   * @param proposal query proposal.
   */
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
      payload: u8a.toString(
        SaoTypes.QueryProposal.encode(SaoTypes.QueryProposal.fromPartial(proposal)).finish(),
        "base64url"
      ),
    });

    const queryMetadataProposal: QueryMetadataProposal = {
      Proposal: proposal,
      JwsSignature: clientProposal.signatures[0],
    };
    return queryMetadataProposal;
  }

  /**
   * create a data model.
   *
   * @param def data model defination.
   * @param modelConfig data model configuration.
   * @param ownerDid DID string, optional.
   * @returns the created data model.
   */
  async createModel<T>(
    def: ModelDef<T>,
    modelConfig: ModelConfig = this.defaultModelConfig,
    ownerDid?: string
  ): Promise<string> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }
    const dataBytes = stringToUint8Array(stringify(def.data));

    const dataId = GenerateDataId(provider.getOwnerSid() + provider.getGroupId());
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

    let orderId = 0;
    if (modelConfig.isPublish) {
      orderId = await provider.store(clientOrderProposal);
    }

    const model = await provider.create(query, clientOrderProposal, orderId, Array.from(dataBytes));

    return model.dataId;
  }

  /**
   * create a data model.
   *
   * @param def data model defination.
   * @param modelConfig data model configuration.
   * @param ownerDid DID string, optional.
   * @returns the created data model.
   */
  async createFile<T>(
    def: FileDef<T>,
    modelConfig: ModelConfig = this.defaultModelConfig,
    ownerDid?: string
  ): Promise<string> {
    let provider = this.defaultModelProvider;
    if (ownerDid !== undefined) {
      provider = this.getModelProvider(ownerDid);
    }

    const dataId = GenerateDataId(provider.getOwnerSid() + provider.getGroupId());
    const proposal: SaoTypes.Proposal = {
      owner: ownerDid || provider.getOwnerSid(),
      provider: provider.getNodeAddress(),
      groupId: provider.getGroupId(),
      duration: modelConfig.duration,
      replica: modelConfig.replica,
      timeout: modelConfig.timeout,
      alias: def.filename,
      dataId,
      commitId: dataId,
      tags: def.tags,
      cid: def.cid,
      rule: def.rule,
      extendInfo: def.extendInfo,
      size: def.size,
      operation: 0,
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

    let orderId = 0;
    if (modelConfig.isPublish) {
      orderId = await provider.store(clientOrderProposal);
    }

    const model = await provider.createFile(query, clientOrderProposal, orderId);

    return model.dataId;
  }

  /**
   * update a data model.
   *
   * @param def data model defination.
   * @param modelConfig data model configuration.
   * @param ownerDid DID string, optional.
   * @returns the updated data model.
   */
  async updateModel<T>(
    def: ModelDef<T>,
    modelConfig: ModelConfig = this.defaultModelConfig,
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
      commitId: originModel.commitId + "|" + GenerateDataId(provider.getOwnerSid() + provider.getGroupId()),
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

    let orderId = 0;
    if (modelConfig.isPublish) {
      orderId = await provider.store(clientOrderProposal);
    }

    const model = await provider.update(query, clientOrderProposal, orderId, Array.from(dataBytes));

    return model.dataId;
  }

  /**
   * load file content in a data model.
   *
   * @param keyword keyword to search the data model.
   * @param keywordType keyword type: 0, 1 - data-id; 2 - alias.
   * @param ownerDid DID string, optional.
   * @param groupId group id string, optional.
   * @returns the data model.
   */
  async loadModelFileContent(
    keyword: string,
    keywordType?: number,
    ownerDid?: string,
    groupId?: string
  ): Promise<ArrayBufferLike> {
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
    return decodeArrayBuffer(String(model.content));
  }

  /**
   * load a data model.
   *
   * @param keyword keyword to search the data model.
   * @param keywordType keyword type: 0, 1 - data-id; 2 - alias.
   * @param ownerDid DID string, optional.
   * @param groupId group id string, optional.
   * @returns the data model.
   */
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

  /**
   * load a data model.
   *
   * @param keyword keyword to search the data model.
   * @param commitId commit id.
   * @param keywordType keyword type: 0, 1 - data-id; 2 - alias.
   * @param ownerDid DID string, optional.
   * @param groupId group id string, optional.
   * @returns the data model.
   */
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

  /**
   * load a data model.
   *
   * @param keyword keyword to search the data model.
   * @param version version id.
   * @param keywordType keyword type: 0, 1 - data-id; 2 - alias.
   * @param ownerDid DID string, optional.
   * @param groupId group id string, optional.
   * @returns the data model.
   */
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

  /**
   * update a data model's permissions.
   *
   * @param dataId data id of the data model.
   * @param readonlyDids readonly DID string list.
   * @param readwriteDids read/write DID string list.
   * @param isPublish whether to pubish the message or not.
   * @param ownerDid DID string, optional.
   */
  async updateModelPermission(
    dataId: string,
    readonlyDids?: string[],
    readwriteDids?: string[],
    isPublish?: true,
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
      payload: u8a.toString(
        SaoTypes.PermissionProposal.encode(SaoTypes.PermissionProposal.fromPartial(proposal)).finish(),
        "base64url"
      ),
    });

    const request: UpdatePermissionProposal = {
      Proposal: proposal,
      JwsSignature: permissionProposal.signatures[0],
    };

    await provider.updatePermission(request, isPublish);

    return;
  }

  /**
   * renew a data model.
   *
   * @param dataId data id of the data model.
   * @param modelConfig data model configuration.
   * @param isPublish whether to pubish the message or not.
   * @param ownerDid DID string, optional.
   */
  async renewModel(
    dataIds: string[],
    modelConfig: ModelConfig = this.defaultModelConfig,
    isPublish?: true,
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
      payload: u8a.toString(
        SaoTypes.RenewProposal.encode(SaoTypes.RenewProposal.fromPartial(proposal)).finish(),
        "base64url"
      ),
    });

    const request: OrderRenewProposal = {
      Proposal: proposal,
      JwsSignature: renewProposal.signatures[0],
    };

    await provider.renew(request, isPublish);

    return;
  }

  /**
   * delete a data model's order.
   *
   * @param dataId data id of the data model.
   * @param isPublish whether to pubish the message or not.
   * @param ownerDid DID string, optional.
   */
  async deleteModel(dataId: string, isPublish?: false, ownerDid?: string): Promise<string> {
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
      payload: u8a.toString(
        SaoTypes.TerminateProposal.encode(SaoTypes.TerminateProposal.fromPartial(proposal)).finish(),
        "base64url"
      ),
    });

    const request: OrderTerminateProposal = {
      Proposal: proposal,
      JwsSignature: terminateProposal.signatures[0],
    };

    await provider.terminate(request, isPublish);

    return;
  }

  /**
   * Uploads a file chunk to a peer using WebTransport protocol.
   * @param {ArrayBuffer} buffer - The file chunk data
   * @param {string} address - The multiaddr of the peer
   * @param {any} peerInfo - The peer ID and public key of the peer
   * @returns {Promise<{ contentLength: number; cid: string }>} A promise that resolves with the content length and CID of the file chunk or rejects with an error
   */
  async uploadFileChunk(
    buffer: ArrayBuffer,
    address: string,
    peerInfo: any,
    chunkId: number,
    totalChunks: number
  ): Promise<{ contentLength: number; cid: string }> {
    const content = encodeArrayBuffer(buffer);
    const encoder = new TextEncoder();
    const contentHash = await multihashing(encoder.encode(content), "sha2-256");
    const contentCid = new CID(0, "dag-pb", contentHash);
    const bytes = encoder.encode(content);

    console.log("Content[" + 0 + "], CID: " + contentCid.toString() + ", length: ", bytes.length);
    // create an instance of the Upgrader class with the params
    const upgrader = new SaoUpgrader(
      uint8ArrayFromString(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "Sao.Upload",
          params: [
            JSON.stringify({
              ChunkId: chunkId,
              TotalLength: content.length,
              TotalChunks: totalChunks,
              ChunkCid: contentCid.toString(),
              Cid: contentCid.toString(),
              Content: Array.from(bytes),
            }),
          ],
          id: 1,
        })
      )
    );
    const addr = multiaddr(address);

    const transport = webTransport()({ peerId: peerInfo });

    const conn = await transport.dial(addr, { upgrader });
    try {
      await conn.close();
    } catch (error) {
      // block of code to handle the error
      console.error(error); // log the error
    }
    return { contentLength: content.length, cid: contentCid.toString() };
  }
}

class SaoUpgrader extends EventEmitter<UpgraderEvents> {
  params: any;
  constructor(params: any) {
    super();
    this.params = params;
  }

  // Upgrade an outbound connection
  async upgradeOutbound(maConn: any, opts: any) {
    const mux = await opts.muxerFactory.createStreamMuxer();
    const s = await mux.newStream();
    console.log("stream created, ", s.stat);
    await pipe([this.params], s);
    await s.closeWrite();
    const values = await pipe(s, all);
    console.log(values);
    await s.close();
    console.log("stream closed");
    return maConn;
  }

  // Upgrade an inbound connection
  async upgradeInbound(maConn: any, opts: any) {
    return maConn;
  }
}
