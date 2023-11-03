/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { AccountAuth } from "./account_auth";
import { AccountId } from "./account_id";
import { AccountList } from "./account_list";
import { Did } from "./did";
import { DidBalances } from "./did_balances";
import { Kid } from "./kid";
import { Params } from "./params";
import { PastSeeds } from "./past_seeds";
import { PaymentAddress } from "./payment_address";
import { SidDocument } from "./sid_document";
import { SidDocumentVersion } from "./sid_document_version";

export const protobufPackage = "saonetwork.sao.did";

/** GenesisState defines the did module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  didList: Did[];
  accountListList: AccountList[];
  accountAuthList: AccountAuth[];
  sidDocumentList: SidDocument[];
  sidDocumentVersionList: SidDocumentVersion[];
  pastSeedsList: PastSeeds[];
  paymentAddressList: PaymentAddress[];
  accountIdList: AccountId[];
  kidList: Kid[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  didBalancesList: DidBalances[];
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    didList: [],
    accountListList: [],
    accountAuthList: [],
    sidDocumentList: [],
    sidDocumentVersionList: [],
    pastSeedsList: [],
    paymentAddressList: [],
    accountIdList: [],
    kidList: [],
    didBalancesList: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.didList) {
      Did.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.accountListList) {
      AccountList.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.accountAuthList) {
      AccountAuth.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.sidDocumentList) {
      SidDocument.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.sidDocumentVersionList) {
      SidDocumentVersion.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.pastSeedsList) {
      PastSeeds.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.paymentAddressList) {
      PaymentAddress.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.accountIdList) {
      AccountId.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.kidList) {
      Kid.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.didBalancesList) {
      DidBalances.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.didList.push(Did.decode(reader, reader.uint32()));
          break;
        case 3:
          message.accountListList.push(AccountList.decode(reader, reader.uint32()));
          break;
        case 4:
          message.accountAuthList.push(AccountAuth.decode(reader, reader.uint32()));
          break;
        case 5:
          message.sidDocumentList.push(SidDocument.decode(reader, reader.uint32()));
          break;
        case 6:
          message.sidDocumentVersionList.push(SidDocumentVersion.decode(reader, reader.uint32()));
          break;
        case 7:
          message.pastSeedsList.push(PastSeeds.decode(reader, reader.uint32()));
          break;
        case 8:
          message.paymentAddressList.push(PaymentAddress.decode(reader, reader.uint32()));
          break;
        case 9:
          message.accountIdList.push(AccountId.decode(reader, reader.uint32()));
          break;
        case 10:
          message.kidList.push(Kid.decode(reader, reader.uint32()));
          break;
        case 11:
          message.didBalancesList.push(DidBalances.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      didList: Array.isArray(object?.didList) ? object.didList.map((e: any) => Did.fromJSON(e)) : [],
      accountListList: Array.isArray(object?.accountListList)
        ? object.accountListList.map((e: any) => AccountList.fromJSON(e))
        : [],
      accountAuthList: Array.isArray(object?.accountAuthList)
        ? object.accountAuthList.map((e: any) => AccountAuth.fromJSON(e))
        : [],
      sidDocumentList: Array.isArray(object?.sidDocumentList)
        ? object.sidDocumentList.map((e: any) => SidDocument.fromJSON(e))
        : [],
      sidDocumentVersionList: Array.isArray(object?.sidDocumentVersionList)
        ? object.sidDocumentVersionList.map((e: any) => SidDocumentVersion.fromJSON(e))
        : [],
      pastSeedsList: Array.isArray(object?.pastSeedsList)
        ? object.pastSeedsList.map((e: any) => PastSeeds.fromJSON(e))
        : [],
      paymentAddressList: Array.isArray(object?.paymentAddressList)
        ? object.paymentAddressList.map((e: any) => PaymentAddress.fromJSON(e))
        : [],
      accountIdList: Array.isArray(object?.accountIdList)
        ? object.accountIdList.map((e: any) => AccountId.fromJSON(e))
        : [],
      kidList: Array.isArray(object?.kidList)
        ? object.kidList.map((e: any) => Kid.fromJSON(e))
        : [],
      didBalancesList: Array.isArray(object?.didBalancesList)
        ? object.didBalancesList.map((e: any) => DidBalances.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.didList) {
      obj.didList = message.didList.map((e) => e ? Did.toJSON(e) : undefined);
    } else {
      obj.didList = [];
    }
    if (message.accountListList) {
      obj.accountListList = message.accountListList.map((e) => e ? AccountList.toJSON(e) : undefined);
    } else {
      obj.accountListList = [];
    }
    if (message.accountAuthList) {
      obj.accountAuthList = message.accountAuthList.map((e) => e ? AccountAuth.toJSON(e) : undefined);
    } else {
      obj.accountAuthList = [];
    }
    if (message.sidDocumentList) {
      obj.sidDocumentList = message.sidDocumentList.map((e) => e ? SidDocument.toJSON(e) : undefined);
    } else {
      obj.sidDocumentList = [];
    }
    if (message.sidDocumentVersionList) {
      obj.sidDocumentVersionList = message.sidDocumentVersionList.map((e) =>
        e ? SidDocumentVersion.toJSON(e) : undefined
      );
    } else {
      obj.sidDocumentVersionList = [];
    }
    if (message.pastSeedsList) {
      obj.pastSeedsList = message.pastSeedsList.map((e) => e ? PastSeeds.toJSON(e) : undefined);
    } else {
      obj.pastSeedsList = [];
    }
    if (message.paymentAddressList) {
      obj.paymentAddressList = message.paymentAddressList.map((e) => e ? PaymentAddress.toJSON(e) : undefined);
    } else {
      obj.paymentAddressList = [];
    }
    if (message.accountIdList) {
      obj.accountIdList = message.accountIdList.map((e) => e ? AccountId.toJSON(e) : undefined);
    } else {
      obj.accountIdList = [];
    }
    if (message.kidList) {
      obj.kidList = message.kidList.map((e) => e ? Kid.toJSON(e) : undefined);
    } else {
      obj.kidList = [];
    }
    if (message.didBalancesList) {
      obj.didBalancesList = message.didBalancesList.map((e) => e ? DidBalances.toJSON(e) : undefined);
    } else {
      obj.didBalancesList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.didList = object.didList?.map((e) => Did.fromPartial(e)) || [];
    message.accountListList = object.accountListList?.map((e) => AccountList.fromPartial(e)) || [];
    message.accountAuthList = object.accountAuthList?.map((e) => AccountAuth.fromPartial(e)) || [];
    message.sidDocumentList = object.sidDocumentList?.map((e) => SidDocument.fromPartial(e)) || [];
    message.sidDocumentVersionList = object.sidDocumentVersionList?.map((e) => SidDocumentVersion.fromPartial(e)) || [];
    message.pastSeedsList = object.pastSeedsList?.map((e) => PastSeeds.fromPartial(e)) || [];
    message.paymentAddressList = object.paymentAddressList?.map((e) => PaymentAddress.fromPartial(e)) || [];
    message.accountIdList = object.accountIdList?.map((e) => AccountId.fromPartial(e)) || [];
    message.kidList = object.kidList?.map((e) => Kid.fromPartial(e)) || [];
    message.didBalancesList = object.didBalancesList?.map((e) => DidBalances.fromPartial(e)) || [];
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
