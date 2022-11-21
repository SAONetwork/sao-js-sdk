import { Model, ModelProvider } from ".";

export class ModelManager {
    private modelProvider: ModelProvider

    private constructor(modelProvider: ModelProvider) {
        this.modelProvider = modelProvider;
    }

    static async createManager(modelProvider: ModelProvider): Promise<ModelManager> {
        const manager = new ModelManager(modelProvider);
        return manager;
    }

    public async loadModel(keyword: string): Promise<Model> {
        return this.modelProvider.load(keyword);
    }
}