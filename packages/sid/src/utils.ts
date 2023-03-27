/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import { AccountProvider } from "./account_provider";
import * as u8a from "uint8arrays";
import { fromString } from "uint8arrays";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver as getKeyResolver } from "key-did-resolver";
import stringify from "fast-json-stable-stringify";
import { JWS } from "./types";
import { JWE } from "did-jwt";
import { Hash } from "@saonetwork/common";

const multicodecPubkeyTable: Record<string, number> = {
  secp256k1: 0xe7,
  x25519: 0xec,
  ed25519: 0xed,
};

export function encodeKey(key: Uint8Array, keyType: string): string {
  const bytes = new Uint8Array(key.length + 2);
  if (!multicodecPubkeyTable[keyType]) {
    throw new Error(`Key type "${keyType}" not supported.`);
  }
  bytes[0] = multicodecPubkeyTable[keyType];
  // The multicodec is encoded as a varint so we need to add this.
  // See js-multicodec for a general implementation
  bytes[1] = 0x01;
  bytes.set(key, 2);
  return `z${u8a.toString(bytes, "base58btc")}`;
}

export async function generateAccountSecret(accountProvider: AccountProvider): Promise<Uint8Array> {
  const account = await accountProvider.accountId();
  const message = " allows " + account.toString() + " to control the did";
  const signedMessage = await accountProvider.sign(message);
  return Hash(fromString(signedMessage.slice(2)));
}

export async function accountSecretToDid(accountSecret: Uint8Array): Promise<DID> {
  const accountDid = new DID({
    // TODO: replace with sao's ed25519 provider.
    resolver: getKeyResolver(),
    provider: new Ed25519Provider(accountSecret),
  });
  await accountDid.authenticate();
  return accountDid;
}

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

/**
 *
 *
 * @param jwe
 * @returns
 */
export function parseJWEKids(jwe: JWE): Array<string> {
  return (
    jwe.recipients?.reduce((kids: Array<string>, recipient): Array<string> => {
      if (recipient.header?.kid) kids.push(recipient.header.kid.split("#")[1]);
      return kids;
    }, []) || []
  );
}

/**
 * Prepare jsonrpc body.
 *
 * @param method jsonrpc method
 * @param params jsonrpc params
 * @returns jsonrpc body
 */
export function encodeRpcMessage(method: string, params?: any): any {
  return {
    jsonrpc: "2.0",
    id: 1,
    method,
    params,
  };
}

/**
 * Convert a utf8 string to hex representation.
 *
 * @param message utf8 string.
 * @returns hex representation
 */
export function utf8ToHex(message: string): string {
  const bytes = u8a.fromString(message);
  const hex = u8a.toString(bytes, "base16");
  return "0x" + hex;
}

/**
 * Check if the given did is a sid.
 *
 * @param did did string
 * @returns if the given did is a sid.
 */
export function isSid(did: string): boolean {
  return did.startsWith("did:sid");
}

/**
 * Get identifier part of a did.
 *
 * @param did sid string
 * @returns
 */
export function getSidIdentifier(did: string): string {
  if (isSid(did)) {
    return did.slice(8);
  }
  return "";
}

/**
 * Get binding message
 *
 * @param did did string
 * @param timestamp timestamp
 * @returns binding message content
 */
export const getBindMessage = (did: string, timestamp: number): string => {
  return `Link this account to your did: ${did}\nTimestamp: ${timestamp.toString(10)}`;
};

export const asleep = (ms: number) => {
  const timestamp = new Date().getTime();
  const end = timestamp + ms;
  while (new Date().getTime() <= end) {} // eslint-disable-line
};
