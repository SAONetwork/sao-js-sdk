import { Sha256 } from "@aws-crypto/sha256-browser";
import varint from "varint";
import { concat } from "uint8arrays/concat";
import CID from "cids";
import { v1 as uuidv1, v5 as uuidv5 } from "uuid";

export const Uint8ArrayToString = (dataArray: Uint8Array) => {
  let dataString = "";
  for (let i = 0; i < dataArray.length; i++) {
    dataString += String.fromCharCode(dataArray[i]);
  }

  return dataString;
};

export const stringToUint8Array = (dataString: string) => {
  const dataArray = [];
  for (let i = 0, j = dataString.length; i < j; ++i) {
    dataArray.push(dataString.charCodeAt(i));
  }

  return new Uint8Array(dataArray);
};

export const GenerateDataId = (seed: string) => {
  const idv1 = uuidv1();
  const idv5 = uuidv5(seed, uuidv5.URL);
  return idv1.substr(0, 18) + idv5.substr(18);
};

export const IsUUID = (id: string): boolean => {
  const s = id.match("^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$");
  if (s === null) {
    return false;
  }
  return true;
};

// /**
//  * @type {Crypto}
//  */
// const crypto =
//     self.crypto ||
//     /** @type {typeof window.crypto} */
//     // @ts-ignore - unknown property
//     (self.msCrypto);

export const Hash = async (content: Uint8Array) => {
  const hasher = new Sha256();
  hasher.update(content);
  const hash = await hasher.digest();

  // const buffer = await crypto.subtle.digest({ name: "SHA-256" }, content);
  return new Uint8Array(hash);
};

export const MultiHash = async (content: Uint8Array) => {
  const digest = await Hash(content);
  const code = varint.encode(0x12);
  const length = varint.encode(0x20);
  const hash = concat([code, length, digest], code.length + length.length + digest.length);

  return hash;
};

export const CalculateCid = async (content: Uint8Array) => {
  const hash = await MultiHash(content);

  const cid = new CID(0, "dag-pb", hash);

  return cid.toString();
};
