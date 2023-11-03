/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "saonetwork.sao.node";

/** Params defines the parameters for the module. */
export interface Params {
  blockReward: Coin | undefined;
  baseline: Coin | undefined;
  annualPercentageYield: string;
  halvingPeriod: number;
  adjustmentPeriod: number;
  shareThreshold: string;
  fishmenInfo: string;
  penaltyBase: number;
  maxPenalty: number;
  vstorageThreshold: number;
  offlineTriggerHeight: number;
}

function createBaseParams(): Params {
  return {
    blockReward: undefined,
    baseline: undefined,
    annualPercentageYield: "",
    halvingPeriod: 0,
    adjustmentPeriod: 0,
    shareThreshold: "",
    fishmenInfo: "",
    penaltyBase: 0,
    maxPenalty: 0,
    vstorageThreshold: 0,
    offlineTriggerHeight: 0,
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.blockReward !== undefined) {
      Coin.encode(message.blockReward, writer.uint32(10).fork()).ldelim();
    }
    if (message.baseline !== undefined) {
      Coin.encode(message.baseline, writer.uint32(18).fork()).ldelim();
    }
    if (message.annualPercentageYield !== "") {
      writer.uint32(26).string(message.annualPercentageYield);
    }
    if (message.halvingPeriod !== 0) {
      writer.uint32(32).int64(message.halvingPeriod);
    }
    if (message.adjustmentPeriod !== 0) {
      writer.uint32(40).int64(message.adjustmentPeriod);
    }
    if (message.shareThreshold !== "") {
      writer.uint32(50).string(message.shareThreshold);
    }
    if (message.fishmenInfo !== "") {
      writer.uint32(58).string(message.fishmenInfo);
    }
    if (message.penaltyBase !== 0) {
      writer.uint32(64).uint64(message.penaltyBase);
    }
    if (message.maxPenalty !== 0) {
      writer.uint32(72).uint64(message.maxPenalty);
    }
    if (message.vstorageThreshold !== 0) {
      writer.uint32(80).int64(message.vstorageThreshold);
    }
    if (message.offlineTriggerHeight !== 0) {
      writer.uint32(88).int64(message.offlineTriggerHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockReward = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.baseline = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.annualPercentageYield = reader.string();
          break;
        case 4:
          message.halvingPeriod = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.adjustmentPeriod = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.shareThreshold = reader.string();
          break;
        case 7:
          message.fishmenInfo = reader.string();
          break;
        case 8:
          message.penaltyBase = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.maxPenalty = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          message.vstorageThreshold = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.offlineTriggerHeight = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      blockReward: isSet(object.blockReward) ? Coin.fromJSON(object.blockReward) : undefined,
      baseline: isSet(object.baseline) ? Coin.fromJSON(object.baseline) : undefined,
      annualPercentageYield: isSet(object.annualPercentageYield) ? String(object.annualPercentageYield) : "",
      halvingPeriod: isSet(object.halvingPeriod) ? Number(object.halvingPeriod) : 0,
      adjustmentPeriod: isSet(object.adjustmentPeriod) ? Number(object.adjustmentPeriod) : 0,
      shareThreshold: isSet(object.shareThreshold) ? String(object.shareThreshold) : "",
      fishmenInfo: isSet(object.fishmenInfo) ? String(object.fishmenInfo) : "",
      penaltyBase: isSet(object.penaltyBase) ? Number(object.penaltyBase) : 0,
      maxPenalty: isSet(object.maxPenalty) ? Number(object.maxPenalty) : 0,
      vstorageThreshold: isSet(object.vstorageThreshold) ? Number(object.vstorageThreshold) : 0,
      offlineTriggerHeight: isSet(object.offlineTriggerHeight) ? Number(object.offlineTriggerHeight) : 0,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.blockReward !== undefined
      && (obj.blockReward = message.blockReward ? Coin.toJSON(message.blockReward) : undefined);
    message.baseline !== undefined && (obj.baseline = message.baseline ? Coin.toJSON(message.baseline) : undefined);
    message.annualPercentageYield !== undefined && (obj.annualPercentageYield = message.annualPercentageYield);
    message.halvingPeriod !== undefined && (obj.halvingPeriod = Math.round(message.halvingPeriod));
    message.adjustmentPeriod !== undefined && (obj.adjustmentPeriod = Math.round(message.adjustmentPeriod));
    message.shareThreshold !== undefined && (obj.shareThreshold = message.shareThreshold);
    message.fishmenInfo !== undefined && (obj.fishmenInfo = message.fishmenInfo);
    message.penaltyBase !== undefined && (obj.penaltyBase = Math.round(message.penaltyBase));
    message.maxPenalty !== undefined && (obj.maxPenalty = Math.round(message.maxPenalty));
    message.vstorageThreshold !== undefined && (obj.vstorageThreshold = Math.round(message.vstorageThreshold));
    message.offlineTriggerHeight !== undefined && (obj.offlineTriggerHeight = Math.round(message.offlineTriggerHeight));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.blockReward = (object.blockReward !== undefined && object.blockReward !== null)
      ? Coin.fromPartial(object.blockReward)
      : undefined;
    message.baseline = (object.baseline !== undefined && object.baseline !== null)
      ? Coin.fromPartial(object.baseline)
      : undefined;
    message.annualPercentageYield = object.annualPercentageYield ?? "";
    message.halvingPeriod = object.halvingPeriod ?? 0;
    message.adjustmentPeriod = object.adjustmentPeriod ?? 0;
    message.shareThreshold = object.shareThreshold ?? "";
    message.fishmenInfo = object.fishmenInfo ?? "";
    message.penaltyBase = object.penaltyBase ?? 0;
    message.maxPenalty = object.maxPenalty ?? 0;
    message.vstorageThreshold = object.vstorageThreshold ?? 0;
    message.offlineTriggerHeight = object.offlineTriggerHeight ?? 0;
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
