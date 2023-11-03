/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin, DecCoin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "saonetwork.sao.loan";

export interface LoanPool {
  total: DecCoin | undefined;
  loanedOut: Coin | undefined;
  accInterestPerCoin: DecCoin | undefined;
}

function createBaseLoanPool(): LoanPool {
  return { total: undefined, loanedOut: undefined, accInterestPerCoin: undefined };
}

export const LoanPool = {
  encode(message: LoanPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== undefined) {
      DecCoin.encode(message.total, writer.uint32(10).fork()).ldelim();
    }
    if (message.loanedOut !== undefined) {
      Coin.encode(message.loanedOut, writer.uint32(18).fork()).ldelim();
    }
    if (message.accInterestPerCoin !== undefined) {
      DecCoin.encode(message.accInterestPerCoin, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoanPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoanPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = DecCoin.decode(reader, reader.uint32());
          break;
        case 2:
          message.loanedOut = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.accInterestPerCoin = DecCoin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoanPool {
    return {
      total: isSet(object.total) ? DecCoin.fromJSON(object.total) : undefined,
      loanedOut: isSet(object.loanedOut) ? Coin.fromJSON(object.loanedOut) : undefined,
      accInterestPerCoin: isSet(object.accInterestPerCoin) ? DecCoin.fromJSON(object.accInterestPerCoin) : undefined,
    };
  },

  toJSON(message: LoanPool): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = message.total ? DecCoin.toJSON(message.total) : undefined);
    message.loanedOut !== undefined && (obj.loanedOut = message.loanedOut ? Coin.toJSON(message.loanedOut) : undefined);
    message.accInterestPerCoin !== undefined
      && (obj.accInterestPerCoin = message.accInterestPerCoin ? DecCoin.toJSON(message.accInterestPerCoin) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoanPool>, I>>(object: I): LoanPool {
    const message = createBaseLoanPool();
    message.total = (object.total !== undefined && object.total !== null)
      ? DecCoin.fromPartial(object.total)
      : undefined;
    message.loanedOut = (object.loanedOut !== undefined && object.loanedOut !== null)
      ? Coin.fromPartial(object.loanedOut)
      : undefined;
    message.accInterestPerCoin = (object.accInterestPerCoin !== undefined && object.accInterestPerCoin !== null)
      ? DecCoin.fromPartial(object.accInterestPerCoin)
      : undefined;
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
