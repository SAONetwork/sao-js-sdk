export declare const BindingProofV1 = 1;
export interface BindingProof {
    accountId: string;
    timestamp?: number;
    did: string;
    signature: string;
    message: string;
}
