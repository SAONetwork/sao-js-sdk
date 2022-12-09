import { DidStore } from "./did_store";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { JWE } from "did-jwt";

import { AccountAuth, ChainApiClient } from "@sao-js-sdk/api-client";
import { BindingProof } from "@sao-js-sdk/common";
export class CosmosDidStore implements DidStore {
  private chainApiClient: ChainApiClient;

  constructor(signer: OfflineSigner, apiURL?: string, rpcURL?: string, prefix?: string) {
    this.chainApiClient = new ChainApiClient({
      apiURL,
      rpcURL,
      prefix,
      signer: signer,
    });
  }

  async binding(
    rootDocId: string,
    keys: Record<string, string>,
    proof: BindingProof,
    accountAuth: AccountAuth
  ): Promise<void> {
    const txResult = await this.chainApiClient.Binding(rootDocId, keys, proof, accountAuth);
    if (txResult.code != 0) {
      console.log(`bind account failed. tx=${txResult.transactionHash} code=${txResult.code}`);
      throw new Error(`bind account ${proof.accountId} -> did ${proof.did} failed.`);
    } else {
      console.log(`bind account ${proof.accountId} -> did ${proof.did} succeed. tx=${txResult.transactionHash}`);
      return;
    }
  }

  async addBinding(proof: BindingProof): Promise<void> {
    const txResult = await this.chainApiClient.AddBinding(proof);
    if (txResult.code != 0) {
      console.log(`bind account failed. tx=${txResult.transactionHash} code=${txResult.code}`);
      throw new Error(`bind account ${proof.accountId} -> did ${proof.did} failed.`);
    } else {
      console.log(`bind account ${proof.accountId} -> did ${proof.did} succeed. tx=${txResult.transactionHash}`);
      return;
    }
  }

  /**
   *
   * @param accountId
   * @returns binded did
   */
  async getBinding(accountId: string): Promise<string | null> {
    try {
      const res = await this.chainApiClient.GetBinding(accountId);
      if (res.status === 200) {
        return res.data?.DidBindingProof?.proof?.did || null;
      } else {
        throw new Error("failed to query binding for accountid: " + accountId);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        console.log();
        return null;
      } else {
        throw new Error("failed to query binding for accountid: " + accountId + ", !!!" + err.response.status);
      }
    }
  }

  async removeBinding(accountId: string): Promise<void> {
    const txResult = await this.chainApiClient.RemoveBinding(accountId);
    if (txResult.code != 0) {
      console.log(`unbind account failed. tx=${txResult.transactionHash} code=${txResult.code}`);
      throw new Error(`unbind account ${accountId} failed.`);
    } else {
      console.log(`unbind account succeed. tx=${txResult.transactionHash}`);
      return;
    }
  }

  async addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void> {
    const result = await this.chainApiClient.AddAccountAuth(did, accountAuth);
    if (result.code != 0) {
      console.log(`add account auth failed. tx=${result.transactionHash} code=${result.code}`);
      throw new Error(`add account auth did ${did} -> accountdid ${accountAuth.accountDid} failed.`);
    } else {
      console.log(`add account auth succeed. tx=${result.transactionHash}`);
      return;
    }
  }

  async getAccountAuth(_: string, accountDid: string): Promise<AccountAuth | null> {
    try {
      const resp = await this.chainApiClient.GetAccountAuth(accountDid);
      if (resp.status == 200) {
        return {
          accountDid: resp.data.accountAuth.accountDid,
          sidEncryptedAccount: JSON.parse(resp.data.accountAuth.sidEncryptedAccount) as JWE,
          accountEncryptedSeed: JSON.parse(resp.data.accountAuth.accountEncryptedSeed) as JWE,
        };
      } else {
        throw new Error("failed to account auth for accountdid " + accountDid);
      }
    } catch (err) {
      console.log(err);
      // const ae = err as AxiosError
      if (err.response.status === 404) {
        return null;
      }
      throw new Error(`failed to account auth for accountdid ${accountDid}. error: ${err}`);
    }
  }

  async updateAccountAuths(did: string, update: AccountAuth[], remove: string[]): Promise<void> {
    const updates = [];
    update.forEach((u) => {
      updates.push({
        accountDid: u.accountDid,
        accountEncryptedSeed: u.accountEncryptedSeed,
        sidEncryptedAccount: u.sidEncryptedAccount,
      });
    });

    const txResult = await this.chainApiClient.UpdateAccountAuths(did, update, remove);
    if (txResult.code != 0) {
      console.log(`update account auths failed. tx=${txResult.transactionHash} code=${txResult.code}`);
      throw new Error(`update account auth did ${did} failed.`);
    } else {
      console.log(`update account auth succeed. tx=${txResult.transactionHash}`);
      return;
    }
  }

  async getAllAccountAuth(did: string): Promise<AccountAuth[]> {
    try {
      const resp = await this.chainApiClient.GetAllAccountAuth(did);
      if (resp.status === 200) {
        const auths: AccountAuth[] = [];
        resp.data.accountAuths.forEach((a) => {
          auths.push({
            accountDid: a.accountDid,
            sidEncryptedAccount: JSON.parse(a.sidEncryptedAccount) as JWE,
            accountEncryptedSeed: JSON.parse(a.accountEncryptedSeed) as JWE,
          });
        });
        return auths;
      } else {
        throw new Error("failed to get all account auths for did " + did);
      }
    } catch (err) {
      // const ae = err as AxiosError
      if (err.response.status === 404) {
        return [];
      }
      throw new Error(`failed to get all account auths for did: ${did}, ` + err);
    }
  }

  async updateSidDocument(keys: Record<string, string>, rootDocId?: string): Promise<string> {
    const txResult = await this.chainApiClient.UpdateSidDocument(keys, rootDocId);
    console.log(txResult);

    if (txResult.code != 0) {
      console.log(`update sid document failed. tx=${txResult.transactionHash} code=${txResult.code}`);
      throw new Error(`update sid document failed.`);
    } else {
      console.log(`update sid document succeed. tx=${txResult.transactionHash}`);

      const res = await this.chainApiClient.GetTx(txResult.transactionHash);

      if (res.status === 200) {
        const r = await this.chainApiClient.Decode(res.data.tx_response.data);

        return r.docId;
      } else {
        throw new Error(`update sid document failed. ${res.statusText}`);
      }
    }
  }

  async listSidDocumentVersions(rootDocId: string): Promise<Array<string>> {
    try {
      const resp = await this.chainApiClient.ListSidDocumentVersions(rootDocId);
      if (resp.status === 200) {
        return resp.data.sidDocumentVersion.versionList;
      } else {
        throw new Error(`failed to get all sid document for root doc id ${rootDocId}.`);
      }
    } catch (err) {
      // const ae = err as AxiosError
      if (err.response.status === 404) {
        return [];
      }
      throw new Error(`failed to get all sid document for root doc id ${rootDocId}.`);
    }
  }

  async getOldSeeds(did: string): Promise<Array<JWE>> {
    try {
      const resp = await this.chainApiClient.getPastSeeds(did + ":");
      if (resp.status === 200) {
        const seedJWEs = [];
        resp.data.pastSeeds.seeds.forEach((s) => {
          seedJWEs.push(JSON.parse(s) as JWE);
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

  async addOldSeed(did: string, seed: JWE): Promise<void> {
    const txResult = await this.chainApiClient.addPastSeed(did, seed);
    if (txResult.code != 0) {
      console.log(`add old seed for did ${did} failed. hash=${txResult.hash} code=${txResult.code}`);
      throw new Error(`add old seed for did ${did} failed. hash=${txResult.hash} code=${txResult.code}`);
    } else {
      console.log(`add old seed for did ${did}suceed.`);
    }
  }

  async updatePaymentAddress(accountId: string, did: string): Promise<void> {
    const txResult = await this.chainApiClient.updatePaymentAddress(accountId, did);
    if (txResult.code != 0) {
      console.log(`update payment address failed. hash=${txResult.hash} code=${txResult.code}`);
      throw new Error(`update payment address failed. hash=${txResult.hash} code=${txResult.code}`);
    } else {
      console.log(`update payment address for ${accountId} succeed.`);
    }
  }
}
