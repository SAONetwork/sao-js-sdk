import { AccountId } from "caip";
import { BindingProof } from '@sao-js-sdk/common';

/**
 * accounts that binds to sid should implement this interface.
 */
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
     * @param timestamp
     */
    generateBindingProof(did: string, timestamp: number): Promise<BindingProof>
}