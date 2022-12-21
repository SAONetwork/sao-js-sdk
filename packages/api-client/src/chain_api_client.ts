import {
  AccountAuth,
  BindingProofV1,
  ChainApiClientConfig,
  ClientOrderProposal,
  OrderRenewProposal,
  OrderTerminateProposal,
  UpdatePermissionProposal,
} from "./chain_types";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { Api, Client, SaoTxTypes, DidTxTypes, DidTypes, NodeTypes, SaoTypes, TxMsgData } from "sao-chain-client";
import * as u8a from "uint8arrays";
import stringify from "fast-json-stable-stringify";
import { JWE } from "did-jwt";

export class ChainApiClient {
  private signer: OfflineSigner;
  private client: InstanceType<typeof Client>;
  private didClient: Api<unknown>;
  private nodeClient: Api<unknown>;
  private saoClient: Api<unknown>;

  constructor(config: ChainApiClientConfig) {
    const api = config.apiURL || process.env.COSMOS_API_URL || "http://localhost:1317";
    const rpc = config.rpcURL || process.env.COSMOS_RPC_URL || "http://localhost:26657";
    const addressPrefix = config.prefix || "cosmos";

    console.log("cosmos did store: ");
    console.log("api url: ", api);
    console.log("rpc url: ", rpc);
    console.log("prefix: ", addressPrefix);

    this.client = new Client(
      {
        apiURL: api,
        rpcURL: rpc,
        prefix: addressPrefix,
      },
      config.signer
    );

    this.signer = config.signer;
    this.didClient = DidTypes.queryClient({ addr: api });
    this.nodeClient = NodeTypes.queryClient({ addr: api });
    this.saoClient = SaoTypes.queryClient({ addr: api });
  }

  // common
  /**
   * Get the transaction by hash.
   *
   * @param transactionHash the hash string of the transaction.
   * @returns the transaction deatails.
   */
  async GetTx(transactionHash: string): Promise<any> {
    return this.client.CosmosTxV1Beta1.query.serviceGetTx(transactionHash);
  }

  /**
   * Decode order id from input data string.
   *
   * @param data encoded data string.
   * @returns the decoded order id.
   */
  async DecodeOrderId(data: string): Promise<any> {
    const decoded = u8a.fromString(data.toLowerCase(), "base16");
    return SaoTxTypes.MsgStoreResponse.decode(TxMsgData.decode(decoded).msgResponses[0].value);
  }

  /**
   * Decode sid document from input data string.
   *
   * @param data encoded data string.
   * @returns the decoded sid document.
   */
  async DecodeSidDocument(data: string): Promise<any> {
    const decoded = u8a.fromString(data.toLowerCase(), "base16");
    return DidTxTypes.MsgUpdateSidDocumentResponse.decode(TxMsgData.decode(decoded).msgResponses[0].value);
  }

  /**
   * Get the lastes block height.
   *
   * @param N/a.
   * @returns the lastes block height.
   */
  async GetLatestBlockHeight(): Promise<number> {
    const res = await this.saoClient.queryLatesthight();
    return Number(res.data.latest_block_height);
  }

  /**
   * Get the lastes block time.
   *
   * @param N/a.
   * @returns the lastes block time.
   */
  async GetLatestBlockTime(): Promise<string> {
    const res = await this.saoClient.queryLatesthight();
    return res.data.latest_block_time;
  }

  /**
   * Get the SAO storage node libp2p peer information.
   *
   * @param address address of the SAO storage node.
   * @returns the SAO storage node libp2p peer information.
   */
  async GetNodePeerInfo(address: string): Promise<string> {
    const res = await this.nodeClient.queryNode(address);
    return res.data.node.peer;
  }

  // account
  /**
   * Create a new Account Auth for the DID.
   *
   * @param did DID string.
   * @param accountAuth Account Auth to create.
   * @returns the transaction result.
   */
  async AddAccountAuth(did: string, accountAuth: AccountAuth): Promise<any> {
    const account = await this.signer.getAccounts();

    const accountDid = accountAuth.accountDid;
    const accountEncryptedSeed = stringify(accountAuth.accountEncryptedSeed);
    const sidEncryptedAccount = stringify(accountAuth.sidEncryptedAccount);

    const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgAddAccountAuth({
      value: {
        creator: account[0].address,
        did: did,
        accountAuth: {
          accountDid,
          accountEncryptedSeed,
          sidEncryptedAccount,
        },
      },
    });
    return txResult;
  }

  /**
   * Get the Account Auth by accountDid.
   *
   * @param accountAuth accountAuth string.
   * @returns the Account Auth.
   */
  async GetAccountAuth(accountDid: string): Promise<any> {
    return this.didClient.queryAccountAuth(accountDid + ":");
  }

  /**
   * Bind an Account proof to the Account Auth.
   *
   * @param rootDocId root document id.
   * @param keys keys records.
   * @param proof account proof.
   * @param accountAuth accountAuth string.
   * @returns the transaction result.
   */
  async Binding(
    rootDocId: string,
    keys: Record<string, string>,
    proof: DidTxTypes.BindingProof,
    accountAuth: AccountAuth
  ): Promise<any> {
    const account = await this.signer.getAccounts();
    const pubkeys = [];
    Object.keys(keys).forEach((k) => {
      pubkeys.push({
        name: k,
        value: keys[k],
      });
    });

    const accountDid = accountAuth.accountDid;
    const accountEncryptedSeed = stringify(accountAuth.accountEncryptedSeed);
    const sidEncryptedAccount = stringify(accountAuth.sidEncryptedAccount);

    const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgBinding({
      value: {
        creator: account[0].address,
        accountId: proof.accountId,
        rootDocId: rootDocId,
        keys: pubkeys,
        accountAuth: {
          accountDid,
          accountEncryptedSeed,
          sidEncryptedAccount,
        },
        proof: {
          message: proof.message,
          signature: proof.signature,
          account: proof.accountId,
          did: proof.did,
          timestamp: proof.timestamp,
          // TODO:
          version: BindingProofV1,
        },
      },
    });

    return txResult;
  }

  /**
   * Bind another Account proof to the Account Auth.
   *
   * @param proof account proof.
   * @returns the transaction result.
   */
  async AddBinding(proof: DidTxTypes.BindingProof): Promise<any> {
    const account = await this.signer.getAccounts();
    const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgAddBinding({
      value: {
        creator: account[0].address,
        accountId: proof.accountId,
        proof: {
          message: proof.message,
          signature: proof.signature,
          account: proof.accountId,
          did: proof.did,
          timestamp: proof.timestamp,
          // TODO:
          version: BindingProofV1,
        },
      },
    });

    return txResult;
  }

  /**
   * Get binded account proof of the Account Auth.
   *
   * @param accountId account id string.
   * @returns the binded account proof.
   */
  async GetBinding(accountId: string): Promise<any> {
    return this.didClient.queryDidBindingProof(accountId + ":");
  }

  /**
   * Remove the binded account proof from the Account Auth.
   *
   * @param accountId account id string.
   * @returns the transaction result.
   */
  async RemoveBinding(accountId: string): Promise<any> {
    const account = await this.signer.getAccounts();
    const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUnbinding({
      value: {
        creator: account[0].address,
        accountId,
      },
    });
    return txResult;
  }

  /**
   * Update the Account Auth.
   *
   * @param did DID string.
   * @param updates Account Auths to update.
   * @param removes Account Auths to remove.
   * @returns the transaction result.
   */
  async UpdateAccountAuths(did: string, updates: AccountAuth[], removes: string[]): Promise<any> {
    const account = await this.signer.getAccounts();
    const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUpdateAccountAuths({
      value: {
        creator: account[0].address,
        did: did,
        update: updates,
        removes,
      },
    });
    return txResult;
  }

  /**
   * Get all the Account Auth of the account.
   *
   * @param did DID string.
   * @returns the Account Auth list of the account.
   */
  async GetAllAccountAuth(did: string): Promise<any> {
    return await this.didClient.queryGetAllAccountAuths(did + ":");
  }

  /**
   * Update SID document.
   *
   * @param keys keys records.
   * @param rootDocId root documnet id, optinal.
   * @returns the transaction result.
   */
  async UpdateSidDocument(keys: Record<string, string>, rootDocId?: string): Promise<any> {
    const account = await this.signer.getAccounts();
    const pubkeys = [];
    Object.keys(keys).forEach((k) => {
      pubkeys.push({
        name: k,
        value: keys[k],
      });
    });
    const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUpdateSidDocument({
      value: {
        creator: account[0].address,
        keys: pubkeys,
        rootDocId: rootDocId,
      },
    });
    return txResult;
  }

  /**
   * List the SID document versions.
   *
   * @param rootDocId root documnet id.
   * @returns the SID document versions list.
   */
  async ListSidDocumentVersions(rootDocId: string): Promise<any> {
    return this.didClient.querySidDocumentVersion(rootDocId);
  }

  /**
   * Get the past seeds.
   *
   * @param did DID string.
   * @returns the past seeds.
   */
  async getPastSeeds(did: string): Promise<any> {
    return this.didClient.queryPastSeeds(did);
  }

  /**
   * Add a past seeds.
   *
   * @param did DID string.
   * @param seed JWE seed.
   * @returns the transaction result.
   */
  async addPastSeed(did: string, seed: JWE): Promise<any> {
    const accounts = await this.signer.getAccounts();
    const txResult = this.client.SaonetworkSaoDid.tx.sendMsgAddPastSeed({
      value: {
        creator: accounts[0].address,
        did,
        pastSeed: stringify(seed),
      },
    });
    return txResult;
  }

  /**
   * Update the payment address.
   *
   * @param accountId account id.
   * @param did DID string.
   * @returns the transaction result.
   */
  async updatePaymentAddress(accountId: string, did: string): Promise<any> {
    const accounts = await this.signer.getAccounts();
    const txResult = this.client.SaonetworkSaoDid.tx.sendMsgUpdatePaymentAddress({
      value: {
        creator: accounts[0].address,
        accountId: accountId,
        did: did,
      },
    });
    return txResult;
  }

  // sao
  /**
   * Update the data model permissions.
   *
   * @param request requst to update the data model permissions.
   * @returns the transaction result.
   */
  async UpdatePermission(request: UpdatePermissionProposal): Promise<any> {
    const account = await this.signer.getAccounts();
    const txResult = await this.client.SaonetworkSaoSao.tx.sendMsgUpdataPermission({
      value: {
        creator: account[0].address,
        proposal: request.Proposal,
        jwsSignature: request.JwsSignature,
      },
    });
    return txResult;
  }

  /**
   * Store the data model.
   *
   * @param request requst to store the data model.
   * @returns the transaction result.
   */
  async Store(request: ClientOrderProposal): Promise<any> {
    const account = await this.signer.getAccounts();
    const txResult = await this.client.SaonetworkSaoSao.tx.sendMsgStore({
      value: {
        creator: account[0].address,
        proposal: request.Proposal,
        jwsSignature: request.JwsSignature,
      },
    });
    return txResult;
  }

  /**
   * renew the data models.
   *
   * @param request requst to renew the data models.
   * @returns the transaction result.
   */
  async Renew(request: OrderRenewProposal): Promise<any> {
    const account = await this.signer.getAccounts();
    const txResult = await this.client.SaonetworkSaoSao.tx.sendMsgRenew({
      value: {
        creator: account[0].address,
        proposal: request.Proposal,
        jwsSignature: request.JwsSignature,
      },
    });
    return txResult;
  }

  /**
   * terminate the data model order.
   *
   * @param request requst to terminate the data model order.
   * @returns the transaction result.
   */
  async Terminate(request: OrderTerminateProposal): Promise<any> {
    const account = await this.signer.getAccounts();
    const txResult = await this.client.SaonetworkSaoSao.tx.sendMsgTerminate({
      value: {
        creator: account[0].address,
        proposal: request.Proposal,
        jwsSignature: request.JwsSignature,
      },
    });
    return txResult;
  }
}
