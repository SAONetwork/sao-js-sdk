import { APISchema, CreateRequestConfig } from './types';

import { createRequestClient } from './request';

export type JsonRpcRequest = {
    id: number,
    jsonrpc: string,
    method: string,
    params: Object[],
}

export type JsonRpcResponse = {
    id: number,
    jsonrpc: string,
    result: Object,
    error: string,
}

export interface SaoNodeAPISchema extends APISchema {
    jsonRpcApi: {
        request: JsonRpcRequest;
        response: JsonRpcResponse;
    },
}

export const GetNodeApiClient = (config: CreateRequestConfig<SaoNodeAPISchema>) => {
    config.apis = {
        jsonRpcApi: 'POST ',
    };
    return createRequestClient<SaoNodeAPISchema>(config);
}

export const BuildNodeAddressReqParams = () => {
    const request: JsonRpcRequest = Object.create(null);
    request.id = 0;
    request.jsonrpc = "2.0";
    request.method = "Sao.NodeAddress";

    return request;
}

export const BuildLoadReqParams = (param:Object) => {
    const request: JsonRpcRequest = Object.create(null);

    request.id = 0;
    request.jsonrpc = "2.0";
    request.method = "Sao.Load";
    request.params = [];
    request.params.push(param)

    return request;
}

export const BuildCreateReqParams = (proposal:Object, orderId:number, content: number[]) => {
    const request: JsonRpcRequest = Object.create(null);

    request.id = 0;
    request.jsonrpc = "2.0";
    request.method = "Sao.Create";
    request.params = [];
    request.params.push(proposal)
    request.params.push(orderId)
    request.params.push(content)

    return request;
}

export const BuildCreateFileReqParams = (proposal:Object, orderId:number) => {
    const request: JsonRpcRequest = Object.create(null);

    request.id = 0;
    request.jsonrpc = "2.0";
    request.method = "Sao.CreateFile";
    request.params = [];
    request.params.push(proposal)
    request.params.push(orderId)

    return request;
}

export const BuildUpdateReqParams = (proposal:Object, orderId:number, patch: number[]) => {
    const request: JsonRpcRequest = Object.create(null);

    request.id = 0;
    request.jsonrpc = "2.0";
    request.method = "Sao.Update";
    request.params = [];
    request.params.push(proposal)
    request.params.push(orderId)
    request.params.push(patch)

    return request;
}

export const BuildRenewReqParams = (proposal:Object, orderId:number) => {
    const request: JsonRpcRequest = Object.create(null);

    request.id = 0;
    request.jsonrpc = "2.0";
    request.method = "Sao.Renew";
    request.params = [];
    request.params.push(proposal)
    request.params.push(orderId)

    return request;
}

export const BuildShowCommitsReqParams = (owner:string, key:string, group:string) => {
    const request: JsonRpcRequest = Object.create(null);

    request.id = 0;
    request.jsonrpc = "2.0";
    request.method = "Sao.ShowCommits";
    request.params = [];
    request.params.push(owner)
    request.params.push(key)
    request.params.push(group)

    return request;
}
