import { Keychain } from "./keychain";
import { accountSecretToDid, generateAccountSecret, toJWS, toStableObject } from "./utils";
import { createJWS } from 'did-jwt';
export class SidProvider {
    static async initFromAccount(didStore, accountProvider, account, did) {
        const accountSecret = await generateAccountSecret(accountProvider, account.id());
        const accountDid = await accountSecretToDid(accountSecret);
        const accountAuth = await didStore.getAccountAuth(accountDid.id);
        if (accountAuth) {
            if (!did) {
            // TODO: error
            }
            const seed = await accountDid.decryptJWE(accountAuth.accountEncryptedSeed);
            const keychain = Keychain.load(didStore, seed, did);
            return new SidProvider(keychain, did);
        } else {
            const keychain1 = await Keychain.create(didStore);
            await keychain1.add(account.id(), accountSecret);
            const did1 = keychain1.did();
            const bindingProof = accountProvider.generateBindingProof(did1);
            await didStore.addBinding(account, did1, bindingProof);
            return new SidProvider(keychain1, did1);
        }
    }
    async sign(payload, didWithFragment, protectedHeader = {}) {
        let [did, keyFragment] = didWithFragment.split('#');
        if (did !== this.Sid) {
            throw new Error(`current sid is ${this.Sid}, invalid did: ${did}.`);
        }
        if (!keyFragment) {
            keyFragment = this.Keychain.getKeyFragment();
        }
        const signer = this.Keychain.getSigner();
        const kid = `${did}#${keyFragment}`;
        const header = toStableObject(Object.assign(protectedHeader, {
            kid
        }));
        const content = typeof payload === 'string' ? payload : toStableObject(payload);
        const jws = await createJWS(content, signer, header);
        return toJWS(jws);
    }
    async authenticate(param) {
        const jws = await this.sign({
            did: this.Sid,
            aud: param.aud,
            nonce: param.nonce,
            path: param.paths
        }, this.Sid);
        return jws;
    }
    async createJWS(param) {
        const jws = await this.sign(param.payload, this.Sid);
        return jws;
    }
    constructor(keychain, Sid){
        this.Keychain = keychain;
        this.Sid = Sid;
    }
}
