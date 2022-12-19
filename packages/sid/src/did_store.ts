import { DidTxTypes } from "sao-chain-client";
import { JWE } from "did-jwt";

export interface AccountAuth {
  accountDid: string;
  accountEncryptedSeed: JWE;
  sidEncryptedAccount: JWE;
}

// 1. get did by account id
// 2. set account id -> did
// 2.1 if accountid's chainid is cosmos:sao, it can be set payment account.
// 3. get a did's payment account
// 4. get a did's all accounts
// 5. remove account id -> did
export interface DidStore {
  /**
   *
   * @param proof
   */
  addBinding(proof: DidTxTypes.BindingProof): Promise<void>;

  binding(
    rootDocId: string,
    keys: Record<string, string>,
    proof: DidTxTypes.BindingProof,
    accountAuth: AccountAuth
  ): Promise<void>;

  /**
   *
   * @param accountId
   * @return did
   */
  getBinding(accountId: string): Promise<string | null>;

  /**
   *
   * @param accountId
   */
  removeBinding(accountId: string): Promise<void>;

  // @param accountEncryptedSeed - account encrypted sid's seed.
  // @param sidEncryptedAccount - sid encrypted account id.
  addAccountAuth(did: string, accountAuth: AccountAuth): Promise<void>;

  getAccountAuth(did: string, accountDid: string): Promise<AccountAuth | null>;

  updateAccountAuths(did: string, update: Array<AccountAuth>, remove: Array<string>): Promise<void>;

  getAllAccountAuth(did: string): Promise<AccountAuth[]>;

  // @return document id.
  updateSidDocument(keys: Record<string, string>, rootDocId?: string): Promise<string>;

  listSidDocumentVersions(rootDocId: string): Promise<Array<string>>;

  getOldSeeds(did: string): Promise<Array<JWE>>;

  addOldSeed(did: string, seed: JWE): Promise<void>;

  updatePaymentAddress(accountId: string, did: string): Promise<void>;
}
