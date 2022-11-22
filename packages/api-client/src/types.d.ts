import { AxiosRequestHeaders, AxiosRequestConfig, AxiosResponse, AxiosError, HeadersDefaults, RawAxiosRequestHeaders } from 'axios';
declare type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};
export declare type RequestPath = `${Uppercase<RequestOptions['method']>} ${string}`;
export declare type RequestOptions = {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE' | 'PATCH';
    headers?: AxiosRequestHeaders;
};
export declare type RequestFunction<P = Record<string, any> | void, R = any> = (params: P, ...args: any[]) => Promise<R>;
export declare type APIConfig = RequestPath | RequestOptions | RequestFunction;
export declare type HeaderHandler = (config?: AxiosRequestConfig) => Promise<AxiosRequestHeaders>;
export declare type RequestErrorHandler = (error: AxiosError) => void;
export declare type APISchema = Record<string, {
    request: Record<string, any> | void;
    response: Record<string, any> | any;
}>;
export declare type CreateRequestConfig<T extends APISchema> = {
    baseURL: string;
    headers?: RawAxiosRequestHeaders | Partial<HeadersDefaults>;
    headerHandlers?: Array<HeaderHandler>;
    errorHandler?: RequestErrorHandler;
    apis: {
        [K in keyof RemoveIndexSignature<T>]: APIConfig;
    };
};
export declare type CreateRequestClient<T extends APISchema> = {
    [K in keyof RemoveIndexSignature<T>]: RequestFunction<RemoveIndexSignature<T>[K]['request'], AxiosResponse<RemoveIndexSignature<T>[K]['response']>>;
};
export {};
