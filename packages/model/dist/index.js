import { BuildCreateReqParams, BuildLoadReqParams, BuildNodeAddressReqParams, BuildUpdateReqParams } from '@js-sao-did/api-client';
import { Uint8ArrayToString } from './utils';
export class Model {
    setCommitId(commitId) {
        this.commitId = commitId;
    }
    setVersion(version) {
        this.version = version;
    }
    setContent(content) {
        this.content = content;
    }
    setCid(cid) {
        this.cid = cid;
    }
    cast() {
        return JSON.parse(Uint8ArrayToString(new Uint8Array(this.content)));
    }
    toString() {
        return JSON.stringify(this);
    }
    constructor(dataId, alias){
        this.dataId = dataId;
        this.alias = alias;
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
        const res = await this.nodeApiClient.jsonRpcApi(BuildCreateReqParams(clientProposal, orderId, content));
        var model = new Model(res.data.result.DataId, res.data.result.Alias);
        model.setCid(res.data.result.Cid);
        return model;
    }
    async load(req) {
        const res = await this.nodeApiClient.jsonRpcApi(BuildLoadReqParams(req));
        var model = new Model(res.data.result.DataId, res.data.result.Alias);
        model.setCid(res.data.result.Cid);
        model.setContent(res.data.result.Content);
        model.setCommitId(res.data.result.CommitId);
        model.setVersion(res.data.result.Version);
        return model;
    }
    async update(clientProposal, orderId, patch) {
        const res = await this.nodeApiClient.jsonRpcApi(BuildUpdateReqParams(clientProposal, orderId, patch));
        var model = new Model(res.data.result.DataId, res.data.result.Alias);
        model.setCid(res.data.result.Cid);
        return model;
    }
    async renew(clientProposal, orderId) {
        throw new Error("comming soon...");
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
