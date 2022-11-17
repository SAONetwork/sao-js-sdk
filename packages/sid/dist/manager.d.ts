import { AccountProvider } from ".";
import { SidProvider } from "./sidprovider";
export declare class SidManager {
    private didStore;
    private AccountProvider;
    private SidProvider;
    constructor(accountProvider: AccountProvider);
    initFromAccount(): Promise<void>;
    getProvider(): SidProvider | undefined;
}
