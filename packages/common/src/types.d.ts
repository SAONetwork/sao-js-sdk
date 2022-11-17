export declare type JWS = {
    payload: string;
    signatures: Array<JWSSignature>;
};
export declare type JWSSignature = {
    protected: string;
    signature: string;
};
export declare type AuthenticateParam = {
    paths: Array<string>;
    nonce: string;
    aud?: string;
};
export declare type CreateJWSParam = {
    payload: string | Record<string, any>;
    protected?: Record<string, any>;
};
