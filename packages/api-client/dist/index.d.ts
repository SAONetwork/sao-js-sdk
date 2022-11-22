import { APISchema, CreateRequestConfig } from './types';
export interface SaoNodeAPISchema extends APISchema {
    load: {
        request: object;
        response: [
            result: string
        ];
    };
}
export declare const GetNodeApiClient: (config: CreateRequestConfig<SaoNodeAPISchema>) => import("./types").CreateRequestClient<SaoNodeAPISchema>;
export * from './types';
