import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { BindingProof } from "./types";
export declare class EthAccountProvider implements AccountProvider {
    private provider;
    private address;
    static new(provider: any): Promise<EthAccountProvider>;
    private constructor();
    private namespace;
    private chainId;
    accountId(): Promise<AccountId>;
    sign(message: string): Promise<string>;
    generateBindingProof(did: string): Promise<BindingProof>;
}
