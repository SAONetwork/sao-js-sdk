import { JWSSignature } from '@js-sao-did/common'

export type ModelProviderConfig = {
    ownerDid: string;
    chainApiUrl: string;
    chainApiToken: string;
    nodeApiUrl: string;
    nodeApiToken: string;
    platformId: string;
}

export type ModelDef<T> = {
    alias?: string | "",
    data: T,
    dataId?: string | "",
    tags?: string[] | [],
    rule?: string | "",
    extendInfo?: string | "",
}

export type ModelConfig = {
    duration?: number | 365,
    replica?: number | 3,
    timeout?: number | 300,
    operation?: number | 1,
}

export type LoadReq = {
    user?: string | undefined;
    keyword: string;
    publicKey?: string;
    groupId?: string | undefined;
    commitId?: string | undefined;
    version?: string | undefined;
}

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
}

export type ClientOrderProposal = {
    Proposal: Proposal;
    ClientSignature: JWSSignature;
}