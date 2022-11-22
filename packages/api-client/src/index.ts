import { APISchema, CreateRequestConfig } from './types';

import { createRequestClient } from './request';

export interface SaoNodeAPISchema extends APISchema {
    load: {
        request: object;
        response: [
            result: string
        ];
    },
}

export const GetNodeApiClient = (config:CreateRequestConfig<SaoNodeAPISchema>) => {
    config.apis = {
        load: 'POST ',
    };
    return createRequestClient<SaoNodeAPISchema>(config);
}

export * from './types';
