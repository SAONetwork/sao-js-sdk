import {DidProvider, DidManager, CreateJWSParam, JWS} from "@saonetwork/sid";
import {ES256KSigner, createJWS} from "another-did-jwt";
import stringify from 'fast-json-stable-stringify'

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

export class KidProvider implements DidProvider{
  private did: string;
  private privKey: Uint8Array;

  constructor(did: string, priv: Uint8Array) {
    this.did = did
    this.privKey = priv
  }

  id(): string{
    return this.did;
  }

  async createJWS(param: CreateJWSParam): Promise<JWS> {
    const payload = param.payload;
    const kid = this.did + "#"+ this.did.split(":")[2];

    const signer = ES256KSigner(this.privKey,false,{ canonical: true });
    const header = toStableObject({ Kid: kid, Alg: "ES256K"});

    const content = typeof payload === "string" ? payload : toStableObject(payload);
    const jws = await createJWS(content, signer, header);
    return toJWS(jws);
  }
}

export class KidManager implements DidManager{
  private provider: KidProvider;

  constructor(did: string, priv: Uint8Array) {
    this.provider = new KidProvider(did,priv)
  }

  GetProvider(did?: string): Promise<DidProvider | null> {
    if (did != undefined && this.provider.id() != did) {
      return null
    }
    return Promise.resolve(this.provider);
  }

  id(): string{
    return this.provider.id()
  }
}
