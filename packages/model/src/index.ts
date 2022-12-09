import {
  BuildCreateReqParams,
  BuildLoadReqParams,
  BuildNodeAddressReqParams,
  BuildUpdateReqParams,
  CreateRequestClient,
  SaoNodeAPISchema,
} from "@sao-js-sdk/api-client";
import { ClientOrderProposal, QueryMetadataProposal, Proposal } from "./types";
export class Model {
  dataId: string;
  alias: string;
  commitId?: string;
  version?: string;
  content?: number[];
  cid?: string;
  tags?: string[];
  rule?: string;
  extendInfo?: string;

  constructor(dataId: string, alias: string) {
    this.dataId = dataId;
    this.alias = alias;
  }

  setCommitId(commitId: string) {
    this.commitId = commitId;
  }

  setVersion(version: string) {
    this.version = version;
  }

  setContent(content: number[]) {
    this.content = content;
  }

  setCid(cid: string) {
    this.cid = cid;
  }

  setTags(tags: string[]) {
    this.tags = [...tags];
  }

  setRule(rule: string) {
    this.rule = rule;
  }

  setExtendInfo(extendInfo: string) {
    this.extendInfo = extendInfo;
  }

  cast(): any {
    return JSON.parse(String(this.content));
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

export class ModelProvider {
  private ownerSid: string;
  private groupId: string;
  private nodeAddress: string;
  private nodeApiClient: CreateRequestClient<SaoNodeAPISchema>;

  public constructor(ownerSid: string, groupId: string, nodeApiClient: CreateRequestClient<SaoNodeAPISchema>) {
    this.ownerSid = ownerSid;
    this.groupId = groupId;
    this.nodeApiClient = nodeApiClient;
  }

  async init() {
    const res = await this.nodeApiClient.jsonRpcApi(BuildNodeAddressReqParams());
    this.nodeAddress = res.data.result;
  }

  getOwnerSid(): string {
    return this.ownerSid;
  }

  getGroupId(): string {
    return this.groupId;
  }

  getNodeAddress(): string {
    return this.nodeAddress;
  }

  validate(proposal: Proposal): boolean {
    return proposal.groupId === this.groupId && proposal.owner === this.ownerSid;
  }

  async create(query: QueryMetadataProposal, clientProposal: ClientOrderProposal, orderId: number, content: number[]): Promise<Model> {
    const res = await this.nodeApiClient.jsonRpcApi(BuildCreateReqParams(query, clientProposal, orderId, content));

    if (res.data.result) {
      const model = new Model(res.data.result.DataId, res.data.result.Alias);
      model.setCid(res.data.result.Cid);

      return model;
    } else if (res.data.error) {
      throw new Error(res.data.error.message);
    } else {
      throw new Error("unknown error");
    }
  }

  async update(query: QueryMetadataProposal, clientProposal: ClientOrderProposal, orderId: number, patch: number[]): Promise<Model> {
    const res = await this.nodeApiClient.jsonRpcApi(BuildUpdateReqParams(query, clientProposal, orderId, patch));
    if (res.data.result) {
      const model = new Model(res.data.result.DataId, res.data.result.Alias);
      model.setCid(res.data.result.Cid);

      return model;
    } else if (res.data.error) {
      throw new Error(res.data.error.message);
    } else {
      throw new Error("unknown error");
    }
  }

  async load(query: QueryMetadataProposal): Promise<Model> {
    const res = await this.nodeApiClient.jsonRpcApi(BuildLoadReqParams(query));

    if (res.data.result) {
      const model = new Model(res.data.result.DataId, res.data.result.Alias);
      model.setCid(res.data.result.Cid);
      model.setContent(res.data.result.Content);
      model.setCommitId(res.data.result.CommitId);
      model.setVersion(res.data.result.Version);

      return model;
    } else if (res.data.error) {
      throw new Error(res.data.error.message);
    } else {
      throw new Error("unknown error");
    }
  }

  async renew(clientProposal: ClientOrderProposal, orderId: number): Promise<Model> {
    throw new Error(`comming soon...${clientProposal} ${orderId}`);
  }
}

export * from "./manager";
export * from "./types";
