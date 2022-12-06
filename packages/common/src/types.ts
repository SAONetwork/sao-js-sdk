export type JWS = {
    payload: string
    signatures: Array<JWSSignature>
}

export type JWSSignature = {
    protected: string
    signature: string
}

export type AuthenticateParam = {
    paths: Array<string>;
    nonce: string;
    aud?: string;
}

export type CreateJWSParam = {
    payload: string | Record<string, any>
    protected?: Record<string, any>
}

// bind message
export interface BindMessage {
    message: string
    timestamp?: number
}

export const getBindMessage = (did: string): BindMessage => {
    const timestamp = Date.now();
    const message = `Link this account to your did: ${did}\nTimestamp: ${timestamp}`;
    return {
        message,
        timestamp
    }
}

// binding proof
export const BindingProofV1 = 1;
export type BindingProof = {
  accountId: string
  timestamp?: number
  did: string
  signature: string
  message: string
}