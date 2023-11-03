/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { AccountAuth } from "./account_auth";
import { AccountId } from "./account_id";
import { AccountList } from "./account_list";
import { Did } from "./did";
import { DidBalances } from "./did_balances";
import { Kid } from "./kid";
import { Params } from "./params";
import { PastSeeds } from "./past_seeds";
import { PaymentAddress } from "./payment_address";
import { SidDocument } from "./sid_document";
import { SidDocumentVersion } from "./sid_document_version";

export const protobufPackage = "saonetwork.sao.did";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetAccountListRequest {
  did: string;
}

export interface QueryGetAccountListResponse {
  accountList: AccountList | undefined;
}

export interface QueryAllAccountListRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllAccountListResponse {
  accountList: AccountList[];
  pagination: PageResponse | undefined;
}

export interface QueryGetAccountAuthRequest {
  accountDid: string;
}

export interface QueryGetAccountAuthResponse {
  accountAuth: AccountAuth | undefined;
}

export interface QueryAllAccountAuthRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllAccountAuthResponse {
  accountAuth: AccountAuth[];
  pagination: PageResponse | undefined;
}

export interface QueryGetAllAccountAuthsRequest {
  did: string;
}

export interface QueryGetAllAccountAuthsResponse {
  accountAuths: AccountAuth[];
}

export interface QueryGetSidDocumentRequest {
  versionId: string;
}

export interface QueryGetSidDocumentResponse {
  sidDocument: SidDocument | undefined;
}

export interface QueryAllSidDocumentRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllSidDocumentResponse {
  sidDocument: SidDocument[];
  pagination: PageResponse | undefined;
}

export interface QueryGetSidDocumentVersionRequest {
  docId: string;
}

export interface QueryGetSidDocumentVersionResponse {
  sidDocumentVersion: SidDocumentVersion | undefined;
}

export interface QueryAllSidDocumentVersionRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllSidDocumentVersionResponse {
  sidDocumentVersion: SidDocumentVersion[];
  pagination: PageResponse | undefined;
}

export interface QueryGetPastSeedsRequest {
  did: string;
}

export interface QueryGetPastSeedsResponse {
  pastSeeds: PastSeeds | undefined;
}

export interface QueryAllPastSeedsRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllPastSeedsResponse {
  pastSeeds: PastSeeds[];
  pagination: PageResponse | undefined;
}

export interface QueryGetPaymentAddressRequest {
  did: string;
}

export interface QueryGetPaymentAddressResponse {
  paymentAddress: PaymentAddress | undefined;
}

export interface QueryAllPaymentAddressRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllPaymentAddressResponse {
  paymentAddress: PaymentAddress[];
  pagination: PageResponse | undefined;
}

export interface QueryValidateDidRequest {
  did: string;
}

export interface QueryValidateDidResponse {
}

export interface QueryGetAccountIdRequest {
  accountDid: string;
}

export interface QueryGetAccountIdResponse {
  accountId: AccountId | undefined;
}

export interface QueryAllAccountIdRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllAccountIdResponse {
  accountId: AccountId[];
  pagination: PageResponse | undefined;
}

export interface QueryGetDidRequest {
  accountId: string;
}

export interface QueryGetDidResponse {
  did: Did | undefined;
}

export interface QueryAllDidRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllDidResponse {
  did: Did[];
  pagination: PageResponse | undefined;
}

export interface QueryGetKidRequest {
  address: string;
}

export interface QueryGetKidResponse {
  kid: Kid | undefined;
}

export interface QueryAllKidRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllKidResponse {
  kid: Kid[];
  pagination: PageResponse | undefined;
}

export interface QueryGetDidBalancesRequest {
  did: string;
}

export interface QueryGetDidBalancesResponse {
  didBalances: DidBalances | undefined;
}

export interface QueryAllDidBalancesRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllDidBalancesResponse {
  didBalances: DidBalances[];
  pagination: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetAccountListRequest(): QueryGetAccountListRequest {
  return { did: "" };
}

export const QueryGetAccountListRequest = {
  encode(message: QueryGetAccountListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAccountListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAccountListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAccountListRequest {
    return { did: isSet(object.did) ? String(object.did) : "" };
  },

  toJSON(message: QueryGetAccountListRequest): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAccountListRequest>, I>>(object: I): QueryGetAccountListRequest {
    const message = createBaseQueryGetAccountListRequest();
    message.did = object.did ?? "";
    return message;
  },
};

function createBaseQueryGetAccountListResponse(): QueryGetAccountListResponse {
  return { accountList: undefined };
}

export const QueryGetAccountListResponse = {
  encode(message: QueryGetAccountListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountList !== undefined) {
      AccountList.encode(message.accountList, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAccountListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAccountListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountList = AccountList.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAccountListResponse {
    return { accountList: isSet(object.accountList) ? AccountList.fromJSON(object.accountList) : undefined };
  },

  toJSON(message: QueryGetAccountListResponse): unknown {
    const obj: any = {};
    message.accountList !== undefined
      && (obj.accountList = message.accountList ? AccountList.toJSON(message.accountList) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAccountListResponse>, I>>(object: I): QueryGetAccountListResponse {
    const message = createBaseQueryGetAccountListResponse();
    message.accountList = (object.accountList !== undefined && object.accountList !== null)
      ? AccountList.fromPartial(object.accountList)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAccountListRequest(): QueryAllAccountListRequest {
  return { pagination: undefined };
}

export const QueryAllAccountListRequest = {
  encode(message: QueryAllAccountListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAccountListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAccountListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAccountListRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllAccountListRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAccountListRequest>, I>>(object: I): QueryAllAccountListRequest {
    const message = createBaseQueryAllAccountListRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAccountListResponse(): QueryAllAccountListResponse {
  return { accountList: [], pagination: undefined };
}

export const QueryAllAccountListResponse = {
  encode(message: QueryAllAccountListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.accountList) {
      AccountList.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAccountListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAccountListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountList.push(AccountList.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAccountListResponse {
    return {
      accountList: Array.isArray(object?.accountList)
        ? object.accountList.map((e: any) => AccountList.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllAccountListResponse): unknown {
    const obj: any = {};
    if (message.accountList) {
      obj.accountList = message.accountList.map((e) => e ? AccountList.toJSON(e) : undefined);
    } else {
      obj.accountList = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAccountListResponse>, I>>(object: I): QueryAllAccountListResponse {
    const message = createBaseQueryAllAccountListResponse();
    message.accountList = object.accountList?.map((e) => AccountList.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetAccountAuthRequest(): QueryGetAccountAuthRequest {
  return { accountDid: "" };
}

export const QueryGetAccountAuthRequest = {
  encode(message: QueryGetAccountAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountDid !== "") {
      writer.uint32(10).string(message.accountDid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAccountAuthRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAccountAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountDid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAccountAuthRequest {
    return { accountDid: isSet(object.accountDid) ? String(object.accountDid) : "" };
  },

  toJSON(message: QueryGetAccountAuthRequest): unknown {
    const obj: any = {};
    message.accountDid !== undefined && (obj.accountDid = message.accountDid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAccountAuthRequest>, I>>(object: I): QueryGetAccountAuthRequest {
    const message = createBaseQueryGetAccountAuthRequest();
    message.accountDid = object.accountDid ?? "";
    return message;
  },
};

function createBaseQueryGetAccountAuthResponse(): QueryGetAccountAuthResponse {
  return { accountAuth: undefined };
}

export const QueryGetAccountAuthResponse = {
  encode(message: QueryGetAccountAuthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountAuth !== undefined) {
      AccountAuth.encode(message.accountAuth, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAccountAuthResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAccountAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAuth = AccountAuth.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAccountAuthResponse {
    return { accountAuth: isSet(object.accountAuth) ? AccountAuth.fromJSON(object.accountAuth) : undefined };
  },

  toJSON(message: QueryGetAccountAuthResponse): unknown {
    const obj: any = {};
    message.accountAuth !== undefined
      && (obj.accountAuth = message.accountAuth ? AccountAuth.toJSON(message.accountAuth) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAccountAuthResponse>, I>>(object: I): QueryGetAccountAuthResponse {
    const message = createBaseQueryGetAccountAuthResponse();
    message.accountAuth = (object.accountAuth !== undefined && object.accountAuth !== null)
      ? AccountAuth.fromPartial(object.accountAuth)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAccountAuthRequest(): QueryAllAccountAuthRequest {
  return { pagination: undefined };
}

export const QueryAllAccountAuthRequest = {
  encode(message: QueryAllAccountAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAccountAuthRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAccountAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAccountAuthRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllAccountAuthRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAccountAuthRequest>, I>>(object: I): QueryAllAccountAuthRequest {
    const message = createBaseQueryAllAccountAuthRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAccountAuthResponse(): QueryAllAccountAuthResponse {
  return { accountAuth: [], pagination: undefined };
}

export const QueryAllAccountAuthResponse = {
  encode(message: QueryAllAccountAuthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.accountAuth) {
      AccountAuth.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAccountAuthResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAccountAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAuth.push(AccountAuth.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAccountAuthResponse {
    return {
      accountAuth: Array.isArray(object?.accountAuth)
        ? object.accountAuth.map((e: any) => AccountAuth.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllAccountAuthResponse): unknown {
    const obj: any = {};
    if (message.accountAuth) {
      obj.accountAuth = message.accountAuth.map((e) => e ? AccountAuth.toJSON(e) : undefined);
    } else {
      obj.accountAuth = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAccountAuthResponse>, I>>(object: I): QueryAllAccountAuthResponse {
    const message = createBaseQueryAllAccountAuthResponse();
    message.accountAuth = object.accountAuth?.map((e) => AccountAuth.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetAllAccountAuthsRequest(): QueryGetAllAccountAuthsRequest {
  return { did: "" };
}

export const QueryGetAllAccountAuthsRequest = {
  encode(message: QueryGetAllAccountAuthsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAllAccountAuthsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllAccountAuthsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllAccountAuthsRequest {
    return { did: isSet(object.did) ? String(object.did) : "" };
  },

  toJSON(message: QueryGetAllAccountAuthsRequest): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAllAccountAuthsRequest>, I>>(
    object: I,
  ): QueryGetAllAccountAuthsRequest {
    const message = createBaseQueryGetAllAccountAuthsRequest();
    message.did = object.did ?? "";
    return message;
  },
};

function createBaseQueryGetAllAccountAuthsResponse(): QueryGetAllAccountAuthsResponse {
  return { accountAuths: [] };
}

export const QueryGetAllAccountAuthsResponse = {
  encode(message: QueryGetAllAccountAuthsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.accountAuths) {
      AccountAuth.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAllAccountAuthsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllAccountAuthsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAuths.push(AccountAuth.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllAccountAuthsResponse {
    return {
      accountAuths: Array.isArray(object?.accountAuths)
        ? object.accountAuths.map((e: any) => AccountAuth.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetAllAccountAuthsResponse): unknown {
    const obj: any = {};
    if (message.accountAuths) {
      obj.accountAuths = message.accountAuths.map((e) => e ? AccountAuth.toJSON(e) : undefined);
    } else {
      obj.accountAuths = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAllAccountAuthsResponse>, I>>(
    object: I,
  ): QueryGetAllAccountAuthsResponse {
    const message = createBaseQueryGetAllAccountAuthsResponse();
    message.accountAuths = object.accountAuths?.map((e) => AccountAuth.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryGetSidDocumentRequest(): QueryGetSidDocumentRequest {
  return { versionId: "" };
}

export const QueryGetSidDocumentRequest = {
  encode(message: QueryGetSidDocumentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.versionId !== "") {
      writer.uint32(10).string(message.versionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSidDocumentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSidDocumentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.versionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSidDocumentRequest {
    return { versionId: isSet(object.versionId) ? String(object.versionId) : "" };
  },

  toJSON(message: QueryGetSidDocumentRequest): unknown {
    const obj: any = {};
    message.versionId !== undefined && (obj.versionId = message.versionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSidDocumentRequest>, I>>(object: I): QueryGetSidDocumentRequest {
    const message = createBaseQueryGetSidDocumentRequest();
    message.versionId = object.versionId ?? "";
    return message;
  },
};

function createBaseQueryGetSidDocumentResponse(): QueryGetSidDocumentResponse {
  return { sidDocument: undefined };
}

export const QueryGetSidDocumentResponse = {
  encode(message: QueryGetSidDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sidDocument !== undefined) {
      SidDocument.encode(message.sidDocument, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSidDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSidDocumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sidDocument = SidDocument.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSidDocumentResponse {
    return { sidDocument: isSet(object.sidDocument) ? SidDocument.fromJSON(object.sidDocument) : undefined };
  },

  toJSON(message: QueryGetSidDocumentResponse): unknown {
    const obj: any = {};
    message.sidDocument !== undefined
      && (obj.sidDocument = message.sidDocument ? SidDocument.toJSON(message.sidDocument) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSidDocumentResponse>, I>>(object: I): QueryGetSidDocumentResponse {
    const message = createBaseQueryGetSidDocumentResponse();
    message.sidDocument = (object.sidDocument !== undefined && object.sidDocument !== null)
      ? SidDocument.fromPartial(object.sidDocument)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSidDocumentRequest(): QueryAllSidDocumentRequest {
  return { pagination: undefined };
}

export const QueryAllSidDocumentRequest = {
  encode(message: QueryAllSidDocumentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSidDocumentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSidDocumentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSidDocumentRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllSidDocumentRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSidDocumentRequest>, I>>(object: I): QueryAllSidDocumentRequest {
    const message = createBaseQueryAllSidDocumentRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSidDocumentResponse(): QueryAllSidDocumentResponse {
  return { sidDocument: [], pagination: undefined };
}

export const QueryAllSidDocumentResponse = {
  encode(message: QueryAllSidDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sidDocument) {
      SidDocument.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSidDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSidDocumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sidDocument.push(SidDocument.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSidDocumentResponse {
    return {
      sidDocument: Array.isArray(object?.sidDocument)
        ? object.sidDocument.map((e: any) => SidDocument.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllSidDocumentResponse): unknown {
    const obj: any = {};
    if (message.sidDocument) {
      obj.sidDocument = message.sidDocument.map((e) => e ? SidDocument.toJSON(e) : undefined);
    } else {
      obj.sidDocument = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSidDocumentResponse>, I>>(object: I): QueryAllSidDocumentResponse {
    const message = createBaseQueryAllSidDocumentResponse();
    message.sidDocument = object.sidDocument?.map((e) => SidDocument.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetSidDocumentVersionRequest(): QueryGetSidDocumentVersionRequest {
  return { docId: "" };
}

export const QueryGetSidDocumentVersionRequest = {
  encode(message: QueryGetSidDocumentVersionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.docId !== "") {
      writer.uint32(10).string(message.docId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSidDocumentVersionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSidDocumentVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.docId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSidDocumentVersionRequest {
    return { docId: isSet(object.docId) ? String(object.docId) : "" };
  },

  toJSON(message: QueryGetSidDocumentVersionRequest): unknown {
    const obj: any = {};
    message.docId !== undefined && (obj.docId = message.docId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSidDocumentVersionRequest>, I>>(
    object: I,
  ): QueryGetSidDocumentVersionRequest {
    const message = createBaseQueryGetSidDocumentVersionRequest();
    message.docId = object.docId ?? "";
    return message;
  },
};

function createBaseQueryGetSidDocumentVersionResponse(): QueryGetSidDocumentVersionResponse {
  return { sidDocumentVersion: undefined };
}

export const QueryGetSidDocumentVersionResponse = {
  encode(message: QueryGetSidDocumentVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sidDocumentVersion !== undefined) {
      SidDocumentVersion.encode(message.sidDocumentVersion, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSidDocumentVersionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSidDocumentVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sidDocumentVersion = SidDocumentVersion.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSidDocumentVersionResponse {
    return {
      sidDocumentVersion: isSet(object.sidDocumentVersion)
        ? SidDocumentVersion.fromJSON(object.sidDocumentVersion)
        : undefined,
    };
  },

  toJSON(message: QueryGetSidDocumentVersionResponse): unknown {
    const obj: any = {};
    message.sidDocumentVersion !== undefined && (obj.sidDocumentVersion = message.sidDocumentVersion
      ? SidDocumentVersion.toJSON(message.sidDocumentVersion)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSidDocumentVersionResponse>, I>>(
    object: I,
  ): QueryGetSidDocumentVersionResponse {
    const message = createBaseQueryGetSidDocumentVersionResponse();
    message.sidDocumentVersion = (object.sidDocumentVersion !== undefined && object.sidDocumentVersion !== null)
      ? SidDocumentVersion.fromPartial(object.sidDocumentVersion)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSidDocumentVersionRequest(): QueryAllSidDocumentVersionRequest {
  return { pagination: undefined };
}

export const QueryAllSidDocumentVersionRequest = {
  encode(message: QueryAllSidDocumentVersionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSidDocumentVersionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSidDocumentVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSidDocumentVersionRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllSidDocumentVersionRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSidDocumentVersionRequest>, I>>(
    object: I,
  ): QueryAllSidDocumentVersionRequest {
    const message = createBaseQueryAllSidDocumentVersionRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSidDocumentVersionResponse(): QueryAllSidDocumentVersionResponse {
  return { sidDocumentVersion: [], pagination: undefined };
}

export const QueryAllSidDocumentVersionResponse = {
  encode(message: QueryAllSidDocumentVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sidDocumentVersion) {
      SidDocumentVersion.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSidDocumentVersionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSidDocumentVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sidDocumentVersion.push(SidDocumentVersion.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSidDocumentVersionResponse {
    return {
      sidDocumentVersion: Array.isArray(object?.sidDocumentVersion)
        ? object.sidDocumentVersion.map((e: any) => SidDocumentVersion.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllSidDocumentVersionResponse): unknown {
    const obj: any = {};
    if (message.sidDocumentVersion) {
      obj.sidDocumentVersion = message.sidDocumentVersion.map((e) => e ? SidDocumentVersion.toJSON(e) : undefined);
    } else {
      obj.sidDocumentVersion = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSidDocumentVersionResponse>, I>>(
    object: I,
  ): QueryAllSidDocumentVersionResponse {
    const message = createBaseQueryAllSidDocumentVersionResponse();
    message.sidDocumentVersion = object.sidDocumentVersion?.map((e) => SidDocumentVersion.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPastSeedsRequest(): QueryGetPastSeedsRequest {
  return { did: "" };
}

export const QueryGetPastSeedsRequest = {
  encode(message: QueryGetPastSeedsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPastSeedsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPastSeedsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPastSeedsRequest {
    return { did: isSet(object.did) ? String(object.did) : "" };
  },

  toJSON(message: QueryGetPastSeedsRequest): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPastSeedsRequest>, I>>(object: I): QueryGetPastSeedsRequest {
    const message = createBaseQueryGetPastSeedsRequest();
    message.did = object.did ?? "";
    return message;
  },
};

function createBaseQueryGetPastSeedsResponse(): QueryGetPastSeedsResponse {
  return { pastSeeds: undefined };
}

export const QueryGetPastSeedsResponse = {
  encode(message: QueryGetPastSeedsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pastSeeds !== undefined) {
      PastSeeds.encode(message.pastSeeds, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPastSeedsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPastSeedsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pastSeeds = PastSeeds.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPastSeedsResponse {
    return { pastSeeds: isSet(object.pastSeeds) ? PastSeeds.fromJSON(object.pastSeeds) : undefined };
  },

  toJSON(message: QueryGetPastSeedsResponse): unknown {
    const obj: any = {};
    message.pastSeeds !== undefined
      && (obj.pastSeeds = message.pastSeeds ? PastSeeds.toJSON(message.pastSeeds) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPastSeedsResponse>, I>>(object: I): QueryGetPastSeedsResponse {
    const message = createBaseQueryGetPastSeedsResponse();
    message.pastSeeds = (object.pastSeeds !== undefined && object.pastSeeds !== null)
      ? PastSeeds.fromPartial(object.pastSeeds)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPastSeedsRequest(): QueryAllPastSeedsRequest {
  return { pagination: undefined };
}

export const QueryAllPastSeedsRequest = {
  encode(message: QueryAllPastSeedsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPastSeedsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPastSeedsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPastSeedsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllPastSeedsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPastSeedsRequest>, I>>(object: I): QueryAllPastSeedsRequest {
    const message = createBaseQueryAllPastSeedsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPastSeedsResponse(): QueryAllPastSeedsResponse {
  return { pastSeeds: [], pagination: undefined };
}

export const QueryAllPastSeedsResponse = {
  encode(message: QueryAllPastSeedsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pastSeeds) {
      PastSeeds.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPastSeedsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPastSeedsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pastSeeds.push(PastSeeds.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPastSeedsResponse {
    return {
      pastSeeds: Array.isArray(object?.pastSeeds) ? object.pastSeeds.map((e: any) => PastSeeds.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPastSeedsResponse): unknown {
    const obj: any = {};
    if (message.pastSeeds) {
      obj.pastSeeds = message.pastSeeds.map((e) => e ? PastSeeds.toJSON(e) : undefined);
    } else {
      obj.pastSeeds = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPastSeedsResponse>, I>>(object: I): QueryAllPastSeedsResponse {
    const message = createBaseQueryAllPastSeedsResponse();
    message.pastSeeds = object.pastSeeds?.map((e) => PastSeeds.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPaymentAddressRequest(): QueryGetPaymentAddressRequest {
  return { did: "" };
}

export const QueryGetPaymentAddressRequest = {
  encode(message: QueryGetPaymentAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPaymentAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPaymentAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPaymentAddressRequest {
    return { did: isSet(object.did) ? String(object.did) : "" };
  },

  toJSON(message: QueryGetPaymentAddressRequest): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPaymentAddressRequest>, I>>(
    object: I,
  ): QueryGetPaymentAddressRequest {
    const message = createBaseQueryGetPaymentAddressRequest();
    message.did = object.did ?? "";
    return message;
  },
};

function createBaseQueryGetPaymentAddressResponse(): QueryGetPaymentAddressResponse {
  return { paymentAddress: undefined };
}

export const QueryGetPaymentAddressResponse = {
  encode(message: QueryGetPaymentAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.paymentAddress !== undefined) {
      PaymentAddress.encode(message.paymentAddress, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPaymentAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPaymentAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentAddress = PaymentAddress.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPaymentAddressResponse {
    return {
      paymentAddress: isSet(object.paymentAddress) ? PaymentAddress.fromJSON(object.paymentAddress) : undefined,
    };
  },

  toJSON(message: QueryGetPaymentAddressResponse): unknown {
    const obj: any = {};
    message.paymentAddress !== undefined
      && (obj.paymentAddress = message.paymentAddress ? PaymentAddress.toJSON(message.paymentAddress) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPaymentAddressResponse>, I>>(
    object: I,
  ): QueryGetPaymentAddressResponse {
    const message = createBaseQueryGetPaymentAddressResponse();
    message.paymentAddress = (object.paymentAddress !== undefined && object.paymentAddress !== null)
      ? PaymentAddress.fromPartial(object.paymentAddress)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPaymentAddressRequest(): QueryAllPaymentAddressRequest {
  return { pagination: undefined };
}

export const QueryAllPaymentAddressRequest = {
  encode(message: QueryAllPaymentAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPaymentAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPaymentAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPaymentAddressRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllPaymentAddressRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPaymentAddressRequest>, I>>(
    object: I,
  ): QueryAllPaymentAddressRequest {
    const message = createBaseQueryAllPaymentAddressRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPaymentAddressResponse(): QueryAllPaymentAddressResponse {
  return { paymentAddress: [], pagination: undefined };
}

export const QueryAllPaymentAddressResponse = {
  encode(message: QueryAllPaymentAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.paymentAddress) {
      PaymentAddress.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPaymentAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPaymentAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentAddress.push(PaymentAddress.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPaymentAddressResponse {
    return {
      paymentAddress: Array.isArray(object?.paymentAddress)
        ? object.paymentAddress.map((e: any) => PaymentAddress.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPaymentAddressResponse): unknown {
    const obj: any = {};
    if (message.paymentAddress) {
      obj.paymentAddress = message.paymentAddress.map((e) => e ? PaymentAddress.toJSON(e) : undefined);
    } else {
      obj.paymentAddress = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPaymentAddressResponse>, I>>(
    object: I,
  ): QueryAllPaymentAddressResponse {
    const message = createBaseQueryAllPaymentAddressResponse();
    message.paymentAddress = object.paymentAddress?.map((e) => PaymentAddress.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryValidateDidRequest(): QueryValidateDidRequest {
  return { did: "" };
}

export const QueryValidateDidRequest = {
  encode(message: QueryValidateDidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidateDidRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidateDidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidateDidRequest {
    return { did: isSet(object.did) ? String(object.did) : "" };
  },

  toJSON(message: QueryValidateDidRequest): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidateDidRequest>, I>>(object: I): QueryValidateDidRequest {
    const message = createBaseQueryValidateDidRequest();
    message.did = object.did ?? "";
    return message;
  },
};

function createBaseQueryValidateDidResponse(): QueryValidateDidResponse {
  return {};
}

export const QueryValidateDidResponse = {
  encode(_: QueryValidateDidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidateDidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidateDidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryValidateDidResponse {
    return {};
  },

  toJSON(_: QueryValidateDidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidateDidResponse>, I>>(_: I): QueryValidateDidResponse {
    const message = createBaseQueryValidateDidResponse();
    return message;
  },
};

function createBaseQueryGetAccountIdRequest(): QueryGetAccountIdRequest {
  return { accountDid: "" };
}

export const QueryGetAccountIdRequest = {
  encode(message: QueryGetAccountIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountDid !== "") {
      writer.uint32(10).string(message.accountDid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAccountIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAccountIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountDid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAccountIdRequest {
    return { accountDid: isSet(object.accountDid) ? String(object.accountDid) : "" };
  },

  toJSON(message: QueryGetAccountIdRequest): unknown {
    const obj: any = {};
    message.accountDid !== undefined && (obj.accountDid = message.accountDid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAccountIdRequest>, I>>(object: I): QueryGetAccountIdRequest {
    const message = createBaseQueryGetAccountIdRequest();
    message.accountDid = object.accountDid ?? "";
    return message;
  },
};

function createBaseQueryGetAccountIdResponse(): QueryGetAccountIdResponse {
  return { accountId: undefined };
}

export const QueryGetAccountIdResponse = {
  encode(message: QueryGetAccountIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountId !== undefined) {
      AccountId.encode(message.accountId, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAccountIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAccountIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountId = AccountId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAccountIdResponse {
    return { accountId: isSet(object.accountId) ? AccountId.fromJSON(object.accountId) : undefined };
  },

  toJSON(message: QueryGetAccountIdResponse): unknown {
    const obj: any = {};
    message.accountId !== undefined
      && (obj.accountId = message.accountId ? AccountId.toJSON(message.accountId) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAccountIdResponse>, I>>(object: I): QueryGetAccountIdResponse {
    const message = createBaseQueryGetAccountIdResponse();
    message.accountId = (object.accountId !== undefined && object.accountId !== null)
      ? AccountId.fromPartial(object.accountId)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAccountIdRequest(): QueryAllAccountIdRequest {
  return { pagination: undefined };
}

export const QueryAllAccountIdRequest = {
  encode(message: QueryAllAccountIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAccountIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAccountIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAccountIdRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllAccountIdRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAccountIdRequest>, I>>(object: I): QueryAllAccountIdRequest {
    const message = createBaseQueryAllAccountIdRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAccountIdResponse(): QueryAllAccountIdResponse {
  return { accountId: [], pagination: undefined };
}

export const QueryAllAccountIdResponse = {
  encode(message: QueryAllAccountIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.accountId) {
      AccountId.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAccountIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAccountIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountId.push(AccountId.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAccountIdResponse {
    return {
      accountId: Array.isArray(object?.accountId) ? object.accountId.map((e: any) => AccountId.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllAccountIdResponse): unknown {
    const obj: any = {};
    if (message.accountId) {
      obj.accountId = message.accountId.map((e) => e ? AccountId.toJSON(e) : undefined);
    } else {
      obj.accountId = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAccountIdResponse>, I>>(object: I): QueryAllAccountIdResponse {
    const message = createBaseQueryAllAccountIdResponse();
    message.accountId = object.accountId?.map((e) => AccountId.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetDidRequest(): QueryGetDidRequest {
  return { accountId: "" };
}

export const QueryGetDidRequest = {
  encode(message: QueryGetDidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountId !== "") {
      writer.uint32(10).string(message.accountId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDidRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDidRequest {
    return { accountId: isSet(object.accountId) ? String(object.accountId) : "" };
  },

  toJSON(message: QueryGetDidRequest): unknown {
    const obj: any = {};
    message.accountId !== undefined && (obj.accountId = message.accountId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDidRequest>, I>>(object: I): QueryGetDidRequest {
    const message = createBaseQueryGetDidRequest();
    message.accountId = object.accountId ?? "";
    return message;
  },
};

function createBaseQueryGetDidResponse(): QueryGetDidResponse {
  return { did: undefined };
}

export const QueryGetDidResponse = {
  encode(message: QueryGetDidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== undefined) {
      Did.encode(message.did, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = Did.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDidResponse {
    return { did: isSet(object.did) ? Did.fromJSON(object.did) : undefined };
  },

  toJSON(message: QueryGetDidResponse): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did ? Did.toJSON(message.did) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDidResponse>, I>>(object: I): QueryGetDidResponse {
    const message = createBaseQueryGetDidResponse();
    message.did = (object.did !== undefined && object.did !== null) ? Did.fromPartial(object.did) : undefined;
    return message;
  },
};

function createBaseQueryAllDidRequest(): QueryAllDidRequest {
  return { pagination: undefined };
}

export const QueryAllDidRequest = {
  encode(message: QueryAllDidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDidRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDidRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllDidRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDidRequest>, I>>(object: I): QueryAllDidRequest {
    const message = createBaseQueryAllDidRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDidResponse(): QueryAllDidResponse {
  return { did: [], pagination: undefined };
}

export const QueryAllDidResponse = {
  encode(message: QueryAllDidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.did) {
      Did.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did.push(Did.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDidResponse {
    return {
      did: Array.isArray(object?.did) ? object.did.map((e: any) => Did.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDidResponse): unknown {
    const obj: any = {};
    if (message.did) {
      obj.did = message.did.map((e) => e ? Did.toJSON(e) : undefined);
    } else {
      obj.did = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDidResponse>, I>>(object: I): QueryAllDidResponse {
    const message = createBaseQueryAllDidResponse();
    message.did = object.did?.map((e) => Did.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetKidRequest(): QueryGetKidRequest {
  return { address: "" };
}

export const QueryGetKidRequest = {
  encode(message: QueryGetKidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetKidRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetKidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetKidRequest {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: QueryGetKidRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetKidRequest>, I>>(object: I): QueryGetKidRequest {
    const message = createBaseQueryGetKidRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryGetKidResponse(): QueryGetKidResponse {
  return { kid: undefined };
}

export const QueryGetKidResponse = {
  encode(message: QueryGetKidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kid !== undefined) {
      Kid.encode(message.kid, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetKidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetKidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kid = Kid.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetKidResponse {
    return { kid: isSet(object.kid) ? Kid.fromJSON(object.kid) : undefined };
  },

  toJSON(message: QueryGetKidResponse): unknown {
    const obj: any = {};
    message.kid !== undefined && (obj.kid = message.kid ? Kid.toJSON(message.kid) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetKidResponse>, I>>(object: I): QueryGetKidResponse {
    const message = createBaseQueryGetKidResponse();
    message.kid = (object.kid !== undefined && object.kid !== null) ? Kid.fromPartial(object.kid) : undefined;
    return message;
  },
};

function createBaseQueryAllKidRequest(): QueryAllKidRequest {
  return { pagination: undefined };
}

export const QueryAllKidRequest = {
  encode(message: QueryAllKidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllKidRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllKidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllKidRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllKidRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllKidRequest>, I>>(object: I): QueryAllKidRequest {
    const message = createBaseQueryAllKidRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllKidResponse(): QueryAllKidResponse {
  return { kid: [], pagination: undefined };
}

export const QueryAllKidResponse = {
  encode(message: QueryAllKidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.kid) {
      Kid.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllKidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllKidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kid.push(Kid.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllKidResponse {
    return {
      kid: Array.isArray(object?.kid) ? object.kid.map((e: any) => Kid.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllKidResponse): unknown {
    const obj: any = {};
    if (message.kid) {
      obj.kid = message.kid.map((e) => e ? Kid.toJSON(e) : undefined);
    } else {
      obj.kid = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllKidResponse>, I>>(object: I): QueryAllKidResponse {
    const message = createBaseQueryAllKidResponse();
    message.kid = object.kid?.map((e) => Kid.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetDidBalancesRequest(): QueryGetDidBalancesRequest {
  return { did: "" };
}

export const QueryGetDidBalancesRequest = {
  encode(message: QueryGetDidBalancesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDidBalancesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDidBalancesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDidBalancesRequest {
    return { did: isSet(object.did) ? String(object.did) : "" };
  },

  toJSON(message: QueryGetDidBalancesRequest): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDidBalancesRequest>, I>>(object: I): QueryGetDidBalancesRequest {
    const message = createBaseQueryGetDidBalancesRequest();
    message.did = object.did ?? "";
    return message;
  },
};

function createBaseQueryGetDidBalancesResponse(): QueryGetDidBalancesResponse {
  return { didBalances: undefined };
}

export const QueryGetDidBalancesResponse = {
  encode(message: QueryGetDidBalancesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.didBalances !== undefined) {
      DidBalances.encode(message.didBalances, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDidBalancesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDidBalancesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.didBalances = DidBalances.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDidBalancesResponse {
    return { didBalances: isSet(object.didBalances) ? DidBalances.fromJSON(object.didBalances) : undefined };
  },

  toJSON(message: QueryGetDidBalancesResponse): unknown {
    const obj: any = {};
    message.didBalances !== undefined
      && (obj.didBalances = message.didBalances ? DidBalances.toJSON(message.didBalances) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDidBalancesResponse>, I>>(object: I): QueryGetDidBalancesResponse {
    const message = createBaseQueryGetDidBalancesResponse();
    message.didBalances = (object.didBalances !== undefined && object.didBalances !== null)
      ? DidBalances.fromPartial(object.didBalances)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDidBalancesRequest(): QueryAllDidBalancesRequest {
  return { pagination: undefined };
}

export const QueryAllDidBalancesRequest = {
  encode(message: QueryAllDidBalancesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDidBalancesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDidBalancesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDidBalancesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllDidBalancesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDidBalancesRequest>, I>>(object: I): QueryAllDidBalancesRequest {
    const message = createBaseQueryAllDidBalancesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDidBalancesResponse(): QueryAllDidBalancesResponse {
  return { didBalances: [], pagination: undefined };
}

export const QueryAllDidBalancesResponse = {
  encode(message: QueryAllDidBalancesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.didBalances) {
      DidBalances.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDidBalancesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDidBalancesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.didBalances.push(DidBalances.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDidBalancesResponse {
    return {
      didBalances: Array.isArray(object?.didBalances)
        ? object.didBalances.map((e: any) => DidBalances.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDidBalancesResponse): unknown {
    const obj: any = {};
    if (message.didBalances) {
      obj.didBalances = message.didBalances.map((e) => e ? DidBalances.toJSON(e) : undefined);
    } else {
      obj.didBalances = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDidBalancesResponse>, I>>(object: I): QueryAllDidBalancesResponse {
    const message = createBaseQueryAllDidBalancesResponse();
    message.didBalances = object.didBalances?.map((e) => DidBalances.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a AccountList by index. */
  AccountList(request: QueryGetAccountListRequest): Promise<QueryGetAccountListResponse>;
  /** Queries a list of AccountList items. */
  AccountListAll(request: QueryAllAccountListRequest): Promise<QueryAllAccountListResponse>;
  /** Queries a AccountAuth by index. */
  AccountAuth(request: QueryGetAccountAuthRequest): Promise<QueryGetAccountAuthResponse>;
  /** Queries a list of AccountAuth items. */
  AccountAuthAll(request: QueryAllAccountAuthRequest): Promise<QueryAllAccountAuthResponse>;
  /** Queries a list of GetAllAccountAuth items. */
  GetAllAccountAuths(request: QueryGetAllAccountAuthsRequest): Promise<QueryGetAllAccountAuthsResponse>;
  /** Queries a SidDocument by index. */
  SidDocument(request: QueryGetSidDocumentRequest): Promise<QueryGetSidDocumentResponse>;
  /** Queries a list of SidDocument items. */
  SidDocumentAll(request: QueryAllSidDocumentRequest): Promise<QueryAllSidDocumentResponse>;
  /** Queries a SidDocumentVersion by index. */
  SidDocumentVersion(request: QueryGetSidDocumentVersionRequest): Promise<QueryGetSidDocumentVersionResponse>;
  /** Queries a list of SidDocumentVersion items. */
  SidDocumentVersionAll(request: QueryAllSidDocumentVersionRequest): Promise<QueryAllSidDocumentVersionResponse>;
  /** Queries a PastSeeds by index. */
  PastSeeds(request: QueryGetPastSeedsRequest): Promise<QueryGetPastSeedsResponse>;
  /** Queries a list of PastSeeds items. */
  PastSeedsAll(request: QueryAllPastSeedsRequest): Promise<QueryAllPastSeedsResponse>;
  /** Queries a PaymentAddress by index. */
  PaymentAddress(request: QueryGetPaymentAddressRequest): Promise<QueryGetPaymentAddressResponse>;
  /** Queries a list of PaymentAddress items. */
  PaymentAddressAll(request: QueryAllPaymentAddressRequest): Promise<QueryAllPaymentAddressResponse>;
  /** Queries a list of ValidateDid items. */
  ValidateDid(request: QueryValidateDidRequest): Promise<QueryValidateDidResponse>;
  /** Queries a AccountId by index. */
  AccountId(request: QueryGetAccountIdRequest): Promise<QueryGetAccountIdResponse>;
  /** Queries a list of AccountId items. */
  AccountIdAll(request: QueryAllAccountIdRequest): Promise<QueryAllAccountIdResponse>;
  /** Queries a Did by index. */
  Did(request: QueryGetDidRequest): Promise<QueryGetDidResponse>;
  /** Queries a list of Did items. */
  DidAll(request: QueryAllDidRequest): Promise<QueryAllDidResponse>;
  /** Queries a Kid by index. */
  Kid(request: QueryGetKidRequest): Promise<QueryGetKidResponse>;
  /** Queries a list of Kid items. */
  KidAll(request: QueryAllKidRequest): Promise<QueryAllKidResponse>;
  /** Queries a DidBalances by index. */
  DidBalances(request: QueryGetDidBalancesRequest): Promise<QueryGetDidBalancesResponse>;
  /** Queries a list of DidBalances items. */
  DidBalancesAll(request: QueryAllDidBalancesRequest): Promise<QueryAllDidBalancesResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.AccountList = this.AccountList.bind(this);
    this.AccountListAll = this.AccountListAll.bind(this);
    this.AccountAuth = this.AccountAuth.bind(this);
    this.AccountAuthAll = this.AccountAuthAll.bind(this);
    this.GetAllAccountAuths = this.GetAllAccountAuths.bind(this);
    this.SidDocument = this.SidDocument.bind(this);
    this.SidDocumentAll = this.SidDocumentAll.bind(this);
    this.SidDocumentVersion = this.SidDocumentVersion.bind(this);
    this.SidDocumentVersionAll = this.SidDocumentVersionAll.bind(this);
    this.PastSeeds = this.PastSeeds.bind(this);
    this.PastSeedsAll = this.PastSeedsAll.bind(this);
    this.PaymentAddress = this.PaymentAddress.bind(this);
    this.PaymentAddressAll = this.PaymentAddressAll.bind(this);
    this.ValidateDid = this.ValidateDid.bind(this);
    this.AccountId = this.AccountId.bind(this);
    this.AccountIdAll = this.AccountIdAll.bind(this);
    this.Did = this.Did.bind(this);
    this.DidAll = this.DidAll.bind(this);
    this.Kid = this.Kid.bind(this);
    this.KidAll = this.KidAll.bind(this);
    this.DidBalances = this.DidBalances.bind(this);
    this.DidBalancesAll = this.DidBalancesAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  AccountList(request: QueryGetAccountListRequest): Promise<QueryGetAccountListResponse> {
    const data = QueryGetAccountListRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "AccountList", data);
    return promise.then((data) => QueryGetAccountListResponse.decode(new _m0.Reader(data)));
  }

  AccountListAll(request: QueryAllAccountListRequest): Promise<QueryAllAccountListResponse> {
    const data = QueryAllAccountListRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "AccountListAll", data);
    return promise.then((data) => QueryAllAccountListResponse.decode(new _m0.Reader(data)));
  }

  AccountAuth(request: QueryGetAccountAuthRequest): Promise<QueryGetAccountAuthResponse> {
    const data = QueryGetAccountAuthRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "AccountAuth", data);
    return promise.then((data) => QueryGetAccountAuthResponse.decode(new _m0.Reader(data)));
  }

  AccountAuthAll(request: QueryAllAccountAuthRequest): Promise<QueryAllAccountAuthResponse> {
    const data = QueryAllAccountAuthRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "AccountAuthAll", data);
    return promise.then((data) => QueryAllAccountAuthResponse.decode(new _m0.Reader(data)));
  }

  GetAllAccountAuths(request: QueryGetAllAccountAuthsRequest): Promise<QueryGetAllAccountAuthsResponse> {
    const data = QueryGetAllAccountAuthsRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "GetAllAccountAuths", data);
    return promise.then((data) => QueryGetAllAccountAuthsResponse.decode(new _m0.Reader(data)));
  }

  SidDocument(request: QueryGetSidDocumentRequest): Promise<QueryGetSidDocumentResponse> {
    const data = QueryGetSidDocumentRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "SidDocument", data);
    return promise.then((data) => QueryGetSidDocumentResponse.decode(new _m0.Reader(data)));
  }

  SidDocumentAll(request: QueryAllSidDocumentRequest): Promise<QueryAllSidDocumentResponse> {
    const data = QueryAllSidDocumentRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "SidDocumentAll", data);
    return promise.then((data) => QueryAllSidDocumentResponse.decode(new _m0.Reader(data)));
  }

  SidDocumentVersion(request: QueryGetSidDocumentVersionRequest): Promise<QueryGetSidDocumentVersionResponse> {
    const data = QueryGetSidDocumentVersionRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "SidDocumentVersion", data);
    return promise.then((data) => QueryGetSidDocumentVersionResponse.decode(new _m0.Reader(data)));
  }

  SidDocumentVersionAll(request: QueryAllSidDocumentVersionRequest): Promise<QueryAllSidDocumentVersionResponse> {
    const data = QueryAllSidDocumentVersionRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "SidDocumentVersionAll", data);
    return promise.then((data) => QueryAllSidDocumentVersionResponse.decode(new _m0.Reader(data)));
  }

  PastSeeds(request: QueryGetPastSeedsRequest): Promise<QueryGetPastSeedsResponse> {
    const data = QueryGetPastSeedsRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "PastSeeds", data);
    return promise.then((data) => QueryGetPastSeedsResponse.decode(new _m0.Reader(data)));
  }

  PastSeedsAll(request: QueryAllPastSeedsRequest): Promise<QueryAllPastSeedsResponse> {
    const data = QueryAllPastSeedsRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "PastSeedsAll", data);
    return promise.then((data) => QueryAllPastSeedsResponse.decode(new _m0.Reader(data)));
  }

  PaymentAddress(request: QueryGetPaymentAddressRequest): Promise<QueryGetPaymentAddressResponse> {
    const data = QueryGetPaymentAddressRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "PaymentAddress", data);
    return promise.then((data) => QueryGetPaymentAddressResponse.decode(new _m0.Reader(data)));
  }

  PaymentAddressAll(request: QueryAllPaymentAddressRequest): Promise<QueryAllPaymentAddressResponse> {
    const data = QueryAllPaymentAddressRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "PaymentAddressAll", data);
    return promise.then((data) => QueryAllPaymentAddressResponse.decode(new _m0.Reader(data)));
  }

  ValidateDid(request: QueryValidateDidRequest): Promise<QueryValidateDidResponse> {
    const data = QueryValidateDidRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "ValidateDid", data);
    return promise.then((data) => QueryValidateDidResponse.decode(new _m0.Reader(data)));
  }

  AccountId(request: QueryGetAccountIdRequest): Promise<QueryGetAccountIdResponse> {
    const data = QueryGetAccountIdRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "AccountId", data);
    return promise.then((data) => QueryGetAccountIdResponse.decode(new _m0.Reader(data)));
  }

  AccountIdAll(request: QueryAllAccountIdRequest): Promise<QueryAllAccountIdResponse> {
    const data = QueryAllAccountIdRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "AccountIdAll", data);
    return promise.then((data) => QueryAllAccountIdResponse.decode(new _m0.Reader(data)));
  }

  Did(request: QueryGetDidRequest): Promise<QueryGetDidResponse> {
    const data = QueryGetDidRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "Did", data);
    return promise.then((data) => QueryGetDidResponse.decode(new _m0.Reader(data)));
  }

  DidAll(request: QueryAllDidRequest): Promise<QueryAllDidResponse> {
    const data = QueryAllDidRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "DidAll", data);
    return promise.then((data) => QueryAllDidResponse.decode(new _m0.Reader(data)));
  }

  Kid(request: QueryGetKidRequest): Promise<QueryGetKidResponse> {
    const data = QueryGetKidRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "Kid", data);
    return promise.then((data) => QueryGetKidResponse.decode(new _m0.Reader(data)));
  }

  KidAll(request: QueryAllKidRequest): Promise<QueryAllKidResponse> {
    const data = QueryAllKidRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "KidAll", data);
    return promise.then((data) => QueryAllKidResponse.decode(new _m0.Reader(data)));
  }

  DidBalances(request: QueryGetDidBalancesRequest): Promise<QueryGetDidBalancesResponse> {
    const data = QueryGetDidBalancesRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "DidBalances", data);
    return promise.then((data) => QueryGetDidBalancesResponse.decode(new _m0.Reader(data)));
  }

  DidBalancesAll(request: QueryAllDidBalancesRequest): Promise<QueryAllDidBalancesResponse> {
    const data = QueryAllDidBalancesRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Query", "DidBalancesAll", data);
    return promise.then((data) => QueryAllDidBalancesResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}