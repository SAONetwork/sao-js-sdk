/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Fault } from "./fault";
import { Node } from "./node";
import { Params } from "./params";
import { Pledge } from "./pledge";
import { PledgeDebt } from "./pledge_debt";
import { Pool } from "./pool";

export const protobufPackage = "saonetwork.sao.node";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetNodeRequest {
  creator: string;
}

export interface QueryGetNodeResponse {
  node: Node | undefined;
}

export interface QueryAllNodeRequest {
  pagination: PageRequest | undefined;
  status: number;
}

export interface QueryAllNodeResponse {
  node: Node[];
  pagination: PageResponse | undefined;
}

export interface QueryGetPoolRequest {
}

export interface QueryGetPoolResponse {
  Pool: Pool | undefined;
}

export interface QueryGetPledgeRequest {
  creator: string;
}

export interface QueryGetPledgeResponse {
  pledge: Pledge | undefined;
}

export interface QueryAllPledgeRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllPledgeResponse {
  pledge: Pledge[];
  pagination: PageResponse | undefined;
}

export interface QueryGetPledgeDebtRequest {
  sp: string;
}

export interface QueryGetPledgeDebtResponse {
  pledgeDebt: PledgeDebt | undefined;
}

export interface QueryAllPledgeDebtRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllPledgeDebtResponse {
  pledgeDebt: PledgeDebt[];
  pagination: PageResponse | undefined;
}

export interface QueryFaultRequest {
  faultId: string;
}

export interface QueryFaultResponse {
  fault: Fault | undefined;
}

export interface QueryAllFaultsRequest {
  provider: string;
  shardId: number;
  pagination: PageRequest | undefined;
}

export interface QueryAllFaultsResponse {
  FaultIds: string[];
  pagination: PageResponse | undefined;
}

export interface QueryFishmenRequest {
}

export interface QueryFishmenResponse {
  fishmen: string;
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

function createBaseQueryGetNodeRequest(): QueryGetNodeRequest {
  return { creator: "" };
}

export const QueryGetNodeRequest = {
  encode(message: QueryGetNodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetNodeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNodeRequest {
    return { creator: isSet(object.creator) ? String(object.creator) : "" };
  },

  toJSON(message: QueryGetNodeRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetNodeRequest>, I>>(object: I): QueryGetNodeRequest {
    const message = createBaseQueryGetNodeRequest();
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseQueryGetNodeResponse(): QueryGetNodeResponse {
  return { node: undefined };
}

export const QueryGetNodeResponse = {
  encode(message: QueryGetNodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetNodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.node = Node.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNodeResponse {
    return { node: isSet(object.node) ? Node.fromJSON(object.node) : undefined };
  },

  toJSON(message: QueryGetNodeResponse): unknown {
    const obj: any = {};
    message.node !== undefined && (obj.node = message.node ? Node.toJSON(message.node) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetNodeResponse>, I>>(object: I): QueryGetNodeResponse {
    const message = createBaseQueryGetNodeResponse();
    message.node = (object.node !== undefined && object.node !== null) ? Node.fromPartial(object.node) : undefined;
    return message;
  },
};

function createBaseQueryAllNodeRequest(): QueryAllNodeRequest {
  return { pagination: undefined, status: 0 };
}

export const QueryAllNodeRequest = {
  encode(message: QueryAllNodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).uint32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllNodeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllNodeRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      status: isSet(object.status) ? Number(object.status) : 0,
    };
  },

  toJSON(message: QueryAllNodeRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.status !== undefined && (obj.status = Math.round(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllNodeRequest>, I>>(object: I): QueryAllNodeRequest {
    const message = createBaseQueryAllNodeRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseQueryAllNodeResponse(): QueryAllNodeResponse {
  return { node: [], pagination: undefined };
}

export const QueryAllNodeResponse = {
  encode(message: QueryAllNodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.node) {
      Node.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllNodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllNodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.node.push(Node.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllNodeResponse {
    return {
      node: Array.isArray(object?.node) ? object.node.map((e: any) => Node.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllNodeResponse): unknown {
    const obj: any = {};
    if (message.node) {
      obj.node = message.node.map((e) => e ? Node.toJSON(e) : undefined);
    } else {
      obj.node = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllNodeResponse>, I>>(object: I): QueryAllNodeResponse {
    const message = createBaseQueryAllNodeResponse();
    message.node = object.node?.map((e) => Node.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPoolRequest(): QueryGetPoolRequest {
  return {};
}

export const QueryGetPoolRequest = {
  encode(_: QueryGetPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolRequest();
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

  fromJSON(_: any): QueryGetPoolRequest {
    return {};
  },

  toJSON(_: QueryGetPoolRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPoolRequest>, I>>(_: I): QueryGetPoolRequest {
    const message = createBaseQueryGetPoolRequest();
    return message;
  },
};

function createBaseQueryGetPoolResponse(): QueryGetPoolResponse {
  return { Pool: undefined };
}

export const QueryGetPoolResponse = {
  encode(message: QueryGetPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Pool !== undefined) {
      Pool.encode(message.Pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Pool = Pool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPoolResponse {
    return { Pool: isSet(object.Pool) ? Pool.fromJSON(object.Pool) : undefined };
  },

  toJSON(message: QueryGetPoolResponse): unknown {
    const obj: any = {};
    message.Pool !== undefined && (obj.Pool = message.Pool ? Pool.toJSON(message.Pool) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPoolResponse>, I>>(object: I): QueryGetPoolResponse {
    const message = createBaseQueryGetPoolResponse();
    message.Pool = (object.Pool !== undefined && object.Pool !== null) ? Pool.fromPartial(object.Pool) : undefined;
    return message;
  },
};

function createBaseQueryGetPledgeRequest(): QueryGetPledgeRequest {
  return { creator: "" };
}

export const QueryGetPledgeRequest = {
  encode(message: QueryGetPledgeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPledgeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPledgeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPledgeRequest {
    return { creator: isSet(object.creator) ? String(object.creator) : "" };
  },

  toJSON(message: QueryGetPledgeRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPledgeRequest>, I>>(object: I): QueryGetPledgeRequest {
    const message = createBaseQueryGetPledgeRequest();
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseQueryGetPledgeResponse(): QueryGetPledgeResponse {
  return { pledge: undefined };
}

export const QueryGetPledgeResponse = {
  encode(message: QueryGetPledgeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pledge !== undefined) {
      Pledge.encode(message.pledge, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPledgeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPledgeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pledge = Pledge.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPledgeResponse {
    return { pledge: isSet(object.pledge) ? Pledge.fromJSON(object.pledge) : undefined };
  },

  toJSON(message: QueryGetPledgeResponse): unknown {
    const obj: any = {};
    message.pledge !== undefined && (obj.pledge = message.pledge ? Pledge.toJSON(message.pledge) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPledgeResponse>, I>>(object: I): QueryGetPledgeResponse {
    const message = createBaseQueryGetPledgeResponse();
    message.pledge = (object.pledge !== undefined && object.pledge !== null)
      ? Pledge.fromPartial(object.pledge)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPledgeRequest(): QueryAllPledgeRequest {
  return { pagination: undefined };
}

export const QueryAllPledgeRequest = {
  encode(message: QueryAllPledgeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPledgeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPledgeRequest();
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

  fromJSON(object: any): QueryAllPledgeRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllPledgeRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPledgeRequest>, I>>(object: I): QueryAllPledgeRequest {
    const message = createBaseQueryAllPledgeRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPledgeResponse(): QueryAllPledgeResponse {
  return { pledge: [], pagination: undefined };
}

export const QueryAllPledgeResponse = {
  encode(message: QueryAllPledgeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pledge) {
      Pledge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPledgeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPledgeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pledge.push(Pledge.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllPledgeResponse {
    return {
      pledge: Array.isArray(object?.pledge) ? object.pledge.map((e: any) => Pledge.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPledgeResponse): unknown {
    const obj: any = {};
    if (message.pledge) {
      obj.pledge = message.pledge.map((e) => e ? Pledge.toJSON(e) : undefined);
    } else {
      obj.pledge = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPledgeResponse>, I>>(object: I): QueryAllPledgeResponse {
    const message = createBaseQueryAllPledgeResponse();
    message.pledge = object.pledge?.map((e) => Pledge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPledgeDebtRequest(): QueryGetPledgeDebtRequest {
  return { sp: "" };
}

export const QueryGetPledgeDebtRequest = {
  encode(message: QueryGetPledgeDebtRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sp !== "") {
      writer.uint32(10).string(message.sp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPledgeDebtRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPledgeDebtRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPledgeDebtRequest {
    return { sp: isSet(object.sp) ? String(object.sp) : "" };
  },

  toJSON(message: QueryGetPledgeDebtRequest): unknown {
    const obj: any = {};
    message.sp !== undefined && (obj.sp = message.sp);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPledgeDebtRequest>, I>>(object: I): QueryGetPledgeDebtRequest {
    const message = createBaseQueryGetPledgeDebtRequest();
    message.sp = object.sp ?? "";
    return message;
  },
};

function createBaseQueryGetPledgeDebtResponse(): QueryGetPledgeDebtResponse {
  return { pledgeDebt: undefined };
}

export const QueryGetPledgeDebtResponse = {
  encode(message: QueryGetPledgeDebtResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pledgeDebt !== undefined) {
      PledgeDebt.encode(message.pledgeDebt, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPledgeDebtResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPledgeDebtResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pledgeDebt = PledgeDebt.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPledgeDebtResponse {
    return { pledgeDebt: isSet(object.pledgeDebt) ? PledgeDebt.fromJSON(object.pledgeDebt) : undefined };
  },

  toJSON(message: QueryGetPledgeDebtResponse): unknown {
    const obj: any = {};
    message.pledgeDebt !== undefined
      && (obj.pledgeDebt = message.pledgeDebt ? PledgeDebt.toJSON(message.pledgeDebt) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPledgeDebtResponse>, I>>(object: I): QueryGetPledgeDebtResponse {
    const message = createBaseQueryGetPledgeDebtResponse();
    message.pledgeDebt = (object.pledgeDebt !== undefined && object.pledgeDebt !== null)
      ? PledgeDebt.fromPartial(object.pledgeDebt)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPledgeDebtRequest(): QueryAllPledgeDebtRequest {
  return { pagination: undefined };
}

export const QueryAllPledgeDebtRequest = {
  encode(message: QueryAllPledgeDebtRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPledgeDebtRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPledgeDebtRequest();
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

  fromJSON(object: any): QueryAllPledgeDebtRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllPledgeDebtRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPledgeDebtRequest>, I>>(object: I): QueryAllPledgeDebtRequest {
    const message = createBaseQueryAllPledgeDebtRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPledgeDebtResponse(): QueryAllPledgeDebtResponse {
  return { pledgeDebt: [], pagination: undefined };
}

export const QueryAllPledgeDebtResponse = {
  encode(message: QueryAllPledgeDebtResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pledgeDebt) {
      PledgeDebt.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPledgeDebtResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPledgeDebtResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pledgeDebt.push(PledgeDebt.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllPledgeDebtResponse {
    return {
      pledgeDebt: Array.isArray(object?.pledgeDebt) ? object.pledgeDebt.map((e: any) => PledgeDebt.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPledgeDebtResponse): unknown {
    const obj: any = {};
    if (message.pledgeDebt) {
      obj.pledgeDebt = message.pledgeDebt.map((e) => e ? PledgeDebt.toJSON(e) : undefined);
    } else {
      obj.pledgeDebt = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPledgeDebtResponse>, I>>(object: I): QueryAllPledgeDebtResponse {
    const message = createBaseQueryAllPledgeDebtResponse();
    message.pledgeDebt = object.pledgeDebt?.map((e) => PledgeDebt.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryFaultRequest(): QueryFaultRequest {
  return { faultId: "" };
}

export const QueryFaultRequest = {
  encode(message: QueryFaultRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.faultId !== "") {
      writer.uint32(10).string(message.faultId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFaultRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFaultRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faultId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryFaultRequest {
    return { faultId: isSet(object.faultId) ? String(object.faultId) : "" };
  },

  toJSON(message: QueryFaultRequest): unknown {
    const obj: any = {};
    message.faultId !== undefined && (obj.faultId = message.faultId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFaultRequest>, I>>(object: I): QueryFaultRequest {
    const message = createBaseQueryFaultRequest();
    message.faultId = object.faultId ?? "";
    return message;
  },
};

function createBaseQueryFaultResponse(): QueryFaultResponse {
  return { fault: undefined };
}

export const QueryFaultResponse = {
  encode(message: QueryFaultResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fault !== undefined) {
      Fault.encode(message.fault, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFaultResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFaultResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fault = Fault.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryFaultResponse {
    return { fault: isSet(object.fault) ? Fault.fromJSON(object.fault) : undefined };
  },

  toJSON(message: QueryFaultResponse): unknown {
    const obj: any = {};
    message.fault !== undefined && (obj.fault = message.fault ? Fault.toJSON(message.fault) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFaultResponse>, I>>(object: I): QueryFaultResponse {
    const message = createBaseQueryFaultResponse();
    message.fault = (object.fault !== undefined && object.fault !== null) ? Fault.fromPartial(object.fault) : undefined;
    return message;
  },
};

function createBaseQueryAllFaultsRequest(): QueryAllFaultsRequest {
  return { provider: "", shardId: 0, pagination: undefined };
}

export const QueryAllFaultsRequest = {
  encode(message: QueryAllFaultsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.provider !== "") {
      writer.uint32(10).string(message.provider);
    }
    if (message.shardId !== 0) {
      writer.uint32(16).uint64(message.shardId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllFaultsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllFaultsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provider = reader.string();
          break;
        case 2:
          message.shardId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllFaultsRequest {
    return {
      provider: isSet(object.provider) ? String(object.provider) : "",
      shardId: isSet(object.shardId) ? Number(object.shardId) : 0,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllFaultsRequest): unknown {
    const obj: any = {};
    message.provider !== undefined && (obj.provider = message.provider);
    message.shardId !== undefined && (obj.shardId = Math.round(message.shardId));
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllFaultsRequest>, I>>(object: I): QueryAllFaultsRequest {
    const message = createBaseQueryAllFaultsRequest();
    message.provider = object.provider ?? "";
    message.shardId = object.shardId ?? 0;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllFaultsResponse(): QueryAllFaultsResponse {
  return { FaultIds: [], pagination: undefined };
}

export const QueryAllFaultsResponse = {
  encode(message: QueryAllFaultsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.FaultIds) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllFaultsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllFaultsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FaultIds.push(reader.string());
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

  fromJSON(object: any): QueryAllFaultsResponse {
    return {
      FaultIds: Array.isArray(object?.FaultIds) ? object.FaultIds.map((e: any) => String(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllFaultsResponse): unknown {
    const obj: any = {};
    if (message.FaultIds) {
      obj.FaultIds = message.FaultIds.map((e) => e);
    } else {
      obj.FaultIds = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllFaultsResponse>, I>>(object: I): QueryAllFaultsResponse {
    const message = createBaseQueryAllFaultsResponse();
    message.FaultIds = object.FaultIds?.map((e) => e) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryFishmenRequest(): QueryFishmenRequest {
  return {};
}

export const QueryFishmenRequest = {
  encode(_: QueryFishmenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFishmenRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFishmenRequest();
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

  fromJSON(_: any): QueryFishmenRequest {
    return {};
  },

  toJSON(_: QueryFishmenRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFishmenRequest>, I>>(_: I): QueryFishmenRequest {
    const message = createBaseQueryFishmenRequest();
    return message;
  },
};

function createBaseQueryFishmenResponse(): QueryFishmenResponse {
  return { fishmen: "" };
}

export const QueryFishmenResponse = {
  encode(message: QueryFishmenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fishmen !== "") {
      writer.uint32(10).string(message.fishmen);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFishmenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFishmenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fishmen = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryFishmenResponse {
    return { fishmen: isSet(object.fishmen) ? String(object.fishmen) : "" };
  },

  toJSON(message: QueryFishmenResponse): unknown {
    const obj: any = {};
    message.fishmen !== undefined && (obj.fishmen = message.fishmen);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFishmenResponse>, I>>(object: I): QueryFishmenResponse {
    const message = createBaseQueryFishmenResponse();
    message.fishmen = object.fishmen ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Pool by index. */
  Pool(request: QueryGetPoolRequest): Promise<QueryGetPoolResponse>;
  /** Queries a Node by index. */
  Node(request: QueryGetNodeRequest): Promise<QueryGetNodeResponse>;
  /** Queries a list of Node items. */
  NodeAll(request: QueryAllNodeRequest): Promise<QueryAllNodeResponse>;
  /** Queries a Pledge by index. */
  Pledge(request: QueryGetPledgeRequest): Promise<QueryGetPledgeResponse>;
  /** Queries a list of Pledge items. */
  PledgeAll(request: QueryAllPledgeRequest): Promise<QueryAllPledgeResponse>;
  /** Queries a PledgeDebt by index. */
  PledgeDebt(request: QueryGetPledgeDebtRequest): Promise<QueryGetPledgeDebtResponse>;
  /** Queries a list of PledgeDebt items. */
  PledgeDebtAll(request: QueryAllPledgeDebtRequest): Promise<QueryAllPledgeDebtResponse>;
  /** Queries a list of Fault items. */
  Fault(request: QueryFaultRequest): Promise<QueryFaultResponse>;
  /** Queries a list of AllFaults items. */
  AllFaults(request: QueryAllFaultsRequest): Promise<QueryAllFaultsResponse>;
  /** Queries a list of Fishmen items. */
  Fishmen(request: QueryFishmenRequest): Promise<QueryFishmenResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Pool = this.Pool.bind(this);
    this.Node = this.Node.bind(this);
    this.NodeAll = this.NodeAll.bind(this);
    this.Pledge = this.Pledge.bind(this);
    this.PledgeAll = this.PledgeAll.bind(this);
    this.PledgeDebt = this.PledgeDebt.bind(this);
    this.PledgeDebtAll = this.PledgeDebtAll.bind(this);
    this.Fault = this.Fault.bind(this);
    this.AllFaults = this.AllFaults.bind(this);
    this.Fishmen = this.Fishmen.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Pool(request: QueryGetPoolRequest): Promise<QueryGetPoolResponse> {
    const data = QueryGetPoolRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "Pool", data);
    return promise.then((data) => QueryGetPoolResponse.decode(new _m0.Reader(data)));
  }

  Node(request: QueryGetNodeRequest): Promise<QueryGetNodeResponse> {
    const data = QueryGetNodeRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "Node", data);
    return promise.then((data) => QueryGetNodeResponse.decode(new _m0.Reader(data)));
  }

  NodeAll(request: QueryAllNodeRequest): Promise<QueryAllNodeResponse> {
    const data = QueryAllNodeRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "NodeAll", data);
    return promise.then((data) => QueryAllNodeResponse.decode(new _m0.Reader(data)));
  }

  Pledge(request: QueryGetPledgeRequest): Promise<QueryGetPledgeResponse> {
    const data = QueryGetPledgeRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "Pledge", data);
    return promise.then((data) => QueryGetPledgeResponse.decode(new _m0.Reader(data)));
  }

  PledgeAll(request: QueryAllPledgeRequest): Promise<QueryAllPledgeResponse> {
    const data = QueryAllPledgeRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "PledgeAll", data);
    return promise.then((data) => QueryAllPledgeResponse.decode(new _m0.Reader(data)));
  }

  PledgeDebt(request: QueryGetPledgeDebtRequest): Promise<QueryGetPledgeDebtResponse> {
    const data = QueryGetPledgeDebtRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "PledgeDebt", data);
    return promise.then((data) => QueryGetPledgeDebtResponse.decode(new _m0.Reader(data)));
  }

  PledgeDebtAll(request: QueryAllPledgeDebtRequest): Promise<QueryAllPledgeDebtResponse> {
    const data = QueryAllPledgeDebtRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "PledgeDebtAll", data);
    return promise.then((data) => QueryAllPledgeDebtResponse.decode(new _m0.Reader(data)));
  }

  Fault(request: QueryFaultRequest): Promise<QueryFaultResponse> {
    const data = QueryFaultRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "Fault", data);
    return promise.then((data) => QueryFaultResponse.decode(new _m0.Reader(data)));
  }

  AllFaults(request: QueryAllFaultsRequest): Promise<QueryAllFaultsResponse> {
    const data = QueryAllFaultsRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "AllFaults", data);
    return promise.then((data) => QueryAllFaultsResponse.decode(new _m0.Reader(data)));
  }

  Fishmen(request: QueryFishmenRequest): Promise<QueryFishmenResponse> {
    const data = QueryFishmenRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Query", "Fishmen", data);
    return promise.then((data) => QueryFishmenResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
