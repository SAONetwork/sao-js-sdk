import { JWSSignature } from "@sao-js-sdk/common";
import { OfflineSigner } from "@cosmjs/proto-signing";

export type ModelProviderConfig = {
  ownerDid: string;
  chainApiUrl: string;
  chainApiToken: string;
  chainRpcUrl: string;
  chainPrefix: string;
  signer: OfflineSigner;
  nodeApiUrl: string;
  nodeApiToken: string;
  platformId: string;
};

export type ModelDef<T> = {
  alias?: string | undefined;
  data: T;
  dataId?: string | undefined;
  groupId?: string | undefined;
  tags?: string[] | [];
  rule?: string | undefined;
  extendInfo?: string | undefined;
};

export type ModelConfig = {
  duration?: number | 365;
  replica?: number | 3;
  timeout?: number | 300;
  operation?: number | 1;
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
  ReadonlyDids?: string[] | undefined;
  ReadwriteDids?: string[] | undefined;
}

export type QueryMetadataProposal = {
	Proposal: QueryProposal
  JwsSignature: JWSSignature;
}

export type ClientOrderProposal = {
  Proposal: Proposal;
  JwsSignature: JWSSignature;
};

export type UpdatePermissionProposal = {
  Proposal: PermissionProposal;
  JwsSignature: JWSSignature;
};
