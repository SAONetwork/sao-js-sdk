/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { LoanPool } from "./loan_pool";
import { Params } from "./params";

export const protobufPackage = "saonetwork.sao.loan";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetLoanPoolRequest {
}

export interface QueryGetLoanPoolResponse {
  LoanPool: LoanPool | undefined;
}

export interface QueryAvailableRequest {
  account: string;
}

export interface QueryAvailableResponse {
  total: Coin | undefined;
  available: Coin | undefined;
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

function createBaseQueryGetLoanPoolRequest(): QueryGetLoanPoolRequest {
  return {};
}

export const QueryGetLoanPoolRequest = {
  encode(_: QueryGetLoanPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetLoanPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetLoanPoolRequest();
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

  fromJSON(_: any): QueryGetLoanPoolRequest {
    return {};
  },

  toJSON(_: QueryGetLoanPoolRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetLoanPoolRequest>, I>>(_: I): QueryGetLoanPoolRequest {
    const message = createBaseQueryGetLoanPoolRequest();
    return message;
  },
};

function createBaseQueryGetLoanPoolResponse(): QueryGetLoanPoolResponse {
  return { LoanPool: undefined };
}

export const QueryGetLoanPoolResponse = {
  encode(message: QueryGetLoanPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.LoanPool !== undefined) {
      LoanPool.encode(message.LoanPool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetLoanPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetLoanPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.LoanPool = LoanPool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetLoanPoolResponse {
    return { LoanPool: isSet(object.LoanPool) ? LoanPool.fromJSON(object.LoanPool) : undefined };
  },

  toJSON(message: QueryGetLoanPoolResponse): unknown {
    const obj: any = {};
    message.LoanPool !== undefined && (obj.LoanPool = message.LoanPool ? LoanPool.toJSON(message.LoanPool) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetLoanPoolResponse>, I>>(object: I): QueryGetLoanPoolResponse {
    const message = createBaseQueryGetLoanPoolResponse();
    message.LoanPool = (object.LoanPool !== undefined && object.LoanPool !== null)
      ? LoanPool.fromPartial(object.LoanPool)
      : undefined;
    return message;
  },
};

function createBaseQueryAvailableRequest(): QueryAvailableRequest {
  return { account: "" };
}

export const QueryAvailableRequest = {
  encode(message: QueryAvailableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAvailableRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAvailableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAvailableRequest {
    return { account: isSet(object.account) ? String(object.account) : "" };
  },

  toJSON(message: QueryAvailableRequest): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAvailableRequest>, I>>(object: I): QueryAvailableRequest {
    const message = createBaseQueryAvailableRequest();
    message.account = object.account ?? "";
    return message;
  },
};

function createBaseQueryAvailableResponse(): QueryAvailableResponse {
  return { total: undefined, available: undefined };
}

export const QueryAvailableResponse = {
  encode(message: QueryAvailableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== undefined) {
      Coin.encode(message.total, writer.uint32(10).fork()).ldelim();
    }
    if (message.available !== undefined) {
      Coin.encode(message.available, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAvailableResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAvailableResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.available = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAvailableResponse {
    return {
      total: isSet(object.total) ? Coin.fromJSON(object.total) : undefined,
      available: isSet(object.available) ? Coin.fromJSON(object.available) : undefined,
    };
  },

  toJSON(message: QueryAvailableResponse): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = message.total ? Coin.toJSON(message.total) : undefined);
    message.available !== undefined && (obj.available = message.available ? Coin.toJSON(message.available) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAvailableResponse>, I>>(object: I): QueryAvailableResponse {
    const message = createBaseQueryAvailableResponse();
    message.total = (object.total !== undefined && object.total !== null) ? Coin.fromPartial(object.total) : undefined;
    message.available = (object.available !== undefined && object.available !== null)
      ? Coin.fromPartial(object.available)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a LoanPool by index. */
  LoanPool(request: QueryGetLoanPoolRequest): Promise<QueryGetLoanPoolResponse>;
  /** Queries a list of Available items. */
  Available(request: QueryAvailableRequest): Promise<QueryAvailableResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.LoanPool = this.LoanPool.bind(this);
    this.Available = this.Available.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.loan.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  LoanPool(request: QueryGetLoanPoolRequest): Promise<QueryGetLoanPoolResponse> {
    const data = QueryGetLoanPoolRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.loan.Query", "LoanPool", data);
    return promise.then((data) => QueryGetLoanPoolResponse.decode(new _m0.Reader(data)));
  }

  Available(request: QueryAvailableRequest): Promise<QueryAvailableResponse> {
    const data = QueryAvailableRequest.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.loan.Query", "Available", data);
    return promise.then((data) => QueryAvailableResponse.decode(new _m0.Reader(data)));
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
