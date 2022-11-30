import * as jsonpatch from 'fast-json-patch';
import stringify from 'fast-json-stable-stringify';
import { GetNodeApiClient } from '@js-sao-did/api-client'
import { SidManager } from '@js-sao-did/sid'
import { ModelConfig, ModelDef, ModelProviderConfig, Proposal } from './types'
import { CalculateCid, GenerateDataId, stringToUint8Array } from './utils'
import { ModelProvider } from ".";

const defaultModelConfig: ModelConfig = {
    duration: 365,
    replica: 1,
    timeout: 60 * 60 * 24,
    operation: 0,
}
export class ModelManager {
    private defaultModelProvider: ModelProvider
    private modelProviders: Record<string, ModelProvider>
    private sidManager: SidManager

    constructor(config: ModelProviderConfig, sidManager: SidManager) {
        const nodeApiClient = GetNodeApiClient({
            baseURL: config.nodeApiUrl,
            headers: {
                Authorization: 'Bearer ' + config.nodeApiToken,
            }
        });

        this.defaultModelProvider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient);
        this.modelProviders = {}
        this.modelProviders[config.ownerDid] = this.defaultModelProvider;

        this.sidManager = sidManager;
    }

    private getModelProvider(ownerDid: string): ModelProvider {
        return this.modelProviders[ownerDid];
    }

    addModelProvider(config: ModelProviderConfig) {
        const nodeApiClient = GetNodeApiClient({
            baseURL: config.nodeApiUrl,
            headers: {
                Authorization: 'Bearer ' + config.nodeApiToken,
            }
        });

        const provider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient);
        this.modelProviders[config.ownerDid] = provider;
    }

    async createModel<T>(def: ModelDef<T>, modelConfig: ModelConfig = defaultModelConfig, ownerDid?: string): Promise<T> {
        var provider = this.defaultModelProvider
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid)
        }
        console.log("NodeAddress: ", provider.getNodeAddress());

        const dataBytes = stringToUint8Array(stringify(def.data))

        const dataId = GenerateDataId()
        const cid = await CalculateCid(dataBytes)
        var proposal: Proposal = {
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
            operation: modelConfig.operation,
        }

        const sidProvider = await this.sidManager.getSidProvider();
        if (sidProvider === null) {
            return new Promise((_, reject) => reject("failed to get sid provider"))
        }
        const clientProposal = await sidProvider.createJWS({
            payload: stringify(proposal)
        })

        return new Promise((resolve, reject) => {
            if (!provider.validate(proposal)) {
                reject("invalid provider")
            }

            provider.create(
                {
                    Proposal: proposal,
                    JwsSignature: clientProposal.signatures[0],
                },
                0,
                Array.from(dataBytes),
            ).then(model => {
                resolve(model.cast())
            }).catch(err => {
                reject(err)
            })
        })
    }

    async updateModel<T>(def: ModelDef<T>, modelConfig: ModelConfig = defaultModelConfig, ownerDid?: string): Promise<T> {
        var provider = this.defaultModelProvider
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid)
        }

        if (def.dataId === undefined || def.dataId === null || def.dataId === "") {
            throw new Error("Invalid dataId: " + def.dataId);
        }
        const origin = (await provider.load({ keyword: def.dataId })).cast();


        const patch = jsonpatch.compare(origin, def.data);
        console.log("Patch: ", stringify(patch));

        const target = jsonpatch.applyPatch(origin, patch).newDocument;
        const dataBytes = stringToUint8Array(stringify(patch));
        const targetDataBytes = stringToUint8Array(stringify(target));
        const cid = await CalculateCid(targetDataBytes);

        var proposal: Proposal = {
            owner: provider.getOwnerSid(),
            provider: provider.getNodeAddress(),
            groupId: provider.getGroupId(),
            duration: modelConfig.duration,
            replica: modelConfig.replica,
            timeout: modelConfig.timeout,
            alias: def.alias,
            dataId: def.dataId,
            commitId: GenerateDataId(),
            tags: def.tags,
            cid,
            rule: def.rule,
            extendInfo: def.extendInfo,
            size: dataBytes.length,
            operation: modelConfig.operation,
        }

        const sidProvider = await this.sidManager.getSidProvider();
        if (sidProvider === null) {
            return new Promise((_, reject) => reject("failed to get sid provider"))
        }
        const clientProposal = await sidProvider.createJWS({
            payload: stringify(proposal)
        })

        return new Promise((resolve, reject) => {
            if (!provider.validate(proposal)) {
                reject("invalid provider")
            }

            provider.update(
                {
                    Proposal: proposal,
                    JwsSignature: clientProposal.signatures[0],
                }, 0,
                Array.from(dataBytes),
            ).then(model => {
                resolve(model.cast())
            }).catch(err => {
                reject(err)
            })
        })
    }

    async loadModel<T>(keyword: string, ownerDid?: string): Promise<T> {
        var provider = this.defaultModelProvider
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid)
        }

        return new Promise((resolve, reject) => {
            provider.load({
                keyword,
            }).then(model => {
                resolve(model.cast())
            }).catch(err => {
                reject(err)
            })
        })
    }

    async loadModelByCommitId<T>(keyword: string, commitId: string, ownerDid?: string): Promise<T> {
        var provider = this.defaultModelProvider
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid)
        }

        return new Promise((resolve, reject) => {
            provider.load({
                keyword,
                commitId,
            }).then(model => {
                resolve(model.cast())
            }).catch(err => {
                reject(err)
            })
        })
    }

    async loadModelByVersion<T>(keyword: string, version: string, ownerDid?: string): Promise<T> {
        var provider = this.defaultModelProvider
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid)
        }

        return new Promise((resolve, reject) => {
            provider.load({
                keyword,
                version,
            }).then(model => {
                resolve(model.cast())
            }).catch(err => {
                reject(err)
            })
        })
    }
}