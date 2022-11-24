import { AccountId } from "caip";
import { BindingProof } from "./types";
export interface AccountProvider {
    /**
     * caip account id.
     */
    accountId(): Promise<AccountId>;
    /**
     *
     * @param message
     */
    sign(message: string): Promise<string>;
    /**
     *
     * @param did
     */
    generateBindingProof(did: string): Promise<BindingProof>;
}
