import { Keychain } from "./keychain";
import { AccountProvider } from "./index";
import { AuthenticateParam, CreateJWSParam, JWS } from "@js-sao-did/common";
import { DidStore } from "./did_store";
export declare class SidProvider {
    keychain: Keychain;
    sid: string;
    constructor(keychain: Keychain, Sid: string);
    static newFromAccount(didStore: DidStore, accountProvider: AccountProvider): Promise<SidProvider>;
    static recoverFromAccount(didStore: DidStore, accountProvider: AccountProvider, did: string): Promise<SidProvider>;
    sign(payload: Record<string, any> | string, didWithFragment: string, protectedHeader?: Record<string, any>): Promise<JWS>;
    authenticate(param: AuthenticateParam): Promise<JWS>;
    createJWS(param: CreateJWSParam): Promise<JWS>;
}
