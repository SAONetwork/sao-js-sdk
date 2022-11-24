import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { BindingProof } from "./types";
import { makeSignDoc, OfflineDirectSigner } from "@cosmjs/proto-signing"; 
import * as u8a from 'uint8arrays';

export class SaoAccountProvider implements AccountProvider {
    private address: string
    private signer: OfflineDirectSigner

    static async newSaoAccountProvider(signer: OfflineDirectSigner): Promise<SaoAccountProvider> {
        const account = await signer.getAccounts();
        const address = account[0].address;
        return new SaoAccountProvider(signer, address);
    }

    private constructor(signer: OfflineDirectSigner, address: string) {
        this.signer = signer;
        this.address = address;
    }

    private namespace(): string {
        return "cosmos";
    }

    private reference(): string {
        return "sao";
    }

    chainId(): string {
        return `${this.namespace()}:${this.reference()}`;
    }

    async accountId(): Promise<AccountId> {
        return new AccountId({
            address: this.address,
            chainId: this.chainId()
        });
    }

    async sign(message: string): Promise<string> {
        // not a tx sign. default authinfo and account number.
        const signDoc = makeSignDoc(u8a.fromString(message), u8a.fromString(""), this.chainId(), 0);
        const resp = await this.signer.signDirect(this.address, signDoc);
        return resp.signature.signature;
    }

    async generateBindingProof(did: string): Promise<BindingProof> {
        const timestamp = Date.now();
        const message = `Link this account to your did: ${did}\nTimestamp: ${timestamp}`;
        const signed = await this.sign(message);
        const accountId = await this.accountId();
        return {
            timestamp,
            did,
            message,
            signature: signed,
            accountId: accountId.toString()
        };
    }

}