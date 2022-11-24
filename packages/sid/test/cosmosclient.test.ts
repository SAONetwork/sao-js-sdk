import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { generateKeyPairFromSeed } from '@stablelib/x25519';
import { HDNode } from '@ethersproject/hdnode';
import {CosmosDidStore} from '../src/did_store_cosmos';
import {SaoAccountProvider} from '../src/accountprovider_sao';
import { guid } from './test_utils';
import { encodeKey, generateAccountSecret, accountSecretToDid} from '../src/utils';
import { randomBytes } from '@stablelib/random';
import * as u8a from 'uint8arrays';
import { MsgUpdateSidDocumentResponse } from "SaoNetwork-sao-client-ts/saonetwork.sao.did/types/sao/did/tx";
import { createJWE, x25519Encrypter } from 'did-jwt';
import { generateKeyPair } from '@stablelib/x25519';

describe('cosmos client', () => {
    // it('binding proof test', async () => {
    //     const mnemonic = "surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put";
    //     const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    //     const didStore = new CosmosDidStore(wallet);
    //     const accountProvider = await SaoAccountProvider.newSaoAccountProvider(wallet);
    //     const did = "did:sid:" + guid();
    //     const bindingProof = await accountProvider.generateBindingProof(did);
    //     await didStore.addBinding(bindingProof);

    //     const accountId = await accountProvider.accountId();
    //     console.log("accountId", accountId.toString());
    //     let binding = await didStore.getBinding(accountId.toString());
    //     expect(binding).toBeDefined();
    //     expect(binding).toBe(did);

    //     await didStore.removeBinding(accountId.toString());
    //     binding = await didStore.getBinding(accountId.toString());
    //     expect(binding).toBeNull();
    // }, 30000);

    // it('account auth test', async () => {
    //     const mnemonic = "surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put";
    //     const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    //     const didStore = new CosmosDidStore(wallet);
    //     const accountProvider = await SaoAccountProvider.newSaoAccountProvider(wallet);
    //     const did = "did:sid:" + guid();

    //     const account = await accountProvider.accountId();
    //     const accountSecret = await generateAccountSecret(accountProvider);
    //     const accountDid = await accountSecretToDid(accountSecret);
    //     // account encrypt seed
    //     const seed = randomBytes(32);
    //     const accountEncryptedSeed = await accountDid.createJWE(seed, [accountDid.id]);

    //     // sid encrypt account
    //     const kp = await generateKeyPair();
    //     const encrypter = x25519Encrypter(kp.publicKey, did);
    //     const sidEncryptedAccount = await createJWE(u8a.fromString(account.toString()), [encrypter]);

    //     await didStore.addAccountAuth(did, {
    //         accountDid: accountDid.id,
    //         accountEncryptedSeed,
    //         sidEncryptedAccount
    //     });

    //     const auth = await didStore.getAccountAuth(did, accountDid.id);
    //     expect(auth).toBeDefined();
    //     expect(auth?.accountDid).toBe(accountDid.id);
    //     expect(auth?.accountEncryptedSeed).toStrictEqual(accountEncryptedSeed);
    //     expect(auth?.sidEncryptedAccount).toStrictEqual(sidEncryptedAccount);

    //     let auths = await didStore.getAllAccountAuth(did);
    //     expect(auths.length).toBe(1);
    //     expect(auths[0].accountDid).toBe(accountDid.id);

    //     await didStore.updateAccountAuths(did, [], [accountDid.id]);

    //     auths = await didStore.getAllAccountAuth(did);
    //     expect(auths.length).toBe(0);
    // }, 30000);

    it('test sid diddocument', async () => {
        const mnemonic = "surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put";
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
        const didStore = new CosmosDidStore(wallet);
        const accountProvider = await SaoAccountProvider.newSaoAccountProvider(wallet);
        const did = "did:sid:" + guid();

        const seed = randomBytes(32);
        const rootNode = HDNode.fromSeed(seed);
        const baseNode = rootNode.derivePath("111");
        const signingKeyNode = baseNode.derivePath('0');
        const encryptSeed = u8a.fromString(baseNode.derivePath('1').privateKey.slice(2), 'base16');
        const encryptKeypair = generateKeyPairFromSeed(encryptSeed);
        
        const signing = encodeKey(u8a.fromString(signingKeyNode.publicKey.slice(2), 'base16'), 'secp256k1');
        const encrypt = encodeKey(encryptKeypair.publicKey, 'x25519');

        const account = await accountProvider.accountId();
        const docid = await didStore.updateSidDocument(signing, encrypt);
        expect(docid.length).toBeGreaterThan(0);

        const versions = await didStore.listSidDocumentVersions(docid);
        expect(versions.length).toBe(1);
        expect(versions[0]).toBe(docid);
    });

    // it('test decode', async () => {
    //     const writer = MsgUpdateSidDocumentResponse.encode({
    //         docId: "eada341bd41aa65e565eed86229d49b39b86c21c77b7c3ac1e89ee5124cee8bd"
    //     });
    //     const b = writer.finish();
    //     console.log(b);
    // });

});