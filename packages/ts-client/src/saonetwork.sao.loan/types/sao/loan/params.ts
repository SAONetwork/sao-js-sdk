/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "saonetwork.sao.loan";

/** Params defines the parameters for the module. */
export interface Params {
  InterestRatePerBlock: string;
  minLiquidityRatio: string;
}

function createBaseParams(): Params {
  return { InterestRatePerBlock: "", minLiquidityRatio: "" };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.InterestRatePerBlock !== "") {
      writer.uint32(10).string(message.InterestRatePerBlock);
    }
    if (message.minLiquidityRatio !== "") {
      writer.uint32(18).string(message.minLiquidityRatio);
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
          message.InterestRatePerBlock = reader.string();
          break;
        case 2:
          message.minLiquidityRatio = reader.string();
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
      InterestRatePerBlock: isSet(object.InterestRatePerBlock) ? String(object.InterestRatePerBlock) : "",
      minLiquidityRatio: isSet(object.minLiquidityRatio) ? String(object.minLiquidityRatio) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.InterestRatePerBlock !== undefined && (obj.InterestRatePerBlock = message.InterestRatePerBlock);
    message.minLiquidityRatio !== undefined && (obj.minLiquidityRatio = message.minLiquidityRatio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.InterestRatePerBlock = object.InterestRatePerBlock ?? "";
    message.minLiquidityRatio = object.minLiquidityRatio ?? "";
    return message;
  },
};

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
