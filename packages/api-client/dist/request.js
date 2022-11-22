import axios from 'axios';
const MATCH_METHOD = /^(GET|POST|PUT|DELETE|HEAD|OPTIONS|CONNECT|TRACE|PATCH)\s+/;
const MATCH_PATH_PARAMS = /:(\w+)/g;
const USE_DATA_METHODS = [
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
];
function attachAPI(client, apis) {
    const hostApi = Object.create(null);
    for(const apiName in apis){
        const apiConfig = apis[apiName];
        if (typeof apiConfig === 'function') {
            hostApi[apiName] = apiConfig;
            continue;
        }
        let apiOptions = {};
        let apiPath = apiConfig;
        if (typeof apiConfig === 'object') {
            const { path , ...rest } = apiConfig;
            apiPath = path;
            apiOptions = rest;
        }
        hostApi[apiName] = (params, options)=>{
            const _params = {
                ...params || {}
            };
            const [prefix, methodName] = apiPath.match(MATCH_METHOD) || [
                'GET ',
                'GET'
            ];
            let url = apiPath.replace(prefix, '');
            const matchParams = apiPath.match(MATCH_PATH_PARAMS);
            if (matchParams) {
                matchParams.forEach((match)=>{
                    const key = match.replace(':', '');
                    if (Reflect.has(_params, key)) {
                        url = url.replace(match, Reflect.get(_params, key));
                        Reflect.deleteProperty(_params, key);
                    }
                });
            }
            const requestParams = USE_DATA_METHODS.includes(methodName) ? {
                data: _params
            } : {
                params: _params
            };
            return client.request({
                url,
                // method: methodName.toLowerCase(),
                ...requestParams,
                ...apiOptions,
                ...options
            });
        };
    }
    return hostApi;
}
export function createRequestClient(requestConfig) {
    const client = axios.create({
        baseURL: requestConfig.baseURL,
        headers: requestConfig.headers
    });
    client.interceptors.request.use((config)=>{
        const headerHandlers = (requestConfig.headerHandlers || []).map((handler)=>{
            return handler(config).then((_)=>{
            // Object.assign(config.headers, mixHeaders);
            }).catch();
        });
        return Promise.all(headerHandlers).then(()=>config);
    });
    client.interceptors.response.use((res)=>res, (error)=>{
        const requestError = requestConfig.errorHandler ? requestConfig.errorHandler(error) : error;
        return Promise.reject(requestError);
    });
    return attachAPI(client, requestConfig.apis);
}
