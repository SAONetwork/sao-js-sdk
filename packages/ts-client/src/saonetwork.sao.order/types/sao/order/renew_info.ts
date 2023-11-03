/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "saonetwork.sao.order";

export interface RenewInfo {
  orderId: number;
  pledge: Coin | undefined;
  duration: number;
}

function createBaseRenewInfo(): RenewInfo {
  return { orderId: 0, pledge: undefined, duration: 0 };
}

export const RenewInfo = {
  encode(message: RenewInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== 0) {
      writer.uint32(8).uint64(message.orderId);
    }
    if (message.pledge !== undefined) {
      Coin.encode(message.pledge, writer.uint32(18).fork()).ldelim();
    }
    if (message.duration !== 0) {
      writer.uint32(24).uint64(message.duration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RenewInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRenewInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.pledge = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.duration = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RenewInfo {
    return {
      orderId: isSet(object.orderId) ? Number(object.orderId) : 0,
      pledge: isSet(object.pledge) ? Coin.fromJSON(object.pledge) : undefined,
      duration: isSet(object.duration) ? Number(object.duration) : 0,
    };
  },

  toJSON(message: RenewInfo): unknown {
    const obj: any = {};
    message.orderId !== undefined && (obj.orderId = Math.round(message.orderId));
    message.pledge !== undefined && (obj.pledge = message.pledge ? Coin.toJSON(message.pledge) : undefined);
    message.duration !== undefined && (obj.duration = Math.round(message.duration));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RenewInfo>, I>>(object: I): RenewInfo {
    const message = createBaseRenewInfo();
    message.orderId = object.orderId ?? 0;
    message.pledge = (object.pledge !== undefined && object.pledge !== null)
      ? Coin.fromPartial(object.pledge)
      : undefined;
    message.duration = object.duration ?? 0;
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
