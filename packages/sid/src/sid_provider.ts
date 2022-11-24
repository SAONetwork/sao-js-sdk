import { Keychain } from "./keychain";
import { AccountProvider } from "./account_provider";
import { accountSecretToDid, generateAccountSecret, toJWS, toStableObject } from "./utils";
import { createJWS } from 'did-jwt';
import { AuthenticateParam, CreateJWSParam, JWS } from "@js-sao-did/common";
import { DidStore } from "./did_store";

/**
 * sid provider
 */
export class SidProvider {
    keychain: Keychain
    sid: string

    private constructor(keychain: Keychain, sid: string) {
        this.keychain = keychain;
        this.sid = sid;
    }

    /**
     * generate new sid for the given account.
     * 
     * @param didStore 
     * @param accountProvider 
     * @returns 
     */
    static async newFromAccount(didStore: DidStore, accountProvider: AccountProvider): Promise<SidProvider> {
        const account = await accountProvider.accountId()
        const accountSecret = await generateAccountSecret(accountProvider);
        const keychain = await Keychain.create(didStore);
        await keychain.add(account.toString(), accountSecret);
        const did = keychain.did;
        const bindingProof = await accountProvider.generateBindingProof(did);
        await didStore.addBinding(bindingProof);

        return new SidProvider(keychain, did);
    }

    static async recoverFromAccount(didStore: DidStore, accountProvider: AccountProvider, did: string): Promise<SidProvider> {
        const account = await accountProvider.accountId()
        const accountSecret = await generateAccountSecret(accountProvider);
        const accountDid = await accountSecretToDid(accountSecret);
        const accountAuth = await didStore.getAccountAuth(did, accountDid.id);
        if (!accountAuth) {
            throw new Error("account auth is missing.");
        }
        const seed = await accountDid.decryptJWE(accountAuth.accountEncryptedSeed);
        const keychain = Keychain.load(didStore, seed, did);
        return new SidProvider(keychain, did);
    }

    private async sign(payload: Record<string, any> | string, didWithFragment: string, protectedHeader: Record<string, any> = {}): Promise<JWS> {
        let [did, keyFragment] = didWithFragment.split('#');
        if (did !== this.sid) {
            throw new Error(`current sid is ${this.sid}, invalid did: ${did}.`);
        }
        if (!keyFragment) {
            keyFragment = this.keychain.getKeyFragment();
        }
        const signer = this.keychain.getSigner();
        const kid = `${did}#${keyFragment}`;
        const header = toStableObject(Object.assign(protectedHeader, { kid }));
        const content = typeof payload === 'string'? payload: toStableObject(payload);
        const jws = await createJWS(content, signer, header);
        return toJWS(jws);
    }

    async authenticate(param: AuthenticateParam): Promise<JWS> {
        const jws = await this.sign(
            {
                did: this.sid,
                aud: param.aud,
                nonce: param.nonce,
                path: param.paths
            },
            this.sid
        );
        return jws
    }

    async createJWS(param: CreateJWSParam): Promise<JWS> {
        const jws = await this.sign(param.payload, this.sid);
        return jws;
    }


}