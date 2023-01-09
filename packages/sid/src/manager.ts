/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */
import { AccountProvider } from "./account_provider";
import { SidProvider } from "./sid_provider";
import { DidStore } from "./did_store";
import { generateAccountSecret, isSid, getSidIdentifier } from "./utils";

/**
 * Sid manager which can manage a list of accounts and sid
 */
export class SidManager {
  private didStore: DidStore;
  // current account provider
  private accountProvider: AccountProvider;
  // did -> sid provider
  private sidProviders: Record<string, SidProvider>;

  private constructor(accountProvider: AccountProvider, didStore: DidStore) {
    this.accountProvider = accountProvider;
    this.didStore = didStore;
    this.sidProviders = {};
  }

  /**
   * create a sid manager instance.
   *
   * @param accountProvider account provider
   * @param didStore  did store
   * @param did did string
   * @returns sid manager
   */
  static async createManager(accountProvider: AccountProvider, didStore: DidStore, did?: string): Promise<SidManager> {
    const manager = new SidManager(accountProvider, didStore);
    await manager.prepareSidProvider(did);
    return manager;
  }

  /**
   * set current account provider
   *
   * @param accountProvider account provider to set
   * @param did
   */
  async setAccountProvider(accountProvider: AccountProvider, did?: string) {
    this.accountProvider = accountProvider;
    await this.prepareSidProvider(did);
  }

  private async prepareSidProvider(did?: string, lazy = true): Promise<void> {
    const account = await this.accountProvider.accountId();
    const bindingDid = await this.didStore.getBinding(account.toString());

    if (bindingDid) {
      if (this.sidProviders[bindingDid]) {
        return;
      }

      if (lazy) {
        const sidProvider = SidProvider.lazyInit(this.didStore, this.accountProvider, bindingDid);
        this.sidProviders[sidProvider.sid] = sidProvider;
      } else {
        const sidProvider = await SidProvider.recoverFromAccount(this.didStore, this.accountProvider, bindingDid);
        this.sidProviders[sidProvider.sid] = sidProvider;
      }
    } else {
      if (did) {
        await this.bind(account.toString(), did);
      } else {
        const sidProvider = await SidProvider.newFromAccount(this.didStore, this.accountProvider);
        this.sidProviders[sidProvider.sid] = sidProvider;
      }
    }
  }

  /**
   * Bind account id to did.
   *
   * @param accountId account id
   * @param did did
   */
  private async bind(accountId: string, did: string): Promise<void> {
    if (!isSid(did)) {
      throw new Error(`${did} is not a sid.`);
    }
    if (!this.sidProviders[did]) {
      throw new Error(`${did} provider is not managed.`);
    }

    const rootDocId = getSidIdentifier(did);
    const timestamp = Date.now();
    const proof = await this.accountProvider.generateBindingProof(did, timestamp);
    const accountSecret = await generateAccountSecret(this.accountProvider);
    const accountAuth = await this.sidProviders[did].keychain.add(accountId, accountSecret);
    await this.didStore.binding(rootDocId, {}, proof, accountAuth);
  }

  /**
   * Unbind current account from its sid.
   */
  async unbind(): Promise<void> {
    const account = await this.accountProvider.accountId();
    const bindingDid = await this.didStore.getBinding(account.toString());
    if (bindingDid) {
      if (!this.sidProviders[bindingDid]) {
        await this.prepareSidProvider();
      }
      await this.didStore.removeBinding(account.toString());
      await this.sidProviders[bindingDid].keychain.remove(account.toString());
      delete this.sidProviders[bindingDid];
    }
  }

  /**
   * list all dids that are in managed.
   * @returns all dids
   */
  listDids(): Array<string> {
    return Object.keys(this.sidProviders);
  }

  /**
   * Get sid provider that are in managed for the given did.
   *
   * @param did sid
   * @returns
   */
  async getSidProvider(did?: string): Promise<SidProvider | null> {
    if (did) {
      return this.sidProviders[did];
    } else {
      const account = await this.accountProvider.accountId();
      const bindingDid = await this.didStore.getBinding(account.toString());
      if (bindingDid) {
        return this.sidProviders[bindingDid];
      } else {
        return null;
      }
    }
  }

  /**
   * Update did's payment address
   *
   * @param did did string
   */
  async updatePaymentAddress(did?: string): Promise<void> {
    const accountId = await this.accountProvider.accountId();
    if (!accountId.toString().startsWith("cosmos:sao")) {
      throw new Error(`only cosmos:sao account can be used for payment`);
    }

    if (!did) {
      did = await this.didStore.getBinding(accountId.toString());
      if (!did) {
        throw new Error(`${accountId.toString()} is not binding`);
      }
    }

    await this.didStore.updatePaymentAddress(accountId.toString(), did);
  }
}
