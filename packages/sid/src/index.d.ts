export declare class Account {
    chainId: string;
    address: string;
    constructor(chainId: string, address: string);
    id(): string;
}
export interface AccountProvider {
    account(): Promise<Account>;
    sign(message: string): Promise<string>;
    generateBindingProof(did: string): BindingProof;
}
export interface BindingProof {
    chainId: string;
    address: string;
    timestamp: number;
    did: string;
}
