import { BuildCreateReqParams, BuildLoadReqParams, BuildNodeAddressReqParams, BuildUpdateReqParams } from '@js-sao-did/api-client';
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
        return JSON.parse(String(this.content));
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
        if (res.data.result) {
            var model = new Model(res.data.result.DataId, res.data.result.Alias);
            model.setCid(res.data.result.Cid);
            return model;
        } else if (res.data.error) {
            throw new Error(res.data.error.message);
        } else {
            throw new Error("unknown error");
        }
    }
    async update(clientProposal, orderId, patch) {
        const res = await this.nodeApiClient.jsonRpcApi(BuildUpdateReqParams(clientProposal, orderId, patch));
        if (res.data.result) {
            var model = new Model(res.data.result.DataId, res.data.result.Alias);
            model.setCid(res.data.result.Cid);
            return model;
        } else if (res.data.error) {
            throw new Error(res.data.error.message);
        } else {
            throw new Error("unknown error");
        }
    }
    async load(req) {
        if (req.groupId === undefined) {
            req.groupId = this.groupId;
        }
        if (req.publicKey === undefined) {
            req.publicKey = this.ownerSid;
        }
        const res = await this.nodeApiClient.jsonRpcApi(BuildLoadReqParams(req));
        if (res.data.result) {
            var model = new Model(res.data.result.DataId, res.data.result.Alias);
            model.setCid(res.data.result.Cid);
            model.setContent(res.data.result.Content);
            model.setCommitId(res.data.result.CommitId);
            model.setVersion(res.data.result.Version);
            return model;
        } else if (res.data.error) {
            throw new Error(res.data.error.message);
        } else {
            throw new Error("unknown error");
        }
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
