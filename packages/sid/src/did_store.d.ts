import { Account, BindingProof } from './index';
import { JWE } from "did-jwt";
export interface Binding {
    account: Account;
    did: string;
    proof: string;
}
export interface AccountAuth {
    accountDid: string;
    accountEncryptedSeed: JWE;
    sidEncryptedAccount: JWE;
}
export interface DidStore {
    addBinding(account: Account, sid: string, proof: BindingProof): Promise<void>;
    getBinding(account: Account): Promise<Binding | null>;
    addAccountAuth(accountAuth: AccountAuth): Promise<void>;
    getAccountAuth(accountDid: string): Promise<AccountAuth | null>;
    updateSidDocument(signingKey: string, encryptKey: string): Promise<string>;
}
