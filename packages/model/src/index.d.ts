export declare class Model {
    dataId: string;
    alias: string;
    constructor(dataId: string, alias: string);
    toString(): string;
}

export interface ModelProvider {
    load(keyword: string): Promise<Model>;
}
