import { JWE } from "did-jwt";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { JWSSignature } from "@sao-js-sdk/common";
import { SaoTypes } from "sao-chain-client";

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
  Proposal: SaoTypes.QueryProposal;
  JwsSignature: JWSSignature;
};

export type ClientOrderProposal = {
  Proposal: SaoTypes.Proposal;
  JwsSignature: JWSSignature;
};

export type UpdatePermissionProposal = {
  Proposal: SaoTypes.PermissionProposal;
  JwsSignature: JWSSignature;
};

export type OrderRenewProposal = {
  Proposal: SaoTypes.RenewProposal;
  JwsSignature: JWSSignature;
};

export type OrderTerminateProposal = {
  Proposal: SaoTypes.TerminateProposal;
  JwsSignature: JWSSignature;
};

export { SaoTypes } from "sao-chain-client";
