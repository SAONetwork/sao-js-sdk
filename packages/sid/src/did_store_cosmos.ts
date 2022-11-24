import { BindingProof, BindingProofV1 } from "./types";
import { DidStore, AccountAuth } from "./did_store";
import { Client } from "SaoNetwork-sao-client-ts";
import { queryClient as didQueryClient } from "SaoNetwork-sao-client-ts/saonetwork.sao.did";
import { Api } from "SaoNetwork-sao-client-ts/saonetwork.sao.did/rest";
import stringify from 'fast-json-stable-stringify';
import { OfflineSigner } from "@cosmjs/proto-signing";
import { AxiosError } from "axios";
import { JWE } from "did-jwt";
import * as u8a from 'uint8arrays';
import { MsgUpdateSidDocumentResponse } from "SaoNetwork-sao-client-ts/saonetwork.sao.did/types/sao/did/tx";
import {TxMsgData} from "SaoNetwork-sao-client-ts/cosmos.tx.v1beta1/types/cosmos/base/abci/v1beta1/abci";

export class CosmosDidStore implements DidStore {
    private signer: OfflineSigner
    private client: InstanceType<typeof Client>
    private didQueryClient: Api<unknown>

    constructor(signer: OfflineSigner, apiURL?: string, rpcURL?: string, prefix?: string) {
        this.signer = signer;
        const api = apiURL || process.env.COSMOS_API_URL || 'http://localhost:1317';
        const rpc = rpcURL || process.env.COSMOS_RPC_URL || 'http://localhost:26657';
        const addressPrefix = prefix || process.env.COSMOS_PREFIX || "cosmos";

        console.log("cosmos did store: ");
        console.log("api url: ", api);
        console.log("rpc url: ", rpc);
        console.log("prefix: ", addressPrefix);

        this.client = new Client({
            apiURL: api,
            rpcURL: rpc,
            prefix: addressPrefix
        }, signer);

        this.didQueryClient = didQueryClient({addr: api});
    }

    async addBinding(proof: BindingProof): Promise<void> {
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
                    version: BindingProofV1,
                }
            },
        });
        if (txResult.code != 0) {
            console.log(`bind account failed. tx=${txResult.transactionHash} code=${txResult.code}`);
            throw new Error(`bind account ${proof.accountId} -> did ${proof.did} failed.`);
        } else {
            console.log(`bind account ${proof.accountId} -> did ${proof.did} succeed. tx=${txResult.transactionHash}`);
        }
        return
    }

    /**
     * 
     * @param accountId 
     * @returns binded did
     */
    async getBinding(accountId: string): Promise<string | null> {
        try {
            const binding = await this.didQueryClient.queryDidBindingProofs(accountId + ':');
            if (binding.status === 200) {
                return binding.data.didBindingProofs?.proof?.did || null;
            } else {
                throw new Error('failed to query binding for accountid ' + accountId);
            }
        } catch (e) {
            const ae = e as AxiosError
            if (ae.response?.status === 404) {
                return null;
            }
            throw new Error('failed to query binding for accountid ' + accountId);
        }
    }

    async removeBinding(accountId: string): Promise<void> {
        const account = await this.signer.getAccounts();
        const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUnbinding({
            value: {
                creator: account[0].address,
                accountId
            }
        });
        console.log(txResult);
        if (txResult.code != 0) {
            console.log(`unbind account failed. tx=${txResult.transactionHash} code=${txResult.code}`);
            throw new Error(`unbind account ${accountId} failed.`);
        } else {
            console.log(`unbind account succeed. tx=${txResult.transactionHash}`);
        }
    }

    async addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void> {
        const account = await this.signer.getAccounts();
        const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgAddAccountAuth({
            value: {
                creator: account[0].address,
                did: did,
                accountAuth: {
                    accountDid: accountAuth.accountDid,
                    accountEncryptedSeed: stringify(accountAuth.accountEncryptedSeed),
                    sidEncryptedAccount: stringify(accountAuth.sidEncryptedAccount)
                }
            }
        });
        if (txResult.code != 0) {
            console.log(`add account auth failed. tx=${txResult.transactionHash} code=${txResult.code}`);
            throw new Error(`add account auth did ${did} -> accountdid ${accountAuth.accountDid} failed.`);
        } else {
            console.log(`add account auth succeed. tx=${txResult.transactionHash}`);
        }
    }

    async getAccountAuth(did: string, accountDid: string): Promise<AccountAuth | null> {
        try {
            const accountAuth = await this.didQueryClient.queryAccountAuth(accountDid + ':');
            if (accountAuth.status == 200) {
                return {
                    accountDid: accountAuth.data.accountAuth.accountDid,
                    sidEncryptedAccount: JSON.parse(accountAuth.data.accountAuth.sidEncryptedAccount) as JWE,
                    accountEncryptedSeed: JSON.parse(accountAuth.data.accountAuth.accountEncryptedSeed) as JWE
                };
            } else {
                throw new Error('failed to account auth for accountdid ' + accountDid);
            }
        } catch (e) {
            console.log(e);
            const ae = e as AxiosError
            if (ae.response?.status === 404) {
                return null;
            }
            throw new Error(`failed to account auth for accountdid ${accountDid}. error: ${e}`);
        }
    }

    async updateAccountAuths(did: string, update: AccountAuth[], remove: string[]): Promise<void> {
        var updates = [];
        update.forEach(u => {
            updates.push({
                accountDid: u.accountDid,
                accountEncryptedSeed: u.accountEncryptedSeed,
                sidEncryptedAccount: u.sidEncryptedAccount
            });
        });
        const account = await this.signer.getAccounts();
        const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUpdateAccountAuths({
            value: {
                creator: account[0].address,
                did: did,
                update: updates,
                remove
            }
        });
        if (txResult.code != 0) {
            console.log(`update account auths failed. tx=${txResult.transactionHash} code=${txResult.code}`);
            throw new Error(`update account auth did ${did} failed.`);
        } else {
            console.log(`add account auth succeed. tx=${txResult.transactionHash}`);
        }
    }

    async getAllAccountAuth(did: string): Promise<AccountAuth[]> {
        try {
            const resp = await this.didQueryClient.queryGetAllAccountAuths(did + ":");
            if (resp.status === 200) {
                var auths: AccountAuth[] = [];
                resp.data.accountAuths.forEach(a => {
                    auths.push({
                        accountDid: a.accountDid,
                        sidEncryptedAccount: JSON.parse(a.sidEncryptedAccount) as JWE,
                        accountEncryptedSeed: JSON.parse(a.accountEncryptedSeed) as JWE
                    });
                });
                return auths;
            } else {
                throw new Error('failed to get all account auths for did ' + did);
            }
        } catch (e) {
            const ae = e as AxiosError
            if (ae.response?.status === 404) {
                return [];
            }
            throw new Error(`failed to get all account auths for did ${did}. error: ${e}`);
        }
    }

    async updateSidDocument(signingKey: string, encryptKey: string, rootDocId?: string): Promise<string> {
        const account = await this.signer.getAccounts();
        const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUpdateSidDocument({
            value: {
                creator: account[0].address,
                signingKey: signingKey,
                encryptKey: encryptKey,
                rootDocId: rootDocId
            }
        });
        console.log(txResult);
        if (txResult.code != 0) {
            console.log(`update sid document failed. tx=${txResult.transactionHash} code=${txResult.code}`);
            throw new Error(`update sid document failed.`);
        } else {
            console.log(`update sid document succeed. tx=${txResult.transactionHash}`);
            const r = await this.client.CosmosTxV1Beta1.query.serviceGetTx(txResult.transactionHash);
            if (r.status === 200) {
                console.log(TxMsgData.decode(u8a.fromString(r.data.tx_response.data)));
                return "";
            } else {
                throw new Error(`update sid document failed. ${r.statusText}`);
            }
        }
    }

    async listSidDocumentVersions(rootDocId: string): Promise<Array<string>> {
        try {
            const resp = await this.didQueryClient.querySidDocumentVersion(rootDocId);
            if (resp.status === 200) {
                return resp.data.sidDocumentVersion.versionList;
            } else {
                throw new Error(`failed to get all sid document for root doc id ${rootDocId}.`);
            }
        } catch (e) {
            const ae = e as AxiosError
            if (ae.response?.status === 404) {
                return [];
            }
            throw new Error(`failed to get all sid document for root doc id ${rootDocId}.`);
        }
    }
}