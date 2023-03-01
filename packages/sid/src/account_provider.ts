import { AccountId } from "caip";
import { DidTxTypes } from "@saonetwork/saochain-ts-client";

/**
 * accounts that binds to sid should implement this interface.
 */
export interface AccountProvider {
  /**
   * caip account id.
   *
   * @returnes caip account id.
   */
  accountId(): Promise<AccountId>;

  /**
   * sign an arbitrary message.
   *
   * @param message message to sign
   * @returns signed message
   */
  sign(message: string): Promise<string>;

  /**
   * create binding proof for the given did.
   *
   * @param did bind this account to the given did.
   * @param timestamp timestamp records when the binding proof is generated.
   */
  generateBindingProof(did: string, timestamp: number): Promise<DidTxTypes.BindingProof>;
}
