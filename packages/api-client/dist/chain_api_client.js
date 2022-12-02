import { BindingProofV1 } from './types';
import { Client } from "SaoNetwork-sao-client-ts";
import { queryClient as didQueryClient } from "SaoNetwork-sao-client-ts/dist/saonetwork.sao.did";
import { queryClient as modelQueryClient } from "SaoNetwork-sao-client-ts/dist/saonetwork.sao.model";
import * as u8a from 'uint8arrays';
import { MsgUpdateSidDocumentResponse } from "SaoNetwork-sao-client-ts/dist/saonetwork.sao.did/types/sao/did/tx";
import { TxMsgData } from "SaoNetwork-sao-client-ts/dist/cosmos.tx.v1beta1/types/cosmos/base/abci/v1beta1/abci";
export class ChainApiClient {
    async GetTx(transactionHash) {
        return this.client.CosmosTxV1Beta1.query.serviceGetTx(transactionHash);
    }
    async Decode(data) {
        const decoded = u8a.fromString(data.toLowerCase(), 'base16');
        return MsgUpdateSidDocumentResponse.decode(TxMsgData.decode(decoded).msgResponses[0].value);
    }
    async AddAccountAuth(did, accountAuth) {
        const account = await this.signer.getAccounts();
        const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgAddAccountAuth({
            value: {
                creator: account[0].address,
                did: did,
                accountAuth
            }
        });
        return txResult;
    }
    async GetAccountAuth(accountDid) {
        return this.didClient.queryAccountAuth(accountDid + ':');
    }
    async AddBinding(proof) {
        const account = await this.signer.getAccounts();
        const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgAddBinding({
            value: {
                creator: account[0].address,
                accountId: proof.accountId,
                proof: {
                    message: proof.message,
                    signature: proof.signature,
                    account: proof.accountId,
                    did: proof.did,
                    timestamp: proof.timestamp,
                    // TODO:
                    version: BindingProofV1
                }
            }
        });
        return txResult;
    }
    async GetBinding(accountId) {
        return this.didClient.queryDidBindingProofs(accountId + ':');
    }
    async RemoveBinding(accountId) {
        const account = await this.signer.getAccounts();
        const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUnbinding({
            value: {
                creator: account[0].address,
                accountId
            }
        });
        return txResult;
    }
    async UpdateAccountAuths(did, updates, removes) {
        const account = await this.signer.getAccounts();
        const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUpdateAccountAuths({
            value: {
                creator: account[0].address,
                did: did,
                update: updates,
                removes
            }
        });
        return txResult;
    }
    async GetAllAccountAuth(did) {
        return await this.didClient.queryGetAllAccountAuths(did + ":");
    }
    async UpdateSidDocument(keys, rootDocId) {
        const account = await this.signer.getAccounts();
        var pubkeys = [];
        Object.keys(keys).forEach((k)=>{
            pubkeys.push({
                name: k,
                value: keys[k]
            });
        });
        const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUpdateSidDocument({
            value: {
                creator: account[0].address,
                keys: pubkeys,
                rootDocId: rootDocId
            }
        });
        return txResult;
    }
    async ListSidDocumentVersions(rootDocId) {
        return this.didClient.querySidDocumentVersion(rootDocId);
    }
    constructor(config){
        const api = config.apiURL || process.env.COSMOS_API_URL || 'http://localhost:1317';
        const rpc = config.rpcURL || process.env.COSMOS_RPC_URL || 'http://localhost:26657';
        const addressPrefix = config.prefix || "cosmos";
        console.log("cosmos did store: ");
        console.log("api url: ", api);
        console.log("rpc url: ", rpc);
        console.log("prefix: ", addressPrefix);
        this.client = new Client({
            apiURL: api,
            rpcURL: rpc,
            prefix: addressPrefix
        }, config.signer);
        this.signer = config.signer;
        this.didClient = didQueryClient({
            addr: api
        });
        this.modelClient = modelQueryClient({
            addr: api
        });
    }
}
