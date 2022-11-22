import { GetNodeApiClient } from '@js-sao-did/api-client';
import { ModelProvider } from ".";
export class ModelManager {
    getModelProvider(ownerDid) {
        return this.modelProviders[ownerDid];
    }
    async setModelProvider(ownerSid, modelProvider) {
        this.modelProviders[ownerSid] = modelProvider;
    }
    async loadModel(keyword, ownerDid, commitId, version) {
        var provider = this.defaultModelProvider;
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid);
        }
        return new Promise((resolve, reject)=>{
            provider.load({
                keyword,
                commitId,
                version
            }).then((model)=>{
                resolve(model.cast());
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    constructor(ownerDid, config){
        const nodeApiClient = GetNodeApiClient({
            baseURL: config.nodeApiUrl,
            headers: {
                Authorization: 'Bearer ' + config.nodeApiToken
            }
        });
        this.defaultModelProvider = new ModelProvider(ownerDid, config.platformId, nodeApiClient);
        this.modelProviders = {};
        this.modelProviders[ownerDid] = this.defaultModelProvider;
    }
}
