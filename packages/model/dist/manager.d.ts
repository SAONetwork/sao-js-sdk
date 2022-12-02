import { SidManager } from '@js-sao-did/sid';
import { ModelConfig, ModelDef, ModelProviderConfig } from './types';
export declare class ModelManager {
    private defaultModelProvider;
    private modelProviders;
    private sidManager;
    constructor(config: ModelProviderConfig, sidManager: SidManager);
    private getModelProvider;
    addModelProvider(config: ModelProviderConfig): void;
    createModel<T>(def: ModelDef<T>, modelConfig?: ModelConfig, ownerDid?: string): Promise<string>;
    updateModel<T>(def: ModelDef<T>, modelConfig?: ModelConfig, ownerDid?: string): Promise<string>;
    loadModel<T>(keyword: string, ownerDid?: string, groupId?: string): Promise<T>;
    loadModelByCommitId<T>(keyword: string, commitId: string, ownerDid?: string, groupId?: string): Promise<T>;
    loadModelByVersion<T>(keyword: string, version: string, ownerDid?: string, groupId?: string): Promise<T>;
}
