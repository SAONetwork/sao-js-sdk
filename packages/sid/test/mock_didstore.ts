import { DidStore, Binding, AccountAuth  } from "../src/did_store";
import { Account, BindingProof } from "@js-sao-did/sid";

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export class MockDidStore implements DidStore {
    bindingMap: Record<string, any> = {}
    authMap: Record<string, Record<string, AccountAuth>> = {}
    docMap: Record<string, Record<string, any>> = {}

    async addBinding(accountId: string, did: string, proof: BindingProof): Promise<void> {
        return new Promise(r => {
            this.bindingMap[accountId] = { did, proof };
            r();
        });
    }

    async getBinding(accountId: string): Promise<Binding | null> {
        return new Promise(r => {
            r(this.bindingMap[accountId]);
        });
    }

    async addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void> {
        return new Promise(r => {
            let map: Record<string, any>;
            if (!this.authMap[did]) {
                map = {};
            } else {
                map = this.authMap[did];
            }
            map[accountAuth.accountDid] = accountAuth;
            this.authMap[did] = map;
            r();
        });
    }

    async getAccountAuth(did: string, accountDid: string): Promise<AccountAuth | null> {
        return new Promise(r => {
            r(this.authMap[did][accountDid]);
        });
    }

    async updateAccountAuths(did: string, update: Array<AccountAuth>, remove: Array<string>): Promise<void> {
        update.forEach(u => {
            this.authMap[did][u.accountDid] = u;
        });
        remove.forEach(u => {
            delete this.authMap[did][u];
        });
        return new Promise(r => {
            r();
        });
    }

    async getAllAccountAuth(did: string): Promise<Record<string, AccountAuth>> {
        return new Promise(r => {
            const a = this.authMap[did];
            r(a);
        });
    }

    async updateSidDocument(signingKey: string, encryptKey: string, rootDocid?: string): Promise<string> {
        return new Promise(r => {
            const uuid = guid();
            let map: Record<string, any>;
            if (!rootDocid) {
                rootDocid = uuid;
                map = {};
            } else {
                map = this.docMap[rootDocid];
            }
            map[uuid] = { 
                signing: signingKey, 
                encrypt: encryptKey 
            };
            this.docMap[rootDocid] = map;
            r(uuid);
        });
    }

    async listSidDocumentVersions(rootDocId: string): Promise<Array<string>> {
        return new Promise(r => {
            r(Object.keys(this.docMap[rootDocId]));
        });
    }
}