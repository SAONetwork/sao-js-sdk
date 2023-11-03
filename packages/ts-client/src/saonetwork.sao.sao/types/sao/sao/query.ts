/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { ExpiredShard } from "./expired_shard";
import { JwsSignature } from "./jws_signature";
import { Metadata } from "./metadata";
import { Params } from "./params";
import { QueryProposal } from "./query_proposal";
import { ShardMeta } from "./shard_meta";
import { TimeoutOrder } from "./timeout_order";

export const protobufPackage = "saonetwork.sao.sao";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryMetadataRequest {
  proposal: QueryProposal | undefined;
  jwsSignature: JwsSignature | undefined;
}

export interface QueryMetadataResponse {
  metadata: Metadata | undefined;
  shards: { [key: string]: ShardMeta };
}

export interface QueryMetadataResponse_ShardsEntry {
  key: string;
  value: ShardMeta | undefined;
}

export interface QueryLatesthightRequest {
}

export interface QueryLatesthightResponse {
  latestBlockHeight: number;
  latestBlockTime: string;
}

export interface QueryGetTimeoutOrderRequest {
  height: number;
}

export interface QueryGetTimeoutOrderResponse {
  timeoutOrder: TimeoutOrder | undefined;
}

export interface QueryAllTimeoutOrderRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllTimeoutOrderResponse {
  timeoutOrder: TimeoutOrder[];
  pagination: PageResponse | undefined;
}

export interface QueryGetExpiredShardRequest {
  height: number;
}

export interface QueryGetExpiredShardResponse {
  expiredShard: ExpiredShard | undefined;
}

export interface QueryAllExpiredShardRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllExpiredShardResponse {
  expiredShard: ExpiredShard[];
  pagination: PageResponse | undefined;
}

export interface QueryNetVersionRequest {
}

export interface QueryNetVersionResponse {
  version: string;
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

function createBaseQueryMetadataRequest(): QueryMetadataRequest {
  return { proposal: undefined, jwsSignature: undefined };
}

export const QueryMetadataRequest = {
  encode(message: QueryMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposal !== undefined) {
      QueryProposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    if (message.jwsSignature !== undefined) {
      JwsSignature.encode(message.jwsSignature, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal = QueryProposal.decode(reader, reader.uint32());
          break;
        case 2:
          message.jwsSignature = JwsSignature.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMetadataRequest {
    return {
      proposal: isSet(object.proposal) ? QueryProposal.fromJSON(object.proposal) : undefined,
      jwsSignature: isSet(object.jwsSignature) ? JwsSignature.fromJSON(object.jwsSignature) : undefined,
    };
  },

  toJSON(message: QueryMetadataRequest): unknown {
    const obj: any = {};
    message.proposal !== undefined
      && (obj.proposal = message.proposal ? QueryProposal.toJSON(message.proposal) : undefined);
    message.jwsSignature !== undefined
      && (obj.jwsSignature = message.jwsSignature ? JwsSignature.toJSON(message.jwsSignature) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryMetadataRequest>, I>>(object: I): QueryMetadataRequest {
    const message = createBaseQueryMetadataRequest();
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? QueryProposal.fromPartial(object.proposal)
      : undefined;
    message.jwsSignature = (object.jwsSignature !== undefined && object.jwsSignature !== null)
      ? JwsSignature.fromPartial(object.jwsSignature)
      : undefined;
    return message;
  },
};

function createBaseQueryMetadataResponse(): QueryMetadataResponse {
  return { metadata: undefined, shards: {} };
}

export const QueryMetadataResponse = {
  encode(message: QueryMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.shards).forEach(([key, value]) => {
      QueryMetadataResponse_ShardsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          const entry2 = QueryMetadataResponse_ShardsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.shards[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMetadataResponse {
    return {
      metadata: isSet(object.metadata) ? Metadata.fromJSON(object.metadata) : undefined,
      shards: isObject(object.shards)
        ? Object.entries(object.shards).reduce<{ [key: string]: ShardMeta }>((acc, [key, value]) => {
          acc[key] = ShardMeta.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: QueryMetadataResponse): unknown {
    const obj: any = {};
    message.metadata !== undefined && (obj.metadata = message.metadata ? Metadata.toJSON(message.metadata) : undefined);
    obj.shards = {};
    if (message.shards) {
      Object.entries(message.shards).forEach(([k, v]) => {
        obj.shards[k] = ShardMeta.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryMetadataResponse>, I>>(object: I): QueryMetadataResponse {
    const message = createBaseQueryMetadataResponse();
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Metadata.fromPartial(object.metadata)
      : undefined;
    message.shards = Object.entries(object.shards ?? {}).reduce<{ [key: string]: ShardMeta }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = ShardMeta.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseQueryMetadataResponse_ShardsEntry(): QueryMetadataResponse_ShardsEntry {
  return { key: "", value: undefined };
}

export const QueryMetadataResponse_ShardsEntry = {
  encode(message: QueryMetadataResponse_ShardsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ShardMeta.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMetadataResponse_ShardsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMetadataResponse_ShardsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = ShardMeta.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMetadataResponse_ShardsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? ShardMeta.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: QueryMetadataResponse_ShardsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? ShardMeta.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryMetadataResponse_ShardsEntry>, I>>(
    object: I,
  ): QueryMetadataResponse_ShardsEntry {
    const message = createBaseQueryMetadataResponse_ShardsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? ShardMeta.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseQueryLatesthightRequest(): QueryLatesthightRequest {
  return {};
}

export const QueryLatesthightRequest = {
  encode(_: QueryLatesthightRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatesthightRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatesthightRequest();
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

  fromJSON(_: any): QueryLatesthightRequest {
    return {};
  },

  toJSON(_: QueryLatesthightRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryLatesthightRequest>, I>>(_: I): QueryLatesthightRequest {
    const message = createBaseQueryLatesthightRequest();
    return message;
  },
};

function createBaseQueryLatesthightResponse(): QueryLatesthightResponse {
  return { latestBlockHeight: 0, latestBlockTime: "" };
}

export const QueryLatesthightResponse = {
  encode(message: QueryLatesthightResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.latestBlockHeight !== 0) {
      writer.uint32(8).uint64(message.latestBlockHeight);
    }
    if (message.latestBlockTime !== "") {
      writer.uint32(18).string(message.latestBlockTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatesthightResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatesthightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.latestBlockHeight = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.latestBlockTime = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLatesthightResponse {
    return {
      latestBlockHeight: isSet(object.latestBlockHeight) ? Number(object.latestBlockHeight) : 0,
      latestBlockTime: isSet(object.latestBlockTime) ? String(object.latestBlockTime) : "",
    };
  },

  toJSON(message: QueryLatesthightResponse): unknown {
    const obj: any = {};
    message.latestBlockHeight !== undefined && (obj.latestBlockHeight = Math.round(message.latestBlockHeight));
    message.latestBlockTime !== undefined && (obj.latestBlockTime = message.latestBlockTime);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryLatesthightResponse>, I>>(object: I): QueryLatesthightResponse {
    const message = createBaseQueryLatesthightResponse();
    message.latestBlockHeight = object.latestBlockHeight ?? 0;
    message.latestBlockTime = object.latestBlockTime ?? "";
    return message;
  },
};

function createBaseQueryGetTimeoutOrderRequest(): QueryGetTimeoutOrderRequest {
  return { height: 0 };
}

export const QueryGetTimeoutOrderRequest = {
  encode(message: QueryGetTimeoutOrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTimeoutOrderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTimeoutOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTimeoutOrderRequest {
    return { height: isSet(object.height) ? Number(object.height) : 0 };
  },

  toJSON(message: QueryGetTimeoutOrderRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetTimeoutOrderRequest>, I>>(object: I): QueryGetTimeoutOrderRequest {
    const message = createBaseQueryGetTimeoutOrderRequest();
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseQueryGetTimeoutOrderResponse(): QueryGetTimeoutOrderResponse {
  return { timeoutOrder: undefined };
}

export const QueryGetTimeoutOrderResponse = {
  encode(message: QueryGetTimeoutOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timeoutOrder !== undefined) {
      TimeoutOrder.encode(message.timeoutOrder, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTimeoutOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTimeoutOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeoutOrder = TimeoutOrder.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTimeoutOrderResponse {
    return { timeoutOrder: isSet(object.timeoutOrder) ? TimeoutOrder.fromJSON(object.timeoutOrder) : undefined };
  },

  toJSON(message: QueryGetTimeoutOrderResponse): unknown {
    const obj: any = {};
    message.timeoutOrder !== undefined
      && (obj.timeoutOrder = message.timeoutOrder ? TimeoutOrder.toJSON(message.timeoutOrder) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetTimeoutOrderResponse>, I>>(object: I): QueryGetTimeoutOrderResponse {
    const message = createBaseQueryGetTimeoutOrderResponse();
    message.timeoutOrder = (object.timeoutOrder !== undefined && object.timeoutOrder !== null)
      ? TimeoutOrder.fromPartial(object.timeoutOrder)
      : undefined;
    return message;
  },
};

function createBaseQueryAllTimeoutOrderRequest(): QueryAllTimeoutOrderRequest {
  return { pagination: undefined };
}

export const QueryAllTimeoutOrderRequest = {
  encode(message: QueryAllTimeoutOrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTimeoutOrderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTimeoutOrderRequest();
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

  fromJSON(object: any): QueryAllTimeoutOrderRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllTimeoutOrderRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTimeoutOrderRequest>, I>>(object: I): QueryAllTimeoutOrderRequest {
    const message = createBaseQueryAllTimeoutOrderRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllTimeoutOrderResponse(): QueryAllTimeoutOrderResponse {
  return { timeoutOrder: [], pagination: undefined };
}

export const QueryAllTimeoutOrderResponse = {
  encode(message: QueryAllTimeoutOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.timeoutOrder) {
      TimeoutOrder.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTimeoutOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTimeoutOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeoutOrder.push(TimeoutOrder.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllTimeoutOrderResponse {
    return {
      timeoutOrder: Array.isArray(object?.timeoutOrder)
        ? object.timeoutOrder.map((e: any) => TimeoutOrder.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllTimeoutOrderResponse): unknown {
    const obj: any = {};
    if (message.timeoutOrder) {
      obj.timeoutOrder = message.timeoutOrder.map((e) => e ? TimeoutOrder.toJSON(e) : undefined);
    } else {
      obj.timeoutOrder = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTimeoutOrderResponse>, I>>(object: I): QueryAllTimeoutOrderResponse {
    const message = createBaseQueryAllTimeoutOrderResponse();
    message.timeoutOrder = object.timeoutOrder?.map((e) => TimeoutOrder.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetExpiredShardRequest(): QueryGetExpiredShardRequest {
  return { height: 0 };
}

export const QueryGetExpiredShardRequest = {
  encode(message: QueryGetExpiredShardRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetExpiredShardRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetExpiredShardRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetExpiredShardRequest {
    return { height: isSet(object.height) ? Number(object.height) : 0 };
  },

  toJSON(message: QueryGetExpiredShardRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetExpiredShardRequest>, I>>(object: I): QueryGetExpiredShardRequest {
    const message = createBaseQueryGetExpiredShardRequest();
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseQueryGetExpiredShardResponse(): QueryGetExpiredShardResponse {
  return { expiredShard: undefined };
}

export const QueryGetExpiredShardResponse = {
  encode(message: QueryGetExpiredShardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.expiredShard !== undefined) {
      ExpiredShard.encode(message.expiredShard, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetExpiredShardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetExpiredShardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.expiredShard = ExpiredShard.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetExpiredShardResponse {
    return { expiredShard: isSet(object.expiredShard) ? ExpiredShard.fromJSON(object.expiredShard) : undefined };
  },

  toJSON(message: QueryGetExpiredShardResponse): unknown {
    const obj: any = {};
    message.expiredShard !== undefined
      && (obj.expiredShard = message.expiredShard ? ExpiredShard.toJSON(message.expiredShard) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetExpiredShardResponse>, I>>(object: I): QueryGetExpiredShardResponse {
    const message = createBaseQueryGetExpiredShardResponse();
    message.expiredShard = (object.expiredShard !== undefined && object.expiredShard !== null)
      ? ExpiredShard.fromPartial(object.expiredShard)
      : undefined;
    return message;
  },
};

function createBaseQueryAllExpiredShardRequest(): QueryAllExpiredShardRequest {
  return { pagination: undefined };
}

export const QueryAllExpiredShardRequest = {
  encode(message: QueryAllExpiredShardRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllExpiredShardRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllExpiredShardRequest();
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

  fromJSON(object: any): QueryAllExpiredShardRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllExpiredShardRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllExpiredShardRequest>, I>>(object: I): QueryAllExpiredShardRequest {
    const message = createBaseQueryAllExpiredShardRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllExpiredShardResponse(): QueryAllExpiredShardResponse {
  return { expiredShard: [], pagination: undefined };
}

export const QueryAllExpiredShardResponse = {
  encode(message: QueryAllExpiredShardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.expiredShard) {
      ExpiredShard.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllExpiredShardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllExpiredShardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.expiredShard.push(ExpiredShard.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllExpiredShardResponse {
    return {
      expiredShard: Array.isArray(object?.expiredShard)
        ? object.expiredShard.map((e: any) => ExpiredShard.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllExpiredShardResponse): unknown {
    const obj: any = {};
    if (message.expiredShard) {
      obj.expiredShard = message.expiredShard.map((e) => e ? ExpiredShard.toJSON(e) : undefined);
    } else {
      obj.expiredShard = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllExpiredShardResponse>, I>>(object: I): QueryAllExpiredShardResponse {
    const message = createBaseQueryAllExpiredShardResponse();
    message.expiredShard = object.expiredShard?.map((e) => ExpiredShard.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryNetVersionRequest(): QueryNetVersionRequest {
  return {};
}

export const QueryNetVersionRequest = {
  encode(_: QueryNetVersionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNetVersionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNetVersionRequest();
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

  fromJSON(_: any): QueryNetVersionRequest {
    return {};
  },

  toJSON(_: QueryNetVersionRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNetVersionRequest>, I>>(_: I): QueryNetVersionRequest {
    const message = createBaseQueryNetVersionRequest();
    return message;
  },
};

function createBaseQueryNetVersionResponse(): QueryNetVersionResponse {
  return { version: "" };
}

export const QueryNetVersionResponse = {
  encode(message: QueryNetVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNetVersionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNetVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNetVersionResponse {
    return { version: isSet(object.version) ? String(object.version) : "" };
  },

  toJSON(message: QueryNetVersionResponse): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNetVersionResponse>, I>>(object: I): QueryNetVersionResponse {
    const message = createBaseQueryNetVersionResponse();
    message.version = object.version ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Metadata items. */
  Metadata(request: QueryMetadataRequest): Promise<QueryMetadataResponse>;
  /** Queries a list of Latesthight items. */
  Latesthight(request: QueryLatesthightRequest): Promise<QueryLatesthightResponse>;
  /** Queries a TimeoutOrder by index. */
  TimeoutOrder(request: QueryGetTimeoutOrderRequest): Promise<QueryGetTimeoutOrderResponse>;
  /** Queries a list of TimeoutOrder items. */
  TimeoutOrderAll(request: QueryAllTimeoutOrderRequest): Promise<QueryAllTimeoutOrderResponse>;
  /** Queries a ExpiredShard by index. */
  ExpiredShard(request: QueryGetExpiredShardRequest): Promise<QueryGetExpiredShardResponse>;
  /** Queries a list of ExpiredShard items. */
  ExpiredShardAll(request: QueryAllExpiredShardRequest): Promise<QueryAllExpiredShardResponse>;
  /** Queries a list of NetVersion items. */
  NetVersion(request: QueryNetVersionRequest): Promise<QueryNetVersionResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Metadata = this.Metadata.bind(this);
    this.Latesthight = this.Latesthight.bind(this);
    this.TimeoutOrder = this.TimeoutOrder.bind(this);
    this.TimeoutOrderAll = this.TimeoutOrderAll.bind(this);
    this.ExpiredShard = this.ExpiredShard.bind(this);
    this.ExpiredShardAll = this.ExpiredShardAll.bind(this);
    this.NetVersion = this.NetVersion.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Metadata(request: QueryMetadataRequest): Promise<QueryMetadataResponse> {
    const data = QueryMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Query", "Metadata", data);
    return promise.then((data) => QueryMetadataResponse.decode(new _m0.Reader(data)));
  }

  Latesthight(request: QueryLatesthightRequest): Promise<QueryLatesthightResponse> {
    const data = QueryLatesthightRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Query", "Latesthight", data);
    return promise.then((data) => QueryLatesthightResponse.decode(new _m0.Reader(data)));
  }

  TimeoutOrder(request: QueryGetTimeoutOrderRequest): Promise<QueryGetTimeoutOrderResponse> {
    const data = QueryGetTimeoutOrderRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Query", "TimeoutOrder", data);
    return promise.then((data) => QueryGetTimeoutOrderResponse.decode(new _m0.Reader(data)));
  }

  TimeoutOrderAll(request: QueryAllTimeoutOrderRequest): Promise<QueryAllTimeoutOrderResponse> {
    const data = QueryAllTimeoutOrderRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Query", "TimeoutOrderAll", data);
    return promise.then((data) => QueryAllTimeoutOrderResponse.decode(new _m0.Reader(data)));
  }

  ExpiredShard(request: QueryGetExpiredShardRequest): Promise<QueryGetExpiredShardResponse> {
    const data = QueryGetExpiredShardRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Query", "ExpiredShard", data);
    return promise.then((data) => QueryGetExpiredShardResponse.decode(new _m0.Reader(data)));
  }

  ExpiredShardAll(request: QueryAllExpiredShardRequest): Promise<QueryAllExpiredShardResponse> {
    const data = QueryAllExpiredShardRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Query", "ExpiredShardAll", data);
    return promise.then((data) => QueryAllExpiredShardResponse.decode(new _m0.Reader(data)));
  }

  NetVersion(request: QueryNetVersionRequest): Promise<QueryNetVersionResponse> {
    const data = QueryNetVersionRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Query", "NetVersion", data);
    return promise.then((data) => QueryNetVersionResponse.decode(new _m0.Reader(data)));
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
