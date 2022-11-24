import { Keychain } from "./keychain";
import { AccountProvider } from "./account_provider";
import { AuthenticateParam, CreateJWSParam, JWS } from "@js-sao-did/common";
import { DidStore } from "./did_store";
/**
 * sid provider
 */
export declare class SidProvider {
    keychain: Keychain;
    sid: string;
    private constructor();
    /**
     * generate new sid for the given account.
     *
     * @param didStore
     * @param accountProvider
     * @returns
     */
    static newFromAccount(didStore: DidStore, accountProvider: AccountProvider): Promise<SidProvider>;
    static recoverFromAccount(didStore: DidStore, accountProvider: AccountProvider, did: string): Promise<SidProvider>;
    sign(payload: Record<string, any> | string, didWithFragment: string, protectedHeader?: Record<string, any>): Promise<JWS>;
    authenticate(param: AuthenticateParam): Promise<JWS>;
    createJWS(param: CreateJWSParam): Promise<JWS>;
}
