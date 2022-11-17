function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
        return descriptor.get.call(receiver);
    }
    return descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
        descriptor.set.call(receiver, value);
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
}
function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldInit(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
}
import { HDNode } from '@ethersproject/hdnode';
import * as u8a from 'uint8arrays';
import { generateKeyPairFromSeed } from '@stablelib/x25519';
import { randomBytes } from '@stablelib/random';
import { ES256KSigner, createJWE, x25519Encrypter } from 'did-jwt';
import { accountSecretToDid, encodeKey } from './utils';
const ROOT_PATH = "10000";
const CURRENT = "current";
var _KeysMap = /*#__PURE__*/ new WeakMap(), // #SeedHistory: Array<string> = []
_did = /*#__PURE__*/ new WeakMap(), _didStore = /*#__PURE__*/ new WeakMap();
export class Keychain {
    did() {
        return _classPrivateFieldGet(this, _did);
    }
    static load(didStore, seed, did) {
        const fullKeySeries = this.generateKeys(seed);
        const keychain = new Keychain(did, didStore);
        _classPrivateFieldGet(keychain, _KeysMap)[CURRENT] = fullKeySeries;
        return keychain;
    }
    static async create(didStore) {
        const seed = randomBytes(32);
        const fullKeySeries = this.generateKeys(seed);
        const signing = encodeKey(fullKeySeries.pub.signing, 'secp256k1');
        const encrypt = encodeKey(fullKeySeries.pub.encrypt, 'x25519');
        const docid = await didStore.updateSidDocument(signing, encrypt);
        const sid = `did:sid:${docid}`;
        const keychain = new Keychain(sid, didStore);
        _classPrivateFieldGet(keychain, _KeysMap)[CURRENT] = fullKeySeries;
        return keychain;
    }
    getSigner(docid = CURRENT) {
        const keys = _classPrivateFieldGet(this, _KeysMap)[docid] || _classPrivateFieldGet(this, _KeysMap)[CURRENT];
        return ES256KSigner(keys.priv.signing);
    }
    getKeyFragment(docid = CURRENT, keyUsage = "sign") {
        const keys = _classPrivateFieldGet(this, _KeysMap)[docid];
        if (keyUsage === "encrypt") {
            return encodeKey(keys.pub.encrypt, 'x25519').slice(15);
        } else {
            return "";
        }
    }
    async add(accountId, accountSecrect) {
        const accountDid = await accountSecretToDid(accountSecrect);
        // account encrypt seed
        const accountEncryptedSeed = await accountDid.createJWE(_classPrivateFieldGet(this, _KeysMap)[CURRENT].seed, [
            accountDid.id
        ]);
        // sid encrypt account
        const keyFragment = this.getKeyFragment(CURRENT, "encrypt");
        const kid = `${_classPrivateFieldGet(this, _did)}#${keyFragment}`;
        const encrypter = x25519Encrypter(_classPrivateFieldGet(this, _KeysMap)[CURRENT].pub.encrypt, kid);
        const sidEncryptedAccount = await createJWE(u8a.fromString(accountId), [
            encrypter
        ]);
        await _classPrivateFieldGet(this, _didStore).addAccountAuth({
            accountDid: accountDid.id,
            accountEncryptedSeed,
            sidEncryptedAccount
        });
    }
    static generateKeys(seed) {
        const rootNode = HDNode.fromSeed(seed);
        const baseNode = rootNode.derivePath(ROOT_PATH);
        const signingKey = baseNode.derivePath('0');
        const encryptSeed = u8a.fromString(baseNode.derivePath('1').privateKey.slice(2), 'base16');
        const encryptKeypair = generateKeyPairFromSeed(encryptSeed);
        return {
            seed,
            pub: {
                signing: u8a.fromString(signingKey.publicKey, 'base16'),
                encrypt: encryptKeypair.publicKey
            },
            priv: {
                signing: u8a.fromString(signingKey.privateKey, 'base16'),
                encrypt: encryptKeypair.secretKey
            }
        };
    }
    constructor(did, didStore){
        _classPrivateFieldInit(this, _KeysMap, {
            writable: true,
            value: {}
        });
        _classPrivateFieldInit(this, _did, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _didStore, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _did, did);
        _classPrivateFieldSet(this, _didStore, didStore);
    }
}
