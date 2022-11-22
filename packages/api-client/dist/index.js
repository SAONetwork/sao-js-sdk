import { createRequestClient } from './request';
export const GetNodeApiClient = (config)=>{
    config.apis = {
        load: 'POST '
    };
    return createRequestClient(config);
};
export * from './types';
