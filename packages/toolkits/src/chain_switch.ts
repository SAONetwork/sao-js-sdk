import { CosmosDidStore, SaoKeplrAccountProvider, SidManager, EthAccountProvider } from "@saonetwork/sid";
import { ModelConfig, ModelManager } from "@saonetwork/model";
import { GetNodeApiClient } from "@saonetwork/api-client";

export const DefaultNetworkConfig = {
  beta: {
    chainId: "sao-20230629",
    chainApi: "https://api-beta.sao.network",
    chainRpc: "https://rpc-beta.sao.network",
    nodeApi: "https://gateway-beta.sao.network/rpc/v0",
  },
  testnet1: {
    chainId: "sao-testnet1",
    chainApi: "https://api-testnet-node0.sao.network",
    chainRpc: "https://rpc-testnet-node0.sao.network",
    nodeApi: "https://gateway-testnet-node0.sao.network/rpc/v0",
  },
};

export async function chainSwitch(chainName: string, useEth = false, def?: any) {
  const cfg = DefaultNetworkConfig[chainName];

  const chainApi = def?.chainApi ?? cfg.chainApi;
  const chainRpc = def?.chainRpc ?? cfg.chainRpc;
  const nodeApi = def?.nodeApi ?? cfg.nodeApi;

  const commonModelProviderConfig = {
    chainApiUrl: chainApi,
    chainApiToken: def?.chainApiToken ?? "TOKEN",
    chainRpcUrl: chainRpc,
    chainPrefix: "sao",
    nodeApiUrl: nodeApi,
    nodeApiToken: def?.nodeApiToken ?? "TOKEN",
    platformId: def?.platformId ?? "DEFAULT_PLATFORM_ID",
    paymentApiUrl: def?.paymentApiUrl,
    paymentApiToken: def?.paymentApiToken,
  };
  const defaultModelConfig = {
    duration: def?.duration ?? 365 * 60 * 60 * 24,
    replica: def?.replica ?? 1,
    timeout: def?.timeout ?? 60,
    operation: def?.operation ?? 1,
    isPublish: def?.isPublish ?? false,
  };

  if (useEth && window.ethereum) {
    const { sidManager, modelManager } = await NewEthSidManager(
      commonModelProviderConfig,
      defaultModelConfig,
      chainApi,
      chainRpc
    );
    return { chainId: cfg.chainId, sidManager, modelManager };
  } else if (window.keplr) {
    const { sidManager, modelManager } = await NewSidManager({
      chainId: cfg.chainId,
      chainName,
      chainApi,
      chainRpc,
      modelProviderConfig: commonModelProviderConfig,
      modelConfig: defaultModelConfig,
    });
    return { chainId: cfg.chainId, sidManager, modelManager };
  } else {
    throw new Error("Keplr wallet not found.");
  }
}

export async function NewSidManager(params: any) {
  await suggestSaoNetworkChain(params.chainId, params.chainName, params.chainApi, params.chainRpc);
  await window.keplr.enable(params.chainId);
  const offlineSigner = window.keplr.getOfflineSigner(params.chainId);
  const didStore = new CosmosDidStore(offlineSigner, params.chainApi, params.chainRpc);
  const accountProvider = await SaoKeplrAccountProvider.new(window.keplr, params.chainId);
  const sidManager = await SidManager.createManager(accountProvider, didStore);
  const sp = await sidManager.GetProvider();
  const modelPorviderConfig = params.modelProviderConfig;
  modelPorviderConfig.ownerDid = sp.sid;
  modelPorviderConfig.signer = offlineSigner;
  const modelManager = new ModelManager(params.modelProviderConfig, sidManager, params.modelConfig);
  await modelManager.init();
  return { sidManager, modelManager };
}

const suggestSaoNetworkChain = async (chainId: string, chainName: string, api: string, rpc: string) => {
  await window.keplr.experimentalSuggestChain({
    chainId: chainId,
    chainName: chainName,
    rpc: rpc,
    rest: api,
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "sao",
      bech32PrefixAccPub: "saopub",
      bech32PrefixValAddr: "saovaloper",
      bech32PrefixValPub: "saovaloperpub",
      bech32PrefixConsAddr: "saovalcons",
      bech32PrefixConsPub: "saovalconspub",
    },
    currencies: [
      {
        coinDenom: "CREDIT",
        coinMinimalDenom: "usct",
        coinDecimals: 6,
        coinGeckoId: "usct",
      },
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
          high: 0.03,
        },
      },
    ],
    stakeCurrency: {
      coinDenom: "CREDIT",
      coinMinimalDenom: "usct",
      coinDecimals: 6,
      coinGeckoId: "usct",
    },
    chainSymbolImageUrl: "https://explorer.sao.network/logos/saonetwork.png",
  });
};

export async function NewEthSidManager(
  modelProviderConfig: any,
  modelConfig: ModelConfig,
  chainApi: string,
  chainRpc: string
): Promise<{ sidManager: SidManager; modelManager: ModelManager }> {
  if (window.ethereum) {
    try {
      const accountProvider = await EthAccountProvider.new(window.ethereum!);

      const nodeApiClient = GetNodeApiClient({
        baseURL: modelProviderConfig.nodeApiUrl,
        headers: {
          Authorization: "Bearer " + modelProviderConfig.nodeApiToken,
        },
      });
      const didStore = new CosmosDidStore(undefined, chainApi, chainRpc, "sao", nodeApiClient);
      const sidManager = await SidManager.createManager(accountProvider, didStore);
      const sp = await sidManager.GetProvider();
      modelProviderConfig.ownerDid = sp.sid;
      const modelManager = new ModelManager(modelProviderConfig, sidManager, modelConfig);
      await modelManager.init();
      return { sidManager, modelManager };
    } catch (err) {
      throw new Error(`${err}`);
    }
  } else {
    throw new Error("ERROR: Metamask extension is not installed.");
  }
}
