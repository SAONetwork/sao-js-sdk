import { AccountId } from "caip";
import { BindingProof } from '@js-sao-did/api-client';

export interface AccountProvider {
    /**
     * caip account id.
     */
    accountId(): Promise<AccountId>

    /**
     * 
     * @param message 
     */
    sign(message: string): Promise<string>

    /**
     * 
     * @param did 
     */
    generateBindingProof(did: string): Promise<BindingProof>
}

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