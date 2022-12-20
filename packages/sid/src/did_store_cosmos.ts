import { DidStore } from "./did_store";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { JWE } from "did-jwt";
import LRUCache from "lru-cache";
import { AccountAuth, ChainApiClient } from "@sao-js-sdk/api-client";
import { DidTxTypes } from "sao-chain-client";

const DefaultLruOptions = {
  max: 20,
  ttl: 10 * 60 * 1000, //10 minites
};
const BindingCacheKey = "binding";

export class CosmosDidStore implements DidStore {
  private chainApiClient: ChainApiClient;
  private cache: Record<string, LRUCache<string, any>>;

  constructor(signer: OfflineSigner, apiURL?: string, rpcURL?: string, prefix?: string) {
    this.chainApiClient = new ChainApiClient({
      apiURL,
      rpcURL,
      prefix,
      signer: signer,
    });
    this.cache = {};
  }

  async binding(
    rootDocId: string,
    keys: Record<string, string>,
    proof: DidTxTypes.BindingProof,
    accountAuth: AccountAuth
  ): Promise<void> {
    const txResult = await this.chainApiClient.Binding(rootDocId, keys, proof, accountAuth);
    if (txResult.code != 0) {
      throw new Error(`bind account ${proof.accountId} -> did ${proof.did} failed.`);
    } else {
      this.getCache(BindingCacheKey).set(proof.accountId, proof.did);
      return;
    }
  }

  async addBinding(proof: DidTxTypes.BindingProof): Promise<void> {
    const txResult = await this.chainApiClient.AddBinding(proof);
    if (txResult.code != 0) {
      throw new Error(`bind account ${proof.accountId} -> did ${proof.did} failed.`);
    } else {
      this.getCache(BindingCacheKey).set(proof.accountId, proof.did);
      return;
    }
  }

  /**
   *
   * @param accountId
   * @returns binded did
   */
  async getBinding(accountId: string): Promise<string | null> {
    const did = this.getCache(BindingCacheKey).get(accountId);

    if (did) {
      return did;
    }

    try {
      const res = await this.chainApiClient.GetBinding(accountId);
      if (res.status === 200) {
        this.getCache(BindingCacheKey).set(accountId, res.data?.DidBindingProof?.proof?.did);
        return res.data?.DidBindingProof?.proof?.did || null;
      } else {
        throw new Error("failed to query binding for accountid: " + accountId);
      }
    } catch (err) {
      if (err.response.status === 404) {
        return null;
      } else {
        throw new Error("failed to query binding for accountid: " + accountId + ", !!!" + err.response.status);
      }
    }
  }

  async removeBinding(accountId: string): Promise<void> {
    const txResult = await this.chainApiClient.RemoveBinding(accountId);
    if (txResult.code != 0) {
      throw new Error(`unbind account ${accountId} failed.`);
    } else {
      this.getCache(BindingCacheKey).delete(accountId);
      return;
    }
  }

  async addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void> {
    const result = await this.chainApiClient.AddAccountAuth(did, accountAuth);
    if (result.code != 0) {
      throw new Error(`add account auth did ${did} -> accountdid ${accountAuth.accountDid} failed.`);
    } else {
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
      throw new Error(`update account auth did ${did} failed.`);
    } else {
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

    if (txResult.code != 0) {
      throw new Error(`update sid document failed.`);
    } else {
      const res = await this.chainApiClient.GetTx(txResult.transactionHash);

      if (res.status === 200) {
        const r = await this.chainApiClient.DecodeSidDocument(res.data.tx_response.data);

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
      throw new Error(`add old seed for did ${did} failed. hash=${txResult.hash} code=${txResult.code}`);
    }
  }

  async updatePaymentAddress(accountId: string, did: string): Promise<void> {
    const txResult = await this.chainApiClient.updatePaymentAddress(accountId, did);
    if (txResult.code != 0) {
      throw new Error(`update payment address failed. hash=${txResult.hash} code=${txResult.code}`);
    }
  }

  getCache(key: string): LRUCache<string, any> {
    if (this.cache[key]) {
      return this.cache[key];
    }
    this.cache[key] = new LRUCache<string, any>(DefaultLruOptions);
    return this.cache[key];
  }
}
