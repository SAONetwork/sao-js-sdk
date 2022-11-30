import { BuildCreateReqParams, BuildLoadReqParams, BuildNodeAddressReqParams, BuildRenewReqParams, BuildUpdateReqParams } from '@js-sao-did/api-client';
import { Uint8ArrayToString } from './utils';
export class Model {
    cast() {
        return JSON.parse(Uint8ArrayToString(new Uint8Array(this.content)));
    }
    toString() {
        return JSON.stringify(this);
    }
    constructor(dataId, alias, content){
        this.dataId = dataId;
        this.alias = alias;
        this.content = content;
    }
}
export class ModelProvider {
    getOwnerSid() {
        return this.ownerSid;
    }
    getGroupId() {
        return this.groupId;
    }
    getNodeAddress() {
        return this.nodeAddress;
    }
    validate(proposal) {
        return proposal.groupId === this.groupId && proposal.owner === this.ownerSid;
    }
    async create(clientProposal, orderId, content) {
        return new Promise((resolve, reject)=>{
            this.nodeApiClient.jsonRpcApi(BuildCreateReqParams(clientProposal, orderId, content)).then((res)=>{
                try {
                    const model = JSON.parse(res);
                    resolve(new Model(model.dataId, model.alias, model.Content));
                } catch  {
                    reject("not found");
                }
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    async load(req) {
        return new Promise((resolve, reject)=>{
            this.nodeApiClient.jsonRpcApi(BuildLoadReqParams(req)).then((res)=>{
                try {
                    const model = JSON.parse(res);
                    resolve(new Model(model.dataId, model.alias, model.Content));
                } catch  {
                    reject("not found");
                }
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    async update(clientProposal, orderId, patch) {
        return new Promise((resolve, reject)=>{
            this.nodeApiClient.jsonRpcApi(BuildUpdateReqParams(clientProposal, orderId, patch)).then((res)=>{
                try {
                    const model = JSON.parse(res);
                    resolve(new Model(model.dataId, model.alias, model.Content));
                } catch  {
                    reject("not found");
                }
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    async renew(clientProposal, orderId) {
        return new Promise((resolve, reject)=>{
            this.nodeApiClient.jsonRpcApi(BuildRenewReqParams(clientProposal, orderId)).then((res)=>{
                try {
                    const model = JSON.parse(res);
                    resolve(new Model(model.dataId, model.alias, model.Content));
                } catch  {
                    reject("not found");
                }
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    constructor(ownerSid, groupId, nodeApiClient){
        this.ownerSid = ownerSid;
        this.groupId = groupId;
        this.nodeApiClient = nodeApiClient;
        this.nodeAddress = "";
        this.nodeApiClient.jsonRpcApi(BuildNodeAddressReqParams()).then((res)=>{
            try {
                this.nodeAddress = res.data.result;
            } catch (e) {
                console.error(e);
            }
        }).catch((err)=>{
            console.error(err);
        });
    }
}
export * from "./manager";
export * from "./types";
export * from "./utils";
