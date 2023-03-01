import { MockAccountProvider } from "./mock_accountprovider";
import { SidManager } from "../src/manager";
import { MockDidStore } from "./mock_didstore";
import { CosmosDidStore } from "../src/did_store_cosmos";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SaoAccountProvider } from "../src/accountprovider_sao";

describe("manager", () => {
  it("2 sid providers", async () => {
    const mnemonic =
      "surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put";
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const didStore = new CosmosDidStore(wallet);
    const accountProvider = await SaoAccountProvider.newSaoAccountProvider(wallet);

    const manager = await SidManager.createManager(accountProvider, didStore);
    const dids = manager.listDids();
    expect(dids.length).toBe(1);

    const account = await accountProvider.accountId();
    const binding = await didStore.getDid(account.toString());
    expect(binding).toBe(dids[0]);
  }, 30000);
});
