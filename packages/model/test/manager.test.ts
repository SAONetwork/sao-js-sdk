import { MockModelProvider } from "./mock_modelprovider";
import { ModelManager } from '../src/manager';

describe('manager', () => {
    it('1 model provider', async () => {
        const mp = new MockModelProvider("a", "b");
        const manager = await ModelManager.createManager(mp);
        let model = await manager.loadModel("a");
        expect(model.dataId).toBe("a");
        expect(model.alias).toBe("b");
    });
});