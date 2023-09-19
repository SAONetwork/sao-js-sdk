import {
  CosmosDidStore,
  SaoKeplrAccountProvider,
  SidManager,
} from "@saonetwork/sid";
import { ModelManager } from "@saonetwork/model";

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

export async function chainSwitch(chainName: string, def?: any) {
  const cfg = DefaultNetworkConfig[chainName]

  if (window.keplr) {
    const chainApi = def?.chainApi?? cfg.chainApi;
    const chainRpc = def?.chainRpc?? cfg.chainRpc;
    const nodeApi = def?.nodeApi?? cfg.nodeApi;

    await suggestSaoNetworkChain(cfg.chainId, chainName, chainApi, chainRpc);
    await window.keplr.enable(cfg.chainId);
    const offlineSigner = await window.getOfflineSigner(cfg.chainId);
    const didStore = new CosmosDidStore(offlineSigner, chainApi, chainRpc);
    const accountProvider = await SaoKeplrAccountProvider.new(
      window.keplr,
      cfg.chainId
    );
    const sidManager = await SidManager.createManager(accountProvider, didStore);
    const sp = await sidManager.getSidProvider()
    const modelManager = new ModelManager(
      {
        ownerDid: sp.sid,
        chainApiUrl: chainApi,
        chainApiToken: def?.chainApiToken?? "TOKEN",
        chainRpcUrl: chainRpc,
        chainPrefix: "sao",
        signer: offlineSigner,
        nodeApiUrl: nodeApi,
        nodeApiToken: def?.nodeApiToken?? "TOKEN",
        platformId: def?.platformId?? "DEFAULT_PLATFORM_ID",
      },
      sidManager,
      {
        duration: def?.duration?? 365 * 60 * 60 * 24,
        replica: def?.replica?? 1,
        timeout: def?.timeout?? 60,
        operation: def?.operation?? 1,
        isPublish: def?.isPublish?? false,
      }
    );
    await modelManager.init();
    return {chainId: cfg.chainId, sidManager, modelManager}
  } else {
    throw new Error("Keplr wallet not found.");
  }

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
