import { SaoTypes, DidTxTypes } from "sao-chain-client";
import { AccountAuth } from "@sao-js-sdk/api-client";

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

/**
 * Binding tx parameters
 */
export type BindingParam = {
  rootDocId: string;
  proof: DidTxTypes.BindingProof;
  accountAuth: AccountAuth;
};
