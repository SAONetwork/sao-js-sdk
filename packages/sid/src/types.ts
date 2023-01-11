import { SaoTypes } from "sao-chain-client";

/**
 * JSON web signature type.
 */
export type JWS = {
  payload: string;
  signatures: Array<SaoTypes.JwsSignature>;
};

/**
 * Authentication parameters
 */
export type AuthenticateParam = {
  paths: Array<string>;
  nonce: string;
  aud?: string;
};

/**
 * Create JSON web signature parameter
 */
export type CreateJWSParam = {
  payload: string | Record<string, any>;
  protected?: Record<string, any>;
};
