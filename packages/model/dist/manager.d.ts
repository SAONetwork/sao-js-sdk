import { ModelProvider } from ".";
export declare type ModelManagerConfig = {
    chainApiUrl: string;
    chainApiToken: string;
    nodeApiUrl: string;
    nodeApiToken: string;
    platformId: string;
};
export declare class ModelManager {
    private defaultModelProvider;
    private modelProviders;
    constructor(ownerDid: string, config: ModelManagerConfig);
    private getModelProvider;
    setModelProvider(ownerSid: string, modelProvider: ModelProvider): Promise<void>;
    loadModel<T>(keyword: string, ownerDid?: string, commitId?: string, version?: string): Promise<T>;
}
