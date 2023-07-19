import {jwtDecrypt} from "jose";
import * as u8a from "uint8arrays";
import * as fs from "fs";

import {DirectSecp256k1Wallet} from "@cosmjs/proto-signing";
import {rawSecp256k1PubkeyToRawAddress} from "@cosmjs/amino";
import {Secp256k1} from "@cosmjs/crypto";
import {Bech32} from "@cosmjs/encoding";

import {BigNumber} from "@ethersproject/bignumber";
import {CURVE} from "@noble/secp256k1";

import {Hash} from "@saonetwork/common";
import {ModelManager} from "@saonetwork/model";

import {Record as R} from "./record";
import {KidManager} from "./kid";

function encodeKey(key: Uint8Array): string {
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
  return R.decode(recordByte);
}

async function GenerateSecret(r: R): Promise<{signer:DirectSecp256k1Wallet,secret:Uint8Array}>{
  const keypair = await Secp256k1.makeKeypair(r.local.privKey.value.slice(2));
  const pubkey = await Secp256k1.compressPubkey(keypair.pubkey);
  const addr = Bech32.encode("sao", rawSecp256k1PubkeyToRawAddress(pubkey));
  const sig = await Secp256k1.createSignature(await Hash(u8a.fromString("cosmos "+addr+" allows to generate did")),keypair.privkey);

  return {
    signer: await DirectSecp256k1Wallet.fromKey(keypair.privkey,"sao"),
    secret: Secp256k1.trimRecoveryByte(sig.toFixedLength())
  };
}

async function SecretToKidPriv(secret: Uint8Array): Promise<Uint8Array>{
  var fe = BigNumber.from(await Hash(secret)).toBigInt();
  const n = CURVE.n;
  const one = BigInt(1);
  fe = fe % (n -one);
  fe = fe + one;
  const feb = u8a.fromString(fe.toString(16), "hex");
  var priv = new Uint8Array(32).fill(0);
  priv.set(feb,32-feb.length);
  return priv;
}

async function GenerateKid(priv: Uint8Array): Promise<string>{

  const kidKeyPair = await Secp256k1.makeKeypair(priv);
  const kidpubkey = await Secp256k1.compressPubkey(kidKeyPair.pubkey);
  return "did:key:"+encodeKey(kidpubkey);
}

export async function NewSaoClientApi(
  nodeEndpoint: string,
  chainEndpoint: string,
  keyName: string,
  keyringHome: string,
  groupId: string,
  NodeToken: string = "DefaultToken"
): Promise<ModelManager> {

  const r = await ReadRecord(keyringHome+ "/" + keyName + ".info");

  const {signer,secret} = await GenerateSecret(r);

  const priv = await SecretToKidPriv(secret);

  const did = await GenerateKid(priv);

  const modelManager = new ModelManager({
      ownerDid: did,
      chainApiUrl: "",
      chainApiToken: "",
      chainRpcUrl: chainEndpoint,
      chainPrefix: "sao",
      signer: signer,
      nodeApiUrl: nodeEndpoint,
      nodeApiToken: NodeToken,
      platformId: groupId,
    },
    new KidManager(did,priv)
  );

  await modelManager.init();
  return modelManager;
}
