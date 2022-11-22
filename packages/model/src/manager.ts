import { GetNodeApiClient } from '@js-sao-did/api-client'

import { ModelProvider } from ".";

export type ModelProviderConfig = {
    ownerDid: string;
    chainApiUrl: string;
    chainApiToken: string;
    nodeApiUrl: string;
    nodeApiToken: string;
    platformId: string;
}
export class ModelManager {
    private defaultModelProvider
    private modelProviders: Record<string, ModelProvider>

    constructor(config: ModelProviderConfig) {
        const nodeApiClient = GetNodeApiClient({
            baseURL: config.nodeApiUrl,
            headers: {
                Authorization: 'Bearer ' + config.nodeApiToken,
            }
        });

        this.defaultModelProvider = new ModelProvider(config.ownerDid, config.platformId, nodeApiClient);
        this.modelProviders = {}
        this.modelProviders[config.ownerDid] = this.defaultModelProvider;
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

    async loadModel<T>(keyword: string, ownerDid?: string, commitId?: string, version?: string): Promise<T> {
        var provider = this.defaultModelProvider
        if (ownerDid !== undefined) {
            provider = this.getModelProvider(ownerDid)
        }

        return new Promise((resolve, reject) => {
            provider.load({
                keyword,
                commitId,
                version,
            }).then(model => {
                resolve(model.cast())
            }).catch(err => {
                reject(err)
            })
        })
    }
}