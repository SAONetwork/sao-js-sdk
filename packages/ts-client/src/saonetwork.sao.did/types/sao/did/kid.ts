/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "saonetwork.sao.did";

export interface Kid {
  address: string;
  kid: string;
}

function createBaseKid(): Kid {
  return { address: "", kid: "" };
}

export const Kid = {
  encode(message: Kid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.kid !== "") {
      writer.uint32(18).string(message.kid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Kid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.kid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Kid {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      kid: isSet(object.kid) ? String(object.kid) : "",
    };
  },

  toJSON(message: Kid): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.kid !== undefined && (obj.kid = message.kid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Kid>, I>>(object: I): Kid {
    const message = createBaseKid();
    message.address = object.address ?? "";
    message.kid = object.kid ?? "";
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
