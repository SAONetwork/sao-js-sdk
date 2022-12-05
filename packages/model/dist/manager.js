import * as jsonpatch from 'fast-json-patch';
import * as u8a from 'uint8arrays';
import stringify from 'fast-json-stable-stringify';
import { GetNodeApiClient } from '@js-sao-did/api-client';
import { CalculateCid, GenerateDataId, stringToUint8Array } from './utils';
import { ModelProvider } from ".";
const defaultModelConfig = {
    duration: 365,
    replica: 1,
    timeout: 60 * 60 * 24,
    operation: 1
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
        console.log("NodeAddress: ", provider.getNodeAddress());
        const dataBytes = stringToUint8Array(stringify(def.data));
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
            throw new Error("failed to get sid provider");
        }
        const clientProposal = await sidProvider.createJWS({
            payload: u8a.toString(stringToUint8Array(stringify(proposal)), 'base64url')
        });
        console.log("sig:", clientProposal.signatures[0]);
        console.log("payload:", stringify(proposal));
        if (!provider.validate(proposal)) {
            throw new Error("invalid provider");
        }
        const model = await provider.create({
            Proposal: proposal,
            JwsSignature: clientProposal.signatures[0]
        }, 0, Array.from(dataBytes));
        return model.dataId;
    }
    async updateModel(def, modelConfig = defaultModelConfig, ownerDid) {
        var provider = this.defaultModelProvider;
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid);
        }
        var keyword = def.dataId;
        if (keyword === undefined) {
            keyword = def.alias;
            if (keyword === undefined) {
                throw new Error("Neither dataId nor alias is specified.");
            }
        }
        const originModel = await provider.load({
            keyword,
            publicKey: provider.getOwnerSid(),
            groupId: def.groupId
        });
        const origin = originModel.cast();
        const patch = jsonpatch.compare(origin, def.data);
        console.log("Patch: ", stringify(patch));
        const target = jsonpatch.applyPatch(origin, patch).newDocument;
        const dataBytes = stringToUint8Array(stringify(patch));
        const targetDataBytes = stringToUint8Array(stringify(target));
        const cid = await CalculateCid(targetDataBytes);
        var proposal = {
            owner: provider.getOwnerSid(),
            provider: provider.getNodeAddress(),
            groupId: provider.getGroupId(),
            duration: modelConfig.duration,
            replica: modelConfig.replica,
            timeout: modelConfig.timeout,
            alias: originModel.alias,
            dataId: originModel.dataId,
            commitId: GenerateDataId(),
            tags: originModel.tags,
            cid,
            rule: originModel.rule,
            extendInfo: originModel.extendInfo,
            size: dataBytes.length,
            operation: modelConfig.operation
        };
        const sidProvider = await this.sidManager.getSidProvider();
        if (sidProvider === null) {
            throw new Error("failed to get sid provider");
        }
        const clientProposal = await sidProvider.createJWS({
            payload: u8a.toString(stringToUint8Array(stringify(proposal)), 'base64url')
        });
        if (!provider.validate(proposal)) {
            throw new Error("invalid provider");
        }
        const model = await provider.update({
            Proposal: proposal,
            JwsSignature: clientProposal.signatures[0]
        }, 0, Array.from(dataBytes));
        return model.dataId;
    }
    async loadModel(keyword, ownerDid, groupId) {
        var provider = this.defaultModelProvider;
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid);
        }
        const model = await provider.load({
            keyword,
            publicKey: provider.getOwnerSid(),
            groupId
        });
        console.log(String(model.content));
        return model.cast();
    }
    async loadModelByCommitId(keyword, commitId, ownerDid, groupId) {
        var provider = this.defaultModelProvider;
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid);
        }
        const model = await provider.load({
            keyword,
            publicKey: provider.getOwnerSid(),
            groupId,
            commitId
        });
        return model.cast();
    }
    async loadModelByVersion(keyword, version, ownerDid, groupId) {
        var provider = this.defaultModelProvider;
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid);
        }
        const model = await provider.load({
            keyword,
            publicKey: provider.getOwnerSid(),
            groupId,
            version
        });
        return model.cast();
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
