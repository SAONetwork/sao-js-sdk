import varint from "varint";
import { concat } from "uint8arrays/concat";
import CID from 'cids';
import { v4 as uuid } from "uuid";

export const Uint8ArrayToString = (dataArray: Uint8Array) => {
    var dataString = "";
    for (var i = 0; i < dataArray.length; i++) {
        dataString += String.fromCharCode(dataArray[i]);
    }

    return dataString
}

export const stringToUint8Array = (dataString: string) => {
    var dataArray = []
    for (var i = 0, j = dataString.length; i < j; ++i) {
        dataArray.push(dataString.charCodeAt(i));
    }

    var tmpUint8Array = new Uint8Array(dataArray);
    return tmpUint8Array
}

export const GenerateDataId = () => {
    return uuid();
}

/**
 * @type {Crypto}
 */
 const crypto =
 self.crypto ||
 /** @type {typeof window.crypto} */
 // @ts-ignore - unknown property
 (self.msCrypto);

export const CalculateCid = async (content:Uint8Array) => {
 const buffer = await crypto.subtle.digest({ name: "SHA-256" }, content);
 const digest = new Uint8Array(buffer);
 const code = varint.encode("sha2-256");
 const length = varint.encode(digest.length);
 const hash = concat(
   [code, length, digest],
   code.length + length.length + digest.length
 );

 const cid = new CID(1, "raw", hash);
 return cid.toString();
};