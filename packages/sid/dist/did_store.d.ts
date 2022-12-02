import { BindingProof } from '@js-sao-did/api-client';
import { JWE } from "did-jwt";
export interface AccountAuth {
    accountDid: string;
    accountEncryptedSeed: JWE;
    sidEncryptedAccount: JWE;
}
export interface DidStore {
    /**
     *
     * @param proof
     */
    addBinding(proof: BindingProof): Promise<void>;
    /**
     *
     * @param accountId
     * @return did
     */
    getBinding(accountId: string): Promise<string | null>;
    /**
     *
     * @param accountId
     */
    removeBinding(accountId: string): Promise<void>;
    addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void>;
    getAccountAuth(did: string, accountDid: string): Promise<AccountAuth | null>;
    updateAccountAuths(did: string, update: Array<AccountAuth>, remove: Array<string>): Promise<void>;
    getAllAccountAuth(did: string): Promise<AccountAuth[]>;
    updateSidDocument(keys: Record<string, string>, rootDocId?: string): Promise<string>;
    listSidDocumentVersions(rootDocId: string): Promise<Array<string>>;
}
