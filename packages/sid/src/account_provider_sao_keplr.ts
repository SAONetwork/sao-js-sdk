import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { BindingProof } from "./types";
import { OfflineAminoSigner, StdSignDoc, Keplr } from "@keplr-wallet/types";
import {Buffer} from "buffer";

const CHAIN_ID = "sao";

export class SaoKeplrAccountProvider implements AccountProvider {
    private address: string
    // private signer: OfflineAminoSigner
    private signer: Keplr

    static async new(signer: Keplr): Promise<SaoKeplrAccountProvider> {
        const currentKey = await signer.getKey(CHAIN_ID);
        return new SaoKeplrAccountProvider(signer, currentKey.bech32Address);
    }

    private constructor(signer: Keplr, address: string) {
        this.signer = signer;
        this.address = address;
    }

    private namespace(): string {
        return "cosmos";
    }

    private reference(): string {
        return CHAIN_ID;
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
        // not sure why amino not works.
        // const signDoc = this.getADR36SignDoc(this.address, Buffer.from(message).toString("base64"));
        // const resp = await this.signer.signAmino(this.address, signDoc);
        // return resp.signature.signature;

        const resp = await this.signer.signArbitrary(this.reference(), this.address, message);
        return resp.signature;
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

    // protected getADR36SignDoc(signer: string, data: string): StdSignDoc {
    //     return {
    //         chain_id: "",
    //         account_number: "0",
    //         sequence: "0",
    //         fee: {
    //             gas: "0",
    //             amount: [],
    //         },
    //         msgs: [
    //             {
    //             type: "sign/MsgSignData",
    //             value: {
    //                 signer,
    //                 data,
    //             },
    //             },
    //         ],
    //         memo: "",
    //     };
    // }

}