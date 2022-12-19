import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { DidTxTypes } from "sao-chain-client";

import { getBindMessage, utf8ToHex } from "./utils";

export class EthAccountProvider implements AccountProvider {
  private provider: any;
  private address: string;
  static async new(provider: any): Promise<EthAccountProvider> {
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    if (accounts.length === 0) {
      throw new Error("Please connect to metamask");
    } else {
      return new EthAccountProvider(provider, accounts[0]);
    }
  }

  private constructor(provider: any, address: string) {
    this.provider = provider;
    this.address = address;
  }

  private namespace(): string {
    return "eip155";
  }

  private async chainId(): Promise<number> {
    const chainIdHex = await this.provider.request({ method: "eth_chainId" });
    const chainId = parseInt(chainIdHex, 16);
    return chainId;
  }

  async accountId(): Promise<AccountId> {
    const chainId = await this.chainId();
    const namespace = this.namespace();
    return new AccountId({
      address: this.address,
      chainId: `${namespace}:${chainId}`,
    });
  }

  sign(message: string): Promise<string> {
    return this.provider.request({
      method: "personal_sign",
      params: [utf8ToHex(message), this.address],
    });
  }

  async generateBindingProof(did: string, timestamp: number): Promise<DidTxTypes.BindingProof> {
    const message = getBindMessage(did, timestamp);
    const signature = await this.provider.request({
      method: "personal_sign",
      params: [utf8ToHex(message), this.address],
    });
    const accountId = await this.accountId();
    return {
      timestamp,
      signature,
      did,
      message,
      accountId: accountId.toString(),
    };
  }
}
