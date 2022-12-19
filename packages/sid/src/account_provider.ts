import { AccountId } from "caip";
import { DidTxTypes } from "sao-chain-client";

/**
 * accounts that binds to sid should implement this interface.
 */
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
   * @param timestamp
   */
  generateBindingProof(did: string, timestamp: number): Promise<DidTxTypes.BindingProof>;
}
