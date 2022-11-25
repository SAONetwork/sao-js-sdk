import { AccountId } from "caip";
import { makeSignDoc } from "@cosmjs/proto-signing";
import * as u8a from 'uint8arrays';
export class SaoAccountProvider {
    static async newSaoAccountProvider(signer) {
        const account = await signer.getAccounts();
        const address = account[0].address;
        return new SaoAccountProvider(signer, address);
    }
    namespace() {
        return "cosmos";
    }
    reference() {
        return "sao";
    }
    chainId() {
        return `${this.namespace()}:${this.reference()}`;
    }
    async accountId() {
        return new AccountId({
            address: this.address,
            chainId: this.chainId()
        });
    }
    async sign(message) {
        // not a tx sign. default authinfo and account number.
        const signDoc = makeSignDoc(u8a.fromString(message), u8a.fromString(""), "sao", 0);
        console.log(`sign from address: ${this.address}`);
        try {
            const resp = await this.signer.signDirect(this.address, signDoc);
            console.log(resp);
            return resp.signature.signature;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async generateBindingProof(did) {
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
    constructor(signer, address){
        this.signer = signer;
        this.address = address;
    }
}
