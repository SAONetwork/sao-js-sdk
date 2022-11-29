import { DidStore } from "./did_store";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { JWE } from "did-jwt";

import { AccountAuth, ChainApiClient, BindingProof } from "@js-sao-did/api-client"
export class CosmosDidStore implements DidStore {
  private chainApiClient: ChainApiClient

  constructor(signer: OfflineSigner, apiURL?: string, rpcURL?: string, prefix?: string) {
    this.chainApiClient = new ChainApiClient({
      apiURL,
      rpcURL,
      prefix,
      signer: signer,
    })
  }

  async addBinding(proof: BindingProof): Promise<void> {
    return new Promise((resovle, reject) => {
      this.chainApiClient.AddBinding(proof)
        .then((txResult) => {
          if (txResult.code != 0) {
            console.log(`bind account failed. tx=${txResult.transactionHash} code=${txResult.code}`);
            reject(`bind account ${proof.accountId} -> did ${proof.did} failed.`)
          } else {
            console.log(`bind account ${proof.accountId} -> did ${proof.did} succeed. tx=${txResult.transactionHash}`);
            resovle();
          }
        }).catch(err => {
          reject(err)
        })
    })
  }

  /**
   * 
   * @param accountId 
   * @returns binded did
   */
  async getBinding(accountId: string): Promise<any | null> {
    return new Promise((resolve, reject) => {
      this.chainApiClient.GetBinding(accountId)
        .then(res => {
          if (res.status === 200) {
            resolve(res.data?.didBindingProofs?.proof?.did || null);
          } else {
            reject("failed to query binding for accountid: " + accountId);
          }
        }).catch(err => {
          reject("failed to query binding for accountid: " + accountId + ", " + err)
        })
    })
  }

  async removeBinding(accountId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.chainApiClient.RemoveBinding(accountId)
        .then(txResult => {
          if (txResult.code != 0) {
            console.log(`unbind account failed. tx=${txResult.transactionHash} code=${txResult.code}`);
            reject(`unbind account ${accountId} failed.`);
          } else {
            console.log(`unbind account succeed. tx=${txResult.transactionHash}`);
            resolve();
          }
        }).catch(error => {
          reject(`unbind account ${accountId} failed, ` + error);
        })
    });
  }

  async addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void> {
    return new Promise((resolve, reject) => {
      this.chainApiClient.AddAccountAuth(did, accountAuth)
        .then(result => {
          if (result.code != 0) {
            console.log(`add account auth failed. tx=${result.transactionHash} code=${result.code}`);
            reject(`add account auth did ${did} -> accountdid ${accountAuth.accountDid} failed.`);
          } else {
            console.log(`add account auth succeed. tx=${result.transactionHash}`);
            resolve()
          }
        }).catch(error => {
          reject("add account auth succeed, " + error);
        })
    });
  }

  async getAccountAuth(did: string, accountDid: string): Promise<AccountAuth | null> {
    return new Promise((resolve, reject) => {
      this.chainApiClient.GetAccountAuth(did)
        .then(resp => {
          if (resp.status == 200) {
            resolve({
              accountDid: resp.data.accountAuth.accountDid,
              sidEncryptedAccount: JSON.parse(resp.data.accountAuth.sidEncryptedAccount) as JWE,
              accountEncryptedSeed: JSON.parse(resp.data.accountAuth.accountEncryptedSeed) as JWE
            });
          } else {
            reject('failed to account auth for accountdid ' + accountDid);
          }
        }).catch(err => {
          console.log(err);
          // const ae = err as AxiosError
          if (err.response.status === 404) {
            resolve(null);
          }
          reject(`failed to account auth for accountdid ${accountDid}. error: ${err}`);
        });
    });
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

    return new Promise((resolve, reject) => {
      this.chainApiClient.UpdateAccountAuths(did, update, remove)
        .then(txResult => {
          if (txResult.code != 0) {
            console.log(`update account auths failed. tx=${txResult.transactionHash} code=${txResult.code}`);
            reject(`update account auth did ${did} failed.`);
          } else {
            console.log(`add account auth succeed. tx=${txResult.transactionHash}`);
            resolve()
          }
        }).catch(error => {
          reject(`update account auth did ${did} failed, ` + error);
        })
    })
  }

  async getAllAccountAuth(did: string): Promise<AccountAuth[]> {
    return new Promise((resolve, reject) => {
      this.chainApiClient.GetAllAccountAuth(did)
        .then(resp => {
          if (resp.status === 200) {
            var auths: AccountAuth[] = [];
            resp.data.accountAuths.forEach(a => {
              auths.push({
                accountDid: a.accountDid,
                sidEncryptedAccount: JSON.parse(a.sidEncryptedAccount) as JWE,
                accountEncryptedSeed: JSON.parse(a.accountEncryptedSeed) as JWE
              });
            });
            resolve(auths);
          } else {
            reject('failed to get all account auths for did ' + did);
          }
        }).catch(err => {
          // const ae = err as AxiosError
          if (err.response.status === 404) {
            return [];
          }
          reject(`failed to get all account auths for did: ${did}, ` + err);
        })
    });
  }

  async updateSidDocument(signingKey: string, encryptKey: string, rootDocId?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.chainApiClient.UpdateSidDocument(signingKey, encryptKey, rootDocId).
        then(txResult => {
          console.log(txResult);

          if (txResult.code != 0) {
            console.log(`update sid document failed. tx=${txResult.transactionHash} code=${txResult.code}`);
            reject(`update sid document failed.`);
          } else {
            console.log(`update sid document succeed. tx=${txResult.transactionHash}`);
            this.chainApiClient.GetTx(txResult.transactionHash)
              .then(res => {
                if (res.status === 200) {
                  this.chainApiClient.Decode(res.data.tx_response.data).
                    then(r => {
                      resolve(r.docId)
                    }).catch(e => {
                      reject(`update sid document failed, ` + e);
                    })
                } else {
                  reject(`update sid document failed. ${res.statusText}`);
                }
              }).catch(err => {
                reject(`update sid document failed, ` + err);
              })
          }
        }).catch(error => {
          reject(`update sid document failed, ` + error);
        })
    })
  }

  async listSidDocumentVersions(rootDocId: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      this.chainApiClient.ListSidDocumentVersions(rootDocId)
        .then(resp => {
          if (resp.status === 200) {
            resolve(resp.data.sidDocumentVersion.versionList);
          } else {
            reject(`failed to get all sid document for root doc id ${rootDocId}.`);
          }
        }).catch(err => {
          // const ae = err as AxiosError
          if (err.response.status === 404) {
            return [];
          }
          reject(`failed to get all sid document for root doc id ${rootDocId}.`);
        });
    });
  }
}