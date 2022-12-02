import { AccountAuth, BindingProof, ChainApiClientConfig } from './types';
export declare class ChainApiClient {
    private signer;
    private client;
    private didClient;
    private modelClient;
    constructor(config: ChainApiClientConfig);
    GetTx(transactionHash: string): Promise<any>;
    Decode(data: string): Promise<any>;
    AddAccountAuth(did: string, accountAuth: AccountAuth): Promise<any>;
    GetAccountAuth(accountDid: string): Promise<any>;
    AddBinding(proof: BindingProof): Promise<any>;
    GetBinding(accountId: string): Promise<any>;
    RemoveBinding(accountId: string): Promise<any>;
    UpdateAccountAuths(did: string, updates: AccountAuth[], removes: string[]): Promise<any>;
    GetAllAccountAuth(did: string): Promise<any>;
    UpdateSidDocument(keys: Record<string, string>, rootDocId?: string): Promise<any>;
    ListSidDocumentVersions(rootDocId: string): Promise<any>;
}
