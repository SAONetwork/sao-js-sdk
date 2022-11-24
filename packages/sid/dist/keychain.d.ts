import { Signer } from 'did-jwt';
import { DidStore } from './did_store';
import { AccountAuth } from './did_store';
import { DID } from 'dids';
export interface KeySeries {
    signing: Uint8Array;
    encrypt: Uint8Array;
}
export interface FullKeySeries {
    pub: KeySeries;
    priv: KeySeries;
    seed: Uint8Array;
}
export declare class Keychain {
    private keysMap;
    private kidToDocid;
    did: string;
    private didStore;
    constructor(did: string, didStore: DidStore);
    static load(didStore: DidStore, seed: Uint8Array, did: string): Keychain;
    static create(didStore: DidStore): Promise<Keychain>;
    getSigner(docid?: string): Signer;
    getKeyFragment(docid?: string, keyUsage?: string): string;
    add(accountId: string, accountSecrect: Uint8Array): Promise<void>;
    remove(accountId: string): Promise<void>;
    static generateKeys(seed: Uint8Array): FullKeySeries;
    rotateKeys(removeAuthId: string): Promise<void>;
    updateAccountAuth(accountDid: DID, auth: AccountAuth, removeAuthId: string): Promise<AccountAuth | null>;
}
