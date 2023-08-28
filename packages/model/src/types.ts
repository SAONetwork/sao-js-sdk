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
  kidSigner: OfflineSigner;
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

export type FileDef<T> = {
  filename?: string | undefined;
  dataId?: string | undefined;
  cid?: string | undefined;
  groupId?: string | undefined;
  tags?: string[] | [];
  rule?: string | undefined;
  extendInfo?: string | undefined;
  size?: number | 0;
};

export type ModelConfig = {
  duration?: number | 365;
  replica?: number | 3;
  timeout?: number | 300;
  operation?: number | 1;
  isPublish?: boolean | false;
};
