import { JWE } from "did-jwt";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { SaoTypes } from "sao-chain-client";

export const BindingProofV1 = 1;

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
  JwsSignature: SaoTypes.JwsSignature;
};

export type ClientOrderProposal = {
  Proposal: SaoTypes.Proposal;
  JwsSignature: SaoTypes.JwsSignature;
};

export type UpdatePermissionProposal = {
  Proposal: SaoTypes.PermissionProposal;
  JwsSignature: SaoTypes.JwsSignature;
};

export type OrderRenewProposal = {
  Proposal: SaoTypes.RenewProposal;
  JwsSignature: SaoTypes.JwsSignature;
};

export type OrderTerminateProposal = {
  Proposal: SaoTypes.TerminateProposal;
  JwsSignature: SaoTypes.JwsSignature;
};

export { SaoTypes } from "sao-chain-client";
