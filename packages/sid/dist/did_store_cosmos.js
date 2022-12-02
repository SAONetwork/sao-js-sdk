import { ChainApiClient } from "@js-sao-did/api-client";
export class CosmosDidStore {
    async addBinding(proof) {
        return new Promise((resovle, reject)=>{
            this.chainApiClient.AddBinding(proof).then((txResult)=>{
                if (txResult.code != 0) {
                    console.log(`bind account failed. tx=${txResult.transactionHash} code=${txResult.code}`);
                    reject(`bind account ${proof.accountId} -> did ${proof.did} failed.`);
                } else {
                    console.log(`bind account ${proof.accountId} -> did ${proof.did} succeed. tx=${txResult.transactionHash}`);
                    resovle();
                }
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    /**
   * 
   * @param accountId 
   * @returns binded did
   */ async getBinding(accountId) {
        return new Promise((resolve, reject)=>{
            this.chainApiClient.GetBinding(accountId).then((res)=>{
                if (res.status === 200) {
                    resolve(res.data?.didBindingProofs?.proof?.did || null);
                } else {
                    reject("failed to query binding for accountid: " + accountId);
                }
            }).catch((err)=>{
                console.log(err);
                // const ae = err as AxiosError
                if (err.response.status === 404) {
                    console.log();
                    resolve(null);
                } else {
                    reject("failed to query binding for accountid: " + accountId + ", !!!" + err.response.status);
                }
            });
        });
    }
    async removeBinding(accountId) {
        return new Promise((resolve, reject)=>{
            this.chainApiClient.RemoveBinding(accountId).then((txResult)=>{
                if (txResult.code != 0) {
                    console.log(`unbind account failed. tx=${txResult.transactionHash} code=${txResult.code}`);
                    reject(`unbind account ${accountId} failed.`);
                } else {
                    console.log(`unbind account succeed. tx=${txResult.transactionHash}`);
                    resolve();
                }
            }).catch((error)=>{
                reject(`unbind account ${accountId} failed, ` + error);
            });
        });
    }
    addAccountAuth(did, accountAuth) {
        return new Promise((resolve, reject)=>{
            this.chainApiClient.AddAccountAuth(did, accountAuth).then((result)=>{
                if (result.code != 0) {
                    console.log(`add account auth failed. tx=${result.transactionHash} code=${result.code}`);
                    reject(`add account auth did ${did} -> accountdid ${accountAuth.accountDid} failed.`);
                } else {
                    console.log(`add account auth succeed. tx=${result.transactionHash}`);
                    resolve();
                }
            }).catch((error)=>{
                reject("add account auth failed, " + error);
            });
        });
    }
    async getAccountAuth(_, accountDid) {
        return new Promise((resolve, reject)=>{
            this.chainApiClient.GetAccountAuth(accountDid).then((resp)=>{
                if (resp.status == 200) {
                    resolve({
                        accountDid: resp.data.accountAuth.accountDid,
                        sidEncryptedAccount: JSON.parse(resp.data.accountAuth.sidEncryptedAccount),
                        accountEncryptedSeed: JSON.parse(resp.data.accountAuth.accountEncryptedSeed)
                    });
                } else {
                    reject('failed to account auth for accountdid ' + accountDid);
                }
            }).catch((err)=>{
                console.log(err);
                // const ae = err as AxiosError
                if (err.response.status === 404) {
                    resolve(null);
                }
                reject(`failed to account auth for accountdid ${accountDid}. error: ${err}`);
            });
        });
    }
    async updateAccountAuths(did, update, remove) {
        var updates = [];
        update.forEach((u)=>{
            updates.push({
                accountDid: u.accountDid,
                accountEncryptedSeed: u.accountEncryptedSeed,
                sidEncryptedAccount: u.sidEncryptedAccount
            });
        });
        return new Promise((resolve, reject)=>{
            this.chainApiClient.UpdateAccountAuths(did, update, remove).then((txResult)=>{
                if (txResult.code != 0) {
                    console.log(`update account auths failed. tx=${txResult.transactionHash} code=${txResult.code}`);
                    reject(`update account auth did ${did} failed.`);
                } else {
                    console.log(`update account auth succeed. tx=${txResult.transactionHash}`);
                    resolve();
                }
            }).catch((error)=>{
                reject(`update account auth did ${did} failed, ` + error);
            });
        });
    }
    async getAllAccountAuth(did) {
        return new Promise((resolve, reject)=>{
            this.chainApiClient.GetAllAccountAuth(did).then((resp)=>{
                if (resp.status === 200) {
                    var auths = [];
                    resp.data.accountAuths.forEach((a)=>{
                        auths.push({
                            accountDid: a.accountDid,
                            sidEncryptedAccount: JSON.parse(a.sidEncryptedAccount),
                            accountEncryptedSeed: JSON.parse(a.accountEncryptedSeed)
                        });
                    });
                    resolve(auths);
                } else {
                    reject('failed to get all account auths for did ' + did);
                }
            }).catch((err)=>{
                // const ae = err as AxiosError
                if (err.response.status === 404) {
                    return [];
                }
                reject(`failed to get all account auths for did: ${did}, ` + err);
            });
        });
    }
    async updateSidDocument(keys, rootDocId) {
        return new Promise((resolve, reject)=>{
            this.chainApiClient.UpdateSidDocument(keys, rootDocId).then((txResult)=>{
                console.log(txResult);
                if (txResult.code != 0) {
                    console.log(`update sid document failed. tx=${txResult.transactionHash} code=${txResult.code}`);
                    reject(`update sid document failed.`);
                } else {
                    console.log(`update sid document succeed. tx=${txResult.transactionHash}`);
                    this.chainApiClient.GetTx(txResult.transactionHash).then((res)=>{
                        if (res.status === 200) {
                            this.chainApiClient.Decode(res.data.tx_response.data).then((r)=>{
                                resolve(r.docId);
                            }).catch((e)=>{
                                reject(`update sid document failed, decode error, ` + e);
                            });
                        } else {
                            reject(`update sid document failed. ${res.statusText}`);
                        }
                    }).catch((err)=>{
                        reject(`update sid document failed, get transaction error, ` + err);
                    });
                }
            }).catch((error)=>{
                reject(`update sid document failed, ` + error);
            });
        });
    }
    async listSidDocumentVersions(rootDocId) {
        return new Promise((resolve, reject)=>{
            this.chainApiClient.ListSidDocumentVersions(rootDocId).then((resp)=>{
                if (resp.status === 200) {
                    resolve(resp.data.sidDocumentVersion.versionList);
                } else {
                    reject(`failed to get all sid document for root doc id ${rootDocId}.`);
                }
            }).catch((err)=>{
                // const ae = err as AxiosError
                if (err.response.status === 404) {
                    return [];
                }
                reject(`failed to get all sid document for root doc id ${rootDocId}.`);
            });
        });
    }
    async getOldSeeds(did) {
        try {
            const resp = await this.chainApiClient.getPastSeeds(did);
            if (resp.status === 200) {
                var seedJWEs = [];
                resp.data.pastSeeds.seeds.forEach((s)=>{
                    seedJWEs.push(JSON.parse(s));
                });
                return seedJWEs;
            } else {
                throw new Error(`get past seeds for did ${did} failed.`);
            }
        } catch (err) {
            if (err.response.status == 404) {
                return [];
            }
            throw new Error(`get past seeds for did ${did} failed. err=${err}`);
        }
    }
    async addOldSeed(did, seed) {
        const txResult = await this.chainApiClient.addPastSeed(did, seed);
        if (txResult.code != 0) {
            console.log(`add old seed for did ${did} failed. hash=${txResult.hash} code=${txResult.code}`);
            throw new Error(`add old seed for did ${did} failed. hash=${txResult.hash} code=${txResult.code}`);
        } else {
            console.log(`add old seed for did ${did}suceed.`);
        }
    }
    constructor(signer, apiURL, rpcURL, prefix){
        this.chainApiClient = new ChainApiClient({
            apiURL,
            rpcURL,
            prefix,
            signer: signer
        });
    }
}
