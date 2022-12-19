import { SaoTypes } from "sao-chain-client";

export type JWS = {
  payload: string;
  signatures: Array<SaoTypes.JwsSignature>;
};

export type AuthenticateParam = {
  paths: Array<string>;
  nonce: string;
  aud?: string;
};

export type CreateJWSParam = {
  payload: string | Record<string, any>;
  protected?: Record<string, any>;
};
