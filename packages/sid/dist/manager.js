/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */ import { SidProvider } from "./sid_provider";
import { generateAccountSecret } from "./utils";
export class SidManager {
    static async createManager(accountProvider, didStore, did) {
        const manager = new SidManager(accountProvider, didStore);
        await manager.prepareSidProvider(did);
        return manager;
    }
    // change to a new account provider.
    async setAccountProvider(accountProvider, did) {
        this.accountProvider = accountProvider;
        await this.prepareSidProvider(did);
    }
    async prepareSidProvider(did) {
        const account = await this.accountProvider.accountId();
        const bindingDid = await this.didStore.getBinding(account.toString());
        console.log(`binding did for ${account.toString()}: ${bindingDid}`);
        if (bindingDid) {
            if (this.sidProviders[bindingDid]) {
                return;
            }
            const sidProvider = await SidProvider.recoverFromAccount(this.didStore, this.accountProvider, bindingDid);
            this.sidProviders[sidProvider.sid] = sidProvider;
        } else {
            if (did) {
                await this.bind(account.toString(), did);
            } else {
                console.log("new did provider.");
                const sidProvider1 = await SidProvider.newFromAccount(this.didStore, this.accountProvider);
                this.sidProviders[sidProvider1.sid] = sidProvider1;
            }
        }
    }
    async bind(accountId, did) {
        if (!this.sidProviders[did]) {
            throw new Error(`${did} provider is not managed.`);
        }
        const proof = await this.accountProvider.generateBindingProof(did);
        await this.didStore.addBinding(proof);
        const accountSecret = await generateAccountSecret(this.accountProvider);
        await this.sidProviders[did].keychain.add(accountId, accountSecret);
    }
    async unbind() {
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
    listDids() {
        return Object.keys(this.sidProviders);
    }
    async getSidProvider(did) {
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
    async updatePaymentAddress() {
        const accountId = await this.accountProvider.accountId();
        if (!accountId.toString().startsWith("cosmos:sao")) {
            throw new Error(`only cosmos:sao account can be used for payment`);
        }
        await this.didStore.updatePaymentAddress(accountId.toString());
    }
    constructor(accountProvider, didStore){
        this.accountProvider = accountProvider;
        this.didStore = didStore;
        this.sidProviders = {};
    }
}
