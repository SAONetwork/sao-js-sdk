import { createRequestClient } from './request';
export const GetNodeApiClient = (config)=>{
    config.apis = {
        jsonRpcApi: 'POST '
    };
    return createRequestClient(config);
};
export const BuildNodeAddressReqParams = ()=>{
    const request = Object.create(null);
    request.method = "Sao.NodeAddress";
    return request;
};
export const BuildLoadReqParams = (param)=>{
    const request = Object.create(null);
    request.method = "Sao.Load";
    request.params.push(param);
    return request;
};
export const BuildCreateReqParams = (proposal, orderId, content)=>{
    const request = Object.create(null);
    request.method = "Sao.Create";
    request.params.push(proposal);
    request.params.push(orderId);
    request.params.push(content);
    return request;
};
export const BuildCreateFileReqParams = (proposal, orderId)=>{
    const request = Object.create(null);
    request.method = "Sao.CreateFile";
    request.params.push(proposal);
    request.params.push(orderId);
    return request;
};
export const BuildUpdateReqParams = (proposal, orderId, patch)=>{
    const request = Object.create(null);
    request.method = "Sao.Update";
    request.params.push(proposal);
    request.params.push(orderId);
    request.params.push(patch);
    return request;
};
export const BuildRenewReqParams = (proposal, orderId)=>{
    const request = Object.create(null);
    request.method = "Sao.Renew";
    request.params.push(proposal);
    request.params.push(orderId);
    return request;
};
export const BuildShowCommitsReqParams = (owner, key, group)=>{
    const request = Object.create(null);
    request.method = "Sao.ShowCommits";
    request.params.push(owner);
    request.params.push(key);
    request.params.push(group);
    return request;
};
