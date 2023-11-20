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
  paymentApiUrl?: string;
  paymentApiToken?: string;
};

export type ModelDef<T> = {
  alias?: string | undefined;
  data: T;
  dataId?: string | undefined;
  groupId?: string | undefined;
  tags?: string[] | [];
  rule?: string | undefined;
  extendInfo?: string | undefined;
  paymentDid?: string | undefined;
};

export type FileDef<T> = {
  filename?: string | undefined;
  dataId?: string | undefined;
  cid?: string | undefined;
  groupId?: string | undefined;
  tags?: string[] | [];
  rule?: string | undefined;
  extendInfo?: string | undefined;
  size?: number | 0;
  paymentDid?: string | undefined;
};

export type ModelConfig = {
  duration?: number;
  replica?: number;
  timeout?: number;
  operation?: number;
  isPublish?: boolean;
};
