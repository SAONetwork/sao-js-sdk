import { HDNode } from "@ethersproject/hdnode";
import * as u8a from "uint8arrays";
import { generateKeyPairFromSeed } from "@stablelib/x25519";
import { randomBytes } from "@stablelib/random";
import {
  JWE,
  ES256KSigner,
  Signer,
  createJWE,
  x25519Encrypter,
  x25519Decrypter,
  decryptJWE,
  Decrypter,
} from "another-did-jwt";
import { accountSecretToDid, encodeKey, parseJWEKids } from "./utils";
import { DidStore } from "./did_store";
import { AccountAuth } from "@saonetwork/api-client";
import { DID } from "dids";
import { getResolver } from "key-did-resolver";
import stringify from "fast-json-stable-stringify";
import { Hash } from "@saonetwork/common";
import { getSidIdentifier } from "./utils";

export interface KeySeries {
  /**
   * key for signing.
   */
  signing: Uint8Array;
  /**
   * key for encrypting
   */
  encrypt: Uint8Array;
}

export interface FullKeySeries {
  /**
   * public keys
   */
  pub: KeySeries;
  /**
   * private keys
   */
  priv: KeySeries;
  /**
   * seed to generate keys
   */
  seed: Uint8Array;
}

const ROOT_PATH = "m/736964'"; // int(ascii('sid'))
const keyNameLen = 10;

type SidDocId = string;

export function keyName(key: string) {
  return key.slice(-keyNameLen);
}

export class Keychain {
  private keysMap: Record<SidDocId, FullKeySeries> = {};
  private kidToDocid: Record<string, string> = {};
  latestDocid: string;
  private oldSeeds: Array<JWE> = [];
  public did: string;
  private didStore: DidStore;

  constructor(did: string, didStore: DidStore) {
    this.did = did;
    this.didStore = didStore;
  }

  static async load(didStore: DidStore, seed: Uint8Array, did: string): Promise<Keychain> {
    const keychain = new Keychain(did, didStore);

    const rootDocId = did.split(":")[2];
    const versions = await didStore.listSidDocumentVersions(rootDocId);
    const latestVersion = versions[versions.length - 1];

    keychain.latestDocid = latestVersion;
    keychain.keysMap[keychain.latestDocid] = Keychain.generateKeys(seed);
    keychain.updateKidToDocId(keychain.latestDocid, keychain.keysMap[keychain.latestDocid]);
    keychain.oldSeeds = await didStore.getOldSeeds(did);

    const tempSeeds = [...keychain.oldSeeds];
    let tempDocId: string = latestVersion;
    let jwe = tempSeeds.pop();
    while (jwe) {
      const decrypted = await keychain.decryptFromJWE(jwe, [], tempDocId);
      const decryptedObj = JSON.parse(u8a.toString(decrypted)) as Record<string, string>;
      tempDocId = Object.keys(decryptedObj)[0];
      const prevSeed = u8a.fromString(decryptedObj[tempDocId], "base16");
      keychain.keysMap[tempDocId] = Keychain.generateKeys(prevSeed);
      keychain.updateKidToDocId(tempDocId, keychain.keysMap[tempDocId]);
      jwe = tempSeeds.pop();
    }

    return keychain;
  }

  updateKidToDocId(docId: string, fullKeySeries: FullKeySeries) {
    const signing = encodeKey(fullKeySeries.pub.encrypt, "x25519");
    const sigKid = keyName(signing);
    this.kidToDocid[sigKid] = docId;

    const encrypt = encodeKey(fullKeySeries.pub.signing, "secp256k1");
    const encKid = keyName(encrypt);
    this.kidToDocid[encKid] = docId;
  }

  static async create(didStore: DidStore, timestamp: number): Promise<Keychain> {
    //keys
    const seed = randomBytes(32);
    const fullKeySeries = this.generateKeys(seed);
    const keys = Keychain.generatePubKeys(fullKeySeries);

    // rootDocId
    const rootDocId = u8a.toString(await Hash(u8a.fromString(stringify(keys) + timestamp.toString(10))), "base16");

    // keychain
    const sid = `did:sid:${rootDocId}`;
    const keychain = new Keychain(sid, didStore);
    keychain.latestDocid = rootDocId;
    keychain.keysMap[rootDocId] = fullKeySeries;

    Object.keys(keys).forEach((k) => (keychain.kidToDocid[k] = keychain.latestDocid));

    return keychain;
  }

  getPubKeys(): Record<string, string> {
    const fullKeySeries = this.keysMap[getSidIdentifier(this.did)];
    return Keychain.generatePubKeys(fullKeySeries);
  }

  static generatePubKeys(fullKeySeries: FullKeySeries): Record<string, string> {
    const signing = encodeKey(fullKeySeries.pub.signing, "secp256k1");
    const encrypt = encodeKey(fullKeySeries.pub.encrypt, "x25519");
    const sigKid = keyName(signing);
    const encKid = keyName(encrypt);
    return {
      [sigKid]: signing,
      [encKid]: encrypt,
    };
  }

  getSigner(docid: string = this.latestDocid): Signer {
    const keys = this.keysMap[docid] || this.keysMap[this.latestDocid];
    return ES256KSigner(keys.priv.signing, false, { canonical: true });
  }

  getKeyFragment(docid: string = this.latestDocid, keyUsage = "sign"): string {
    const keys = this.keysMap[docid];
    if (keyUsage === "encrypt") {
      return keyName(encodeKey(keys.pub.encrypt, "x25519"));
    } else {
      return keyName(encodeKey(keys.pub.signing, "secp256k1"));
    }
  }

  async add(accountId: string, accountSecrect: Uint8Array): Promise<AccountAuth> {
    const accountDid = await accountSecretToDid(accountSecrect);
    // account encrypt seed
    const accountEncryptedSeed = await accountDid.createJWE(this.keysMap[this.latestDocid].seed, [accountDid.id]);

    // sid encrypt account
    const keyFragment = this.getKeyFragment(this.latestDocid, "encrypt");
    const kid = `${this.did}#${keyFragment}`;
    const encrypter = x25519Encrypter(this.keysMap[this.latestDocid].pub.encrypt, kid);
    const sidEncryptedAccount = await createJWE(u8a.fromString(accountId), [encrypter]);

    return {
      accountDid: accountDid.id,
      accountEncryptedSeed,
      sidEncryptedAccount,
    };
  }

  async remove(accountId: string): Promise<void> {
    await this.rotateKeys(accountId);
  }

  static generateKeys(seed: Uint8Array): FullKeySeries {
    const rootNode = HDNode.fromSeed(seed);
    const baseNode = rootNode.derivePath(ROOT_PATH);
    const signingKey = baseNode.derivePath("0");
    const encryptSeed = u8a.fromString(baseNode.derivePath("1").privateKey.slice(2), "base16");
    const encryptKeypair = generateKeyPairFromSeed(encryptSeed);
    return {
      seed,
      pub: {
        signing: u8a.fromString(signingKey.publicKey.slice(2), "base16"),
        encrypt: encryptKeypair.publicKey,
      },
      priv: {
        signing: u8a.fromString(signingKey.privateKey.slice(2), "base16"),
        encrypt: encryptKeypair.secretKey,
      },
    };
  }

  private encodeSeed(docId: string): Uint8Array {
    const seed = u8a.toString(this.keysMap[docId].seed, "base16");
    const seedPayload = { [docId]: seed };
    return u8a.fromString(stringify(seedPayload));
  }

  async rotateKeys(removeAuthId: string) {
    const prevDocId = this.latestDocid;

    // generate new key
    const seed = randomBytes(32);
    const newKeySeries = Keychain.generateKeys(seed);

    const keys = Keychain.generatePubKeys(newKeySeries);

    // update did document
    const timestamp = Date.now();
    const newDocId = u8a.toString(await Hash(u8a.fromString(stringify(keys) + timestamp.toString(10))), "base16");

    // update past seeds
    const encodedPrevSeed = this.encodeSeed(prevDocId);

    const encrypter = x25519Encrypter(newKeySeries.pub.encrypt);
    const prevSeedJWE = await createJWE(encodedPrevSeed, [encrypter]);

    const allAccountAuths = await this.didStore.getAllAccountAuth(this.did);
    if (Object.keys(allAccountAuths).length > 0) {
      const accountDid = new DID({ resolver: getResolver() });
      const updateAccountAuths = [];
      const removeAccountAuths = [];
      for (let i = 0; i < Object.values(allAccountAuths).length; i++) {
        const aa = await this.updateAccountAuth(
          accountDid,
          Object.values(allAccountAuths)[i],
          removeAuthId,
          newKeySeries
        );
        if (!aa) {
          removeAccountAuths.push(allAccountAuths[i].accountDid);
        } else {
          updateAccountAuths.push(aa);
        }
      }
      await this.didStore.update(
        this.did,
        removeAuthId,
        newDocId,
        keys,
        timestamp,
        updateAccountAuths,
        removeAccountAuths,
        prevSeedJWE
      );
      this.latestDocid = newDocId;
      this.keysMap[newDocId] = newKeySeries;
      Object.keys(keys).forEach((k) => (this.kidToDocid[k] = newDocId));
      this.oldSeeds.push(prevSeedJWE);
    }
  }

  async updateAccountAuth(
    accountDid: DID,
    auth: AccountAuth,
    removeAuthId: string,
    keyset: FullKeySeries
  ): Promise<AccountAuth | null> {
    const kids = parseJWEKids(auth.sidEncryptedAccount);
    const accountId = u8a.toString(await this.decryptFromJWE(auth.sidEncryptedAccount, kids));
    if (accountId === removeAuthId) {
      return null;
    }

    // account encrypt seed
    const accountEncryptedSeed = await accountDid.createJWE(keyset.seed, [auth.accountDid]);

    // sid encrypt account
    const keyFragment = keyName(encodeKey(keyset.pub.encrypt, "x25519"));
    const kid = `${this.did}#${keyFragment}`;
    const encrypter = x25519Encrypter(keyset.pub.encrypt, kid);
    const sidEncryptedAccount = await createJWE(u8a.fromString(accountId), [encrypter]);

    return {
      accountDid: auth.accountDid,
      accountEncryptedSeed,
      sidEncryptedAccount,
    };
  }

  async encryptToJWE(payload: Uint8Array, kid?: string): Promise<JWE> {
    const encrypter = x25519Encrypter(this.keysMap[this.latestDocid].pub.encrypt, kid);
    return await createJWE(payload, [encrypter]);
  }

  async decryptFromJWE(jwe: JWE, kids: Array<string>, docId?: string): Promise<Uint8Array> {
    return await decryptJWE(jwe, await this.getDecrypter(kids, docId));
  }

  async getDecrypter(kids: Array<string> = [], docId?: string): Promise<Decrypter> {
    if (!docId) {
      const enckid = kids.find((k: string) => this.kidToDocid[k]);
      docId = enckid ? this.kidToDocid[enckid] : this.latestDocid;
    }
    return x25519Decrypter(this.keysMap[docId].priv.encrypt);
  }
}
