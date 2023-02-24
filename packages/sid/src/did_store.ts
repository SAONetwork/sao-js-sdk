import { DidTxTypes } from "@saonetwork/saochain-ts-client";
import { JWE } from "did-jwt";
import { AccountAuth } from "@saonetwork/api-client";

// interface for did information storage.
export interface DidStore {
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
  getDid(accountId: string): Promise<string | null>;

  getAccountAuth(did: string, accountDid: string): Promise<AccountAuth | null>;

  update(
    did: string,
    accountId: string,
    newDocId: string,
    keys: Record<string, string>,
    timestamp: number,
    updates: AccountAuth[],
    removes: string[],
    pastSeed: JWE
  ): Promise<void>;

  getAllAccountAuth(did: string): Promise<AccountAuth[]>;

  listSidDocumentVersions(rootDocId: string): Promise<Array<string>>;

  getOldSeeds(did: string): Promise<Array<JWE>>;

  updatePaymentAddress(accountId: string, did: string): Promise<void>;
}
