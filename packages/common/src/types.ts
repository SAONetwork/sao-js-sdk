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