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
import {
  Api,
  Client,
  SaoTxTypes,
  DidTxTypes,
  DidTypes,
  NodeTypes,
  SaoTypes,
  OrderTypes,
  TxMsgData,
} from "../../ts-client/dist/entry";
import * as u8a from "uint8arrays";
import stringify from "fast-json-stable-stringify";
import { JWE } from "another-did-jwt";

export class ChainApiClient {
  private signer: OfflineSigner;
  private client: InstanceType<typeof Client>;
  private didClient: Api<unknown>;
  private nodeClient: Api<unknown>;
  private orderClient: Api<unknown>;
  private saoClient: Api<unknown>;

  constructor(config: ChainApiClientConfig) {
    const api = config.apiURL || process.env.COSMOS_API_URL || "http://localhost:1317";
    const rpc = config.rpcURL || process.env.COSMOS_RPC_URL || "http://localhost:26657";
    const addressPrefix = config.prefix || "sao";

    console.log("cosmos did store: ");
    console.log("api url: ", api);
    console.log("rpc url: ", rpc);
    console.log("prefix: ", addressPrefix);

    if (config.signer != undefined) {
      this.client = new Client(
        {
          apiURL: api,
          rpcURL: rpc,
          prefix: addressPrefix,
        },
        config.signer
      );

      this.signer = config.signer;
    }

    this.didClient = DidTypes.queryClient({ addr: api });
    this.nodeClient = NodeTypes.queryClient({ addr: api });
    this.saoClient = SaoTypes.queryClient({ addr: api });
    this.orderClient = OrderTypes.queryClient({ addr: api });
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
   * Get the Account Auth by accountDid.
   *
   * @param accountAuth accountAuth string.
   * @returns the Account Auth.
   */
  async GetAccountAuth(accountDid: string): Promise<any> {
    return this.didClient.queryAccountAuth(accountDid + ":");
  }

  async GetOrders(did: string, status: Array<number>): Promise<any> {
    return this.orderClient.queryOrderAll({
      did: did,
      status: status,
    });
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
   * Get bound did by account id.
   *
   * @param accountId account id string.
   * @returns the bound did.
   */
  async GetDid(accountId: string): Promise<any> {
    return this.didClient.queryDid(accountId + ":");
  }

  /**
   * Unbind Account , Update Sid Document and other Account Auth.
   *
   * @param did DID string.
   * @param newDocId new sid document id.
   * @param keys new keys for new sid document.
   * @param timestamp timestamp when generate new keys.
   * @param updates Account Auths to update.
   * @param removes Account Dids to remove.
   * @param pastSeed previous sid document seed.
   * @returns the transaction result.
   */
  async Update(
    did: string,
    newDocId: string,
    keys: Record<string, string>,
    timestamp: number,
    updates: AccountAuth[],
    removes: string[],
    pastSeed: JWE
  ): Promise<any> {
    const account = await this.signer.getAccounts();
    const pubkeys = [];
    Object.keys(keys).forEach((k) => {
      pubkeys.push({
        name: k,
        value: keys[k],
      });
    });
    const updateAccountAuth = [];
    updates.forEach((accAuth) => {
      updateAccountAuth.push({
        accountDid: accAuth.accountDid,
        accountEncryptedSeed: stringify(accAuth.accountEncryptedSeed),
        sidEncryptedAccount: stringify(accAuth.sidEncryptedAccount),
      });
    });
    const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUpdate({
      value: {
        creator: account[0].address,
        did: did,
        newDocId: newDocId,
        keys: pubkeys,
        timestamp: timestamp,
        updateAccountAuth,
        removeAccountDid: removes,
        pastSeed: stringify(pastSeed),
      },
      // TODO: estimate gas
      fee: {
        amount: [],
        gas: "400000",
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
