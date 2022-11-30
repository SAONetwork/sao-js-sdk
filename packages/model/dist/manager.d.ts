import { SidManager } from '@js-sao-did/sid';
import { ModelConfig, ModelDef, ModelProviderConfig } from './types';
export declare class ModelManager {
    private defaultModelProvider;
    private modelProviders;
    private sidManager;
    constructor(config: ModelProviderConfig, sidManager: SidManager);
    private getModelProvider;
    addModelProvider(config: ModelProviderConfig): void;
    createModel<T>(def: ModelDef<T>, modelConfig?: ModelConfig, ownerDid?: string): Promise<T>;
    updateModel<T>(def: ModelDef<T>, modelConfig?: ModelConfig, ownerDid?: string): Promise<T>;
    loadModel<T>(keyword: string, ownerDid?: string): Promise<T>;
    loadModelByCommitId<T>(keyword: string, commitId: string, ownerDid?: string): Promise<T>;
    loadModelByVersion<T>(keyword: string, version: string, ownerDid?: string): Promise<T>;
}
