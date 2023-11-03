/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { AccountAuth } from "./account_auth";
import { BindingProof } from "./binding_proof";
import { PubKey } from "./pub_key";

export const protobufPackage = "saonetwork.sao.did";

export interface MsgUpdatePaymentAddress {
  creator: string;
  accountId: string;
  did: string;
}

export interface MsgUpdatePaymentAddressResponse {
}

export interface MsgBinding {
  creator: string;
  accountId: string;
  rootDocId: string;
  keys: PubKey[];
  accountAuth: AccountAuth | undefined;
  proof: BindingProof | undefined;
}

export interface MsgBindingResponse {
}

export interface MsgUpdate {
  creator: string;
  did: string;
  newDocId: string;
  keys: PubKey[];
  timestamp: number;
  updateAccountAuth: AccountAuth[];
  removeAccountDid: string[];
  pastSeed: string;
}

export interface MsgUpdateResponse {
}

function createBaseMsgUpdatePaymentAddress(): MsgUpdatePaymentAddress {
  return { creator: "", accountId: "", did: "" };
}

export const MsgUpdatePaymentAddress = {
  encode(message: MsgUpdatePaymentAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.accountId !== "") {
      writer.uint32(18).string(message.accountId);
    }
    if (message.did !== "") {
      writer.uint32(26).string(message.did);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePaymentAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePaymentAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.accountId = reader.string();
          break;
        case 3:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePaymentAddress {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      accountId: isSet(object.accountId) ? String(object.accountId) : "",
      did: isSet(object.did) ? String(object.did) : "",
    };
  },

  toJSON(message: MsgUpdatePaymentAddress): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePaymentAddress>, I>>(object: I): MsgUpdatePaymentAddress {
    const message = createBaseMsgUpdatePaymentAddress();
    message.creator = object.creator ?? "";
    message.accountId = object.accountId ?? "";
    message.did = object.did ?? "";
    return message;
  },
};

function createBaseMsgUpdatePaymentAddressResponse(): MsgUpdatePaymentAddressResponse {
  return {};
}

export const MsgUpdatePaymentAddressResponse = {
  encode(_: MsgUpdatePaymentAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePaymentAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePaymentAddressResponse();
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

  fromJSON(_: any): MsgUpdatePaymentAddressResponse {
    return {};
  },

  toJSON(_: MsgUpdatePaymentAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePaymentAddressResponse>, I>>(_: I): MsgUpdatePaymentAddressResponse {
    const message = createBaseMsgUpdatePaymentAddressResponse();
    return message;
  },
};

function createBaseMsgBinding(): MsgBinding {
  return { creator: "", accountId: "", rootDocId: "", keys: [], accountAuth: undefined, proof: undefined };
}

export const MsgBinding = {
  encode(message: MsgBinding, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.accountId !== "") {
      writer.uint32(18).string(message.accountId);
    }
    if (message.rootDocId !== "") {
      writer.uint32(26).string(message.rootDocId);
    }
    for (const v of message.keys) {
      PubKey.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.accountAuth !== undefined) {
      AccountAuth.encode(message.accountAuth, writer.uint32(42).fork()).ldelim();
    }
    if (message.proof !== undefined) {
      BindingProof.encode(message.proof, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBinding {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBinding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.accountId = reader.string();
          break;
        case 3:
          message.rootDocId = reader.string();
          break;
        case 4:
          message.keys.push(PubKey.decode(reader, reader.uint32()));
          break;
        case 5:
          message.accountAuth = AccountAuth.decode(reader, reader.uint32());
          break;
        case 6:
          message.proof = BindingProof.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBinding {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      accountId: isSet(object.accountId) ? String(object.accountId) : "",
      rootDocId: isSet(object.rootDocId) ? String(object.rootDocId) : "",
      keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => PubKey.fromJSON(e)) : [],
      accountAuth: isSet(object.accountAuth) ? AccountAuth.fromJSON(object.accountAuth) : undefined,
      proof: isSet(object.proof) ? BindingProof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: MsgBinding): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.rootDocId !== undefined && (obj.rootDocId = message.rootDocId);
    if (message.keys) {
      obj.keys = message.keys.map((e) => e ? PubKey.toJSON(e) : undefined);
    } else {
      obj.keys = [];
    }
    message.accountAuth !== undefined
      && (obj.accountAuth = message.accountAuth ? AccountAuth.toJSON(message.accountAuth) : undefined);
    message.proof !== undefined && (obj.proof = message.proof ? BindingProof.toJSON(message.proof) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBinding>, I>>(object: I): MsgBinding {
    const message = createBaseMsgBinding();
    message.creator = object.creator ?? "";
    message.accountId = object.accountId ?? "";
    message.rootDocId = object.rootDocId ?? "";
    message.keys = object.keys?.map((e) => PubKey.fromPartial(e)) || [];
    message.accountAuth = (object.accountAuth !== undefined && object.accountAuth !== null)
      ? AccountAuth.fromPartial(object.accountAuth)
      : undefined;
    message.proof = (object.proof !== undefined && object.proof !== null)
      ? BindingProof.fromPartial(object.proof)
      : undefined;
    return message;
  },
};

function createBaseMsgBindingResponse(): MsgBindingResponse {
  return {};
}

export const MsgBindingResponse = {
  encode(_: MsgBindingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBindingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBindingResponse();
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

  fromJSON(_: any): MsgBindingResponse {
    return {};
  },

  toJSON(_: MsgBindingResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBindingResponse>, I>>(_: I): MsgBindingResponse {
    const message = createBaseMsgBindingResponse();
    return message;
  },
};

function createBaseMsgUpdate(): MsgUpdate {
  return {
    creator: "",
    did: "",
    newDocId: "",
    keys: [],
    timestamp: 0,
    updateAccountAuth: [],
    removeAccountDid: [],
    pastSeed: "",
  };
}

export const MsgUpdate = {
  encode(message: MsgUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.did !== "") {
      writer.uint32(18).string(message.did);
    }
    if (message.newDocId !== "") {
      writer.uint32(26).string(message.newDocId);
    }
    for (const v of message.keys) {
      PubKey.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.timestamp !== 0) {
      writer.uint32(40).uint64(message.timestamp);
    }
    for (const v of message.updateAccountAuth) {
      AccountAuth.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.removeAccountDid) {
      writer.uint32(58).string(v!);
    }
    if (message.pastSeed !== "") {
      writer.uint32(66).string(message.pastSeed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.did = reader.string();
          break;
        case 3:
          message.newDocId = reader.string();
          break;
        case 4:
          message.keys.push(PubKey.decode(reader, reader.uint32()));
          break;
        case 5:
          message.timestamp = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.updateAccountAuth.push(AccountAuth.decode(reader, reader.uint32()));
          break;
        case 7:
          message.removeAccountDid.push(reader.string());
          break;
        case 8:
          message.pastSeed = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdate {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      did: isSet(object.did) ? String(object.did) : "",
      newDocId: isSet(object.newDocId) ? String(object.newDocId) : "",
      keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => PubKey.fromJSON(e)) : [],
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      updateAccountAuth: Array.isArray(object?.updateAccountAuth)
        ? object.updateAccountAuth.map((e: any) => AccountAuth.fromJSON(e))
        : [],
      removeAccountDid: Array.isArray(object?.removeAccountDid)
        ? object.removeAccountDid.map((e: any) => String(e))
        : [],
      pastSeed: isSet(object.pastSeed) ? String(object.pastSeed) : "",
    };
  },

  toJSON(message: MsgUpdate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.did !== undefined && (obj.did = message.did);
    message.newDocId !== undefined && (obj.newDocId = message.newDocId);
    if (message.keys) {
      obj.keys = message.keys.map((e) => e ? PubKey.toJSON(e) : undefined);
    } else {
      obj.keys = [];
    }
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    if (message.updateAccountAuth) {
      obj.updateAccountAuth = message.updateAccountAuth.map((e) => e ? AccountAuth.toJSON(e) : undefined);
    } else {
      obj.updateAccountAuth = [];
    }
    if (message.removeAccountDid) {
      obj.removeAccountDid = message.removeAccountDid.map((e) => e);
    } else {
      obj.removeAccountDid = [];
    }
    message.pastSeed !== undefined && (obj.pastSeed = message.pastSeed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdate>, I>>(object: I): MsgUpdate {
    const message = createBaseMsgUpdate();
    message.creator = object.creator ?? "";
    message.did = object.did ?? "";
    message.newDocId = object.newDocId ?? "";
    message.keys = object.keys?.map((e) => PubKey.fromPartial(e)) || [];
    message.timestamp = object.timestamp ?? 0;
    message.updateAccountAuth = object.updateAccountAuth?.map((e) => AccountAuth.fromPartial(e)) || [];
    message.removeAccountDid = object.removeAccountDid?.map((e) => e) || [];
    message.pastSeed = object.pastSeed ?? "";
    return message;
  },
};

function createBaseMsgUpdateResponse(): MsgUpdateResponse {
  return {};
}

export const MsgUpdateResponse = {
  encode(_: MsgUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateResponse();
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

  fromJSON(_: any): MsgUpdateResponse {
    return {};
  },

  toJSON(_: MsgUpdateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateResponse>, I>>(_: I): MsgUpdateResponse {
    const message = createBaseMsgUpdateResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  UpdatePaymentAddress(request: MsgUpdatePaymentAddress): Promise<MsgUpdatePaymentAddressResponse>;
  Binding(request: MsgBinding): Promise<MsgBindingResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Update(request: MsgUpdate): Promise<MsgUpdateResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpdatePaymentAddress = this.UpdatePaymentAddress.bind(this);
    this.Binding = this.Binding.bind(this);
    this.Update = this.Update.bind(this);
  }
  UpdatePaymentAddress(request: MsgUpdatePaymentAddress): Promise<MsgUpdatePaymentAddressResponse> {
    const data = MsgUpdatePaymentAddress.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Msg", "UpdatePaymentAddress", data);
    return promise.then((data) => MsgUpdatePaymentAddressResponse.decode(new _m0.Reader(data)));
  }

  Binding(request: MsgBinding): Promise<MsgBindingResponse> {
    const data = MsgBinding.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Msg", "Binding", data);
    return promise.then((data) => MsgBindingResponse.decode(new _m0.Reader(data)));
  }

  Update(request: MsgUpdate): Promise<MsgUpdateResponse> {
    const data = MsgUpdate.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.did.Msg", "Update", data);
    return promise.then((data) => MsgUpdateResponse.decode(new _m0.Reader(data)));
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
