import { NewSaoClientApi } from "../src";
import path from "path"
import * as fs from "fs";


describe("sdk", () => {
  // let didStore: DidStore;

  beforeAll(() => {
    // didStore = new MockDidStore();
  });

  it("create", async () => {
    const api = await NewSaoClientApi(
      "http://127.0.0.1:5151/rpc/v0",
      "http://127.0.0.1:26657",
      "cli",
      "/home/yuanjun/.sao/keyring-test/",
      "8728f0ec-faca-4f24-8864-8d3a53d32d44"
    )
    // const res = await api.createModel({data:'{"a":"b"}' })
    let file = "/home/yuanjun/test/genesis.json";
    let parsed = path.parse(file);
    console.log(parsed)

    const x = await fs.readFileSync(file);
    console.log(x.length);
    // const cid = await CalculateCid(x.valueOf());

    const res = await api.uploadFileChunk(x.buffer,"/ip4/192.168.50.209/tcp/5153/p2p/12D3KooWRTr4pUaDAHJJsmXL88uJSB8xsJYAbjYvyQs32ovCpyn9",
      null,0,0)
    console.log(res)
  });
});
