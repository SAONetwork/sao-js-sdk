import { BindingProof } from "./index";
import { Binding, DidStore, AccountAuth } from "./did_store";
export declare class CosmosDidStore implements DidStore {
    #private;
    constructor(conn: string);
    addBinding(accountId: string, did: string, proof: BindingProof): Promise<void>;
    getBinding(accountId: string): Promise<Binding | null>;
    addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void>;
    getAccountAuth(did: string, accountDid: string): Promise<AccountAuth | null>;
    updateAccountAuths(did: string, update: Array<AccountAuth>, remove: Array<string>): Promise<void>;
    getAllAccountAuth(did: string): Promise<Record<string, AccountAuth>>;
    updateSidDocument(signingKey: string, encryptKey: string, rootDocId?: string): Promise<string>;
    listSidDocumentVersions(rootDocId: string): Promise<Array<string>>;
}
