import "./App.css";
import { useState } from "react";
import { BindingParam, CosmosDidStore, SaoKeplrAccountProvider, SidManager } from "@saonetwork/sid";
import { ModelManager } from "@saonetwork/model";
// import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { EthSignType, Window as KeplrWindow } from "@keplr-wallet/types";
import { chainSwitch, NewEthSidManager } from "@saonetwork/toolkits";
import { createSecp256k1PeerId } from "@libp2p/peer-id-factory";
// import { fromHex } from "@cosmjs/encoding";
// import { GetNodeApiClient } from "@sao-js-sdk/api-client";

const defaultModelConfig = {
  duration: 365,
  replica: 1,
  timeout: 60 * 60 * 24,
  operation: 1,
};

// place shell afraid apart solve kidney notice mean match april clown system
let manager: SidManager;
let oldAddress: string;
let bindingParam: BindingParam;
export default function App() {
  // useEffect(() => {
  //   window.addEventListener("keplr_keystorechange", async () => {
  //     const k = await window.keplr!.getKey('sao');
  //     if (oldAddress !== k.bech32Address) {
  //       addLog(`address is changed to ${k.bech32Address}`);
  //       oldAddress = k.bech32Address;
  //     }
  //   })
  // }, []);
  const [log, setLog] = useState(new Array<string>());
  const [did, setDid] = useState("");
  const [chainName, setChainName] = useState("dev");
  const [unbindAccountId, setUnbindAccountId] = useState("");
  const updateDid = async (e: any) => {
    setDid(e.target.value);
  };
  const updateChainName = async (e: any) => {
    setChainName(e.target.value);
  };
  const updateUnbindAccount = async (e: any) => {
    setUnbindAccountId(e.target.value);
  };
  const generateBindingParam = async () => {
    const accountProvider = await SaoKeplrAccountProvider.new(window.keplr!, "sao");
    if (did === "") {
      const tmp = await manager.setAccountProvider(accountProvider);
      if (tmp) {
        bindingParam = tmp;
      }
    } else {
      const tmp = await manager.setAccountProvider(accountProvider, false, did);
      if (tmp) {
        bindingParam = tmp;
      }
    }
    const provider = await manager.GetProvider(did);
    addLog(`generated parameter for ${(await accountProvider.accountId()).toString()} binding to ${provider?.sid}`);
  };
  const unbind = async () => {
    const accountProvider = await SaoKeplrAccountProvider.new(window.keplr!, "sao");
    const provider = await manager.GetProvider();
    if (unbindAccountId === "") {
      await manager.unbind();
      addLog(`${(await accountProvider.accountId()).toString()} is unbound from ${provider?.sid}`);
    } else {
      await manager.unbind(unbindAccountId);
      addLog(`${unbindAccountId} is unbound from ${provider?.sid}`);
    }
  };
  const sendBindingTx = async () => {
    await manager.bind(bindingParam);

    addLog(`${bindingParam.proof.accountId} is binded to ${bindingParam.proof.did}`);
  };
  const addLog = (newlog: string) => {
    console.log(newlog);
    // setLog(prev => {
    //   var l = new Array<string>()
    //   l = l.concat(prev);
    //   l.push(newlog);
    //   return l;
    // });
  };
  const sign = async () => {
    const provider = await manager.GetProvider();
    const jws = await provider?.createJWS({ payload: "anything" });
    addLog(`sign "anything" signature: ${jws?.signatures[0].signature}`);
  };
  const listDids = async () => {
    console.log(manager);
    const dids = await manager.listDids();
    addLog(dids.toString());
  };
  const connectSid = async () => {
    window.keplr!.enable("sao");

    // const mnemonic = "surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put";
    // const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    // const didStoreSigner = await DirectSecp256k1Wallet.fromKey(fromHex("ff85664a02b2082b516a2e1d7c993bbf63a9c47582068725ac9eecb0e4646ed1"), "cosmos");

    const signer = window.keplr!.getOfflineSigner("sao");
    // const accounts = await signer.getAccounts();
    // console.log(accounts[0].address);
    console.log("account: ", (await signer.getAccounts())[0]);

    const didStore = new CosmosDidStore(signer);
    oldAddress = (await window.keplr!.getKey("sao")).bech32Address;
    const accountProvider = await SaoKeplrAccountProvider.new(window.keplr!, "sao");
    const accountId = await accountProvider.accountId();
    manager = await SidManager.createManager(accountProvider, didStore);
    const provider = await manager.GetProvider();
    addLog(`account ${accountId.toString()} is binded to did ${provider?.sid}`);
  };

  const registerSao = async () => {
    const { keplr } = window;
    if (!keplr) {
      alert("you need to install keplr");
      return;
    }

    console.log(window.keplr);
    await window.keplr!.disable("sao");
    await window.keplr!.experimentalSuggestChain({
      chainId: "sao",
      chainName: "dev",
      rpc: "http://127.0.0.1:26657",
      rest: "http://127.0.0.1:1317",
      bip44: {
        coinType: 666666,
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

  const testNodeApi1 = async () => {
    const sp = await manager.GetProvider();
    if (sp === null) {
      alert("you need to connect sao did");
      return;
    }

    const signer = await window.keplr!.getOfflineSignerOnlyAmino("sao");

    const modelManager = new ModelManager(
      {
        ownerDid: sp.sid,
        chainApiUrl: "http://127.0.0.1:1317",
        chainApiToken: "",
        chainRpcUrl: "http://127.0.0.1:26657",
        chainPrefix: "cosmos",
        signer: signer,
        nodeApiUrl: "http://127.0.0.1:5151/rpc/v0",
        nodeApiToken: "TOKEN",
        platformId: "30293f0f-3e0f-4b3c-aff1-890a2fdf063b",
      },
      manager
    );
    await modelManager.init();

    await modelManager.createModel({
      alias: "test_model",
      data: { abd: 111 },
    });
  };

  const testNodeApi2 = async (def?: any) => {
    const chainApi = def?.chainApi ?? "http://127.0.0.1:1317";
    const chainRpc = def?.chainRpc ?? "http://127.0.0.1:26657";
    const nodeApi = def?.nodeApi ?? "http://127.0.0.1:5151/rpc/v0";

    const commonModelProviderConfig = {
      chainApiUrl: chainApi,
      chainApiToken: def?.chainApiToken ?? "TOKEN",
      chainRpcUrl: chainRpc,
      chainPrefix: "sao",
      nodeApiUrl: nodeApi,
      nodeApiToken:
        def?.nodeApiToken ??
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJub25lIiwicmVhZCIsIndyaXRlIl19.DsqD0zm0KrOyotrikEksbLXYsUdKXnTA4m7y6Ha0d7M",
      platformId: def?.platformId ?? "DEFAULT_PLATFORM_ID",
      paymentApiUrl: "http://127.0.0.1:5161/rpc/v0",
      paymentToken: def?.nodeApiToken ?? "TOKEN",
    };
    const defaultModelConfig = {
      duration: def?.duration ?? 60 * 15,
      replica: def?.replica ?? 1,
      timeout: def?.timeout ?? 60,
      operation: def?.operation ?? 1,
      isPublish: def?.isPublish ?? false,
    };
    if (window.ethereum) {
      const { sidManager, modelManager } = await NewEthSidManager(
        commonModelProviderConfig,
        defaultModelConfig,
        chainApi,
        chainRpc
      );
      // return {chainId: cfg.chainId, sidManager, modelManager}
      console.log(sidManager);
      console.log(modelManager);

      const peerId = await createSecp256k1PeerId();
      const enc = new TextEncoder();
      const content = enc.encode('{"a":"this is text"}');
      const provider_address = "/ip4/127.0.0.1/udp/5154/quic/webtransport/certhash/uEiCyg_iMiQDNKxqDJ_9DjOvv83Ek_e3913fXDJ6pLSVv5Q/certhash/uEiDab5eQRIYcbQxogT3M3pc7PvpQJ6GwsORcVxY1IlZ2ew/p2p/12D3KooWB5mLfSF5SV19dRiBLNp559LgkgYpNX34Z1dN2aavvLxY";
      const uploadRes = await modelManager.uploadFileChunk(content, peerId, provider_address);

      const def = {
        filename: "testFile1",
        cid: uploadRes.cid.toString(),
        groupId: "my-group",
        size: uploadRes.contentLength,
        paymentDid: "did:key:zQ3shmPJi3s5ZtsMx7g46MksfL27Pf8ksbzcXeR6cx1YoREZe",
      };
      const res = await modelManager.storeProposal(def);
      console.log(res);
    } else {
      throw new Error("Eth wallet not found.");
    }
    // const signer = window.keplr!.getOfflineSigner("sao");
    // const sig = await window.keplr!.signEthereum(
    //   "sao",
    //   "sao1ew99cm28vrr029fxv07r6tgh6l75j2544rlp9w",
    //   "test",
    //   EthSignType.MESSAGE
    // );
    // console.log(sig);
  };

  return (
    <div className="App">
      <h1> Sao Network Did</h1>
      <button onClick={registerSao}>register sao network</button>
      <br />
      <button onClick={connectSid}>Connect Sao Did</button>
      <br />
      <button onClick={sign}>sign 'anything'</button>
      <br />
      <button onClick={generateBindingParam}>Bind</button>
      <input onChange={updateDid} value={did} />
      <br />
      <button onClick={sendBindingTx}>send binding tx</button>
      <br />
      <button onClick={unbind}>Unbind</button>
      <input onChange={updateUnbindAccount} value={unbindAccountId} />
      <br />
      <button onClick={listDids}>List DIDs</button>
      <br />
      {log.map((l) => (
        <p key={new Date().toString()}>{l}</p>
      ))}
      <button onClick={testNodeApi1}>Tesk Model Create</button>
      <br />
      <button onClick={testNodeApi2}>Test init</button>
      <input onChange={updateChainName} value={chainName} />
      <br />
    </div>
  );
}
