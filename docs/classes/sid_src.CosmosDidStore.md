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

### getCache

▸ **getCache**(`key`): `LRUCache`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`LRUCache`<`string`, `any`\>

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

### update

▸ **update**(`did`, `accountId`, `newDocId`, `keys`, `timestamp`, `updates`, `removes`, `pastSeed`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `accountId` | `string` |
| `newDocId` | `string` |
| `keys` | `Record`<`string`, `string`\> |
| `timestamp` | `number` |
| `updates` | `AccountAuth`[] |
| `removes` | `string`[] |
| `pastSeed` | `JWE` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidStore.update

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
