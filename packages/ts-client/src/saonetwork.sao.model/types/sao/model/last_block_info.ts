/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "saonetwork.sao.model";

export interface LastBlockInfo {
  lastHeight: number;
  lastTimestamp: string;
}

function createBaseLastBlockInfo(): LastBlockInfo {
  return { lastHeight: 0, lastTimestamp: "" };
}

export const LastBlockInfo = {
  encode(message: LastBlockInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastHeight !== 0) {
      writer.uint32(8).uint64(message.lastHeight);
    }
    if (message.lastTimestamp !== "") {
      writer.uint32(18).string(message.lastTimestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LastBlockInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastBlockInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastHeight = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.lastTimestamp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LastBlockInfo {
    return {
      lastHeight: isSet(object.lastHeight) ? Number(object.lastHeight) : 0,
      lastTimestamp: isSet(object.lastTimestamp) ? String(object.lastTimestamp) : "",
    };
  },

  toJSON(message: LastBlockInfo): unknown {
    const obj: any = {};
    message.lastHeight !== undefined && (obj.lastHeight = Math.round(message.lastHeight));
    message.lastTimestamp !== undefined && (obj.lastTimestamp = message.lastTimestamp);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LastBlockInfo>, I>>(object: I): LastBlockInfo {
    const message = createBaseLastBlockInfo();
    message.lastHeight = object.lastHeight ?? 0;
    message.lastTimestamp = object.lastTimestamp ?? "";
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
