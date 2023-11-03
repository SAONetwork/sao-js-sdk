/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin, DecCoin } from "../../cosmos/base/v1beta1/coin";
import { Shard } from "./shard";

export const protobufPackage = "saonetwork.sao.order";

export interface Order {
  creator: string;
  owner: string;
  id: number;
  provider: string;
  cid: string;
  duration: number;
  status: number;
  replica: number;
  shards: number[];
  amount: Coin | undefined;
  size: number;
  operation: number;
  createdAt: number;
  timeout: number;
  dataId: string;
  commit: string;
  unitPrice: DecCoin | undefined;
  paymentDid: string;
}

export interface FullOrder {
  creator: string;
  owner: string;
  id: number;
  provider: string;
  cid: string;
  duration: number;
  status: number;
  replica: number;
  shardIds: number[];
  shards: { [key: string]: Shard };
  amount: Coin | undefined;
  size: number;
  operation: number;
  createdAt: number;
  timeout: number;
  dataId: string;
  commit: string;
  unitPrice: DecCoin | undefined;
  paymentDid: string;
}

export interface FullOrder_ShardsEntry {
  key: string;
  value: Shard | undefined;
}

function createBaseOrder(): Order {
  return {
    creator: "",
    owner: "",
    id: 0,
    provider: "",
    cid: "",
    duration: 0,
    status: 0,
    replica: 0,
    shards: [],
    amount: undefined,
    size: 0,
    operation: 0,
    createdAt: 0,
    timeout: 0,
    dataId: "",
    commit: "",
    unitPrice: undefined,
    paymentDid: "",
  };
}

export const Order = {
  encode(message: Order, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.id !== 0) {
      writer.uint32(24).uint64(message.id);
    }
    if (message.provider !== "") {
      writer.uint32(34).string(message.provider);
    }
    if (message.cid !== "") {
      writer.uint32(42).string(message.cid);
    }
    if (message.duration !== 0) {
      writer.uint32(48).uint64(message.duration);
    }
    if (message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.replica !== 0) {
      writer.uint32(64).int32(message.replica);
    }
    writer.uint32(74).fork();
    for (const v of message.shards) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(82).fork()).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(88).uint64(message.size);
    }
    if (message.operation !== 0) {
      writer.uint32(96).uint32(message.operation);
    }
    if (message.createdAt !== 0) {
      writer.uint32(104).uint64(message.createdAt);
    }
    if (message.timeout !== 0) {
      writer.uint32(112).uint64(message.timeout);
    }
    if (message.dataId !== "") {
      writer.uint32(122).string(message.dataId);
    }
    if (message.commit !== "") {
      writer.uint32(130).string(message.commit);
    }
    if (message.unitPrice !== undefined) {
      DecCoin.encode(message.unitPrice, writer.uint32(138).fork()).ldelim();
    }
    if (message.paymentDid !== "") {
      writer.uint32(154).string(message.paymentDid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Order {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.provider = reader.string();
          break;
        case 5:
          message.cid = reader.string();
          break;
        case 6:
          message.duration = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.status = reader.int32();
          break;
        case 8:
          message.replica = reader.int32();
          break;
        case 9:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.shards.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.shards.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 10:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 11:
          message.size = longToNumber(reader.uint64() as Long);
          break;
        case 12:
          message.operation = reader.uint32();
          break;
        case 13:
          message.createdAt = longToNumber(reader.uint64() as Long);
          break;
        case 14:
          message.timeout = longToNumber(reader.uint64() as Long);
          break;
        case 15:
          message.dataId = reader.string();
          break;
        case 16:
          message.commit = reader.string();
          break;
        case 17:
          message.unitPrice = DecCoin.decode(reader, reader.uint32());
          break;
        case 19:
          message.paymentDid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Order {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      provider: isSet(object.provider) ? String(object.provider) : "",
      cid: isSet(object.cid) ? String(object.cid) : "",
      duration: isSet(object.duration) ? Number(object.duration) : 0,
      status: isSet(object.status) ? Number(object.status) : 0,
      replica: isSet(object.replica) ? Number(object.replica) : 0,
      shards: Array.isArray(object?.shards) ? object.shards.map((e: any) => Number(e)) : [],
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      size: isSet(object.size) ? Number(object.size) : 0,
      operation: isSet(object.operation) ? Number(object.operation) : 0,
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      timeout: isSet(object.timeout) ? Number(object.timeout) : 0,
      dataId: isSet(object.dataId) ? String(object.dataId) : "",
      commit: isSet(object.commit) ? String(object.commit) : "",
      unitPrice: isSet(object.unitPrice) ? DecCoin.fromJSON(object.unitPrice) : undefined,
      paymentDid: isSet(object.paymentDid) ? String(object.paymentDid) : "",
    };
  },

  toJSON(message: Order): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.owner !== undefined && (obj.owner = message.owner);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.provider !== undefined && (obj.provider = message.provider);
    message.cid !== undefined && (obj.cid = message.cid);
    message.duration !== undefined && (obj.duration = Math.round(message.duration));
    message.status !== undefined && (obj.status = Math.round(message.status));
    message.replica !== undefined && (obj.replica = Math.round(message.replica));
    if (message.shards) {
      obj.shards = message.shards.map((e) => Math.round(e));
    } else {
      obj.shards = [];
    }
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.operation !== undefined && (obj.operation = Math.round(message.operation));
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.timeout !== undefined && (obj.timeout = Math.round(message.timeout));
    message.dataId !== undefined && (obj.dataId = message.dataId);
    message.commit !== undefined && (obj.commit = message.commit);
    message.unitPrice !== undefined
      && (obj.unitPrice = message.unitPrice ? DecCoin.toJSON(message.unitPrice) : undefined);
    message.paymentDid !== undefined && (obj.paymentDid = message.paymentDid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Order>, I>>(object: I): Order {
    const message = createBaseOrder();
    message.creator = object.creator ?? "";
    message.owner = object.owner ?? "";
    message.id = object.id ?? 0;
    message.provider = object.provider ?? "";
    message.cid = object.cid ?? "";
    message.duration = object.duration ?? 0;
    message.status = object.status ?? 0;
    message.replica = object.replica ?? 0;
    message.shards = object.shards?.map((e) => e) || [];
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.size = object.size ?? 0;
    message.operation = object.operation ?? 0;
    message.createdAt = object.createdAt ?? 0;
    message.timeout = object.timeout ?? 0;
    message.dataId = object.dataId ?? "";
    message.commit = object.commit ?? "";
    message.unitPrice = (object.unitPrice !== undefined && object.unitPrice !== null)
      ? DecCoin.fromPartial(object.unitPrice)
      : undefined;
    message.paymentDid = object.paymentDid ?? "";
    return message;
  },
};

function createBaseFullOrder(): FullOrder {
  return {
    creator: "",
    owner: "",
    id: 0,
    provider: "",
    cid: "",
    duration: 0,
    status: 0,
    replica: 0,
    shardIds: [],
    shards: {},
    amount: undefined,
    size: 0,
    operation: 0,
    createdAt: 0,
    timeout: 0,
    dataId: "",
    commit: "",
    unitPrice: undefined,
    paymentDid: "",
  };
}

export const FullOrder = {
  encode(message: FullOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.id !== 0) {
      writer.uint32(24).uint64(message.id);
    }
    if (message.provider !== "") {
      writer.uint32(34).string(message.provider);
    }
    if (message.cid !== "") {
      writer.uint32(42).string(message.cid);
    }
    if (message.duration !== 0) {
      writer.uint32(48).uint64(message.duration);
    }
    if (message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.replica !== 0) {
      writer.uint32(64).int32(message.replica);
    }
    writer.uint32(74).fork();
    for (const v of message.shardIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    Object.entries(message.shards).forEach(([key, value]) => {
      FullOrder_ShardsEntry.encode({ key: key as any, value }, writer.uint32(82).fork()).ldelim();
    });
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(90).fork()).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(96).uint64(message.size);
    }
    if (message.operation !== 0) {
      writer.uint32(104).uint32(message.operation);
    }
    if (message.createdAt !== 0) {
      writer.uint32(112).uint64(message.createdAt);
    }
    if (message.timeout !== 0) {
      writer.uint32(120).uint64(message.timeout);
    }
    if (message.dataId !== "") {
      writer.uint32(130).string(message.dataId);
    }
    if (message.commit !== "") {
      writer.uint32(138).string(message.commit);
    }
    if (message.unitPrice !== undefined) {
      DecCoin.encode(message.unitPrice, writer.uint32(146).fork()).ldelim();
    }
    if (message.paymentDid !== "") {
      writer.uint32(154).string(message.paymentDid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FullOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.provider = reader.string();
          break;
        case 5:
          message.cid = reader.string();
          break;
        case 6:
          message.duration = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.status = reader.int32();
          break;
        case 8:
          message.replica = reader.int32();
          break;
        case 9:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.shardIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.shardIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 10:
          const entry10 = FullOrder_ShardsEntry.decode(reader, reader.uint32());
          if (entry10.value !== undefined) {
            message.shards[entry10.key] = entry10.value;
          }
          break;
        case 11:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 12:
          message.size = longToNumber(reader.uint64() as Long);
          break;
        case 13:
          message.operation = reader.uint32();
          break;
        case 14:
          message.createdAt = longToNumber(reader.uint64() as Long);
          break;
        case 15:
          message.timeout = longToNumber(reader.uint64() as Long);
          break;
        case 16:
          message.dataId = reader.string();
          break;
        case 17:
          message.commit = reader.string();
          break;
        case 18:
          message.unitPrice = DecCoin.decode(reader, reader.uint32());
          break;
        case 19:
          message.paymentDid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FullOrder {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      provider: isSet(object.provider) ? String(object.provider) : "",
      cid: isSet(object.cid) ? String(object.cid) : "",
      duration: isSet(object.duration) ? Number(object.duration) : 0,
      status: isSet(object.status) ? Number(object.status) : 0,
      replica: isSet(object.replica) ? Number(object.replica) : 0,
      shardIds: Array.isArray(object?.shardIds) ? object.shardIds.map((e: any) => Number(e)) : [],
      shards: isObject(object.shards)
        ? Object.entries(object.shards).reduce<{ [key: string]: Shard }>((acc, [key, value]) => {
          acc[key] = Shard.fromJSON(value);
          return acc;
        }, {})
        : {},
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      size: isSet(object.size) ? Number(object.size) : 0,
      operation: isSet(object.operation) ? Number(object.operation) : 0,
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      timeout: isSet(object.timeout) ? Number(object.timeout) : 0,
      dataId: isSet(object.dataId) ? String(object.dataId) : "",
      commit: isSet(object.commit) ? String(object.commit) : "",
      unitPrice: isSet(object.unitPrice) ? DecCoin.fromJSON(object.unitPrice) : undefined,
      paymentDid: isSet(object.paymentDid) ? String(object.paymentDid) : "",
    };
  },

  toJSON(message: FullOrder): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.owner !== undefined && (obj.owner = message.owner);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.provider !== undefined && (obj.provider = message.provider);
    message.cid !== undefined && (obj.cid = message.cid);
    message.duration !== undefined && (obj.duration = Math.round(message.duration));
    message.status !== undefined && (obj.status = Math.round(message.status));
    message.replica !== undefined && (obj.replica = Math.round(message.replica));
    if (message.shardIds) {
      obj.shardIds = message.shardIds.map((e) => Math.round(e));
    } else {
      obj.shardIds = [];
    }
    obj.shards = {};
    if (message.shards) {
      Object.entries(message.shards).forEach(([k, v]) => {
        obj.shards[k] = Shard.toJSON(v);
      });
    }
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.operation !== undefined && (obj.operation = Math.round(message.operation));
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.timeout !== undefined && (obj.timeout = Math.round(message.timeout));
    message.dataId !== undefined && (obj.dataId = message.dataId);
    message.commit !== undefined && (obj.commit = message.commit);
    message.unitPrice !== undefined
      && (obj.unitPrice = message.unitPrice ? DecCoin.toJSON(message.unitPrice) : undefined);
    message.paymentDid !== undefined && (obj.paymentDid = message.paymentDid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FullOrder>, I>>(object: I): FullOrder {
    const message = createBaseFullOrder();
    message.creator = object.creator ?? "";
    message.owner = object.owner ?? "";
    message.id = object.id ?? 0;
    message.provider = object.provider ?? "";
    message.cid = object.cid ?? "";
    message.duration = object.duration ?? 0;
    message.status = object.status ?? 0;
    message.replica = object.replica ?? 0;
    message.shardIds = object.shardIds?.map((e) => e) || [];
    message.shards = Object.entries(object.shards ?? {}).reduce<{ [key: string]: Shard }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Shard.fromPartial(value);
      }
      return acc;
    }, {});
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.size = object.size ?? 0;
    message.operation = object.operation ?? 0;
    message.createdAt = object.createdAt ?? 0;
    message.timeout = object.timeout ?? 0;
    message.dataId = object.dataId ?? "";
    message.commit = object.commit ?? "";
    message.unitPrice = (object.unitPrice !== undefined && object.unitPrice !== null)
      ? DecCoin.fromPartial(object.unitPrice)
      : undefined;
    message.paymentDid = object.paymentDid ?? "";
    return message;
  },
};

function createBaseFullOrder_ShardsEntry(): FullOrder_ShardsEntry {
  return { key: "", value: undefined };
}

export const FullOrder_ShardsEntry = {
  encode(message: FullOrder_ShardsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Shard.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FullOrder_ShardsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullOrder_ShardsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Shard.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FullOrder_ShardsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Shard.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: FullOrder_ShardsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Shard.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FullOrder_ShardsEntry>, I>>(object: I): FullOrder_ShardsEntry {
    const message = createBaseFullOrder_ShardsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Shard.fromPartial(object.value) : undefined;
    return message;
  },
};

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
