/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */
import { CosmosDidStore } from "./cosmos";
import { AccountProvider } from ".";
import { SidProvider } from "./sidprovider";
import { DidStore } from "./did_store";
import { generateAccountSecret } from "./utils";

const COSMOS_API = process.env.COSMOS_API || 'http://localhost:26657';

export class SidManager {
    private didStore: DidStore
    private accountProvider: AccountProvider
    private sidProviders: Record<string, SidProvider>

    private constructor(accountProvider: AccountProvider, didStore?: DidStore) {
        this.accountProvider = accountProvider;
        this.didStore = didStore || new CosmosDidStore(COSMOS_API);
        this.sidProviders = {};
    }

    static async createManager(accountProvider: AccountProvider, didStore?: DidStore, did?: string): Promise<SidManager> {
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
        const account = await this.accountProvider.account()
        const binding = await this.didStore.getBinding(account.id());
        if (binding) {
            if (this.sidProviders[binding.did]) {
                return
            }
            const sidProvider = await SidProvider.recoverFromAccount(this.didStore, this.accountProvider, binding.did);
            this.sidProviders[sidProvider.sid] = sidProvider;
        } else {
            if (did) {
                await this.bind(account.id(), did);
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
        await this.didStore.addBinding(accountId, did, proof);
        const accountSecret = await generateAccountSecret(this.accountProvider, accountId);
        await this.sidProviders[did].keychain.add(accountId, accountSecret);
    }

    async unbind(): Promise<void> {
        const account = await this.accountProvider.account();
        const accountId = account.id()
        const binding = await this.didStore.getBinding(accountId);
        if (binding) {
            if (!this.sidProviders[binding.did]) {
                await this.prepareSidProvider();
            }
            this.sidProviders[binding.did].keychain.remove(accountId);
            delete this.sidProviders[binding.did];
        } else {
            console.log("binding doesn't exist");
        }
    }

    listDids(): Array<string> {
        return Object.keys(this.sidProviders);
    }

    async getSidProvider(): Promise<SidProvider | null> {
        const account = await this.accountProvider.account();
        const binding = await this.didStore.getBinding(account.id());
        if (binding?.did) {
            return this.sidProviders[binding!!.did];
        } else {
            return null;
        }
    }

}