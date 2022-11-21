import { Model } from "../src";

export class MockModelProvider {
    dataId: string
    alias: string

    constructor(dataId: string, alias: string) {
        this.dataId = dataId
        this.alias = alias;
    }

    async load(keyword: string): Promise<Model> {
        if (keyword === this.dataId || keyword === this.alias) {
            return new Model(this.dataId, this.alias);
        } else {
            return new Promise((_, reject) => {
                reject("not found");
            });
        }
    }
}