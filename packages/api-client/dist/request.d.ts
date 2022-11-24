import { APISchema, CreateRequestConfig, CreateRequestClient } from './types';
export declare function createRequestClient<T extends APISchema>(requestConfig: CreateRequestConfig<T>): CreateRequestClient<T>;
