# Class: CosmosDidStore

[sid/src](../modules/sid_src.md).CosmosDidStore

## Implements

- `DidStore`

## Constructors

### constructor

• **new CosmosDidStore**(`signer`, `apiURL?`, `rpcURL?`, `prefix?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `OfflineSigner` |
| `apiURL?` | `string` |
| `rpcURL?` | `string` |
| `prefix?` | `string` |

## Methods

### addAccountAuth

▸ **addAccountAuth**(`did`, `accountAuth`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `accountAuth` | `AccountAuth` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidStore.addAccountAuth

___

### addBinding

▸ **addBinding**(`proof`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proof` | `BindingProof` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidStore.addBinding

___

### addOldSeed

▸ **addOldSeed**(`did`, `seed`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `seed` | `JWE` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidStore.addOldSeed

___

### binding

▸ **binding**(`rootDocId`, `keys`, `proof`, `accountAuth`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootDocId` | `string` |
| `keys` | `Record`<`string`, `string`\> |
| `proof` | `BindingProof` |
| `accountAuth` | `AccountAuth` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidStore.binding

___

### getAccountAuth

▸ **getAccountAuth**(`_`, `accountDid`): `Promise`<`AccountAuth`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `string` |
| `accountDid` | `string` |

#### Returns

`Promise`<`AccountAuth`\>

#### Implementation of

DidStore.getAccountAuth

___

### getAllAccountAuth

▸ **getAllAccountAuth**(`did`): `Promise`<`AccountAuth`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`AccountAuth`[]\>

#### Implementation of

DidStore.getAllAccountAuth

___

### getDid

▸ **getDid**(`accountId`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

DidStore.getDid

___

### getCache

▸ **getCache**(`key`): `LRUCache`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`LRUCache`<`string`, `any`\>

___

### getOldSeeds

▸ **getOldSeeds**(`did`): `Promise`<`JWE`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`JWE`[]\>

#### Implementation of

DidStore.getOldSeeds

___

### listSidDocumentVersions

▸ **listSidDocumentVersions**(`rootDocId`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootDocId` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Implementation of

DidStore.listSidDocumentVersions

___

### removeBinding

▸ **removeBinding**(`accountId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidStore.removeBinding

___

### updateAccountAuths

▸ **updateAccountAuths**(`did`, `update`, `remove`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `update` | `AccountAuth`[] |
| `remove` | `string`[] |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidStore.updateAccountAuths

___

### updatePaymentAddress

▸ **updatePaymentAddress**(`accountId`, `did`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `string` |
| `did` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidStore.updatePaymentAddress

___

### updateSidDocument

▸ **updateSidDocument**(`keys`, `rootDocId?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `Record`<`string`, `string`\> |
| `rootDocId?` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

DidStore.updateSidDocument
