import { AccountId } from "caip";
import { AccountProvider } from "./account_provider";
import { BindingProof } from '@js-sao-did/api-client';
import { Keplr } from "@keplr-wallet/types";
/**
 * account provider implementation for keplr wallet.
 *
 * sao chain account id format: cosmos:sao:<id>
 *
 * TODO: signer issue. the best way to sign is use OfflineAminoSigner/OfflineDirectSigner to sign arbitrarily.
 * for direct signer, don't know the exact ARR36 format for signdoc;
 * for amino signer, same payload doesn't work as well. only kepler instance can work now.
 */
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
