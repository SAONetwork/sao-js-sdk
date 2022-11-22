import { CreateRequestClient, SaoNodeAPISchema } from '@js-sao-did/api-client';
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
export declare type LoadModelRequest = {
    keyword: string;
    commitId: string | undefined;
    version: string | undefined;
};
export declare class ModelProvider {
    private ownerSid;
    private groupId;
    private nodeApiClient;
    constructor(ownerSid: string, groupId: string, nodeApiClient: CreateRequestClient<SaoNodeAPISchema>);
    load(request: LoadModelRequest): Promise<Model>;
}
export declare const Uint8ArrayToString: (dataArray: Uint8Array) => string;
export declare const stringToUint8Array: (dataString: string) => Uint8Array;
