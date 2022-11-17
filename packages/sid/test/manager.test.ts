import { DidStore } from "../src/did_store";
import { MockAccountProvider } from "./mock_accountprovider";
import { SidManager } from '../src/manager';
import { MockDidStore } from "./mock_didstore";

describe('manager', () => {
    it('2 sid providers', async () => {
        const ap1 = new MockAccountProvider("1");
        const ds1 = new MockDidStore();
        const manager = await SidManager.createManager(ap1, ds1);
        let dids = manager.listDids();
        expect(dids.length).toBe(1);

        const account = await ap1.account();
        let binding = await ds1.getBinding(account.id());
        expect(binding?.did).toBe(dids[0]);

        const ap2 = new MockAccountProvider("2");
        await manager.setAccountProvider(ap2);
        dids = manager.listDids();
        expect(dids.length).toBe(2);
        const account2 = await ap2.account();
        binding = await ds1.getBinding(account2.id());
        expect(binding?.did).toBe(dids[1]);

        let auths = await ds1.getAllAccountAuth(dids[0]);
        expect(Object.keys(auths).length).toBe(1);

        auths = await ds1.getAllAccountAuth(dids[1]);
        expect(Object.keys(auths).length).toBe(1);
    });

    it('same sid provider', async () => {
        const ds1 = new MockDidStore();

        const ap1 = new MockAccountProvider("1");
        const manager = await SidManager.createManager(ap1, ds1);
        let dids = manager.listDids();
        expect(dids.length).toBe(1);

        const ap2 = new MockAccountProvider("2");
        await manager.setAccountProvider(ap2, dids[0]);
        dids = manager.listDids();
        expect(dids.length).toBe(1);

        let auths = await ds1.getAllAccountAuth(dids[0]);
        expect(Object.keys(auths).length).toBe(2);
    });

    it('did document', async () => {
        const ds1 = new MockDidStore();

        const ap1 = new MockAccountProvider("1");
        const manager = await SidManager.createManager(ap1, ds1);

        let dids = manager.listDids();
        const docid = dids[0].split(":")[2]
        
        const docids = await ds1.listSidDocumentVersions(docid);
        expect(docids.length).toBe(1);
    });
});