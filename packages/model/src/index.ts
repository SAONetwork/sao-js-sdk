import { CreateRequestClient, SaoNodeAPISchema } from '@js-sao-did/api-client'
export class Model {
    dataId: string;
    alias: string;
    commitId?: string;
    version?: string;
    content: Uint8Array;

    constructor(dataId: string, alias: string, content: Uint8Array) {
        this.dataId = dataId;
        this.alias = alias;
        this.content = content;
    }

    cast(): any {
        return JSON.parse(Uint8ArrayToString(this.content))
    }

    toString(): string {
        return JSON.stringify(this)
    }
}

export type LoadModelRequest = {
    keyword: string;
    commitId: string | undefined;
    version: string | undefined;
}

export class ModelProvider {
    private ownerSid: string
    private groupId: string
    private nodeApiClient: CreateRequestClient<SaoNodeAPISchema>

    public constructor(ownerSid: string, groupId: string, nodeApiClient: CreateRequestClient<SaoNodeAPISchema>) {
        this.ownerSid = ownerSid;
        this.groupId = groupId;
        this.nodeApiClient = nodeApiClient;
    }

    async load(request: LoadModelRequest): Promise<Model> {
        return new Promise((resolve, reject) => {
            this.nodeApiClient.load({
                KeyWord: request.keyword,
                PublicKey: this.ownerSid,
                GroupId: this.groupId,
                CommitId: request.commitId,
                Version: request.version,
            }).then((res: any) => {
                try {
                    const model = JSON.parse(res)
                    resolve(new Model(model.dataId, model.alias, model.Content))
                } catch {
                    reject("not found");
                }
            }).catch((err: Error) => {
                reject(err);
            })

        });
    }
}

export const Uint8ArrayToString = (dataArray: Uint8Array) => {
    var dataString = "";
    for (var i = 0; i < dataArray.length; i++) {
        dataString += String.fromCharCode(dataArray[i]);
    }

    return dataString
}

export const stringToUint8Array = (dataString: string) => {
    var dataArray = []
    for (var i = 0, j = dataString.length; i < j; ++i) {
        dataArray.push(dataString.charCodeAt(i));
    }

    var tmpUint8Array = new Uint8Array(dataArray);
    return tmpUint8Array
}