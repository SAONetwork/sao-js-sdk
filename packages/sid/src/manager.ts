/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */
import { AccountProvider } from "./account_provider";
import { SidProvider } from "./sid_provider";
import { DidStore } from "./did_store";
import { generateAccountSecret } from "./utils";

export class SidManager {
    private didStore: DidStore
    private accountProvider: AccountProvider
    private sidProviders: Record<string, SidProvider>

    private constructor(accountProvider: AccountProvider, didStore: DidStore) {
        this.accountProvider = accountProvider;
        this.didStore = didStore;
        this.sidProviders = {};
    }

    static async createManager(accountProvider: AccountProvider, didStore: DidStore, did?: string): Promise<SidManager> {
        const manager = new SidManager(accountProvider, didStore);
        await manager.prepareSidProvider(did);
        return manager;
    }

    // change to a new account provider.
    async setAccountProvider(accountProvider: AccountProvider, did?: string) {
        this.accountProvider = accountProvider;
        await this.prepareSidProvider(did);
    }

    private async prepareSidProvider(did?: string): Promise<void> {
        const account = await this.accountProvider.accountId();
        const bindingDid = await this.didStore.getBinding(account.toString());
        if (bindingDid) {
            if (this.sidProviders[bindingDid]) {
                return
            }
            const sidProvider = await SidProvider.recoverFromAccount(this.didStore, this.accountProvider, bindingDid);
            this.sidProviders[sidProvider.sid] = sidProvider;
        } else {
            if (did) {
                await this.bind(account.toString(), did);
            } else {
                const sidProvider = await SidProvider.newFromAccount(this.didStore, this.accountProvider);
                this.sidProviders[sidProvider.sid] = sidProvider;
            }
        }
    }

    private async bind(accountId: string, did: string): Promise<void> {
        if (!this.sidProviders[did]) {
            throw new Error(`${did} provider is not managed.`);
        }
        const proof = await this.accountProvider.generateBindingProof(did);
        await this.didStore.addBinding(proof);
        const accountSecret = await generateAccountSecret(this.accountProvider);
        await this.sidProviders[did].keychain.add(accountId, accountSecret);
    }

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
        } else {
            console.log("binding doesn't exist");
        }
    }

    listDids(): Array<string> {
        return Object.keys(this.sidProviders);
    }

    async getSidProvider(): Promise<SidProvider | null> {
        const account = await this.accountProvider.accountId();
        const bindingDid = await this.didStore.getBinding(account.toString());
        if (bindingDid) {
            return this.sidProviders[bindingDid];
        } else {
            return null;
        }
    }

}