export class Model {
    dataId: string
    alias: string

    constructor(dataId: string, alias: string) {
        this.dataId = dataId;
        this.alias = alias;
    }

    toString(): string {
        return JSON.stringify(this)
    }
}

export interface ModelProvider {
    load(keyword: string): Promise<Model>
}
