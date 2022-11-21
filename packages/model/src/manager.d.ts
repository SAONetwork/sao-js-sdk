import { ModelProvider } from ".";

export declare class ModelManager {
    private ModelProvider;
    constructor(modelProvider: ModelProvider);
    loadModel(keyword: string): Promise<void>;
}
