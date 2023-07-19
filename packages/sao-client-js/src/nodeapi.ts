import {jwtDecrypt} from "jose";
import * as u8a from "uint8arrays";
import {DirectSecp256k1Wallet} from "@cosmjs/proto-signing";
import { Secp256k1 } from "@cosmjs/crypto"
import {Bech32} from "@cosmjs/encoding"
import {BigNumber} from "@ethersproject/bignumber"
import {CURVE} from "@noble/secp256k1"
import {rawSecp256k1PubkeyToRawAddress} from "@cosmjs/amino"
import {Record as R} from "./record";
import { DID } from "dids";
import * as fs from "fs";
import { Secp256k1Provider } from "key-did-provider-secp256k1";
import { getResolver as getKeyResolver } from "key-did-resolver";
import {Resolver,ResolverRegistry} from "did-resolver";
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

async function ReadRecord(path: string): Promise<R> {
  const x = await fs.readFileSync(path);
  const text = await jwtDecrypt(x.toString(),u8a.fromString("test"));
  const recordByte = u8a.fromString(text.payload.Data.toString(), "base64");
  const r = R.decode(recordByte);
  console.log(r);
  return r;
}

export async function NewSaoClientApi(
  nodeEndpoint: string,
  chainEndpoint: string,
  keyName: string,
  keyringHome: string,
  groupId: string,
  NodeToken: string = "DefaultToken"
): Promise<ModelManager> {

  const r = await ReadRecord(keyringHome+ "/" + keyName + ".info")

  const keypair = await Secp256k1.makeKeypair(r.local.privKey.value.slice(2));
  const pubkey = await Secp256k1.compressPubkey(keypair.pubkey)
  const addr = Bech32.encode("sao", rawSecp256k1PubkeyToRawAddress(pubkey))
  console.log(addr);
  const sig = await Secp256k1.createSignature(await Hash(u8a.fromString("cosmos "+addr+" allows to generate did")),keypair.privkey)

  console.log(sig)
  const secret = Secp256k1.trimRecoveryByte(sig.toFixedLength());
  console.log(u8a.toString(sig.toFixedLength().slice(0,64),"hex"))

  var fe = BigNumber.from(await Hash(secret)).toBigInt()
  const n = CURVE.n
  const one = BigInt(1)
  fe = fe % (n -one)
  fe = fe + one
  const feb = u8a.fromString(fe.toString(16), "hex")
  var priv = new Uint8Array(32).fill(0)
  priv.set(feb,32-feb.length)

  const kidKeyPair = await Secp256k1.makeKeypair(priv);
  const kidpubkey = await Secp256k1.compressPubkey(kidKeyPair.pubkey)
  const did ="did:key:"+encodeKey(kidpubkey)

  console.log(did)
  const modelManager = new ModelManager({
      ownerDid: did,
      chainApiUrl: "",
      chainApiToken: "",
      chainRpcUrl: chainEndpoint,
      chainPrefix: "sao",
      signer: await DirectSecp256k1Wallet.fromKey(keypair.privkey,"sao"),
      nodeApiUrl: nodeEndpoint,
      nodeApiToken: NodeToken,
      platformId: groupId,
    },
    new KidManager(did,priv)
  )
  await modelManager.init()
  return modelManager
}
