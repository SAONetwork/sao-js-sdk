import { HDNode } from '@ethersproject/hdnode';
import * as u8a from 'uint8arrays';
import { generateKeyPairFromSeed } from '@stablelib/x25519';
import { randomBytes } from '@stablelib/random';
import { JWE, ES256KSigner, Signer, createJWE, x25519Encrypter, x25519Decrypter, decryptJWE } from 'did-jwt';
import { accountSecretToDid, encodeKey, parseJWEKids } from './utils';
import { DidStore } from './did_store';
import { AccountAuth } from './did_store';
import { DID } from 'dids';
import { getResolver } from 'key-did-resolver';

export interface KeySeries {
    signing: Uint8Array
    encrypt: Uint8Array
}

export interface FullKeySeries {
    pub: KeySeries
    priv: KeySeries
    seed: Uint8Array
}

const ROOT_PATH = "10000";

type SidDocId = string

export class Keychain {

    private keysMap: Record<SidDocId, FullKeySeries> = {}
    private kidToDocid: Record<string, string> = {}
    latestDocid: string
    private SeedHistory: Array<JWE> = []
    public did: string
    private didStore: DidStore

    constructor(did: string, didStore: DidStore) {
        this.did = did;
        this.didStore = didStore;
    }

    static async load(didStore: DidStore, seed: Uint8Array, did: string): Promise<Keychain> {
        const fullKeySeries = this.generateKeys(seed);
        const keychain = new Keychain(did, didStore);

        const rootDocId = did.split(":")[2]
        const versions = await didStore.listSidDocumentVersions(rootDocId);
        const latestVersion = versions[versions.length - 1];

        keychain.latestDocid = latestVersion;

        keychain.keysMap[keychain.latestDocid] = fullKeySeries;
        const encKid = encodeKey(fullKeySeries.pub.encrypt, 'x25519').slice(-15);
        keychain.kidToDocid[encKid] = keychain.latestDocid;
        const sigKid = encodeKey(fullKeySeries.pub.signing, 'secp256k1').slice(-15);
        keychain.kidToDocid[sigKid] = keychain.latestDocid;

        return keychain;
    }

    static async create(didStore: DidStore): Promise<Keychain> {
        const seed = randomBytes(32);
        const fullKeySeries = this.generateKeys(seed);
        const signing = encodeKey(fullKeySeries.pub.signing, 'secp256k1');
        const encrypt = encodeKey(fullKeySeries.pub.encrypt, 'x25519');
        const docid = await didStore.updateSidDocument(signing, encrypt);
        const sid = `did:sid:${docid}`;
        const keychain = new Keychain(sid, didStore);
        keychain.latestDocid = docid;
        keychain.keysMap[docid] = fullKeySeries;
        keychain.kidToDocid[encrypt.slice(-15)] = docid;
        keychain.kidToDocid[signing.slice(-15)] = docid;
        return keychain;
    }

    getSigner(docid: string = this.latestDocid): Signer {
        const keys = this.keysMap[docid] || this.keysMap[this.latestDocid];
        return ES256KSigner(keys.priv.signing);
    }

    getKeyFragment(docid: string = this.latestDocid, keyUsage: string = "sign"): string {
        const keys = this.keysMap[docid]
        if (keyUsage === "encrypt") {
            return encodeKey(keys.pub.encrypt, 'x25519').slice(15);
        } else {
            return encodeKey(keys.pub.signing, 'secp256k1').slice(15);
        }
    }

    async add(accountId: string, accountSecrect: Uint8Array): Promise<void> {
        const accountDid = await accountSecretToDid(accountSecrect);
        // account encrypt seed
        const accountEncryptedSeed = await accountDid.createJWE(this.keysMap[this.latestDocid].seed, [accountDid.id]);

        // sid encrypt account
        const keyFragment = this.getKeyFragment(this.latestDocid, "encrypt");
        const kid = `${this.did}#${keyFragment}`;
        const encrypter = x25519Encrypter(this.keysMap[this.latestDocid].pub.encrypt, kid);
        const sidEncryptedAccount = await createJWE(u8a.fromString(accountId), [encrypter]);

        await this.didStore.addAccountAuth(
            this.did,
            { 
                accountDid: accountDid.id, 
                accountEncryptedSeed, 
                sidEncryptedAccount
            }
        );
    }

    async remove(accountId: string): Promise<void> {
        this.rotateKeys(accountId);
    }

    static generateKeys(seed: Uint8Array): FullKeySeries {
        const rootNode = HDNode.fromSeed(seed);
        const baseNode = rootNode.derivePath(ROOT_PATH);
        const signingKey = baseNode.derivePath('0');
        const encryptSeed = u8a.fromString(baseNode.derivePath('1').privateKey.slice(2), 'base16');
        const encryptKeypair = generateKeyPairFromSeed(encryptSeed);
        return {
            seed,
            pub: {
                signing: u8a.fromString(signingKey.publicKey.slice(2), 'base16'),
                encrypt: encryptKeypair.publicKey
            },
            priv: {
                signing: u8a.fromString(signingKey.privateKey.slice(2), 'base16'),
                encrypt: encryptKeypair.secretKey
            }
        };
    }

    async rotateKeys(removeAuthId: string) {
        const rootDocId = this.did.split(":")[2]

        const seed = randomBytes(32);
        const newKeySeries = Keychain.generateKeys(seed);

        const signing = encodeKey(newKeySeries.pub.signing, 'secp256k1');
        const encrypt = encodeKey(newKeySeries.pub.encrypt, 'x25519');
        const docid = await this.didStore.updateSidDocument(signing, encrypt, rootDocId);
        console.log("new docid:", docid);
        this.keysMap[docid] = newKeySeries;
        this.latestDocid = docid;

        const allAccountAuths = await this.didStore.getAllAccountAuth(this.did);
        if (Object.keys(allAccountAuths).length > 0) {
            const accountDid = new DID({resolver: getResolver()});
            const updateAccountAuths = [];
            const removeAccountAuths = [];
            for (let i = 0; i < Object.values(allAccountAuths).length; i++) {
                const aa = await this.updateAccountAuth(accountDid, Object.values(allAccountAuths)[i], removeAuthId);
                if (!aa) {
                    removeAccountAuths.push(allAccountAuths[i].accountDid);
                } else {
                    updateAccountAuths.push(aa);
                }
            }
            await this.didStore.updateAccountAuths(this.did, updateAccountAuths, removeAccountAuths);
        }
    }

    async updateAccountAuth(accountDid: DID, auth: AccountAuth, removeAuthId: string): Promise<AccountAuth | null> {
        const kids = parseJWEKids(auth.sidEncryptedAccount);
        const enckid = kids.find((k:string)=>this.kidToDocid[k]);
        const docid = enckid? this.kidToDocid[enckid]: this.latestDocid;
        const decrypter = x25519Decrypter(this.keysMap[docid].priv.encrypt);

        const accountId = u8a.toString(await decryptJWE(auth.sidEncryptedAccount, decrypter));
        if (accountId === removeAuthId) {
            return null;
        }

        // account encrypt seed
        const accountEncryptedSeed = await accountDid.createJWE(this.keysMap[this.latestDocid].seed, [accountDid.id]);

        // sid encrypt account
        const keyFragment = this.getKeyFragment(this.latestDocid, "encrypt");
        const kid = `${this.did}#${keyFragment}`;
        const encrypter = x25519Encrypter(this.keysMap[this.latestDocid].pub.encrypt, kid);
        const sidEncryptedAccount = await createJWE(u8a.fromString(accountId), [encrypter]);
        return {
            accountDid: auth.accountDid,
            accountEncryptedSeed,
            sidEncryptedAccount
        };
    }
   
}