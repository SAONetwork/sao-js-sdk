# Class: EthAccountProvider

[sid/src](../modules/sid_src.md).EthAccountProvider

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

▸ `Static` **new**(`provider`): `Promise`<[`EthAccountProvider`](sid_src.EthAccountProvider.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `any` |

#### Returns

`Promise`<[`EthAccountProvider`](sid_src.EthAccountProvider.md)\>
