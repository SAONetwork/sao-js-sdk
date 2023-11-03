/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { FullOrder, Order } from "./order";
import { Params } from "./params";
import { Shard } from "./shard";

export const protobufPackage = "saonetwork.sao.order";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetOrderRequest {
  id: number;
}

export interface QueryGetOrderResponse {
  Order: FullOrder | undefined;
}

export interface QueryAllOrderRequest {
  pagination: PageRequest | undefined;
  did: string;
  states: number[];
}

export interface QueryAllOrderResponse {
  Order: Order[];
  pagination: PageResponse | undefined;
}

export interface QueryGetShardRequest {
  id: number;
}

export interface QueryGetShardResponse {
  Shard: Shard | undefined;
}

export interface QueryAllShardRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllShardResponse {
  Shard: Shard[];
  pagination: PageResponse | undefined;
}

export interface QueryShardListBySpRequest {
  sp: string;
  shardId: number;
}

export interface QueryShardListBySpResponse {
  shard: Shard[];
  nextShardId: number;
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

function createBaseQueryGetOrderRequest(): QueryGetOrderRequest {
  return { id: 0 };
}

export const QueryGetOrderRequest = {
  encode(message: QueryGetOrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetOrderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetOrderRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetOrderRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetOrderRequest>, I>>(object: I): QueryGetOrderRequest {
    const message = createBaseQueryGetOrderRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetOrderResponse(): QueryGetOrderResponse {
  return { Order: undefined };
}

export const QueryGetOrderResponse = {
  encode(message: QueryGetOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Order !== undefined) {
      FullOrder.encode(message.Order, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Order = FullOrder.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetOrderResponse {
    return { Order: isSet(object.Order) ? FullOrder.fromJSON(object.Order) : undefined };
  },

  toJSON(message: QueryGetOrderResponse): unknown {
    const obj: any = {};
    message.Order !== undefined && (obj.Order = message.Order ? FullOrder.toJSON(message.Order) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetOrderResponse>, I>>(object: I): QueryGetOrderResponse {
    const message = createBaseQueryGetOrderResponse();
    message.Order = (object.Order !== undefined && object.Order !== null)
      ? FullOrder.fromPartial(object.Order)
      : undefined;
    return message;
  },
};

function createBaseQueryAllOrderRequest(): QueryAllOrderRequest {
  return { pagination: undefined, did: "", states: [] };
}

export const QueryAllOrderRequest = {
  encode(message: QueryAllOrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.did !== "") {
      writer.uint32(18).string(message.did);
    }
    writer.uint32(26).fork();
    for (const v of message.states) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllOrderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.did = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.states.push(reader.int32());
            }
          } else {
            message.states.push(reader.int32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllOrderRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      did: isSet(object.did) ? String(object.did) : "",
      states: Array.isArray(object?.states) ? object.states.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: QueryAllOrderRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    message.did !== undefined && (obj.did = message.did);
    if (message.states) {
      obj.states = message.states.map((e) => Math.round(e));
    } else {
      obj.states = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllOrderRequest>, I>>(object: I): QueryAllOrderRequest {
    const message = createBaseQueryAllOrderRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.did = object.did ?? "";
    message.states = object.states?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryAllOrderResponse(): QueryAllOrderResponse {
  return { Order: [], pagination: undefined };
}

export const QueryAllOrderResponse = {
  encode(message: QueryAllOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Order) {
      Order.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Order.push(Order.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllOrderResponse {
    return {
      Order: Array.isArray(object?.Order) ? object.Order.map((e: any) => Order.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllOrderResponse): unknown {
    const obj: any = {};
    if (message.Order) {
      obj.Order = message.Order.map((e) => e ? Order.toJSON(e) : undefined);
    } else {
      obj.Order = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllOrderResponse>, I>>(object: I): QueryAllOrderResponse {
    const message = createBaseQueryAllOrderResponse();
    message.Order = object.Order?.map((e) => Order.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetShardRequest(): QueryGetShardRequest {
  return { id: 0 };
}

export const QueryGetShardRequest = {
  encode(message: QueryGetShardRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetShardRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetShardRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetShardRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetShardRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetShardRequest>, I>>(object: I): QueryGetShardRequest {
    const message = createBaseQueryGetShardRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetShardResponse(): QueryGetShardResponse {
  return { Shard: undefined };
}

export const QueryGetShardResponse = {
  encode(message: QueryGetShardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Shard !== undefined) {
      Shard.encode(message.Shard, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetShardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetShardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Shard = Shard.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetShardResponse {
    return { Shard: isSet(object.Shard) ? Shard.fromJSON(object.Shard) : undefined };
  },

  toJSON(message: QueryGetShardResponse): unknown {
    const obj: any = {};
    message.Shard !== undefined && (obj.Shard = message.Shard ? Shard.toJSON(message.Shard) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetShardResponse>, I>>(object: I): QueryGetShardResponse {
    const message = createBaseQueryGetShardResponse();
    message.Shard = (object.Shard !== undefined && object.Shard !== null) ? Shard.fromPartial(object.Shard) : undefined;
    return message;
  },
};

function createBaseQueryAllShardRequest(): QueryAllShardRequest {
  return { pagination: undefined };
}

export const QueryAllShardRequest = {
  encode(message: QueryAllShardRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllShardRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllShardRequest();
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

  fromJSON(object: any): QueryAllShardRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllShardRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllShardRequest>, I>>(object: I): QueryAllShardRequest {
    const message = createBaseQueryAllShardRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllShardResponse(): QueryAllShardResponse {
  return { Shard: [], pagination: undefined };
}

export const QueryAllShardResponse = {
  encode(message: QueryAllShardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Shard) {
      Shard.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllShardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllShardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Shard.push(Shard.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllShardResponse {
    return {
      Shard: Array.isArray(object?.Shard) ? object.Shard.map((e: any) => Shard.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllShardResponse): unknown {
    const obj: any = {};
    if (message.Shard) {
      obj.Shard = message.Shard.map((e) => e ? Shard.toJSON(e) : undefined);
    } else {
      obj.Shard = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllShardResponse>, I>>(object: I): QueryAllShardResponse {
    const message = createBaseQueryAllShardResponse();
    message.Shard = object.Shard?.map((e) => Shard.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryShardListBySpRequest(): QueryShardListBySpRequest {
  return { sp: "", shardId: 0 };
}

export const QueryShardListBySpRequest = {
  encode(message: QueryShardListBySpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sp !== "") {
      writer.uint32(10).string(message.sp);
    }
    if (message.shardId !== 0) {
      writer.uint32(16).uint64(message.shardId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryShardListBySpRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryShardListBySpRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sp = reader.string();
          break;
        case 2:
          message.shardId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryShardListBySpRequest {
    return {
      sp: isSet(object.sp) ? String(object.sp) : "",
      shardId: isSet(object.shardId) ? Number(object.shardId) : 0,
    };
  },

  toJSON(message: QueryShardListBySpRequest): unknown {
    const obj: any = {};
    message.sp !== undefined && (obj.sp = message.sp);
    message.shardId !== undefined && (obj.shardId = Math.round(message.shardId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryShardListBySpRequest>, I>>(object: I): QueryShardListBySpRequest {
    const message = createBaseQueryShardListBySpRequest();
    message.sp = object.sp ?? "";
    message.shardId = object.shardId ?? 0;
    return message;
  },
};

function createBaseQueryShardListBySpResponse(): QueryShardListBySpResponse {
  return { shard: [], nextShardId: 0 };
}

export const QueryShardListBySpResponse = {
  encode(message: QueryShardListBySpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.shard) {
      Shard.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextShardId !== 0) {
      writer.uint32(16).uint64(message.nextShardId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryShardListBySpResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryShardListBySpResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.shard.push(Shard.decode(reader, reader.uint32()));
          break;
        case 2:
          message.nextShardId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryShardListBySpResponse {
    return {
      shard: Array.isArray(object?.shard) ? object.shard.map((e: any) => Shard.fromJSON(e)) : [],
      nextShardId: isSet(object.nextShardId) ? Number(object.nextShardId) : 0,
    };
  },

  toJSON(message: QueryShardListBySpResponse): unknown {
    const obj: any = {};
    if (message.shard) {
      obj.shard = message.shard.map((e) => e ? Shard.toJSON(e) : undefined);
    } else {
      obj.shard = [];
    }
    message.nextShardId !== undefined && (obj.nextShardId = Math.round(message.nextShardId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryShardListBySpResponse>, I>>(object: I): QueryShardListBySpResponse {
    const message = createBaseQueryShardListBySpResponse();
    message.shard = object.shard?.map((e) => Shard.fromPartial(e)) || [];
    message.nextShardId = object.nextShardId ?? 0;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Order by id. */
  Order(request: QueryGetOrderRequest): Promise<QueryGetOrderResponse>;
  /** Queries a list of Order items. */
  OrderAll(request: QueryAllOrderRequest): Promise<QueryAllOrderResponse>;
  /** Queries a Shard by id. */
  Shard(request: QueryGetShardRequest): Promise<QueryGetShardResponse>;
  /** Queries a list of Shard items. */
  ShardAll(request: QueryAllShardRequest): Promise<QueryAllShardResponse>;
  /** Queries a list of ShardListBySp items. */
  ShardListBySp(request: QueryShardListBySpRequest): Promise<QueryShardListBySpResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Order = this.Order.bind(this);
    this.OrderAll = this.OrderAll.bind(this);
    this.Shard = this.Shard.bind(this);
    this.ShardAll = this.ShardAll.bind(this);
    this.ShardListBySp = this.ShardListBySp.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.order.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Order(request: QueryGetOrderRequest): Promise<QueryGetOrderResponse> {
    const data = QueryGetOrderRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.order.Query", "Order", data);
    return promise.then((data) => QueryGetOrderResponse.decode(new _m0.Reader(data)));
  }

  OrderAll(request: QueryAllOrderRequest): Promise<QueryAllOrderResponse> {
    const data = QueryAllOrderRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.order.Query", "OrderAll", data);
    return promise.then((data) => QueryAllOrderResponse.decode(new _m0.Reader(data)));
  }

  Shard(request: QueryGetShardRequest): Promise<QueryGetShardResponse> {
    const data = QueryGetShardRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.order.Query", "Shard", data);
    return promise.then((data) => QueryGetShardResponse.decode(new _m0.Reader(data)));
  }

  ShardAll(request: QueryAllShardRequest): Promise<QueryAllShardResponse> {
    const data = QueryAllShardRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.order.Query", "ShardAll", data);
    return promise.then((data) => QueryAllShardResponse.decode(new _m0.Reader(data)));
  }

  ShardListBySp(request: QueryShardListBySpRequest): Promise<QueryShardListBySpResponse> {
    const data = QueryShardListBySpRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.order.Query", "ShardListBySp", data);
    return promise.then((data) => QueryShardListBySpResponse.decode(new _m0.Reader(data)));
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
