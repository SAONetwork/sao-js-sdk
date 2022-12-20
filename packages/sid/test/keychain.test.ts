import { DidStore } from '../src/did_store';
import { Keychain } from '../src/keychain';
import { MockDidStore } from './mock_didstore';
import { randomBytes } from '@stablelib/random';
import { accountSecretToDid } from '../src/utils';

const generateAccountSecret = () => randomBytes(32);

describe('Keychain', () => {
    let didStore: DidStore

    beforeAll(() => {
        didStore = new MockDidStore();
    });

    it('create', async () => {
        const keychain = await Keychain.create(didStore);
        const did = keychain.did;
        expect(did.startsWith("did:sid")).toBeTruthy();
        const accountSecret = generateAccountSecret();
        const accountId = "a1";
        await keychain.add(accountId, accountSecret);

        const accountDid = await accountSecretToDid(accountSecret);
        const aa = await didStore.getAccountAuth(did, accountDid.id);
        expect(aa).toBeDefined();
        expect(aa?.accountDid).toEqual(accountDid.id);
    });
});