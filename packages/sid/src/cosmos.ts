import { BindingProof } from "./index";
import { Binding, DidStore, AccountAuth } from "./did_store";

export class CosmosDidStore implements DidStore {
    #Conn: string

    constructor(conn: string) {
        this.#Conn = conn;
        console.log("init cosmos client", this.#Conn);
    }

    async addBinding(accountId: string, did: string, proof: BindingProof): Promise<void> {
        console.log(accountId, did, proof);
        return new Promise((resolve, _) => {
            resolve();
        });
    }

    async getBinding(accountId: string): Promise<Binding | null> {
        return new Promise((resolve, _) => {
            resolve({
                accountId,
                did: 'did:sid:1',
                proof: 'proof'
            });
        });
    }

    async addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void> {
        console.log(accountAuth, did);
        return new Promise((resolve, _) => {
            resolve();
        });
    }

    async getAccountAuth(did: string, accountDid: string): Promise<AccountAuth | null> {
        console.log(accountDid, did);
        return new Promise((resolve, _) => {
            resolve(null);
        });
    }

    async updateAccountAuths(did: string, update: Array<AccountAuth>, remove: Array<string>): Promise<void> {
        console.log(did, update, remove);
        return new Promise((r, _) => {
            r();
        });
    }

    async getAllAccountAuth(did: string): Promise<Record<string, AccountAuth>> {
        return new Promise((r, _) => {
            r([]);
        });
    }

    async updateSidDocument(signingKey: string, encryptKey: string, rootDocId?: string): Promise<string> {
        console.log(signingKey, encryptKey, rootDocId);
        return new Promise((resolve, _) => {
            resolve("");
        });
    }

    async listSidDocumentVersions(rootDocId: string): Promise<Array<string>> {
        console.log(rootDocId);
        return new Promise((r, _) => {
            r([])
        });
    }
}
