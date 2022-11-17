import { Account, BindingProof } from "./index";
import { Binding, AccountAuth, DidStore } from "./did_store";
export declare class CosmosDidStore implements DidStore {
    #private;
    constructor(conn: string);
    addBinding(account: Account, did: string, proof: BindingProof): Promise<void>;
    getBinding(account: Account): Promise<Binding | null>;
    addAccountAuth(accountAuth: AccountAuth): Promise<void>;
    getAccountAuth(accountDid: string): Promise<AccountAuth | null>;
    updateSidDocument(signingKey: string, encryptKey: string): Promise<string>;
}
