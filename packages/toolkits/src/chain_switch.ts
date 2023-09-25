import {
  CosmosDidStore,
  SaoKeplrAccountProvider,
  SidManager,
} from "@saonetwork/sid";
import {ModelConfig, ModelManager} from "@saonetwork/model";
import fs from "fs";
import {jwtDecrypt} from "jose";
import * as u8a from "uint8arrays";
import {DirectSecp256k1Wallet} from "@cosmjs/proto-signing";
import {Record as R} from "../src/record";
import {accountPrivateKeyToKid, KidManager} from "@saonetwork/kid"

export const DefaultNetworkConfig = {
  "beta": {
    chainId: "sao-20230629",
    chainApi: "https://api-beta.sao.network",
    chainRpc: "https://rpc-beta.sao.network",
    nodeApi: "https://gateway-beta.sao.network/rpc/v0"
  },
  "testnet1": {
    chainId: "sao-testnet1",
    chainApi: "https://api-testnet-node0.sao.network",
    chainRpc: "https://rpc-testnet-node0.sao.network",
    nodeApi: "https://gateway-testnet-node0.sao.network/rpc/v0"
  }
}

declare const window: any;

export async function chainSwitch(chainName: string, useKid: boolean = false,  def?: any) {
  const cfg = DefaultNetworkConfig[chainName]

  const chainApi = def?.chainApi?? cfg.chainApi;
  const chainRpc = def?.chainRpc?? cfg.chainRpc;
  const nodeApi = def?.nodeApi?? cfg.nodeApi;

  const commonModelProviderConfig = {
    chainApiUrl: chainApi,
    chainApiToken: def?.chainApiToken?? "TOKEN",
    chainRpcUrl: chainRpc,
    chainPrefix: "sao",
    nodeApiUrl: nodeApi,
    nodeApiToken: def?.nodeApiToken?? "TOKEN",
    platformId: def?.platformId?? "DEFAULT_PLATFORM_ID",
  }
  const defaultModelConfig = {
    duration: def?.duration?? 365 * 60 * 60 * 24,
    replica: def?.replica?? 1,
    timeout: def?.timeout?? 60,
    operation: def?.operation?? 1,
    isPublish: def?.isPublish?? false,
  }

  if (useKid) {
    const priv = def?.accountPrivateKey?? await readPrivateKeyFromFile(def?.keyName?? "client", def?.KeyringHome?? "/home/root/.sao/keyring-test")
    const {kidManager,modelManager} = await NewKidManager(commonModelProviderConfig, priv ,defaultModelConfig)
    return {chainId: cfg.chainId, kidManager, modelManager}
  } else if (window.keplr) {
    const {sidManager, modelManager} = await NewSidManager({chainId: cfg.chainId, chainName, chainApi, chainRpc, modelProviderConfig: commonModelProviderConfig, modelConfig: defaultModelConfig})
    return {chainId: cfg.chainId, sidManager, modelManager}
  } else {
    throw new Error("Keplr wallet not found.");
  }

}

export async function NewSidManager(params: any){
  await suggestSaoNetworkChain(params.chainId, params.chainName, params.chainApi, params.chainRpc);
  await window.keplr.enable(params.chainId);
  const offlineSigner = await window.getOfflineSigner(params.chainId);
  const didStore = new CosmosDidStore(offlineSigner, params.chainApi, params.chainRpc);
  const accountProvider = await SaoKeplrAccountProvider.new(
    window.keplr,
    params.chainId
  );
  const sidManager = await SidManager.createManager(accountProvider, didStore);
  const sp = await sidManager.GetProvider()
  const modelPorviderConfig = params.modelProviderConfig
  modelPorviderConfig.ownerDid = sp.sid
  modelPorviderConfig.signer = offlineSigner
  const modelManager = new ModelManager(
    params.modelProviderConfig,
    sidManager,
    params.modelConfig
  );
  await modelManager.init();
  return {sidManager, modelManager}
}

const suggestSaoNetworkChain = async (chainId: string, chainName: string, api: string, rpc: string ) => {
  await window.keplr.experimentalSuggestChain({
    chainId: chainId,
    chainName: chainName,
    rpc: rpc,
    rest: api,
    bip44: {
      coinType: 118
    },
    bech32Config: {
      bech32PrefixAccAddr: "sao",
      bech32PrefixAccPub: "saopub",
      bech32PrefixValAddr: "saovaloper",
      bech32PrefixValPub: "saovaloperpub",
      bech32PrefixConsAddr: "saovalcons",
      bech32PrefixConsPub: "saovalconspub"
    },
    currencies: [
      {
        coinDenom: "CREDIT",
        coinMinimalDenom: "usct",
        coinDecimals: 6,
        coinGeckoId: "usct"
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "CREDIT",
        coinMinimalDenom: "usct",
        coinDecimals: 6,
        coinGeckoId: "usct",
        gasPriceStep: {
          low: 0.01,
          average: 0.025,
          high: 0.03
        }
      }
    ],
    stakeCurrency: {
      coinDenom: "CREDIT",
      coinMinimalDenom: "usct",
      coinDecimals: 6,
      coinGeckoId: "usct"
    },
    chainSymbolImageUrl: "https://explorer.sao.network/logos/saonetwork.png"
  });
};

async function ReadRecord(path: string): Promise<R> {
  const x = await fs.readFileSync(path);
  const text = await jwtDecrypt(x.toString(),u8a.fromString("test"));
  const recordByte = u8a.fromString(text.payload.Data.toString(), "base64");
  const r = R.decode(recordByte);
  console.log(r);
  return r;
}

async function readPrivateKeyFromFile(
  keyName: string,
  keyringHome: string
) {
  const r = await ReadRecord(keyringHome+ "/" + keyName + ".info")
  return r.local.privKey.value.slice(2)
}

export async function NewKidManager(
  modelProviderConfig: any,
  accPrivKey: Uint8Array,
  modelConfig: ModelConfig
): Promise<{ kidManager; modelManager }> {
  const {kid,priv} = await accountPrivateKeyToKid(accPrivKey);

  const kidManager = new KidManager(kid,priv)

  modelProviderConfig.ownerDid = kid
  modelProviderConfig.signer = await DirectSecp256k1Wallet.fromKey(priv,"sao")

  const modelManager = new ModelManager(
    modelProviderConfig,
    kidManager,
    modelConfig
  )
  await modelManager.init()
  return {kidManager,modelManager}
}

