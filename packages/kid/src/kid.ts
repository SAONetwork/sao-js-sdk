import { CreateJWSParam, JWS } from "@saonetwork/sid";
import { ES256KSigner, createJWS } from "another-did-jwt";
import stringify from "fast-json-stable-stringify";
import * as u8a from "uint8arrays";
import { DirectSecp256k1Wallet, OfflineSigner } from "@cosmjs/proto-signing";
import { rawSecp256k1PubkeyToRawAddress } from "@cosmjs/amino";
import { Secp256k1 } from "@cosmjs/crypto";
import { Bech32 } from "@cosmjs/encoding";

import { BigNumber } from "@ethersproject/bignumber";
import { CURVE } from "@noble/secp256k1";

import { Hash } from "@saonetwork/common";
import { jwtDecrypt } from "jose";
import { Record as R } from "./record";

export function toStableObject(obj: Record<string, any>): Record<string, any> {
  return JSON.parse(stringify(obj)) as Record<string, any>;
}

export function toJWS(jws: string): JWS {
  const [protectedHeader, payload, signature] = jws.split(".");
  return {
    payload,
    signatures: [{ protected: protectedHeader, signature }],
  };
}

export class KidProvider {
  private did: string;
  private privKey: Uint8Array;

  constructor(did: string, priv: Uint8Array) {
    this.did = did;
    this.privKey = priv;
  }

  id(): string {
    return this.did;
  }

  async createJWS(param: CreateJWSParam): Promise<JWS> {
    const payload = param.payload;
    const kid = this.did + "#" + this.did.split(":")[2];

    const signer = ES256KSigner(this.privKey, false, { canonical: true });
    const header = toStableObject({ Kid: kid, Alg: "ES256K" });

    const content = typeof payload === "string" ? payload : toStableObject(payload);
    const jws = await createJWS(content, signer, header);
    return toJWS(jws);
  }
}

export class KidManager {
  private provider: KidProvider;
  private signer: OfflineSigner;

  constructor(did: string, priv: Uint8Array, signer: OfflineSigner) {
    this.provider = new KidProvider(did, priv);
    this.signer = signer;
  }

  static async createManager(keyFile: File): Promise<KidManager> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const x = event.target.result as string;
          const text = await jwtDecrypt(x, u8a.fromString("test"));
          const recordByte = u8a.fromString(text.payload.Data.toString(), "base64");
          const r = R.decode(recordByte);

          // Generate the secret
          const keypair = await Secp256k1.makeKeypair(r.local.privKey.value.slice(2));
          const pubkey = await Secp256k1.compressPubkey(keypair.pubkey);
          const addr = Bech32.encode("sao", rawSecp256k1PubkeyToRawAddress(pubkey));
          const sig = await Secp256k1.createSignature(
            await Hash(u8a.fromString("cosmos " + addr + " allows to generate did")),
            keypair.privkey
          );
          const signer = await DirectSecp256k1Wallet.fromKey(keypair.privkey, "sao");
          const secret = Secp256k1.trimRecoveryByte(sig.toFixedLength());

          // Convert the secret to a private key
          let fe = BigNumber.from(await Hash(secret)).toBigInt();
          const n = CURVE.n;
          const one = BigInt(1);
          fe = fe % (n - one);
          fe = fe + one;
          const feb = u8a.fromString(fe.toString(16), "hex");
          const priv = new Uint8Array(32).fill(0);
          priv.set(feb, 32 - feb.length);

          // Generate the DID
          const kidKeyPair = await Secp256k1.makeKeypair(priv);
          const kidpubkey = await Secp256k1.compressPubkey(kidKeyPair.pubkey);
          const did = "did:key:" + KidManager.encodeKey(kidpubkey);

          resolve(new KidManager(did, priv, signer));
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => {
        reject(new Error("Failed to read the file"));
      };
      reader.readAsText(keyFile);
    });
  }

  getDidProvider(did?: string): Promise<KidProvider | null> {
    if (did != undefined && this.provider.id() != did) {
      return null;
    }
    return Promise.resolve(this.provider);
  }

  getSigner(): OfflineSigner {
    return this.signer;
  }

  static encodeKey(key: Uint8Array): string {
    const bytes = new Uint8Array(key.length + 2);
    bytes[0] = 0xe7;
    // The multicodec is encoded as a varint so we need to add this.
    // See js-multicodec for a general implementation
    bytes[1] = 0x01;
    bytes.set(key, 2);
    return `z${u8a.toString(bytes, "base58btc")}`;
  }
}
