import { AccountId } from "caip";
const CHAIN_ID = "sao";
export class SaoKeplrAccountProvider {
    static async new(signer) {
        const currentKey = await signer.getKey(CHAIN_ID);
        return new SaoKeplrAccountProvider(signer, currentKey.bech32Address);
    }
    namespace() {
        return "cosmos";
    }
    reference() {
        return CHAIN_ID;
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
        // not sure why amino not works.
        // const signDoc = this.getADR36SignDoc(this.address, Buffer.from(message).toString("base64"));
        // const resp = await this.signer.signAmino(this.address, signDoc);
        // return resp.signature.signature;
        const resp = await this.signer.signArbitrary(this.reference(), this.address, message);
        return resp.signature;
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
