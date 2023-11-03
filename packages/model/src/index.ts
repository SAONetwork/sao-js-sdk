import {
  BuildModelCreateReqParams,
  BuildModelCreateFileReqParams,
  BuildModelLoadReqParams,
  BuildGetNodeAddressReqParams,
  BuildModelUpdateReqParams,
  BuildModelDeleteReqParams,
  BuildModelRenewOrderReqParams,
  BuildModelUpdatePermissionReqParams,
  ChainApiClient,
  CreateRequestClient,
  SaoNodeAPISchema,
  ClientOrderProposal,
  QueryMetadataProposal,
  SaoTypes,
  UpdatePermissionProposal,
  OrderRenewProposal,
  OrderTerminateProposal,
  BuildStoreProposalParams,
} from "@saonetwork/api-client";

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
    const contentBase64 = String(this.content);
    const contentDecoded = window.atob(contentBase64);
    return JSON.parse(contentDecoded);
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
  private paymentApiClient: CreateRequestClient<SaoNodeAPISchema>;
  private chainApiClient: ChainApiClient;

  public constructor(
    ownerSid: string,
    groupId: string,
    nodeApiClient: CreateRequestClient<SaoNodeAPISchema>,
    chainApiClient: ChainApiClient,
    paymentApiClient?: CreateRequestClient<SaoNodeAPISchema>
  ) {
    this.ownerSid = ownerSid;
    this.groupId = groupId;
    this.nodeApiClient = nodeApiClient;
    this.chainApiClient = chainApiClient;
    this.paymentApiClient = paymentApiClient;
  }

  /**
   * initialize the data model provider.
   *
   */
  async init() {
    const res = await this.nodeApiClient.jsonRpcApi(BuildGetNodeAddressReqParams());
    this.nodeAddress = res.data.result;
  }

  /**
   * get the owner SID
   *
   */
  getOwnerSid(): string {
    return this.ownerSid;
  }

  /**
   * get the group id.
   *
   */
  getGroupId(): string {
    return this.groupId;
  }

  /**
   * get the gateway address
   *
   */
  getNodeAddress(): string {
    return this.nodeAddress;
  }

  /**
   * validate the proposal.
   *
   */
  validate(proposal: SaoTypes.Proposal): boolean {
    return proposal.groupId === this.groupId && proposal.owner === this.ownerSid;
  }

  /**
   * get the latest blocke height.
   *
   */
  async getLatestHeight(): Promise<number> {
    return await this.chainApiClient.GetLatestBlockHeight();
  }

  /**
   * get the libp2p peer information.
   *
   */
  async getPeerInfo(): Promise<string> {
    return await this.chainApiClient.GetNodePeerInfo(this.nodeAddress);
  }

  /**
   * create a data model.
   *
   * @param query query proposal for data model validation.
   * @param clientProposal requst proposal to create a data model.
   * @param orderId store message order id.
   * @param content data model content.
   * @returns the created data model.
   */
  async create(
    query: QueryMetadataProposal,
    clientProposal: ClientOrderProposal,
    orderId: number,
    content: number[]
  ): Promise<Model> {
    const res = await this.nodeApiClient.jsonRpcApi(BuildModelCreateReqParams(query, clientProposal, orderId, content));

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

    /**
   * create a file data model.
   *
   * @param query query proposal for file data model validation.
   * @param clientProposal requst proposal to create a file data model.
   * @param orderId store message order id.
   * @param content data model content.
   * @returns the created data model.
   */
    async createFile(
      query: QueryMetadataProposal,
      clientProposal: ClientOrderProposal,
      orderId: number
    ): Promise<Model> {
      const res = await this.nodeApiClient.jsonRpcApi(BuildModelCreateFileReqParams(query, clientProposal, orderId));

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

  /**
   * update a data model.
   *
   * @param query query proposal for data model validation.
   * @param clientProposal requst proposal to update a data model.
   * @param orderId store message order id.
   * @param patch json diff patch for the update operation.
   * @returns the update data model.
   */
  async update(
    query: QueryMetadataProposal,
    clientProposal: ClientOrderProposal,
    orderId: number,
    patch: number[]
  ): Promise<Model> {
    const res = await this.nodeApiClient.jsonRpcApi(BuildModelUpdateReqParams(query, clientProposal, orderId, patch));
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

  /**
   * send a store message.
   *
   * @param request the data model store request proposal.
   * @returns the order id.
   */
  async store(request: ClientOrderProposal): Promise<number> {
    const txResult = await this.chainApiClient.Store(request);
    if (txResult.code != 0) {
      throw new Error(`store failed, DataId: ${request.Proposal.dataId}`);
    } else {
      const res = await this.chainApiClient.GetTx(txResult.transactionHash);

      if (res.status === 200) {
        const resp = await this.chainApiClient.DecodeOrderId(res.data.tx_response.data);

        return resp.orderId;
      } else {
        throw new Error(`store failed. ${res.statusText}`);
      }
    }
  }

  /**
   * load a data model.
   *
   * @param query the data model query proposal.
   * @returns the update data model.
   */
  async load(query: QueryMetadataProposal): Promise<Model> {
    const res = await this.nodeApiClient.jsonRpcApi(BuildModelLoadReqParams(query));

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

  /**
   * update a data model permission.
   *
   * @param request the update data model permission request proposal.
   * @param isPublish whether to pubish the message or not.
   * @returns void.
   */
  async updatePermission(request: UpdatePermissionProposal, isPublish: boolean): Promise<void> {
    if (isPublish) {
      const txResult = await this.chainApiClient.UpdatePermission(request);
      if (txResult.code != 0) {
        throw new Error(`update permission failed failed, DataId: ${request.Proposal.dataId}`);
      } else {
        return;
      }
    } else {
      const res = await this.nodeApiClient.jsonRpcApi(BuildModelUpdatePermissionReqParams(request));
      if (res.data.result) {
        return;
      } else if (res.data.error) {
        throw new Error(res.data.error.message);
      } else {
        throw new Error("unknown error");
      }
    }
  }

  /**
   * renew a data model order.
   *
   * @param request the renew data model order request proposal.
   * @param isPublish whether to pubish the message or not.
   * @returns void.
   */
  async renew(request: OrderRenewProposal, isPublish: boolean): Promise<void> {
    if (isPublish) {
      const txResult = await this.chainApiClient.Renew(request);
      if (txResult.code != 0) {
        throw new Error(`renew failed, DataIds: ${request.Proposal.data}`);
      } else {
        return;
      }
    } else {
      const res = await this.nodeApiClient.jsonRpcApi(BuildModelRenewOrderReqParams(request));
      if (res.data.result) {
        return;
      } else if (res.data.error) {
        throw new Error(res.data.error.message);
      } else {
        throw new Error("unknown error");
      }
    }
  }

  /**
   * terminate a data model order.
   *
   * @param request the terminate data model order request proposal.
   * @param isPublish whether to pubish the message or not.
   * @returns void.
   */
  async terminate(request: OrderTerminateProposal, isPublish: boolean): Promise<void> {
    if (isPublish) {
      const txResult = await this.chainApiClient.Terminate(request);
      if (txResult.code != 0) {
        throw new Error(`terminate failed, DataIds: ${request.Proposal.dataId}`);
      } else {
        return;
      }
    } else {
      const res = await this.nodeApiClient.jsonRpcApi(BuildModelDeleteReqParams(request));
      if (res.data.result) {
        return;
      } else if (res.data.error) {
        throw new Error(res.data.error.message);
      } else {
        throw new Error("unknown error");
      }
    }
  }

  async storeProposal(clientProposal: ClientOrderProposal) {
    if (clientProposal.Proposal.paymentDid == "") {
      throw new Error("only the order proposals with payment did need to be stored in the payment gateway");
    }
    const res = await this.paymentApiClient.jsonRpcApi(BuildStoreProposalParams(clientProposal));
    console.log(res);
    if (res.data.result) {
      return res.data.result;
    } else if (res.data.error) {
      throw new Error(res.data.error.message);
    } else {
      throw new Error("unknown error");
    }
  }
}

export * from "./manager";
export * from "./types";
