/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "saonetwork.sao.node";

export interface Node {
  creator: string;
  peer: string;
  reputation: number;
  status: number;
  lastAliveHeight: number;
  txAddresses: string[];
  description:
    | Description
    | undefined;
  /** 0 - normal sp; 1 - super sp */
  role: number;
  /** validator this address delegates to */
  validator: string;
}

export interface Description {
  details: string;
  identity: string;
  moniker: string;
  securityContact: string;
  website: string;
}

function createBaseNode(): Node {
  return {
    creator: "",
    peer: "",
    reputation: 0,
    status: 0,
    lastAliveHeight: 0,
    txAddresses: [],
    description: undefined,
    role: 0,
    validator: "",
  };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.peer !== "") {
      writer.uint32(18).string(message.peer);
    }
    if (message.reputation !== 0) {
      writer.uint32(29).float(message.reputation);
    }
    if (message.status !== 0) {
      writer.uint32(32).uint32(message.status);
    }
    if (message.lastAliveHeight !== 0) {
      writer.uint32(40).int64(message.lastAliveHeight);
    }
    for (const v of message.txAddresses) {
      writer.uint32(50).string(v!);
    }
    if (message.description !== undefined) {
      Description.encode(message.description, writer.uint32(58).fork()).ldelim();
    }
    if (message.role !== 0) {
      writer.uint32(64).uint32(message.role);
    }
    if (message.validator !== "") {
      writer.uint32(74).string(message.validator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.peer = reader.string();
          break;
        case 3:
          message.reputation = reader.float();
          break;
        case 4:
          message.status = reader.uint32();
          break;
        case 5:
          message.lastAliveHeight = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.txAddresses.push(reader.string());
          break;
        case 7:
          message.description = Description.decode(reader, reader.uint32());
          break;
        case 8:
          message.role = reader.uint32();
          break;
        case 9:
          message.validator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Node {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      peer: isSet(object.peer) ? String(object.peer) : "",
      reputation: isSet(object.reputation) ? Number(object.reputation) : 0,
      status: isSet(object.status) ? Number(object.status) : 0,
      lastAliveHeight: isSet(object.lastAliveHeight) ? Number(object.lastAliveHeight) : 0,
      txAddresses: Array.isArray(object?.txAddresses) ? object.txAddresses.map((e: any) => String(e)) : [],
      description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
      role: isSet(object.role) ? Number(object.role) : 0,
      validator: isSet(object.validator) ? String(object.validator) : "",
    };
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.peer !== undefined && (obj.peer = message.peer);
    message.reputation !== undefined && (obj.reputation = message.reputation);
    message.status !== undefined && (obj.status = Math.round(message.status));
    message.lastAliveHeight !== undefined && (obj.lastAliveHeight = Math.round(message.lastAliveHeight));
    if (message.txAddresses) {
      obj.txAddresses = message.txAddresses.map((e) => e);
    } else {
      obj.txAddresses = [];
    }
    message.description !== undefined
      && (obj.description = message.description ? Description.toJSON(message.description) : undefined);
    message.role !== undefined && (obj.role = Math.round(message.role));
    message.validator !== undefined && (obj.validator = message.validator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Node>, I>>(object: I): Node {
    const message = createBaseNode();
    message.creator = object.creator ?? "";
    message.peer = object.peer ?? "";
    message.reputation = object.reputation ?? 0;
    message.status = object.status ?? 0;
    message.lastAliveHeight = object.lastAliveHeight ?? 0;
    message.txAddresses = object.txAddresses?.map((e) => e) || [];
    message.description = (object.description !== undefined && object.description !== null)
      ? Description.fromPartial(object.description)
      : undefined;
    message.role = object.role ?? 0;
    message.validator = object.validator ?? "";
    return message;
  },
};

function createBaseDescription(): Description {
  return { details: "", identity: "", moniker: "", securityContact: "", website: "" };
}

export const Description = {
  encode(message: Description, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.details !== "") {
      writer.uint32(10).string(message.details);
    }
    if (message.identity !== "") {
      writer.uint32(18).string(message.identity);
    }
    if (message.moniker !== "") {
      writer.uint32(26).string(message.moniker);
    }
    if (message.securityContact !== "") {
      writer.uint32(34).string(message.securityContact);
    }
    if (message.website !== "") {
      writer.uint32(42).string(message.website);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Description {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.details = reader.string();
          break;
        case 2:
          message.identity = reader.string();
          break;
        case 3:
          message.moniker = reader.string();
          break;
        case 4:
          message.securityContact = reader.string();
          break;
        case 5:
          message.website = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Description {
    return {
      details: isSet(object.details) ? String(object.details) : "",
      identity: isSet(object.identity) ? String(object.identity) : "",
      moniker: isSet(object.moniker) ? String(object.moniker) : "",
      securityContact: isSet(object.securityContact) ? String(object.securityContact) : "",
      website: isSet(object.website) ? String(object.website) : "",
    };
  },

  toJSON(message: Description): unknown {
    const obj: any = {};
    message.details !== undefined && (obj.details = message.details);
    message.identity !== undefined && (obj.identity = message.identity);
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.securityContact !== undefined && (obj.securityContact = message.securityContact);
    message.website !== undefined && (obj.website = message.website);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Description>, I>>(object: I): Description {
    const message = createBaseDescription();
    message.details = object.details ?? "";
    message.identity = object.identity ?? "";
    message.moniker = object.moniker ?? "";
    message.securityContact = object.securityContact ?? "";
    message.website = object.website ?? "";
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
