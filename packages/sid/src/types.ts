import { SaoTypes, DidTxTypes } from "../../ts-client/dist/entry";
import { AccountAuth } from "@saonetwork/api-client";

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

export interface DidProvider{
  createJWS(param: CreateJWSParam): Promise<JWS>
}

export interface DidManager{
  GetProvider(did?: string): Promise<DidProvider | null>;
}
