import { JWE } from "did-jwt";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { JWSSignature } from "@sao-js-sdk/common";
import {
  Proposal,
  QueryProposal,
  RenewProposal,
  PermissionProposal,
  TerminateProposal,
} from "sao-chain-client";

export type ChainApiClientConfig = {
  apiURL: string;
  rpcURL: string;
  prefix: string;
  signer: OfflineSigner;
};

export type AccountAuth = {
  accountDid: string;
  accountEncryptedSeed: JWE;
  sidEncryptedAccount: JWE;
};

export type Result = {
  status: number;
  data: string;
};

export type TxResult = {
  code: number;
  transactionHash: string;
};

export type QueryMetadataProposal = {
  Proposal: QueryProposal;
  JwsSignature: JWSSignature;
};

export type ClientOrderProposal = {
  Proposal: Proposal;
  JwsSignature: JWSSignature;
};

export type UpdatePermissionProposal = {
  Proposal: PermissionProposal;
  JwsSignature: JWSSignature;
};

export type OrderRenewProposal = {
  Proposal: RenewProposal;
  JwsSignature: JWSSignature;
};

export type OrderTerminateProposal = {
  Proposal: TerminateProposal;
  JwsSignature: JWSSignature;
};

export {
  Proposal,
  QueryProposal,
  RenewProposal,
  PermissionProposal,
  TerminateProposal,
} from "sao-chain-client";
