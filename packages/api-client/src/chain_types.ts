import { JWE } from "did-jwt";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { JWSSignature } from "@sao-js-sdk/common";

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

export type QueryProposal = {
  owner: string;
  keyword: string;
  groupId?: string;
  type_?: number | undefined;
  lastValidHeight: number;
  gateway: string;
  commitId?: string | undefined;
  version?: string | undefined;
};

export type Proposal = {
  owner: string;
  provider: string;
  groupId: string;
  duration: number;
  replica: number;
  timeout: number;
  alias: string;
  dataId: string;
  commitId: string;
  tags: string[] | undefined;
  cid: string;
  rule: string | undefined;
  extendInfo: string | undefined;
  size: number;
  operation: number;
};

export type PermissionProposal = {
  owner: string;
  dataId: string;
  readonlyDids?: string[] | undefined;
  readwriteDids?: string[] | undefined;
};

export type RenewProposal = {
  owner: string;
  duration: number;
  timeout: number;
  data: string[];
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
