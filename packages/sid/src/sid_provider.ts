import { Keychain } from "./keychain";
import { AccountProvider } from "./account_provider";
import { accountSecretToDid, generateAccountSecret, getSidIdentifier, toJWS, toStableObject } from "./utils";
import { createJWS } from "another-did-jwt";
import { AuthenticateParam, CreateJWSParam, JWS } from "./types";
import { DidStore } from "./did_store";
import { AccountAuth } from "@saonetwork/api-client";

/**
 * sid did provider
 */
export class SidProvider {
  keychain: Keychain | null;
  sid: string;
  didStore: DidStore;
  accountProvider: AccountProvider;

  private constructor(keychain: Keychain, sid: string, didStore: DidStore, accountProvider: AccountProvider) {
    this.keychain = keychain;
    this.sid = sid;
    this.didStore = didStore;
    this.accountProvider = accountProvider;
  }

  /**
   * generate a new sid and bind to the given account.
   *
   * @param didStore did store
   * @param accountProvider account provider
   * @returns sid provider
   */
  static async newFromAccount(didStore: DidStore, accountProvider: AccountProvider): Promise<SidProvider> {
    // const account = await accountProvider.accountId()
    // const accountSecret = await generateAccountSecret(accountProvider);
    const timestamp = Date.now();
    const keychain = await Keychain.create(didStore, timestamp);

    // keys
    const keys = keychain.getPubKeys();

    // account auth
    const account = await accountProvider.accountId();
    const accountSecret = await generateAccountSecret(accountProvider);
    const accountAuth = await keychain.add(account.toString(), accountSecret);

    // proofs
    const did = keychain.did;

    let flag = true;
    setTimeout(() => {
      if (flag) {
        throw new Error("biding proof generate timeout.");
      }
    }, 5000);

    console.log("start binding proof generated");
    const bindingProof = await accountProvider.generateBindingProof(did, timestamp);
    flag = false;
    console.log("binding proof generated");

    await didStore.binding(getSidIdentifier(keychain.did), keys, bindingProof, accountAuth);

    return new SidProvider(keychain, did, didStore, accountProvider);
  }

  /**
   * Recover a sid provider by the given account and did.
   *
   * @param didStore did store.
   * @param accountProvider account provider
   * @param did did string
   * @returns sid provider
   */
  static async recoverFromAccount(
    didStore: DidStore,
    accountProvider: AccountProvider,
    did: string
  ): Promise<SidProvider> {
    const sidProvider = this.lazyInit(didStore, accountProvider, did);
    await sidProvider.recoverKeychain();
    return sidProvider;
  }

  /**
   * Get a sid provider without initializing keychain.
   *
   * @param didStore did store
   * @param accountProvider account provider
   * @param did did
   * @returns sid provider.
   */
  static lazyInit(didStore: DidStore, accountProvider: AccountProvider, did: string): SidProvider {
    return new SidProvider(null, did, didStore, accountProvider);
  }

  /**
   * if keychain is not initialized, recover keychain from current account provider.
   * if keychain is already initialized, do nothing.
   */
  private async recoverKeychain() {
    if (this.keychain == null) {
      const accountSecret = await generateAccountSecret(this.accountProvider);
      const accountDid = await accountSecretToDid(accountSecret);
      const accountAuth = await this.didStore.getAccountAuth(this.sid, accountDid.id);
      if (!accountAuth) {
        throw new Error("account auth is missing.");
      }
      const seed = await accountDid.decryptJWE(accountAuth.accountEncryptedSeed);
      this.keychain = await Keychain.load(this.didStore, seed, this.sid);
    }
  }

  async addAccountAuth(accountId: string, accountSecret: Uint8Array): Promise<AccountAuth> {
    await this.recoverKeychain();
    return this.keychain.add(accountId, accountSecret);
  }

  /**
   * Sign the given payload
   *
   * @param payload payload to sign
   * @param didWithFragment did fragment to use for sign
   * @param protectedHeader signature header
   * @returns signature
   */
  private async sign(
    payload: Record<string, any> | string,
    didWithFragment: string,
    protectedHeader: Record<string, any> = {}
  ): Promise<JWS> {
    await this.recoverKeychain();

    const did = didWithFragment.split("#")[0];
    let keyFragment = didWithFragment.split("#")[1];
    if (did !== this.sid) {
      throw new Error(`current sid is ${this.sid}, invalid did: ${did}.`);
    }
    if (!keyFragment) {
      keyFragment = this.keychain.getKeyFragment();
    }
    const signer = this.keychain.getSigner();
    const kid = `${did}?version-id=${this.keychain.latestDocid}#${keyFragment}`;
    const header = toStableObject(Object.assign(protectedHeader, { kid }));
    const content = typeof payload === "string" ? payload : toStableObject(payload);
    const jws = await createJWS(content, signer, header);
    return toJWS(jws);
  }

  /**
   *
   * @param param authentication parameter
   * @returns signature
   */
  async authenticate(param: AuthenticateParam): Promise<JWS> {
    const jws = await this.sign(
      {
        did: this.sid,
        aud: param.aud,
        nonce: param.nonce,
        path: param.paths,
      },
      this.sid
    );
    return jws;
  }

  /**
   * create json web signature.
   *
   * @param param create jws parameters
   * @returns
   */
  async createJWS(param: CreateJWSParam): Promise<JWS> {
    const jws = await this.sign(param.payload, this.sid);
    return jws;
  }
}
