import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { DidTxTypes } from "@saonetwork/saochain-ts-client";
import { Keplr } from "@keplr-wallet/types";

import { getBindMessage } from "./utils";

/**
 * account provider implementation for keplr wallet.
 *
 * sao chain account id format: cosmos:sao:<id>
 *
 * TODO: signer issue. the best way to sign is use OfflineAminoSigner/OfflineDirectSigner to sign arbitrarily.
 * for direct signer, don't know the exact ARR36 format for signdoc;
 * for amino signer, same payload doesn't work as well. only kepler instance can work now.
 */
export class SaoKeplrAccountProvider implements AccountProvider {
  private cosmosChainId: string;
  private address: string;
  // private signer: OfflineAminoSigner
  private signer: Keplr;

  static async new(signer: Keplr, chainId: string): Promise<SaoKeplrAccountProvider> {
    const currentKey = await signer.getKey(chainId);
    return new SaoKeplrAccountProvider(signer, currentKey.bech32Address, chainId);
  }

  private constructor(signer: Keplr, address: string, chainId: string) {
    this.signer = signer;
    this.address = address;
    this.cosmosChainId = chainId;
  }

  private namespace(): string {
    return "cosmos";
  }

  private reference(): string {
    return this.cosmosChainId;
  }

  chainId(): string {
    return `${this.namespace()}:${this.reference()}`;
  }

  async accountId(): Promise<AccountId> {
    return new AccountId({
      address: this.address,
      chainId: this.chainId(),
    });
  }

  async sign(message: string): Promise<string> {
    // not sure why amino not works.
    // const signDoc = this.getADR36SignDoc(this.address, Buffer.from(message).toString("base64"));
    // const resp = await this.signer.signAmino(this.address, signDoc);
    // return resp.signature.signature;
    const res = await this.signer.signArbitrary(this.reference(), this.address, message);

    return `${res.pub_key.type}.${res.pub_key.value}.${res.signature}`;
    // return resp;
  }

  async generateBindingProof(did: string, timestamp: number): Promise<DidTxTypes.BindingProof> {
    const msg = getBindMessage(did, timestamp);
    const signed = await this.sign(msg);
    const accountId = await this.accountId();
    return {
      timestamp: timestamp,
      message: msg,
      did,
      signature: signed,
      accountId: accountId.toString(),
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
