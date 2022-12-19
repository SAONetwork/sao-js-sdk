import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { DidTxTypes } from "sao-chain-client";
import { makeSignDoc, OfflineDirectSigner } from "@cosmjs/proto-signing";
import * as u8a from "uint8arrays";
import { getBindMessage } from "./utils";

export class SaoAccountProvider implements AccountProvider {
  private address: string;
  private signer: OfflineDirectSigner;

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
      chainId: this.chainId(),
    });
  }

  async sign(message: string): Promise<string> {
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

  async generateBindingProof(did: string, timestamp: number): Promise<DidTxTypes.BindingProof> {
    const message = getBindMessage(did, timestamp);
    const signed = await this.sign(message);
    const accountId = await this.accountId();
    return {
      timestamp,
      did,
      message,
      signature: signed,
      accountId: accountId.toString(),
    };
  }
}
