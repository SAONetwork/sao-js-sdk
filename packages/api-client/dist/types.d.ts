import { AxiosRequestHeaders, AxiosRequestConfig, AxiosResponse, AxiosError, HeadersDefaults, RawAxiosRequestHeaders } from 'axios';
import { JWE } from "did-jwt";
import { OfflineSigner } from "@cosmjs/proto-signing";
type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};
export type RequestPath = `${Uppercase<RequestOptions['method']>} ${string}`;
export type RequestOptions = {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE' | 'PATCH';
    headers?: AxiosRequestHeaders;
};
export type RequestFunction<P = Record<string, any> | void, R = any> = (params: P, ...args: any[]) => Promise<R>;
export type APIConfig = RequestPath | RequestOptions | RequestFunction;
export type HeaderHandler = (config?: AxiosRequestConfig) => Promise<AxiosRequestHeaders>;
export type RequestErrorHandler = (error: AxiosError) => void;
export type APISchema = Record<string, {
    request: Record<string, any> | void;
    response: Record<string, any> | any;
}>;
export type CreateRequestConfig<T extends APISchema> = {
    baseURL: string;
    headers?: RawAxiosRequestHeaders | Partial<HeadersDefaults>;
    headerHandlers?: Array<HeaderHandler>;
    errorHandler?: RequestErrorHandler;
    apis?: {
        [K in keyof RemoveIndexSignature<T>]: APIConfig;
    };
};
export type CreateRequestClient<T extends APISchema> = {
    [K in keyof RemoveIndexSignature<T>]: RequestFunction<RemoveIndexSignature<T>[K][any], AxiosResponse<RemoveIndexSignature<T>[K][any]>>;
};
export type NodeApiClientConfig<T extends APISchema> = {
    baseURL: string;
    headers?: Partial<HeadersDefaults>;
    headerHandlers?: Array<HeaderHandler>;
    errorHandler?: RequestErrorHandler;
    apis?: {
        [K in keyof RemoveIndexSignature<T>]: APIConfig;
    };
};
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
export declare const BindingProofV1 = 1;
export type Result = {
    status: number;
    data: string;
};
export type TxResult = {
    code: number;
    transactionHash: string;
};
export type BindingProof = {
    accountId: string;
    timestamp?: number;
    did: string;
    signature: string;
    message: string;
};
export {};
