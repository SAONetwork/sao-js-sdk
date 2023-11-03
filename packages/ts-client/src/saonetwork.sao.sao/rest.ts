/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

export interface SaoExpiredShard {
  /** @format uint64 */
  height?: string;
  shardList?: string[];
}

export interface SaoFault {
  data_id?: string;

  /** @format uint64 */
  order_id?: string;

  /** @format uint64 */
  shard_id?: string;
  commit_id?: string;
  provider?: string;
  reporter?: string;
}

export interface SaoJwsSignature {
  protected?: string;
  signature?: string;
}

export interface SaoKV {
  k?: string;
  v?: string;
}

export interface SaoMetadata {
  dataId?: string;
  owner?: string;
  alias?: string;
  groupId?: string;

  /** @format uint64 */
  orderId?: string;
  tags?: string[];
  cid?: string;
  commits?: string[];
  extendInfo?: string;
  update?: boolean;
  commit?: string;
  rule?: string;

  /** @format uint64 */
  duration?: string;

  /** @format uint64 */
  createdAt?: string;
  provider?: string;

  /** @format int32 */
  expire?: number;

  /** @format int32 */
  status?: number;

  /** @format int32 */
  replica?: number;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  amount?: V1Beta1Coin;

  /** @format uint64 */
  size?: string;

  /** @format int64 */
  operation?: number;
}

export type SaoMsgCancelResponse = object;

export type SaoMsgCompleteResponse = object;

export interface SaoMsgMigrateResponse {
  result?: SaoKV[];
}

export interface SaoMsgReadyResponse {
  /** @format uint64 */
  orderId?: string;
  shards?: SaoShardMeta[];
}

export interface SaoMsgRecoverFaultsResponse {
  fault_ids?: string[];
}

export interface SaoMsgRenewResponse {
  result?: SaoKV[];
}

export interface SaoMsgReportFaultsResponse {
  fault_ids?: string[];
}

export interface SaoMsgStoreResponse {
  /** @format uint64 */
  orderId?: string;
  shards?: SaoShardMeta[];
}

export type SaoMsgTerminateResponse = object;

export type SaoMsgUpdataPermissionResponse = object;

/**
 * Params defines the parameters for the module.
 */
export type SaoParams = object;

export interface SaoPermissionProposal {
  owner?: string;
  dataId?: string;
  readonlyDids?: string[];
  readwriteDids?: string[];
}

export interface SaoProposal {
  owner?: string;
  provider?: string;
  groupId?: string;

  /** @format uint64 */
  duration?: string;

  /** @format int32 */
  replica?: number;

  /** @format int32 */
  timeout?: number;
  alias?: string;
  dataId?: string;
  commitId?: string;
  tags?: string[];
  cid?: string;
  rule?: string;
  extendInfo?: string;

  /** @format uint64 */
  size?: string;

  /**
   * 0: new|update, 1:force-push
   * @format int64
   */
  operation?: number;
  readonlyDids?: string[];
  readwriteDids?: string[];
  paymentDid?: string;
}

export interface SaoQueryAllExpiredShardResponse {
  expiredShard?: SaoExpiredShard[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SaoQueryAllTimeoutOrderResponse {
  timeoutOrder?: SaoTimeoutOrder[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SaoQueryGetExpiredShardResponse {
  expiredShard?: SaoExpiredShard;
}

export interface SaoQueryGetTimeoutOrderResponse {
  timeoutOrder?: SaoTimeoutOrder;
}

export interface SaoQueryLatesthightResponse {
  /** @format uint64 */
  latest_block_height?: string;
  latest_block_time?: string;
}

export interface SaoQueryMetadataResponse {
  metadata?: SaoMetadata;
  shards?: Record<string, SaoShardMeta>;
}

export interface SaoQueryNetVersionResponse {
  version?: string;
}

/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 */
export interface SaoQueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: SaoParams;
}

export interface SaoQueryProposal {
  owner?: string;
  keyword?: string;
  groupId?: string;

  /**
   * 0,1 - query by dataId, 2 - query by alias
   * @format int64
   */
  keywordType?: number;

  /** @format uint64 */
  lastValidHeight?: string;
  gateway?: string;
  commitId?: string;
  version?: string;
  dataOwner?: string;
}

export interface SaoRenewProposal {
  owner?: string;

  /** @format uint64 */
  duration?: string;

  /** @format int32 */
  timeout?: number;
  data?: string[];
}

export interface SaoShardMeta {
  /** @format uint64 */
  shardId?: string;
  peer?: string;
  cid?: string;
  provider?: string;
  sp?: string;
}

export interface SaoTerminateProposal {
  owner?: string;
  dataId?: string;
}

export interface SaoTimeoutOrder {
  /** @format uint64 */
  height?: string;
  orderList?: string[];
}

/**
* Coin defines a token with a denomination and an amount.

NOTE: The amount field is an Int which implements the custom method
signatures required by gogoproto.
*/
export interface V1Beta1Coin {
  denom?: string;
  amount?: string;
}

/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface V1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string;

  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string;

  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string;

  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  count_total?: boolean;

  /**
   * reverse is set to true if results are to be returned in the descending order.
   *
   * Since: cosmos-sdk 0.43
   */
  reverse?: boolean;
}

/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface V1Beta1PageResponse {
  /**
   * next_key is the key to be passed to PageRequest.key to
   * query the next page most efficiently. It will be empty if
   * there are no more results.
   * @format byte
   */
  next_key?: string;

  /**
   * total is total number of results available if PageRequest.count_total
   * was set, its value is undefined otherwise
   * @format uint64
   */
  total?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title sao/sao/expired_shard.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryExpiredShardAll
   * @summary Queries a list of ExpiredShard items.
   * @request GET:/SaoNetwork/sao/sao/expired_shard
   */
  queryExpiredShardAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SaoQueryAllExpiredShardResponse, RpcStatus>({
      path: `/SaoNetwork/sao/sao/expired_shard`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryExpiredShard
   * @summary Queries a ExpiredShard by index.
   * @request GET:/SaoNetwork/sao/sao/expired_shard/{height}
   */
  queryExpiredShard = (height: string, params: RequestParams = {}) =>
    this.request<SaoQueryGetExpiredShardResponse, RpcStatus>({
      path: `/SaoNetwork/sao/sao/expired_shard/${height}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryLatesthight
   * @summary Queries a list of Latesthight items.
   * @request GET:/SaoNetwork/sao/sao/latesthight
   */
  queryLatesthight = (params: RequestParams = {}) =>
    this.request<SaoQueryLatesthightResponse, RpcStatus>({
      path: `/SaoNetwork/sao/sao/latesthight`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryMetadata
   * @summary Queries a list of Metadata items.
   * @request GET:/SaoNetwork/sao/sao/metadata
   */
  queryMetadata = (
    query?: {
      "proposal.owner"?: string;
      "proposal.keyword"?: string;
      "proposal.groupId"?: string;
      "proposal.keywordType"?: number;
      "proposal.lastValidHeight"?: string;
      "proposal.gateway"?: string;
      "proposal.commitId"?: string;
      "proposal.version"?: string;
      "proposal.dataOwner"?: string;
      "jws_signature.protected"?: string;
      "jws_signature.signature"?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SaoQueryMetadataResponse, RpcStatus>({
      path: `/SaoNetwork/sao/sao/metadata`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryNetVersion
   * @summary Queries a list of NetVersion items.
   * @request GET:/SaoNetwork/sao/sao/net_version
   */
  queryNetVersion = (params: RequestParams = {}) =>
    this.request<SaoQueryNetVersionResponse, RpcStatus>({
      path: `/SaoNetwork/sao/sao/net_version`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @summary Parameters queries the parameters of the module.
   * @request GET:/SaoNetwork/sao/sao/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<SaoQueryParamsResponse, RpcStatus>({
      path: `/SaoNetwork/sao/sao/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTimeoutOrderAll
   * @summary Queries a list of TimeoutOrder items.
   * @request GET:/SaoNetwork/sao/sao/timeout_order
   */
  queryTimeoutOrderAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SaoQueryAllTimeoutOrderResponse, RpcStatus>({
      path: `/SaoNetwork/sao/sao/timeout_order`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTimeoutOrder
   * @summary Queries a TimeoutOrder by index.
   * @request GET:/SaoNetwork/sao/sao/timeout_order/{height}
   */
  queryTimeoutOrder = (height: string, params: RequestParams = {}) =>
    this.request<SaoQueryGetTimeoutOrderResponse, RpcStatus>({
      path: `/SaoNetwork/sao/sao/timeout_order/${height}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
