import { AccountAuth, BindingProof, BindingProofV1, ChainApiClientConfig } from './types';
import { OfflineSigner } from "@cosmjs/proto-signing";
import { Api } from "SaoNetwork-sao-client-ts/dist/saonetwork.sao.did/rest";
import { Client } from "SaoNetwork-sao-client-ts";
import { queryClient as didQueryClient } from "SaoNetwork-sao-client-ts/dist/saonetwork.sao.did";
import { queryClient as modelQueryClient } from "SaoNetwork-sao-client-ts/dist/saonetwork.sao.model";
import * as u8a from 'uint8arrays';
import stringify from 'fast-json-stable-stringify';
import { MsgUpdateSidDocumentResponse } from "SaoNetwork-sao-client-ts/dist/saonetwork.sao.did/types/sao/did/tx";
import { TxMsgData } from "SaoNetwork-sao-client-ts/dist/cosmos.tx.v1beta1/types/cosmos/base/abci/v1beta1/abci";

export class ChainApiClient {
  private signer: OfflineSigner
  private client: InstanceType<typeof Client>
  private didClient: Api<unknown>
  private modelClient: Api<unknown>

  constructor(config: ChainApiClientConfig) {
    const api = config.apiURL || process.env.COSMOS_API_URL || 'http://localhost:1317';
    const rpc = config.rpcURL || process.env.COSMOS_RPC_URL || 'http://localhost:26657';
    const addressPrefix = config.prefix || "cosmos";

    console.log("cosmos did store: ");
    console.log("api url: ", api);
    console.log("rpc url: ", rpc);
    console.log("prefix: ", addressPrefix);

    this.client = new Client({
      apiURL: api,
      rpcURL: rpc,
      prefix: addressPrefix
    }, config.signer);

    this.signer = config.signer;
    this.didClient = didQueryClient({ addr: api });
    this.modelClient = modelQueryClient({ addr: api });
  }

  async GetTx(transactionHash: string): Promise<any> {
    return this.client.CosmosTxV1Beta1.query.serviceGetTx(transactionHash)
  }

  async Decode(data: string): Promise<any> {
    const decoded = u8a.fromString(data.toLowerCase(), 'base16');
    return MsgUpdateSidDocumentResponse.decode(TxMsgData.decode(decoded).msgResponses[0].value);
  }

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
      }
    });
    return txResult;
  }

  async GetAccountAuth(accountDid: string): Promise<any> {
    return this.didClient.queryAccountAuth(accountDid + ':');
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
        }
      },
    });

    return txResult;
  }

  async GetBinding(accountId: string): Promise<any> {
    return this.didClient.queryDidBindingProofs(accountId + ':');
  }

  async RemoveBinding(accountId: string): Promise<any> {
    const account = await this.signer.getAccounts();
    const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUnbinding({
      value: {
        creator: account[0].address,
        accountId
      }
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
        removes
      }
    });
    return txResult
  }

  async GetAllAccountAuth(did: string): Promise<any> {
      return await this.didClient.queryGetAllAccountAuths(did + ":");
  }

  async UpdateSidDocument(keys: Record<string, string>, rootDocId?: string): Promise<any> {
    const account = await this.signer.getAccounts();
    var pubkeys = [];
    Object.keys(keys).forEach(k => {
      pubkeys.push({
        name: k,
        value: keys[k]
      });
    });
    const txResult = await this.client.SaonetworkSaoDid.tx.sendMsgUpdateSidDocument({
      value: {
        creator: account[0].address,
        keys: pubkeys,
        rootDocId: rootDocId
      }
    });
    return txResult;
  }

  async ListSidDocumentVersions(rootDocId: string): Promise<any> {
    return this.didClient.querySidDocumentVersion(rootDocId);
  }
}