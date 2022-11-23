export class Account {
    chainId: string
    address: string

    constructor(chainId: string, address: string) {
        this.chainId = chainId;
        this.address = address;
    }

    id(): string {
        return this.chainId + ":" + this.address;
    }
}

export interface AccountProvider {
    account(): Promise<Account>
    sign(message: string): Promise<string>
    generateBindingProof(did: string): Promise<BindingProof>
}

export interface BindingProof {
    chainId: string
    address: string
    timestamp: number
    did: string
}

export * from './manager'