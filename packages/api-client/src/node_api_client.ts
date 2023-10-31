import { APISchema, CreateRequestConfig } from "./types";

import { createRequestClient } from "./request";

export type JsonRpcRequest = {
  id: number;
  jsonrpc: string;
  method: string;
  params: Array<any>;
};

export type JsonRpcResponse = {
  id: number;
  jsonrpc: string;
  result: any;
  error: string;
};

export interface SaoNodeAPISchema extends APISchema {
  jsonRpcApi: {
    request: JsonRpcRequest;
    response: JsonRpcResponse;
  };
}

export const GetNodeApiClient = (config: CreateRequestConfig<SaoNodeAPISchema>) => {
  config.apis = {
    jsonRpcApi: "POST ",
  };
  return createRequestClient<SaoNodeAPISchema>(config);
};

export const BuildGetNodeAddressReqParams = () => {
  const request: JsonRpcRequest = Object.create(null);
  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.GetNodeAddress";

  return request;
};

export const BuildModelLoadReqParams = (query: any) => {
  const request: JsonRpcRequest = Object.create(null);

  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.ModelLoad";
  request.params = [];
  request.params.push(query);

  return request;
};

export const BuildModelCreateReqParams = (query: any, proposal: any, orderId: number, content: number[]) => {
  const request: JsonRpcRequest = Object.create(null);

  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.ModelCreate";
  request.params = [];
  request.params.push(query);
  request.params.push(proposal);
  request.params.push(orderId);
  request.params.push(content);

  return request;
};

export const BuildModelCreateFileReqParams = (query: any, proposal: any, orderId: number) => {
  const request: JsonRpcRequest = Object.create(null);

  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.ModelCreateFile";
  request.params = [];
  request.params.push(query);
  request.params.push(proposal);
  request.params.push(orderId);

  return request;
};

export const BuildModelUpdateReqParams = (query: any, proposal: any, orderId: number, patch: number[]) => {
  const request: JsonRpcRequest = Object.create(null);

  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.ModelUpdate";
  request.params = [];
  request.params.push(query);
  request.params.push(proposal);
  request.params.push(orderId);
  request.params.push(patch);

  return request;
};

export const BuildModelShowCommitsReqParams = (query: any) => {
  const request: JsonRpcRequest = Object.create(null);

  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.ModelShowCommits";
  request.params = [];
  request.params.push(query);

  return request;
};

export const BuildModelDeleteReqParams = (req: any) => {
  const request: JsonRpcRequest = Object.create(null);

  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.ModelDelete";
  request.params = [];
  request.params.push(req);
  request.params.push(true);

  return request;
};

export const BuildModelRenewOrderReqParams = (req: any) => {
  const request: JsonRpcRequest = Object.create(null);

  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.ModelRenewOrder";
  request.params = [];
  request.params.push(req);
  request.params.push(true);

  return request;
};

export const BuildModelUpdatePermissionReqParams = (req: any) => {
  const request: JsonRpcRequest = Object.create(null);

  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.ModelUpdatePermission";
  request.params = [];
  request.params.push(req);
  request.params.push(true);

  return request;
};

export const BuildBindingParams = (rootDocId: string, keys: any, accountAuth: any, proof: any) => {
  const request: JsonRpcRequest = Object.create(null);

  request.id = 0;
  request.jsonrpc = "2.0";
  request.method = "Sao.DidBindingProof";
  request.params = [];
  request.params.push(rootDocId);
  request.params.push(keys);
  request.params.push(accountAuth);
  request.params.push(proof);

  return request;
};
