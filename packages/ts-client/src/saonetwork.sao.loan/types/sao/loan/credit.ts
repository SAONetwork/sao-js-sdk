/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "saonetwork.sao.loan";

export interface Credit {
  account: string;
  bonds: string;
}

function createBaseCredit(): Credit {
  return { account: "", bonds: "" };
}

export const Credit = {
  encode(message: Credit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.bonds !== "") {
      writer.uint32(18).string(message.bonds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Credit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.bonds = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Credit {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      bonds: isSet(object.bonds) ? String(object.bonds) : "",
    };
  },

  toJSON(message: Credit): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.bonds !== undefined && (obj.bonds = message.bonds);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Credit>, I>>(object: I): Credit {
    const message = createBaseCredit();
    message.account = object.account ?? "";
    message.bonds = object.bonds ?? "";
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
