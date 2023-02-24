import { DidTxTypes } from "@saonetwork/saochain-ts-client";

export class MockAccountProvider {
  chain: string;
  address: string;

  constructor(id: string) {
    const idStr = id.toString();
    this.address = `0x${"0".repeat(32 - idStr.length)}${idStr}`;
    this.chain = "cosmos";
  }

  async account(): Promise<Account> {
    return new Account(this.chain, this.address);
  }

  async sign(message: string): Promise<string> {
    return `${this.chain}|${this.address}|${message}`;
  }

  async generateBindingProof(did: string): Promise<DidTxTypes.BindingProof> {
    return {
      chainId: this.chain,
      address: this.address,
      did: did,
      timestamp: Date.parse(new Date().toString()),
    };
  }
}
