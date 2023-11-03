/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "saonetwork.sao.sao";

export interface Fault {
  dataId: string;
  orderId: number;
  shardId: number;
  commitId: string;
  provider: string;
  reporter: string;
}

function createBaseFault(): Fault {
  return { dataId: "", orderId: 0, shardId: 0, commitId: "", provider: "", reporter: "" };
}

export const Fault = {
  encode(message: Fault, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataId !== "") {
      writer.uint32(10).string(message.dataId);
    }
    if (message.orderId !== 0) {
      writer.uint32(16).uint64(message.orderId);
    }
    if (message.shardId !== 0) {
      writer.uint32(24).uint64(message.shardId);
    }
    if (message.commitId !== "") {
      writer.uint32(34).string(message.commitId);
    }
    if (message.provider !== "") {
      writer.uint32(42).string(message.provider);
    }
    if (message.reporter !== "") {
      writer.uint32(50).string(message.reporter);
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
          message.dataId = reader.string();
          break;
        case 2:
          message.orderId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.shardId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.commitId = reader.string();
          break;
        case 5:
          message.provider = reader.string();
          break;
        case 6:
          message.reporter = reader.string();
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
      dataId: isSet(object.dataId) ? String(object.dataId) : "",
      orderId: isSet(object.orderId) ? Number(object.orderId) : 0,
      shardId: isSet(object.shardId) ? Number(object.shardId) : 0,
      commitId: isSet(object.commitId) ? String(object.commitId) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      reporter: isSet(object.reporter) ? String(object.reporter) : "",
    };
  },

  toJSON(message: Fault): unknown {
    const obj: any = {};
    message.dataId !== undefined && (obj.dataId = message.dataId);
    message.orderId !== undefined && (obj.orderId = Math.round(message.orderId));
    message.shardId !== undefined && (obj.shardId = Math.round(message.shardId));
    message.commitId !== undefined && (obj.commitId = message.commitId);
    message.provider !== undefined && (obj.provider = message.provider);
    message.reporter !== undefined && (obj.reporter = message.reporter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Fault>, I>>(object: I): Fault {
    const message = createBaseFault();
    message.dataId = object.dataId ?? "";
    message.orderId = object.orderId ?? 0;
    message.shardId = object.shardId ?? 0;
    message.commitId = object.commitId ?? "";
    message.provider = object.provider ?? "";
    message.reporter = object.reporter ?? "";
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
