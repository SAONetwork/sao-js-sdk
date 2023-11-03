/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Fault } from "./fault";
import { JwsSignature } from "./jws_signature";
import { PermissionProposal } from "./permission_proposal";
import { Proposal } from "./proposal";
import { RenewProposal } from "./renew_proposal";
import { ShardMeta } from "./shard_meta";
import { TerminateProposal } from "./terminate_proposal";

export const protobufPackage = "saonetwork.sao.sao";

export interface KV {
  k: string;
  v: string;
}

export interface MsgCancel {
  creator: string;
  orderId: number;
  provider: string;
}

export interface MsgCancelResponse {
}

export interface MsgComplete {
  creator: string;
  orderId: number;
  cid: string;
  size: number;
  provider: string;
}

export interface MsgCompleteResponse {
}

export interface MsgTerminate {
  creator: string;
  proposal: TerminateProposal | undefined;
  jwsSignature: JwsSignature | undefined;
  provider: string;
}

export interface MsgTerminateResponse {
}

export interface MsgReady {
  creator: string;
  orderId: number;
  provider: string;
}

export interface MsgReadyResponse {
  orderId: number;
  shards: ShardMeta[];
}

export interface MsgStore {
  creator: string;
  proposal: Proposal | undefined;
  jwsSignature: JwsSignature | undefined;
  provider: string;
}

export interface MsgStoreResponse {
  orderId: number;
  shards: ShardMeta[];
}

export interface MsgRenew {
  creator: string;
  proposal: RenewProposal | undefined;
  jwsSignature: JwsSignature | undefined;
  provider: string;
}

export interface MsgRenewResponse {
  result: KV[];
}

export interface MsgUpdataPermission {
  creator: string;
  proposal: PermissionProposal | undefined;
  jwsSignature: JwsSignature | undefined;
  provider: string;
}

export interface MsgUpdataPermissionResponse {
}

export interface MsgMigrate {
  creator: string;
  data: string[];
  provider: string;
}

export interface MsgMigrateResponse {
  result: KV[];
}

export interface MsgReportFaults {
  creator: string;
  provider: string;
  faults: Fault[];
}

export interface MsgReportFaultsResponse {
  faultIds: string[];
}

export interface MsgRecoverFaults {
  creator: string;
  reportId: string;
  provider: string;
  faults: Fault[];
}

export interface MsgRecoverFaultsResponse {
  faultIds: string[];
}

function createBaseKV(): KV {
  return { k: "", v: "" };
}

export const KV = {
  encode(message: KV, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.k !== "") {
      writer.uint32(10).string(message.k);
    }
    if (message.v !== "") {
      writer.uint32(18).string(message.v);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KV {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKV();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.k = reader.string();
          break;
        case 2:
          message.v = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KV {
    return { k: isSet(object.k) ? String(object.k) : "", v: isSet(object.v) ? String(object.v) : "" };
  },

  toJSON(message: KV): unknown {
    const obj: any = {};
    message.k !== undefined && (obj.k = message.k);
    message.v !== undefined && (obj.v = message.v);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KV>, I>>(object: I): KV {
    const message = createBaseKV();
    message.k = object.k ?? "";
    message.v = object.v ?? "";
    return message;
  },
};

function createBaseMsgCancel(): MsgCancel {
  return { creator: "", orderId: 0, provider: "" };
}

export const MsgCancel = {
  encode(message: MsgCancel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.orderId !== 0) {
      writer.uint32(16).uint64(message.orderId);
    }
    if (message.provider !== "") {
      writer.uint32(26).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.orderId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancel {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      orderId: isSet(object.orderId) ? Number(object.orderId) : 0,
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgCancel): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.orderId !== undefined && (obj.orderId = Math.round(message.orderId));
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancel>, I>>(object: I): MsgCancel {
    const message = createBaseMsgCancel();
    message.creator = object.creator ?? "";
    message.orderId = object.orderId ?? 0;
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgCancelResponse(): MsgCancelResponse {
  return {};
}

export const MsgCancelResponse = {
  encode(_: MsgCancelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelResponse();
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

  fromJSON(_: any): MsgCancelResponse {
    return {};
  },

  toJSON(_: MsgCancelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelResponse>, I>>(_: I): MsgCancelResponse {
    const message = createBaseMsgCancelResponse();
    return message;
  },
};

function createBaseMsgComplete(): MsgComplete {
  return { creator: "", orderId: 0, cid: "", size: 0, provider: "" };
}

export const MsgComplete = {
  encode(message: MsgComplete, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.orderId !== 0) {
      writer.uint32(16).uint64(message.orderId);
    }
    if (message.cid !== "") {
      writer.uint32(26).string(message.cid);
    }
    if (message.size !== 0) {
      writer.uint32(32).uint64(message.size);
    }
    if (message.provider !== "") {
      writer.uint32(42).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgComplete {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgComplete();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.orderId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.cid = reader.string();
          break;
        case 4:
          message.size = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgComplete {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      orderId: isSet(object.orderId) ? Number(object.orderId) : 0,
      cid: isSet(object.cid) ? String(object.cid) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgComplete): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.orderId !== undefined && (obj.orderId = Math.round(message.orderId));
    message.cid !== undefined && (obj.cid = message.cid);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgComplete>, I>>(object: I): MsgComplete {
    const message = createBaseMsgComplete();
    message.creator = object.creator ?? "";
    message.orderId = object.orderId ?? 0;
    message.cid = object.cid ?? "";
    message.size = object.size ?? 0;
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgCompleteResponse(): MsgCompleteResponse {
  return {};
}

export const MsgCompleteResponse = {
  encode(_: MsgCompleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCompleteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCompleteResponse();
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

  fromJSON(_: any): MsgCompleteResponse {
    return {};
  },

  toJSON(_: MsgCompleteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCompleteResponse>, I>>(_: I): MsgCompleteResponse {
    const message = createBaseMsgCompleteResponse();
    return message;
  },
};

function createBaseMsgTerminate(): MsgTerminate {
  return { creator: "", proposal: undefined, jwsSignature: undefined, provider: "" };
}

export const MsgTerminate = {
  encode(message: MsgTerminate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.proposal !== undefined) {
      TerminateProposal.encode(message.proposal, writer.uint32(18).fork()).ldelim();
    }
    if (message.jwsSignature !== undefined) {
      JwsSignature.encode(message.jwsSignature, writer.uint32(26).fork()).ldelim();
    }
    if (message.provider !== "") {
      writer.uint32(34).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTerminate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTerminate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.proposal = TerminateProposal.decode(reader, reader.uint32());
          break;
        case 3:
          message.jwsSignature = JwsSignature.decode(reader, reader.uint32());
          break;
        case 4:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTerminate {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      proposal: isSet(object.proposal) ? TerminateProposal.fromJSON(object.proposal) : undefined,
      jwsSignature: isSet(object.jwsSignature) ? JwsSignature.fromJSON(object.jwsSignature) : undefined,
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgTerminate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.proposal !== undefined
      && (obj.proposal = message.proposal ? TerminateProposal.toJSON(message.proposal) : undefined);
    message.jwsSignature !== undefined
      && (obj.jwsSignature = message.jwsSignature ? JwsSignature.toJSON(message.jwsSignature) : undefined);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTerminate>, I>>(object: I): MsgTerminate {
    const message = createBaseMsgTerminate();
    message.creator = object.creator ?? "";
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? TerminateProposal.fromPartial(object.proposal)
      : undefined;
    message.jwsSignature = (object.jwsSignature !== undefined && object.jwsSignature !== null)
      ? JwsSignature.fromPartial(object.jwsSignature)
      : undefined;
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgTerminateResponse(): MsgTerminateResponse {
  return {};
}

export const MsgTerminateResponse = {
  encode(_: MsgTerminateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTerminateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTerminateResponse();
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

  fromJSON(_: any): MsgTerminateResponse {
    return {};
  },

  toJSON(_: MsgTerminateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTerminateResponse>, I>>(_: I): MsgTerminateResponse {
    const message = createBaseMsgTerminateResponse();
    return message;
  },
};

function createBaseMsgReady(): MsgReady {
  return { creator: "", orderId: 0, provider: "" };
}

export const MsgReady = {
  encode(message: MsgReady, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.orderId !== 0) {
      writer.uint32(16).uint64(message.orderId);
    }
    if (message.provider !== "") {
      writer.uint32(26).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgReady {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReady();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.orderId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReady {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      orderId: isSet(object.orderId) ? Number(object.orderId) : 0,
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgReady): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.orderId !== undefined && (obj.orderId = Math.round(message.orderId));
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReady>, I>>(object: I): MsgReady {
    const message = createBaseMsgReady();
    message.creator = object.creator ?? "";
    message.orderId = object.orderId ?? 0;
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgReadyResponse(): MsgReadyResponse {
  return { orderId: 0, shards: [] };
}

export const MsgReadyResponse = {
  encode(message: MsgReadyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== 0) {
      writer.uint32(8).uint64(message.orderId);
    }
    for (const v of message.shards) {
      ShardMeta.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgReadyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReadyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.shards.push(ShardMeta.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReadyResponse {
    return {
      orderId: isSet(object.orderId) ? Number(object.orderId) : 0,
      shards: Array.isArray(object?.shards) ? object.shards.map((e: any) => ShardMeta.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgReadyResponse): unknown {
    const obj: any = {};
    message.orderId !== undefined && (obj.orderId = Math.round(message.orderId));
    if (message.shards) {
      obj.shards = message.shards.map((e) => e ? ShardMeta.toJSON(e) : undefined);
    } else {
      obj.shards = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReadyResponse>, I>>(object: I): MsgReadyResponse {
    const message = createBaseMsgReadyResponse();
    message.orderId = object.orderId ?? 0;
    message.shards = object.shards?.map((e) => ShardMeta.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgStore(): MsgStore {
  return { creator: "", proposal: undefined, jwsSignature: undefined, provider: "" };
}

export const MsgStore = {
  encode(message: MsgStore, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(18).fork()).ldelim();
    }
    if (message.jwsSignature !== undefined) {
      JwsSignature.encode(message.jwsSignature, writer.uint32(26).fork()).ldelim();
    }
    if (message.provider !== "") {
      writer.uint32(34).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStore();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.proposal = Proposal.decode(reader, reader.uint32());
          break;
        case 3:
          message.jwsSignature = JwsSignature.decode(reader, reader.uint32());
          break;
        case 4:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStore {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined,
      jwsSignature: isSet(object.jwsSignature) ? JwsSignature.fromJSON(object.jwsSignature) : undefined,
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgStore): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.proposal !== undefined && (obj.proposal = message.proposal ? Proposal.toJSON(message.proposal) : undefined);
    message.jwsSignature !== undefined
      && (obj.jwsSignature = message.jwsSignature ? JwsSignature.toJSON(message.jwsSignature) : undefined);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStore>, I>>(object: I): MsgStore {
    const message = createBaseMsgStore();
    message.creator = object.creator ?? "";
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? Proposal.fromPartial(object.proposal)
      : undefined;
    message.jwsSignature = (object.jwsSignature !== undefined && object.jwsSignature !== null)
      ? JwsSignature.fromPartial(object.jwsSignature)
      : undefined;
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgStoreResponse(): MsgStoreResponse {
  return { orderId: 0, shards: [] };
}

export const MsgStoreResponse = {
  encode(message: MsgStoreResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== 0) {
      writer.uint32(8).uint64(message.orderId);
    }
    for (const v of message.shards) {
      ShardMeta.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.shards.push(ShardMeta.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStoreResponse {
    return {
      orderId: isSet(object.orderId) ? Number(object.orderId) : 0,
      shards: Array.isArray(object?.shards) ? object.shards.map((e: any) => ShardMeta.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgStoreResponse): unknown {
    const obj: any = {};
    message.orderId !== undefined && (obj.orderId = Math.round(message.orderId));
    if (message.shards) {
      obj.shards = message.shards.map((e) => e ? ShardMeta.toJSON(e) : undefined);
    } else {
      obj.shards = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStoreResponse>, I>>(object: I): MsgStoreResponse {
    const message = createBaseMsgStoreResponse();
    message.orderId = object.orderId ?? 0;
    message.shards = object.shards?.map((e) => ShardMeta.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgRenew(): MsgRenew {
  return { creator: "", proposal: undefined, jwsSignature: undefined, provider: "" };
}

export const MsgRenew = {
  encode(message: MsgRenew, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.proposal !== undefined) {
      RenewProposal.encode(message.proposal, writer.uint32(18).fork()).ldelim();
    }
    if (message.jwsSignature !== undefined) {
      JwsSignature.encode(message.jwsSignature, writer.uint32(26).fork()).ldelim();
    }
    if (message.provider !== "") {
      writer.uint32(34).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRenew {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRenew();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.proposal = RenewProposal.decode(reader, reader.uint32());
          break;
        case 3:
          message.jwsSignature = JwsSignature.decode(reader, reader.uint32());
          break;
        case 4:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRenew {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      proposal: isSet(object.proposal) ? RenewProposal.fromJSON(object.proposal) : undefined,
      jwsSignature: isSet(object.jwsSignature) ? JwsSignature.fromJSON(object.jwsSignature) : undefined,
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgRenew): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.proposal !== undefined
      && (obj.proposal = message.proposal ? RenewProposal.toJSON(message.proposal) : undefined);
    message.jwsSignature !== undefined
      && (obj.jwsSignature = message.jwsSignature ? JwsSignature.toJSON(message.jwsSignature) : undefined);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRenew>, I>>(object: I): MsgRenew {
    const message = createBaseMsgRenew();
    message.creator = object.creator ?? "";
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? RenewProposal.fromPartial(object.proposal)
      : undefined;
    message.jwsSignature = (object.jwsSignature !== undefined && object.jwsSignature !== null)
      ? JwsSignature.fromPartial(object.jwsSignature)
      : undefined;
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgRenewResponse(): MsgRenewResponse {
  return { result: [] };
}

export const MsgRenewResponse = {
  encode(message: MsgRenewResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      KV.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRenewResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRenewResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result.push(KV.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRenewResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => KV.fromJSON(e)) : [] };
  },

  toJSON(message: MsgRenewResponse): unknown {
    const obj: any = {};
    if (message.result) {
      obj.result = message.result.map((e) => e ? KV.toJSON(e) : undefined);
    } else {
      obj.result = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRenewResponse>, I>>(object: I): MsgRenewResponse {
    const message = createBaseMsgRenewResponse();
    message.result = object.result?.map((e) => KV.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgUpdataPermission(): MsgUpdataPermission {
  return { creator: "", proposal: undefined, jwsSignature: undefined, provider: "" };
}

export const MsgUpdataPermission = {
  encode(message: MsgUpdataPermission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.proposal !== undefined) {
      PermissionProposal.encode(message.proposal, writer.uint32(18).fork()).ldelim();
    }
    if (message.jwsSignature !== undefined) {
      JwsSignature.encode(message.jwsSignature, writer.uint32(26).fork()).ldelim();
    }
    if (message.provider !== "") {
      writer.uint32(34).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdataPermission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdataPermission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.proposal = PermissionProposal.decode(reader, reader.uint32());
          break;
        case 3:
          message.jwsSignature = JwsSignature.decode(reader, reader.uint32());
          break;
        case 4:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdataPermission {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      proposal: isSet(object.proposal) ? PermissionProposal.fromJSON(object.proposal) : undefined,
      jwsSignature: isSet(object.jwsSignature) ? JwsSignature.fromJSON(object.jwsSignature) : undefined,
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgUpdataPermission): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.proposal !== undefined
      && (obj.proposal = message.proposal ? PermissionProposal.toJSON(message.proposal) : undefined);
    message.jwsSignature !== undefined
      && (obj.jwsSignature = message.jwsSignature ? JwsSignature.toJSON(message.jwsSignature) : undefined);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdataPermission>, I>>(object: I): MsgUpdataPermission {
    const message = createBaseMsgUpdataPermission();
    message.creator = object.creator ?? "";
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? PermissionProposal.fromPartial(object.proposal)
      : undefined;
    message.jwsSignature = (object.jwsSignature !== undefined && object.jwsSignature !== null)
      ? JwsSignature.fromPartial(object.jwsSignature)
      : undefined;
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgUpdataPermissionResponse(): MsgUpdataPermissionResponse {
  return {};
}

export const MsgUpdataPermissionResponse = {
  encode(_: MsgUpdataPermissionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdataPermissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdataPermissionResponse();
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

  fromJSON(_: any): MsgUpdataPermissionResponse {
    return {};
  },

  toJSON(_: MsgUpdataPermissionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdataPermissionResponse>, I>>(_: I): MsgUpdataPermissionResponse {
    const message = createBaseMsgUpdataPermissionResponse();
    return message;
  },
};

function createBaseMsgMigrate(): MsgMigrate {
  return { creator: "", data: [], provider: "" };
}

export const MsgMigrate = {
  encode(message: MsgMigrate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.data) {
      writer.uint32(18).string(v!);
    }
    if (message.provider !== "") {
      writer.uint32(26).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMigrate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.data.push(reader.string());
          break;
        case 3:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMigrate {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      data: Array.isArray(object?.data) ? object.data.map((e: any) => String(e)) : [],
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgMigrate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.data) {
      obj.data = message.data.map((e) => e);
    } else {
      obj.data = [];
    }
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMigrate>, I>>(object: I): MsgMigrate {
    const message = createBaseMsgMigrate();
    message.creator = object.creator ?? "";
    message.data = object.data?.map((e) => e) || [];
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgMigrateResponse(): MsgMigrateResponse {
  return { result: [] };
}

export const MsgMigrateResponse = {
  encode(message: MsgMigrateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.result) {
      KV.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMigrateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result.push(KV.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMigrateResponse {
    return { result: Array.isArray(object?.result) ? object.result.map((e: any) => KV.fromJSON(e)) : [] };
  },

  toJSON(message: MsgMigrateResponse): unknown {
    const obj: any = {};
    if (message.result) {
      obj.result = message.result.map((e) => e ? KV.toJSON(e) : undefined);
    } else {
      obj.result = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMigrateResponse>, I>>(object: I): MsgMigrateResponse {
    const message = createBaseMsgMigrateResponse();
    message.result = object.result?.map((e) => KV.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgReportFaults(): MsgReportFaults {
  return { creator: "", provider: "", faults: [] };
}

export const MsgReportFaults = {
  encode(message: MsgReportFaults, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    for (const v of message.faults) {
      Fault.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgReportFaults {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReportFaults();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.provider = reader.string();
          break;
        case 3:
          message.faults.push(Fault.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReportFaults {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      faults: Array.isArray(object?.faults) ? object.faults.map((e: any) => Fault.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgReportFaults): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.provider !== undefined && (obj.provider = message.provider);
    if (message.faults) {
      obj.faults = message.faults.map((e) => e ? Fault.toJSON(e) : undefined);
    } else {
      obj.faults = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReportFaults>, I>>(object: I): MsgReportFaults {
    const message = createBaseMsgReportFaults();
    message.creator = object.creator ?? "";
    message.provider = object.provider ?? "";
    message.faults = object.faults?.map((e) => Fault.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgReportFaultsResponse(): MsgReportFaultsResponse {
  return { faultIds: [] };
}

export const MsgReportFaultsResponse = {
  encode(message: MsgReportFaultsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.faultIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgReportFaultsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReportFaultsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faultIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReportFaultsResponse {
    return { faultIds: Array.isArray(object?.faultIds) ? object.faultIds.map((e: any) => String(e)) : [] };
  },

  toJSON(message: MsgReportFaultsResponse): unknown {
    const obj: any = {};
    if (message.faultIds) {
      obj.faultIds = message.faultIds.map((e) => e);
    } else {
      obj.faultIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReportFaultsResponse>, I>>(object: I): MsgReportFaultsResponse {
    const message = createBaseMsgReportFaultsResponse();
    message.faultIds = object.faultIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRecoverFaults(): MsgRecoverFaults {
  return { creator: "", reportId: "", provider: "", faults: [] };
}

export const MsgRecoverFaults = {
  encode(message: MsgRecoverFaults, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.reportId !== "") {
      writer.uint32(18).string(message.reportId);
    }
    if (message.provider !== "") {
      writer.uint32(26).string(message.provider);
    }
    for (const v of message.faults) {
      Fault.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecoverFaults {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecoverFaults();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.reportId = reader.string();
          break;
        case 3:
          message.provider = reader.string();
          break;
        case 4:
          message.faults.push(Fault.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRecoverFaults {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      reportId: isSet(object.reportId) ? String(object.reportId) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      faults: Array.isArray(object?.faults) ? object.faults.map((e: any) => Fault.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgRecoverFaults): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.reportId !== undefined && (obj.reportId = message.reportId);
    message.provider !== undefined && (obj.provider = message.provider);
    if (message.faults) {
      obj.faults = message.faults.map((e) => e ? Fault.toJSON(e) : undefined);
    } else {
      obj.faults = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRecoverFaults>, I>>(object: I): MsgRecoverFaults {
    const message = createBaseMsgRecoverFaults();
    message.creator = object.creator ?? "";
    message.reportId = object.reportId ?? "";
    message.provider = object.provider ?? "";
    message.faults = object.faults?.map((e) => Fault.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgRecoverFaultsResponse(): MsgRecoverFaultsResponse {
  return { faultIds: [] };
}

export const MsgRecoverFaultsResponse = {
  encode(message: MsgRecoverFaultsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.faultIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecoverFaultsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecoverFaultsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faultIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRecoverFaultsResponse {
    return { faultIds: Array.isArray(object?.faultIds) ? object.faultIds.map((e: any) => String(e)) : [] };
  },

  toJSON(message: MsgRecoverFaultsResponse): unknown {
    const obj: any = {};
    if (message.faultIds) {
      obj.faultIds = message.faultIds.map((e) => e);
    } else {
      obj.faultIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRecoverFaultsResponse>, I>>(object: I): MsgRecoverFaultsResponse {
    const message = createBaseMsgRecoverFaultsResponse();
    message.faultIds = object.faultIds?.map((e) => e) || [];
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  Store(request: MsgStore): Promise<MsgStoreResponse>;
  Cancel(request: MsgCancel): Promise<MsgCancelResponse>;
  Complete(request: MsgComplete): Promise<MsgCompleteResponse>;
  Terminate(request: MsgTerminate): Promise<MsgTerminateResponse>;
  Ready(request: MsgReady): Promise<MsgReadyResponse>;
  Renew(request: MsgRenew): Promise<MsgRenewResponse>;
  UpdataPermission(request: MsgUpdataPermission): Promise<MsgUpdataPermissionResponse>;
  Migrate(request: MsgMigrate): Promise<MsgMigrateResponse>;
  ReportFaults(request: MsgReportFaults): Promise<MsgReportFaultsResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  RecoverFaults(request: MsgRecoverFaults): Promise<MsgRecoverFaultsResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Store = this.Store.bind(this);
    this.Cancel = this.Cancel.bind(this);
    this.Complete = this.Complete.bind(this);
    this.Terminate = this.Terminate.bind(this);
    this.Ready = this.Ready.bind(this);
    this.Renew = this.Renew.bind(this);
    this.UpdataPermission = this.UpdataPermission.bind(this);
    this.Migrate = this.Migrate.bind(this);
    this.ReportFaults = this.ReportFaults.bind(this);
    this.RecoverFaults = this.RecoverFaults.bind(this);
  }
  Store(request: MsgStore): Promise<MsgStoreResponse> {
    const data = MsgStore.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "Store", data);
    return promise.then((data) => MsgStoreResponse.decode(new _m0.Reader(data)));
  }

  Cancel(request: MsgCancel): Promise<MsgCancelResponse> {
    const data = MsgCancel.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "Cancel", data);
    return promise.then((data) => MsgCancelResponse.decode(new _m0.Reader(data)));
  }

  Complete(request: MsgComplete): Promise<MsgCompleteResponse> {
    const data = MsgComplete.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "Complete", data);
    return promise.then((data) => MsgCompleteResponse.decode(new _m0.Reader(data)));
  }

  Terminate(request: MsgTerminate): Promise<MsgTerminateResponse> {
    const data = MsgTerminate.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "Terminate", data);
    return promise.then((data) => MsgTerminateResponse.decode(new _m0.Reader(data)));
  }

  Ready(request: MsgReady): Promise<MsgReadyResponse> {
    const data = MsgReady.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "Ready", data);
    return promise.then((data) => MsgReadyResponse.decode(new _m0.Reader(data)));
  }

  Renew(request: MsgRenew): Promise<MsgRenewResponse> {
    const data = MsgRenew.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "Renew", data);
    return promise.then((data) => MsgRenewResponse.decode(new _m0.Reader(data)));
  }

  UpdataPermission(request: MsgUpdataPermission): Promise<MsgUpdataPermissionResponse> {
    const data = MsgUpdataPermission.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "UpdataPermission", data);
    return promise.then((data) => MsgUpdataPermissionResponse.decode(new _m0.Reader(data)));
  }

  Migrate(request: MsgMigrate): Promise<MsgMigrateResponse> {
    const data = MsgMigrate.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "Migrate", data);
    return promise.then((data) => MsgMigrateResponse.decode(new _m0.Reader(data)));
  }

  ReportFaults(request: MsgReportFaults): Promise<MsgReportFaultsResponse> {
    const data = MsgReportFaults.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "ReportFaults", data);
    return promise.then((data) => MsgReportFaultsResponse.decode(new _m0.Reader(data)));
  }

  RecoverFaults(request: MsgRecoverFaults): Promise<MsgRecoverFaultsResponse> {
    const data = MsgRecoverFaults.encode(request).finish();
    const promise = this.rpc.request("saonetwork.sao.sao.Msg", "RecoverFaults", data);
    return promise.then((data) => MsgRecoverFaultsResponse.decode(new _m0.Reader(data)));
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
