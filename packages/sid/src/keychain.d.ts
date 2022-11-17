import { Signer } from 'did-jwt';
import { DidStore } from './did_store';
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
    #private;
    constructor(did: string, didStore: DidStore);
    did(): string;
    static load(didStore: DidStore, seed: Uint8Array, did: string): Keychain;
    static create(didStore: DidStore): Promise<Keychain>;
    getSigner(docid?: string): Signer;
    getKeyFragment(docid?: string, keyUsage?: string): string;
    add(accountId: string, accountSecrect: Uint8Array): Promise<void>;
    static generateKeys(seed: Uint8Array): FullKeySeries;
}
