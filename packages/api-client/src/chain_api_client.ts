import {
  AccountAuth,
  ChainApiClientConfig,
  ClientOrderProposal,
  OrderRenewProposal,
  OrderTerminateProposal,
  UpdatePermissionProposal,
} from "./chain_types";
import { BindingProof, BindingProofV1 } from "@sao-js-sdk/common";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { Api } from "sao-chain-client/dist/saonetwork.sao.did/rest";
import { Client } from "sao-chain-client";
import { queryClient as didQueryClient } from "sao-chain-client/dist/saonetwork.sao.did";
import { queryClient as nodeQueryClient } from "sao-chain-client/dist/saonetwork.sao.node";
import { queryClient as saoQueryClient } from "sao-chain-client/dist/saonetwork.sao.sao";
import * as u8a from "uint8arrays";
import stringify from "fast-json-stable-stringify";
import { MsgStoreResponse } from "sao-chain-client/dist/saonetwork.sao.sao/types/sao/sao/tx";
import { MsgUpdateSidDocumentResponse } from "sao-chain-client/dist/saonetwork.sao.did/types/sao/did/tx";
import { TxMsgData } from "sao-chain-client/dist/cosmos.tx.v1beta1/types/cosmos/base/abci/v1beta1/abci";
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
    this.didClient = didQueryClient({ addr: api });
    this.nodeClient = nodeQueryClient({ addr: api });
    this.saoClient = saoQueryClient({ addr: api });
  }

  // common
  async GetTx(transactionHash: string): Promise<any> {
    return this.client.CosmosTxV1Beta1.query.serviceGetTx(transactionHash);
  }

  async DecodeOrderId(data: string): Promise<any> {
    const decoded = u8a.fromString(data.toLowerCase(), "base16");
    return MsgStoreResponse.decode(TxMsgData.decode(decoded).msgResponses[0].value);
  }

  async DecodeSidDocument(data: string): Promise<any> {
    const decoded = u8a.fromString(data.toLowerCase(), "base16");
    return MsgUpdateSidDocumentResponse.decode(TxMsgData.decode(decoded).msgResponses[0].value);
  }

  async GetLatestBlockHeight(): Promise<number> {
    const res = this.saoClient.queryLatesthight();
    return Number(res.latest_block_height);
  }

  async GetLatestBlockTime(): Promise<string> {
    const res = this.saoClient.queryLatesthight();
    return res.latest_block_time;
  }

  async GetNodePeerInfo(address: string): Promise<string> {
    const res = await this.nodeClient.queryNode(address);
    return res.data.node.peer;
  }

  // account
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

  async GetAccountAuth(accountDid: string): Promise<any> {
    return this.didClient.queryAccountAuth(accountDid + ":");
  }

  async Binding(
    rootDocId: string,
    keys: Record<string, string>,
    proof: BindingProof,
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

  async AddBinding(proof: BindingProof): Promise<any> {
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

  async GetBinding(accountId: string): Promise<any> {
    return this.didClient.queryDidBindingProof(accountId + ":");
  }

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

  async GetAllAccountAuth(did: string): Promise<any> {
    return await this.didClient.queryGetAllAccountAuths(did + ":");
  }

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

  async ListSidDocumentVersions(rootDocId: string): Promise<any> {
    return this.didClient.querySidDocumentVersion(rootDocId);
  }

  async getPastSeeds(did: string): Promise<any> {
    return this.didClient.queryPastSeeds(did);
  }

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
