import { AccountProvider } from "./account_provider";
import { SidProvider } from "./sid_provider";
import { DidStore } from "./did_store";
export declare class SidManager {
    private didStore;
    private accountProvider;
    private sidProviders;
    private constructor();
    static createManager(accountProvider: AccountProvider, didStore: DidStore, did?: string): Promise<SidManager>;
    setAccountProvider(accountProvider: AccountProvider, did?: string): Promise<void>;
    private prepareSidProvider;
    private bind;
    unbind(): Promise<void>;
    listDids(): Array<string>;
    getSidProvider(did?: string): Promise<SidProvider | null>;
}
