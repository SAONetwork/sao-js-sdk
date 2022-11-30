import { DidStore } from "./did_store";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { AccountAuth, BindingProof } from "@js-sao-did/api-client";
export declare class CosmosDidStore implements DidStore {
    private chainApiClient;
    constructor(signer: OfflineSigner, apiURL?: string, rpcURL?: string, prefix?: string);
    addBinding(proof: BindingProof): Promise<void>;
    /**
     *
     * @param accountId
     * @returns binded did
     */
    getBinding(accountId: string): Promise<string | null>;
    removeBinding(accountId: string): Promise<void>;
    addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void>;
    getAccountAuth(_: string, accountDid: string): Promise<AccountAuth | null>;
    updateAccountAuths(did: string, update: AccountAuth[], remove: string[]): Promise<void>;
    getAllAccountAuth(did: string): Promise<AccountAuth[]>;
    updateSidDocument(signingKey: string, encryptKey: string, rootDocId?: string): Promise<string>;
    listSidDocumentVersions(rootDocId: string): Promise<Array<string>>;
}
