# Class: SaoKeplrAccountProvider

[sid/src](../modules/sid_src.md).SaoKeplrAccountProvider

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

### new

▸ `Static` **new**(`signer`, `chainId`): `Promise`<[`SaoKeplrAccountProvider`](sid_src.SaoKeplrAccountProvider.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Keplr` |
| `chainId` | `string` |

#### Returns

`Promise`<[`SaoKeplrAccountProvider`](sid_src.SaoKeplrAccountProvider.md)\>
