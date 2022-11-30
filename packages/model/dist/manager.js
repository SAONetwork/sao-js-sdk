import { GetNodeApiClient } from '@js-sao-did/api-client';
import { CalculateCid, GenerateDataId, stringToUint8Array } from './utils';
import { ModelProvider } from ".";
const defaultModelConfig = {
    duration: 365,
    replica: 1,
    timeout: 60 * 60 * 24,
    operation: 0
};
export class ModelManager {
    getModelProvider(ownerDid) {
        return this.modelProviders[ownerDid];
    }
    addModelProvider(config) {
        const nodeApiClient = GetNodeApiClient({
            baseURL: config.nodeApiUrl,
            headers: {
                Authorization: 'Bearer ' + config.nodeApiToken
            }
        });
        const provider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient);
        this.modelProviders[config.ownerDid] = provider;
    }
    async createModel(def, modelConfig = defaultModelConfig, ownerDid) {
        var provider = this.defaultModelProvider;
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid);
        }
        const dataBytes = stringToUint8Array(JSON.stringify(def.data));
        const dataId = GenerateDataId();
        const cid = await CalculateCid(dataBytes);
        var proposal = {
            owner: provider.getOwnerSid(),
            provider: provider.getNodeAddress(),
            groupId: provider.getGroupId(),
            duration: modelConfig.duration,
            replica: modelConfig.replica,
            timeout: modelConfig.timeout,
            alias: def.alias,
            dataId,
            commitId: dataId,
            tags: def.tags,
            cid,
            rule: def.rule,
            extendInfo: def.extendInfo,
            size: dataBytes.length,
            operation: modelConfig.operation
        };
        const sidProvider = await this.sidManager.getSidProvider();
        if (sidProvider === null) {
            return new Promise((_, reject)=>reject("failed to get sid provider"));
        }
        const clientProposal = await sidProvider.createJWS({
            payload: JSON.stringify(proposal)
        });
        return new Promise((resolve, reject)=>{
            if (provider.validate(proposal)) {
                reject("invalid provider");
            }
            provider.create(clientProposal, 0, dataBytes).then((model)=>{
                resolve(model.cast());
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    async loadModel(keyword, ownerDid) {
        var provider = this.defaultModelProvider;
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid);
        }
        return new Promise((resolve, reject)=>{
            provider.load({
                keyword
            }).then((model)=>{
                resolve(model.cast());
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    async loadModelByCommitId(keyword, commitId, ownerDid) {
        var provider = this.defaultModelProvider;
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid);
        }
        return new Promise((resolve, reject)=>{
            provider.load({
                keyword,
                commitId
            }).then((model)=>{
                resolve(model.cast());
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    async loadModelByVersion(keyword, version, ownerDid) {
        var provider = this.defaultModelProvider;
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid);
        }
        return new Promise((resolve, reject)=>{
            provider.load({
                keyword,
                version
            }).then((model)=>{
                resolve(model.cast());
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    constructor(config, sidManager){
        const nodeApiClient = GetNodeApiClient({
            baseURL: config.nodeApiUrl,
            headers: {
                Authorization: 'Bearer ' + config.nodeApiToken
            }
        });
        this.defaultModelProvider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient);
        this.modelProviders = {};
        this.modelProviders[config.ownerDid] = this.defaultModelProvider;
        this.sidManager = sidManager;
    }
}
