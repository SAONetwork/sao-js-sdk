# Class: SaoAccountProvider

[sid/src](../modules/sid_src.md).SaoAccountProvider

## Implements

- `AccountProvider`

## Methods

### accountId

▸ **accountId**(): `Promise`<`AccountId`\>

#### Returns

`Promise`<`AccountId`\>

#### Implementation of

AccountProvider.accountId

___

### chainId

▸ **chainId**(): `string`

#### Returns

`string`

___

### generateBindingProof

▸ **generateBindingProof**(`did`, `timestamp`): `Promise`<`BindingProof`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `timestamp` | `number` |

#### Returns

`Promise`<`BindingProof`\>

#### Implementation of

AccountProvider.generateBindingProof

___

### sign

▸ **sign**(`message`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

AccountProvider.sign

___

### newSaoAccountProvider

▸ `Static` **newSaoAccountProvider**(`signer`): `Promise`<[`SaoAccountProvider`](sid_src.SaoAccountProvider.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `OfflineDirectSigner` |

#### Returns

`Promise`<[`SaoAccountProvider`](sid_src.SaoAccountProvider.md)\>
