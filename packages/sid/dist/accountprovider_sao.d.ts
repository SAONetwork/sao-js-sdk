import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { BindingProof } from "./types";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
export declare class SaoAccountProvider implements AccountProvider {
    private address;
    private signer;
    static newSaoAccountProvider(signer: OfflineDirectSigner): Promise<SaoAccountProvider>;
    private constructor();
    private namespace;
    private reference;
    chainId(): string;
    accountId(): Promise<AccountId>;
    sign(message: string): Promise<string>;
    generateBindingProof(did: string): Promise<BindingProof>;
}
