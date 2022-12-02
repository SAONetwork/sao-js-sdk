import { APISchema, CreateRequestConfig } from './types';
export type JsonRpcRequest = {
    id: number;
    jsonrpc: string;
    method: string;
    params: Object[];
};
export type JsonRpcResponse = {
    id: number;
    jsonrpc: string;
    result: Object;
    error: string;
};
export interface SaoNodeAPISchema extends APISchema {
    jsonRpcApi: {
        request: JsonRpcRequest;
        response: JsonRpcResponse;
    };
}
export declare const GetNodeApiClient: (config: CreateRequestConfig<SaoNodeAPISchema>) => import("./types").CreateRequestClient<SaoNodeAPISchema>;
export declare const BuildNodeAddressReqParams: () => JsonRpcRequest;
export declare const BuildLoadReqParams: (param: Object) => JsonRpcRequest;
export declare const BuildCreateReqParams: (proposal: Object, orderId: number, content: number[]) => JsonRpcRequest;
export declare const BuildCreateFileReqParams: (proposal: Object, orderId: number) => JsonRpcRequest;
export declare const BuildUpdateReqParams: (proposal: Object, orderId: number, patch: number[]) => JsonRpcRequest;
export declare const BuildRenewReqParams: (proposal: Object, orderId: number) => JsonRpcRequest;
export declare const BuildShowCommitsReqParams: (owner: string, key: string, group: string) => JsonRpcRequest;
