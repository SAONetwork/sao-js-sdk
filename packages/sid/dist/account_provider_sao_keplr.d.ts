import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { BindingProof } from "./types";
import { Keplr } from "@keplr-wallet/types";
export declare class SaoKeplrAccountProvider implements AccountProvider {
    private address;
    private signer;
    static new(signer: Keplr): Promise<SaoKeplrAccountProvider>;
    private constructor();
    private namespace;
    private reference;
    chainId(): string;
    accountId(): Promise<AccountId>;
    sign(message: string): Promise<string>;
    generateBindingProof(did: string): Promise<BindingProof>;
}
