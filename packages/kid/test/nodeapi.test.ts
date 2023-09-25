import { NewSaoClientApi } from "../src";


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

    const res = await api.loadModel("2c327520-255b-11ee-b3ad-a30af7ccd36b")
    console.log(res)
  });
});
