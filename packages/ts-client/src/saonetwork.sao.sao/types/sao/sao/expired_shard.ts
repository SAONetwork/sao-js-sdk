/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "saonetwork.sao.sao";

export interface ExpiredShard {
  height: number;
  shardList: number[];
}

function createBaseExpiredShard(): ExpiredShard {
  return { height: 0, shardList: [] };
}

export const ExpiredShard = {
  encode(message: ExpiredShard, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    writer.uint32(18).fork();
    for (const v of message.shardList) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExpiredShard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExpiredShard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.shardList.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.shardList.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExpiredShard {
    return {
      height: isSet(object.height) ? Number(object.height) : 0,
      shardList: Array.isArray(object?.shardList) ? object.shardList.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: ExpiredShard): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    if (message.shardList) {
      obj.shardList = message.shardList.map((e) => Math.round(e));
    } else {
      obj.shardList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ExpiredShard>, I>>(object: I): ExpiredShard {
    const message = createBaseExpiredShard();
    message.height = object.height ?? 0;
    message.shardList = object.shardList?.map((e) => e) || [];
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