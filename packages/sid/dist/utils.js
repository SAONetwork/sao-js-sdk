/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */ import * as u8a from 'uint8arrays';
import { hash } from '@stablelib/sha256';
import { fromString } from 'uint8arrays';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver as getKeyResolver } from 'key-did-resolver';
import stringify from 'fast-json-stable-stringify';
const multicodecPubkeyTable = {
    secp256k1: 0xe7,
    x25519: 0xec,
    ed25519: 0xed
};
export function encodeKey(key, keyType) {
    const bytes = new Uint8Array(key.length + 2);
    if (!multicodecPubkeyTable[keyType]) {
        throw new Error(`Key type "${keyType}" not supported.`);
    }
    bytes[0] = multicodecPubkeyTable[keyType];
    // The multicodec is encoded as a varint so we need to add this.
    // See js-multicodec for a general implementation
    bytes[1] = 0x01;
    bytes.set(key, 2);
    return `z${u8a.toString(bytes, 'base58btc')}`;
}
export async function generateAccountSecret(accountProvider, accountId) {
    const message = " allows " + accountId + " to control the did";
    const signedMessage = await accountProvider.sign(message);
    return hash(fromString(signedMessage.slice(2)));
}
export async function accountSecretToDid(accountSecret) {
    const accountDid = new DID({
        // TODO: replace with sao's ed25519 provider.
        resolver: getKeyResolver(),
        provider: new Ed25519Provider(accountSecret)
    });
    await accountDid.authenticate();
    return accountDid;
}
export function toStableObject(obj) {
    return JSON.parse(stringify(obj));
}
export function toJWS(jws) {
    const [protectedHeader, payload, signature] = jws.split('.');
    return {
        payload,
        signatures: [
            {
                protected: protectedHeader,
                signature
            }
        ]
    };
}
