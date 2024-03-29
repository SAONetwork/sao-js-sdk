import { DidStore } from "./did_store";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { JWE } from "another-did-jwt";
import LRUCache from "lru-cache";
import {
  AccountAuth,
  ChainApiClient,
  CreateRequestClient,
  SaoNodeAPISchema,
  BuildBindingParams,
  BindingProofV1,
} from "@saonetwork/api-client";
import { DidTxTypes } from "@saonetwork/saochain-ts-client";
import stringify from "fast-json-stable-stringify";

const DefaultLruOptions = {
  max: 20,
  ttl: 10 * 60 * 1000, //10 minites
};
const BindingCacheKey = "binding";

export class CosmosDidStore implements DidStore {
  private chainApiClient: ChainApiClient;
  private nodeApiClient: CreateRequestClient<SaoNodeAPISchema>;
  private cache: Record<string, LRUCache<string, any>>;

  constructor(
    signer?: OfflineSigner,
    apiURL?: string,
    rpcURL?: string,
    prefix?: string,
    nodeApiClient?: CreateRequestClient<SaoNodeAPISchema>
  ) {
    this.chainApiClient = new ChainApiClient({
      apiURL,
      rpcURL,
      prefix,
      signer,
    });
    this.nodeApiClient = nodeApiClient;
    this.cache = {};
  }

  async binding(
    rootDocId: string,
    keys: Record<string, string>,
    proof: DidTxTypes.BindingProof,
    accountAuth: AccountAuth
  ): Promise<void> {
    if (this.nodeApiClient != undefined) {
      const pubkeys = [];
      Object.keys(keys).forEach((k) => {
        pubkeys.push({
          name: k,
          value: keys[k],
        });
      });
      const accountDid = accountAuth.accountDid;
      const accountEncryptedSeed = stringify(accountAuth.accountEncryptedSeed);
      const sidEncryptedAccount = stringify(accountAuth.sidEncryptedAccount);
      const bindingProof = {
        message: proof.message,
        signature: proof.signature,
        account: proof.accountId,
        did: proof.did,
        timestamp: proof.timestamp,
        // TODO:
        version: BindingProofV1,
      };
      const res = await this.nodeApiClient.jsonRpcApi(
        BuildBindingParams(
          rootDocId,
          pubkeys,
          {
            accountDid: accountDid,
            accountEncryptedSeed: accountEncryptedSeed,
            sidEncryptedAccount: sidEncryptedAccount,
          },
          bindingProof
        )
      );
      if (res.data.result) {
        this.getCache(BindingCacheKey).set(proof.accountId, proof.did);
        return;
      } else if (res.data.error) {
        throw new Error(res.data.error.message);
      } else {
        throw new Error("unknown error");
      }
    }
    const txResult = await this.chainApiClient.Binding(rootDocId, keys, proof, accountAuth);
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
  async getDid(accountId: string): Promise<string | null> {
    const did = this.getCache(BindingCacheKey).get(accountId);

    if (did) {
      return did;
    }

    try {
      const res = await this.chainApiClient.GetDid(accountId);
      if (res.status === 200) {
        this.getCache(BindingCacheKey).set(accountId, res.data?.did?.did);
        return res.data?.did?.did || null;
      } else {
        throw new Error("failed to query did for accountid: " + accountId);
      }
    } catch (err) {
      if (err.response.status === 404) {
        return null;
      } else {
        throw new Error("failed to query did for accountid: " + accountId + ", !!!" + err);
      }
    }
  }

  async update(
    did: string,
    accountId: string,
    newDocId: string,
    keys: Record<string, string>,
    timestamp: number,
    updates: AccountAuth[],
    removes: string[],
    pastSeed: JWE
  ): Promise<void> {
    const txResult = await this.chainApiClient.Update(did, newDocId, keys, timestamp, updates, removes, pastSeed);
    if (txResult.code != 0) {
      throw new Error(`update ${did} accounts failed.`);
    } else {
      this.getCache(BindingCacheKey).del(accountId);
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
