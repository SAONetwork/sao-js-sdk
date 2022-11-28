import { AccountId } from "caip";
import { getBindMessage } from "./account_provider";
const CHAIN_ID = "sao";
/**
 * account provider implementation for keplr wallet.
 * 
 * sao chain account id format: cosmos:sao:<id>
 * 
 * TODO: signer issue. the best way to sign is use OfflineAminoSigner/OfflineDirectSigner to sign arbitrarily.
 * for direct signer, don't know the exact ARR36 format for signdoc;
 * for amino signer, same payload doesn't work as well. only kepler instance can work now.
 */ export class SaoKeplrAccountProvider {
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
        const bm = getBindMessage(did);
        const signed = await this.sign(bm.message);
        const accountId = await this.accountId();
        return {
            timestamp: bm.timestamp,
            message: bm.message,
            did,
            signature: signed,
            accountId: accountId.toString()
        };
    }
    constructor(signer, address){
        this.signer = signer;
        this.address = address;
    }
}
