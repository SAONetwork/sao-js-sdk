/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "saonetwork.sao.did";

export interface Did {
  accountId: string;
  did: string;
}

function createBaseDid(): Did {
  return { accountId: "", did: "" };
}

export const Did = {
  encode(message: Did, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountId !== "") {
      writer.uint32(10).string(message.accountId);
    }
    if (message.did !== "") {
      writer.uint32(18).string(message.did);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Did {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountId = reader.string();
          break;
        case 2:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Did {
    return {
      accountId: isSet(object.accountId) ? String(object.accountId) : "",
      did: isSet(object.did) ? String(object.did) : "",
    };
  },

  toJSON(message: Did): unknown {
    const obj: any = {};
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Did>, I>>(object: I): Did {
    const message = createBaseDid();
    message.accountId = object.accountId ?? "";
    message.did = object.did ?? "";
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
