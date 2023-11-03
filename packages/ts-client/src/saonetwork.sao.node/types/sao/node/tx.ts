/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Description } from "./node";

export const protobufPackage = "saonetwork.sao.node";

export interface MsgCreate {
  creator: string;
}

export interface MsgCreateResponse {
}

export interface MsgReset {
  creator: string;
  peer: string;
  status: number;
  txAddresses: string[];
  description: Description | undefined;
  validator: string;
}

export interface MsgResetResponse {
}

export interface MsgClaimReward {
  creator: string;
}

export interface MsgClaimRewardResponse {
  claimedReward: number;
}

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgAddVstorage {
  creator: string;
  size: number;
}

export interface MsgAddVstorageResponse {
}

export interface MsgRemoveVstorage {
  creator: string;
  size: number;
}

export interface MsgRemoveVstorageResponse {
}

function createBaseMsgCreate(): MsgCreate {
  return { creator: "" };
}

export const MsgCreate = {
  encode(message: MsgCreate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreate {
    return { creator: isSet(object.creator) ? String(object.creator) : "" };
  },

  toJSON(message: MsgCreate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreate>, I>>(object: I): MsgCreate {
    const message = createBaseMsgCreate();
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseMsgCreateResponse(): MsgCreateResponse {
  return {};
}

export const MsgCreateResponse = {
  encode(_: MsgCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateResponse {
    return {};
  },

  toJSON(_: MsgCreateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateResponse>, I>>(_: I): MsgCreateResponse {
    const message = createBaseMsgCreateResponse();
    return message;
  },
};

function createBaseMsgReset(): MsgReset {
  return { creator: "", peer: "", status: 0, txAddresses: [], description: undefined, validator: "" };
}

export const MsgReset = {
  encode(message: MsgReset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.peer !== "") {
      writer.uint32(18).string(message.peer);
    }
    if (message.status !== 0) {
      writer.uint32(24).uint32(message.status);
    }
    for (const v of message.txAddresses) {
      writer.uint32(34).string(v!);
    }
    if (message.description !== undefined) {
      Description.encode(message.description, writer.uint32(42).fork()).ldelim();
    }
    if (message.validator !== "") {
      writer.uint32(50).string(message.validator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgReset {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReset();
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
          message.status = reader.uint32();
          break;
        case 4:
          message.txAddresses.push(reader.string());
          break;
        case 5:
          message.description = Description.decode(reader, reader.uint32());
          break;
        case 6:
          message.validator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReset {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      peer: isSet(object.peer) ? String(object.peer) : "",
      status: isSet(object.status) ? Number(object.status) : 0,
      txAddresses: Array.isArray(object?.txAddresses) ? object.txAddresses.map((e: any) => String(e)) : [],
      description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
      validator: isSet(object.validator) ? String(object.validator) : "",
    };
  },

  toJSON(message: MsgReset): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.peer !== undefined && (obj.peer = message.peer);
    message.status !== undefined && (obj.status = Math.round(message.status));
    if (message.txAddresses) {
      obj.txAddresses = message.txAddresses.map((e) => e);
    } else {
      obj.txAddresses = [];
    }
    message.description !== undefined
      && (obj.description = message.description ? Description.toJSON(message.description) : undefined);
    message.validator !== undefined && (obj.validator = message.validator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReset>, I>>(object: I): MsgReset {
    const message = createBaseMsgReset();
    message.creator = object.creator ?? "";
    message.peer = object.peer ?? "";
    message.status = object.status ?? 0;
    message.txAddresses = object.txAddresses?.map((e) => e) || [];
    message.description = (object.description !== undefined && object.description !== null)
      ? Description.fromPartial(object.description)
      : undefined;
    message.validator = object.validator ?? "";
    return message;
  },
};

function createBaseMsgResetResponse(): MsgResetResponse {
  return {};
}

export const MsgResetResponse = {
  encode(_: MsgResetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgResetResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgResetResponse {
    return {};
  },

  toJSON(_: MsgResetResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgResetResponse>, I>>(_: I): MsgResetResponse {
    const message = createBaseMsgResetResponse();
    return message;
  },
};

function createBaseMsgClaimReward(): MsgClaimReward {
  return { creator: "" };
}

export const MsgClaimReward = {
  encode(message: MsgClaimReward, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimReward {
    return { creator: isSet(object.creator) ? String(object.creator) : "" };
  },

  toJSON(message: MsgClaimReward): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimReward>, I>>(object: I): MsgClaimReward {
    const message = createBaseMsgClaimReward();
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseMsgClaimRewardResponse(): MsgClaimRewardResponse {
  return { claimedReward: 0 };
}

export const MsgClaimRewardResponse = {
  encode(message: MsgClaimRewardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.claimedReward !== 0) {
      writer.uint32(8).uint64(message.claimedReward);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimRewardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimRewardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimedReward = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimRewardResponse {
    return { claimedReward: isSet(object.claimedReward) ? Number(object.claimedReward) : 0 };
  },

  toJSON(message: MsgClaimRewardResponse): unknown {
    const obj: any = {};
    message.claimedReward !== undefined && (obj.claimedReward = Math.round(message.claimedReward));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimRewardResponse>, I>>(object: I): MsgClaimRewardResponse {
    const message = createBaseMsgClaimRewardResponse();
    message.claimedReward = object.claimedReward ?? 0;
    return message;
  },
};

function createBaseMsgAddVstorage(): MsgAddVstorage {
  return { creator: "", size: 0 };
}

export const MsgAddVstorage = {
  encode(message: MsgAddVstorage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.size !== 0) {
      writer.uint32(16).uint64(message.size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddVstorage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddVstorage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.size = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddVstorage {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
    };
  },

  toJSON(message: MsgAddVstorage): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.size !== undefined && (obj.size = Math.round(message.size));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddVstorage>, I>>(object: I): MsgAddVstorage {
    const message = createBaseMsgAddVstorage();
    message.creator = object.creator ?? "";
    message.size = object.size ?? 0;
    return message;
  },
};

function createBaseMsgAddVstorageResponse(): MsgAddVstorageResponse {
  return {};
}

export const MsgAddVstorageResponse = {
  encode(_: MsgAddVstorageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddVstorageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddVstorageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddVstorageResponse {
    return {};
  },

  toJSON(_: MsgAddVstorageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddVstorageResponse>, I>>(_: I): MsgAddVstorageResponse {
    const message = createBaseMsgAddVstorageResponse();
    return message;
  },
};

function createBaseMsgRemoveVstorage(): MsgRemoveVstorage {
  return { creator: "", size: 0 };
}

export const MsgRemoveVstorage = {
  encode(message: MsgRemoveVstorage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.size !== 0) {
      writer.uint32(16).uint64(message.size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveVstorage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveVstorage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.size = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveVstorage {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
    };
  },

  toJSON(message: MsgRemoveVstorage): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.size !== undefined && (obj.size = Math.round(message.size));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveVstorage>, I>>(object: I): MsgRemoveVstorage {
    const message = createBaseMsgRemoveVstorage();
    message.creator = object.creator ?? "";
    message.size = object.size ?? 0;
    return message;
  },
};

function createBaseMsgRemoveVstorageResponse(): MsgRemoveVstorageResponse {
  return {};
}

export const MsgRemoveVstorageResponse = {
  encode(_: MsgRemoveVstorageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveVstorageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveVstorageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveVstorageResponse {
    return {};
  },

  toJSON(_: MsgRemoveVstorageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveVstorageResponse>, I>>(_: I): MsgRemoveVstorageResponse {
    const message = createBaseMsgRemoveVstorageResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  Create(request: MsgCreate): Promise<MsgCreateResponse>;
  Reset(request: MsgReset): Promise<MsgResetResponse>;
  ClaimReward(request: MsgClaimReward): Promise<MsgClaimRewardResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  AddVstorage(request: MsgAddVstorage): Promise<MsgAddVstorageResponse>;
  RemoveVstorage(request: MsgRemoveVstorage): Promise<MsgRemoveVstorageResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Create = this.Create.bind(this);
    this.Reset = this.Reset.bind(this);
    this.ClaimReward = this.ClaimReward.bind(this);
    this.AddVstorage = this.AddVstorage.bind(this);
    this.RemoveVstorage = this.RemoveVstorage.bind(this);
  }
  Create(request: MsgCreate): Promise<MsgCreateResponse> {
    const data = MsgCreate.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Msg", "Create", data);
    return promise.then((data) => MsgCreateResponse.decode(new _m0.Reader(data)));
  }

  Reset(request: MsgReset): Promise<MsgResetResponse> {
    const data = MsgReset.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Msg", "Reset", data);
    return promise.then((data) => MsgResetResponse.decode(new _m0.Reader(data)));
  }

  ClaimReward(request: MsgClaimReward): Promise<MsgClaimRewardResponse> {
    const data = MsgClaimReward.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Msg", "ClaimReward", data);
    return promise.then((data) => MsgClaimRewardResponse.decode(new _m0.Reader(data)));
  }

  AddVstorage(request: MsgAddVstorage): Promise<MsgAddVstorageResponse> {
    const data = MsgAddVstorage.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Msg", "AddVstorage", data);
    return promise.then((data) => MsgAddVstorageResponse.decode(new _m0.Reader(data)));
  }

  RemoveVstorage(request: MsgRemoveVstorage): Promise<MsgRemoveVstorageResponse> {
    const data = MsgRemoveVstorage.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.node.Msg", "RemoveVstorage", data);
    return promise.then((data) => MsgRemoveVstorageResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
