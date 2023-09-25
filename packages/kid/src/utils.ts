import {jwtDecrypt} from "jose";
import * as u8a from "uint8arrays";
import {DirectSecp256k1Wallet} from "@cosmjs/proto-signing";
import { Secp256k1 } from "@cosmjs/crypto"
import {Bech32} from "@cosmjs/encoding"
import {BigNumber} from "@ethersproject/bignumber"
import {CURVE} from "@noble/secp256k1"
import {rawSecp256k1PubkeyToRawAddress} from "@cosmjs/amino"
import {Record as R} from "../../toolkits/src/record";
import * as fs from "fs";
import {Hash} from "@saonetwork/common";
import {ModelManager} from "@saonetwork/model";
import {KidManager} from "./kid";

export function encodeKey(key: Uint8Array): string {
  const bytes = new Uint8Array(key.length + 2);
  bytes[0] = 0xe7;
  // The multicodec is encoded as a varint so we need to add this.
  // See js-multicodec for a general implementation
  bytes[1] = 0x01;
  bytes.set(key, 2);
  return `z${u8a.toString(bytes, "base58btc")}`;
}

export async function secretToPriv(secret: Uint8Array): Promise<Uint8Array>{
  var fe = BigNumber.from(await Hash(secret)).toBigInt()
  const n = CURVE.n
  const one = BigInt(1)
  fe = fe % (n -one)
  fe = fe + one
  const feb = u8a.fromString(fe.toString(16), "hex")
  var priv = new Uint8Array(32).fill(0)
  priv.set(feb,32-feb.length)
  return priv
}

export async function accountPrivateKeyToKid(accPrivKey: Uint8Array): Promise<{kid:string,priv: Uint8Array}> {
  const keypair = await Secp256k1.makeKeypair(accPrivKey);
  const pubkey = await Secp256k1.compressPubkey(keypair.pubkey)
  const addr = Bech32.encode("sao", rawSecp256k1PubkeyToRawAddress(pubkey))
  console.log(addr);
  const sig = await Secp256k1.createSignature(await Hash(u8a.fromString("cosmos "+addr+" allows to generate did")),keypair.privkey)

  console.log(sig)
  const secret = Secp256k1.trimRecoveryByte(sig.toFixedLength());
  console.log(u8a.toString(sig.toFixedLength().slice(0,64),"hex"))

  const priv = await secretToPriv(secret)

  const kidKeyPair = await Secp256k1.makeKeypair(priv);
  const kidpubkey = await Secp256k1.compressPubkey(kidKeyPair.pubkey)
  const did ="did:key:"+encodeKey(kidpubkey)
  return {kid:did, priv}
}
