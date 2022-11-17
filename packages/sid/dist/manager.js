/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */ import { CosmosDidStore } from "./cosmos";
import { SidProvider } from "./sidprovider";
const COSMOS_API = process.env.COSMOS_API || 'http://localhost:26657';
export class SidManager {
    async initFromAccount() {
        const account = await this.AccountProvider.account();
        const binding = await this.didStore.getBinding(account);
        const sidProvider = await SidProvider.initFromAccount(this.didStore, this.AccountProvider, account, binding?.did);
        this.SidProvider = sidProvider;
    }
    getProvider() {
        return this.SidProvider;
    }
    constructor(accountProvider){
        this.AccountProvider = accountProvider;
        this.didStore = new CosmosDidStore(COSMOS_API);
    }
}
