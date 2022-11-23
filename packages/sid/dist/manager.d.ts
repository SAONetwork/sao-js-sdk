import { AccountProvider } from ".";
import { SidProvider } from "./sidprovider";
import { DidStore } from "./did_store";
export declare class SidManager {
    private didStore;
    private accountProvider;
    private sidProviders;
    private constructor();
    static createManager(accountProvider: AccountProvider, didStore?: DidStore, did?: string): Promise<SidManager>;
    setAccountProvider(accountProvider: AccountProvider, did?: string): Promise<void>;
    private prepareSidProvider;
    private bind;
    unbind(): Promise<void>;
    listDids(): Array<string>;
    getSidProvider(): Promise<SidProvider | null>;
}
