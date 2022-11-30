import { JWS } from "@js-sao-did/common";
import { CreateRequestClient, SaoNodeAPISchema } from '@js-sao-did/api-client';
import { ClientOrderProposal, LoadReq, Proposal } from './types';
export declare class Model {
    dataId: string;
    alias: string;
    commitId?: string;
    version?: string;
    content: Uint8Array;
    constructor(dataId: string, alias: string, content: Uint8Array);
    cast(): any;
    toString(): string;
}
export declare class ModelProvider {
    private ownerSid;
    private groupId;
    private nodeAddress;
    private nodeApiClient;
    constructor(ownerSid: string, groupId: string, nodeApiClient: CreateRequestClient<SaoNodeAPISchema>);
    getOwnerSid(): string;
    getGroupId(): string;
    getNodeAddress(): string;
    validate(proposal: Proposal): boolean;
    create(clientProposal: JWS, orderId: number, content: Uint8Array): Promise<Model>;
    load(req: LoadReq): Promise<Model>;
    update(clientProposal: ClientOrderProposal, orderId: number, patch: Uint8Array): Promise<Model>;
    renew(clientProposal: ClientOrderProposal, orderId: number): Promise<Model>;
}
export * from "./manager";
export * from "./types";
export * from "./utils";
