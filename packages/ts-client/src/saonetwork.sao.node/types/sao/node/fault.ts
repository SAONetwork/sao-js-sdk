/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "saonetwork.sao.node";

export interface Fault {
  faultId: string;
  orderId: number;
  dataId: string;
  shardId: number;
  commitId: string;
  provider: string;
  reporter: string;
  confirms: string;
  status: number;
  penalty: number;
}

function createBaseFault(): Fault {
  return {
    faultId: "",
    orderId: 0,
    dataId: "",
    shardId: 0,
    commitId: "",
    provider: "",
    reporter: "",
    confirms: "",
    status: 0,
    penalty: 0,
  };
}

export const Fault = {
  encode(message: Fault, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.faultId !== "") {
      writer.uint32(10).string(message.faultId);
    }
    if (message.orderId !== 0) {
      writer.uint32(16).uint64(message.orderId);
    }
    if (message.dataId !== "") {
      writer.uint32(26).string(message.dataId);
    }
    if (message.shardId !== 0) {
      writer.uint32(32).uint64(message.shardId);
    }
    if (message.commitId !== "") {
      writer.uint32(42).string(message.commitId);
    }
    if (message.provider !== "") {
      writer.uint32(50).string(message.provider);
    }
    if (message.reporter !== "") {
      writer.uint32(58).string(message.reporter);
    }
    if (message.confirms !== "") {
      writer.uint32(66).string(message.confirms);
    }
    if (message.status !== 0) {
      writer.uint32(72).uint32(message.status);
    }
    if (message.penalty !== 0) {
      writer.uint32(80).uint64(message.penalty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fault {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faultId = reader.string();
          break;
        case 2:
          message.orderId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.dataId = reader.string();
          break;
        case 4:
          message.shardId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.commitId = reader.string();
          break;
        case 6:
          message.provider = reader.string();
          break;
        case 7:
          message.reporter = reader.string();
          break;
        case 8:
          message.confirms = reader.string();
          break;
        case 9:
          message.status = reader.uint32();
          break;
        case 10:
          message.penalty = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Fault {
    return {
      faultId: isSet(object.faultId) ? String(object.faultId) : "",
      orderId: isSet(object.orderId) ? Number(object.orderId) : 0,
      dataId: isSet(object.dataId) ? String(object.dataId) : "",
      shardId: isSet(object.shardId) ? Number(object.shardId) : 0,
      commitId: isSet(object.commitId) ? String(object.commitId) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      reporter: isSet(object.reporter) ? String(object.reporter) : "",
      confirms: isSet(object.confirms) ? String(object.confirms) : "",
      status: isSet(object.status) ? Number(object.status) : 0,
      penalty: isSet(object.penalty) ? Number(object.penalty) : 0,
    };
  },

  toJSON(message: Fault): unknown {
    const obj: any = {};
    message.faultId !== undefined && (obj.faultId = message.faultId);
    message.orderId !== undefined && (obj.orderId = Math.round(message.orderId));
    message.dataId !== undefined && (obj.dataId = message.dataId);
    message.shardId !== undefined && (obj.shardId = Math.round(message.shardId));
    message.commitId !== undefined && (obj.commitId = message.commitId);
    message.provider !== undefined && (obj.provider = message.provider);
    message.reporter !== undefined && (obj.reporter = message.reporter);
    message.confirms !== undefined && (obj.confirms = message.confirms);
    message.status !== undefined && (obj.status = Math.round(message.status));
    message.penalty !== undefined && (obj.penalty = Math.round(message.penalty));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Fault>, I>>(object: I): Fault {
    const message = createBaseFault();
    message.faultId = object.faultId ?? "";
    message.orderId = object.orderId ?? 0;
    message.dataId = object.dataId ?? "";
    message.shardId = object.shardId ?? 0;
    message.commitId = object.commitId ?? "";
    message.provider = object.provider ?? "";
    message.reporter = object.reporter ?? "";
    message.confirms = object.confirms ?? "";
    message.status = object.status ?? 0;
    message.penalty = object.penalty ?? 0;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
