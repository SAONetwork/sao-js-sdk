import { JWS } from "@js-sao-did/common";
import { BuildCreateReqParams, BuildLoadReqParams, BuildNodeAddressReqParams, BuildRenewReqParams, BuildUpdateReqParams, CreateRequestClient, SaoNodeAPISchema } from '@js-sao-did/api-client'
import { ClientOrderProposal, LoadReq, Proposal } from './types'
import { Uint8ArrayToString } from './utils';
export class Model {
    dataId: string;
    alias: string;
    commitId?: string;
    version?: string;
    content: number[];

    constructor(dataId: string, alias: string, content: number[]) {
        this.dataId = dataId;
        this.alias = alias;
        this.content = content;
    }

    cast(): any {
        return JSON.parse(Uint8ArrayToString(new Uint8Array(this.content)))
    }

    toString(): string {
        return JSON.stringify(this)
    }
}

export class ModelProvider {
    private ownerSid: string
    private groupId: string
    private nodeAddress: string
    private nodeApiClient: CreateRequestClient<SaoNodeAPISchema>

    public constructor(ownerSid: string, groupId: string, nodeApiClient: CreateRequestClient<SaoNodeAPISchema>) {
        this.ownerSid = ownerSid;
        this.groupId = groupId;
        this.nodeApiClient = nodeApiClient;

        this.nodeAddress = ""
        this.nodeApiClient.jsonRpcApi(BuildNodeAddressReqParams()).then((res: any) => {
            try {
                this.nodeAddress = res.data.result
            } catch (e) {
                console.error(e)
            }
        }).catch((err: Error) => {
            console.error(err)
        })
    }

    getOwnerSid(): string {
        return this.ownerSid
    }

    getGroupId(): string {
        return this.groupId
    }

    getNodeAddress(): string {
        return this.nodeAddress
    }

    validate(proposal: Proposal): boolean {
        return proposal.groupId === this.groupId && proposal.owner === this.ownerSid
    }

    async create(clientProposal: ClientOrderProposal, orderId: number, content: number[]): Promise<Model> {
        return new Promise((resolve, reject) => {
            this.nodeApiClient.jsonRpcApi(BuildCreateReqParams(
                clientProposal,
                orderId,
                content
            )).then((res: any) => {
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

    async load(req: LoadReq): Promise<Model> {
        return new Promise((resolve, reject) => {
            this.nodeApiClient.jsonRpcApi(BuildLoadReqParams(req)).then((res: any) => {
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

    async update(clientProposal: ClientOrderProposal, orderId: number, patch: number[]): Promise<Model> {
        return new Promise((resolve, reject) => {
            this.nodeApiClient.jsonRpcApi(BuildUpdateReqParams(
                clientProposal,
                orderId,
                patch
            )).then((res: any) => {
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

    async renew(clientProposal: ClientOrderProposal, orderId: number): Promise<Model> {
        return new Promise((resolve, reject) => {
            this.nodeApiClient.jsonRpcApi(BuildRenewReqParams(
                clientProposal,
                orderId,
            )).then((res: any) => {
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

export * from "./manager";
export * from "./types";
export * from "./utils"