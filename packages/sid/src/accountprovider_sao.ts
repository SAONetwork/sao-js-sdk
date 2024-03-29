import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { DidTxTypes } from "@saonetwork/saochain-ts-client";
import { makeSignDoc, OfflineDirectSigner } from "@cosmjs/proto-signing";
import * as u8a from "uint8arrays";
import { getBindMessage } from "./utils";

export class SaoAccountProvider implements AccountProvider {
  private cosmosChainId: string;
  private address: string;
  private signer: OfflineDirectSigner;

  static async newSaoAccountProvider(signer: OfflineDirectSigner, chainId: string): Promise<SaoAccountProvider> {
    const account = await signer.getAccounts();
    const address = account[0].address;
    return new SaoAccountProvider(signer, address, chainId);
  }

  private constructor(signer: OfflineDirectSigner, address: string, chainId: string) {
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
    // not a tx sign. default authinfo and account number.
    const signDoc = makeSignDoc(u8a.fromString(message), u8a.fromString(""), "sao", 0);
    const resp = await this.signer.signDirect(this.address, signDoc);
    return resp.signature.signature;
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
