import './App.css';
import { useEffect, useState } from "react";
import { SidManager, SaoKeplrAccountProvider, CosmosDidStore, BindingParam } from "@sao-js-sdk/sid";
import { ModelManager } from "@sao-js-sdk/model";
// import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { Window as KeplrWindow } from '@keplr-wallet/types';
// import { fromHex } from "@cosmjs/encoding";
// import { GetNodeApiClient } from "@sao-js-sdk/api-client";

declare global {
  interface Window extends KeplrWindow {}
}

const defaultModelConfig = {
  duration: 365,
  replica: 1,
  timeout: 60 * 60 * 24,
  operation: 1,
}

// place shell afraid apart solve kidney notice mean match april clown system
var manager: SidManager;
var oldAddress: string;
var bindingParam: BindingParam;
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
  const [did, setDid] = useState('');
  const [unbindAccountId, setUnbindAccountId] = useState('');
  const updateDid = async (e: any) => {
    setDid(e.target.value);
  };
  const updateUnbindAccount = async (e: any) => {
    setUnbindAccountId(e.target.value);
  };
  const generateBindingParam = async () => {
    const accountProvider = await SaoKeplrAccountProvider.new(window.keplr!);
    if (did === "") {
      const tmp = await manager.setAccountProvider(accountProvider);
      if (tmp) {
        bindingParam = tmp;
      }
    } else {
      const tmp = await manager.setAccountProvider(accountProvider, did);
      if (tmp) {
        bindingParam = tmp;
      }
    }
    const provider = await manager.getSidProvider(did);
    addLog(`generated parameter for ${(await accountProvider.accountId()).toString()} binding to ${provider?.sid}`);
  };
  const unbind = async () => {
    const accountProvider = await SaoKeplrAccountProvider.new(window.keplr!);
    const provider = await manager.getSidProvider();
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
  }
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
    const provider = await manager.getSidProvider();
    const jws = await provider?.createJWS({payload: 'anything',});
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
    oldAddress = (await window.keplr!.getKey('sao')).bech32Address;
    const accountProvider = await SaoKeplrAccountProvider.new(window.keplr!);
    const accountId = await accountProvider.accountId();
    manager = await SidManager.createManager(accountProvider, didStore);
    const provider = await manager.getSidProvider();
    addLog(`account ${accountId.toString()} is binded to did ${provider?.sid}`);
  };

  const registerSao = async () => {
    const {keplr} = window
    if (!keplr) {
      alert("you need to install keplr");
      return;
    }

    console.log(window.keplr);
    await window.keplr!.experimentalSuggestChain({
      chainId: "sao",
      chainName: "Sao Network1",
      rpc: "http://127.0.0.1:26657",
      rest: "http://127.0.0.1:1317",
      bip44: {
        coinType: 666666,
      },
      bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmos" + "pub",
        bech32PrefixValAddr: "cosmos" + "valoper",
        bech32PrefixValPub: "cosmos" + "valoperpub",
        bech32PrefixConsAddr: "cosmos" + "valcons",
        bech32PrefixConsPub: "cosmos" + "valconspub",
      },
      currencies: [
        {
          coinDenom: "stake",
          coinMinimalDenom: "stake",
          coinDecimals: 1,
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "stake",
          coinMinimalDenom: "stake",
          coinDecimals: 1,
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
          },
        },
      ],
      stakeCurrency: {
        coinDenom: "stake",
        coinMinimalDenom: "stake",
        coinDecimals: 1,
      },
    });
  };

  const testNodeApi1 = async () => {
    const sp = await manager.getSidProvider()
    if (sp === null) {
      alert("you need to connect sao did");
      return;
    }

    const signer = await window.keplr!.getOfflineSignerOnlyAmino("sao")

    const modelManager = new ModelManager({
      ownerDid: sp.sid,
      chainApiUrl: "http://127.0.0.1:1317",
      chainApiToken: "",
      chainRpcUrl: "http://127.0.0.1:26657",
      chainPrefix: "cosmos",
      signer: signer,
      nodeApiUrl: "http://127.0.0.1:8888/rpc/v0",
      nodeApiToken: "TOKEN",
      platformId: "30293f0f-3e0f-4b3c-aff1-890a2fdf063b",
    }, manager);
    await modelManager.init()


    await modelManager.createModel({
      alias: "test_model",
      data: {abd: 111},
    })
  }

  const testNodeApi2 = () => {

  }

  return (
    <div className="App">
      <h1> Sao Network Did</h1>
      <button onClick={registerSao}>register sao network</button><br/>
      <button onClick={connectSid}>Connect Sao Did</button><br/>
      <button onClick={sign}>sign 'anything'</button><br/>
      <button onClick={generateBindingParam}>Bind</button><input onChange={updateDid} value={did}/><br/>
      <button onClick={sendBindingTx}>send binding tx</button><br/>
      <button onClick={unbind}>Unbind</button><input onChange={updateUnbindAccount} value={unbindAccountId}/><br/>
      <button onClick={listDids}>List DIDs</button><br/>
      {log.map(l =>
        (<p key={new Date().toString()}>{l}</p>)
      )}
      <button onClick={testNodeApi1}>Tesk Model Create</button><br/>
      <button onClick={testNodeApi2}>Tesk Node Load</button><br/>
    </div>
  );
}
