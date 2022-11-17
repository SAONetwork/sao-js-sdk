import { Keychain } from "./keychain";
import { AccountProvider, Account } from "./index";
import { AuthenticateParam, CreateJWSParam, JWS } from "@js-sao-did/common";
import { DidStore } from "./did_store";
export declare class SidProvider {
    private Keychain;
    private Sid;
    constructor(keychain: Keychain, Sid: string);
    static initFromAccount(didStore: DidStore, accountProvider: AccountProvider, account: Account, did?: string): Promise<SidProvider>;
    sign(payload: Record<string, any> | string, didWithFragment: string, protectedHeader?: Record<string, any>): Promise<JWS>;
    authenticate(param: AuthenticateParam): Promise<JWS>;
    createJWS(param: CreateJWSParam): Promise<JWS>;
}
