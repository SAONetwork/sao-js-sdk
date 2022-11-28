import './App.css';
import { useEffect, useState } from "react";
import { SidManager, SaoKeplrAccountProvider, CosmosDidStore } from "@js-sao-did/sid";
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { fromHex } from "@cosmjs/encoding";

declare global {
  interface Window extends KeplrWindow {}
}

// place shell afraid apart solve kidney notice mean match april clown system
var manager: SidManager;
var oldAddress: string;
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
  const updateDid = async (e:any) => {
    setDid(e.target.value);
  };
  const bind = async () => {
    const accountProvider = await SaoKeplrAccountProvider.new(window.keplr!);
    console.log(did);
    if (did === "") {
      await manager.setAccountProvider(accountProvider);
    } else {
      await manager.setAccountProvider(accountProvider, did);
    }
    const provider = await manager.getSidProvider();
    addLog(`${(await accountProvider.accountId()).toString()} is binded to ${provider?.sid}`);
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
    const provider = await manager.getSidProvider();
    const jws = await provider?.createJWS({ payload: 'anything', });
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
    const didStoreSigner = await DirectSecp256k1Wallet.fromKey(fromHex("ff85664a02b2082b516a2e1d7c993bbf63a9c47582068725ac9eecb0e4646ed1"), "cosmos");

    // const signer = window.keplr!.getOfflineSignerOnlyAmino("sao")
    // const accounts = await signer.getAccounts();
    // console.log(accounts[0].address);

    oldAddress = (await window.keplr!.getKey('sao')).bech32Address;
    const didStore = new CosmosDidStore(didStoreSigner);
    const accountProvider = await SaoKeplrAccountProvider.new(window.keplr!);
    const accountId = await accountProvider.accountId();
    manager = await SidManager.createManager(accountProvider, didStore);
    const provider = await manager.getSidProvider();
    addLog(`account ${accountId.toString()} is binded to did ${provider?.sid}`);
  };

  const registerSao = async () => {
    const { keplr } = window
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
  return (
    <div className="App">
      <h1> Sao Network Did</h1>
      <button onClick={registerSao}>register sao network</button><br/>
      <button onClick={connectSid}>Connect Sao Did</button><br/>
      <button onClick={sign}>sign 'anything'</button><br/>
      <button onClick={bind}>Bind</button><input onChange={updateDid} value={did}/><br/>
      <button onClick={listDids}>List DIDs</button><br/>
        {log.map(l => 
          (<p key={new Date().toString()}>{l}</p>)
        )}
    </div>
  );
}