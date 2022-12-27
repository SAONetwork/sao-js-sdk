# Class: ChainApiClient

[api-client/src](../modules/api_client_src.md).ChainApiClient

## Constructors

### constructor

• **new ChainApiClient**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ChainApiClientConfig`](../modules/api_client_src.md#chainapiclientconfig) |

## Methods

### AddAccountAuth

▸ **AddAccountAuth**(`did`, `accountAuth`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` |  |
| `accountAuth` | [`AccountAuth`](../modules/api_client_src.md#accountauth) |  |

#### Returns

`Promise`<`any`\>

___

### AddBinding

▸ **AddBinding**(`proof`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proof` | `BindingProof` |  |

#### Returns

`Promise`<`any`\>

___

### Binding

▸ **Binding**(`rootDocId`, `keys`, `proof`, `accountAuth`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rootDocId` | `string` |  |
| `keys` | `Record`<`string`, `string`\> |  |
| `proof` | `BindingProof` |  |
| `accountAuth` | [`AccountAuth`](../modules/api_client_src.md#accountauth) |  |

#### Returns

`Promise`<`any`\>

___

### DecodeOrderId

▸ **DecodeOrderId**(`data`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` |  |

#### Returns

`Promise`<`any`\>

___

### DecodeSidDocument

▸ **DecodeSidDocument**(`data`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` |  |

#### Returns

`Promise`<`any`\>

___

### GetAccountAuth

▸ **GetAccountAuth**(`accountDid`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountDid` | `string` |

#### Returns

`Promise`<`any`\>

___

### GetAllAccountAuth

▸ **GetAllAccountAuth**(`did`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` |  |

#### Returns

`Promise`<`any`\>

___

### GetBinding

▸ **GetBinding**(`accountId`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` |  |

#### Returns

`Promise`<`any`\>

___

### GetLatestBlockHeight

▸ **GetLatestBlockHeight**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

___

### GetLatestBlockTime

▸ **GetLatestBlockTime**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

___

### GetNodePeerInfo

▸ **GetNodePeerInfo**(`address`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` |  |

#### Returns

`Promise`<`string`\>

___

### GetTx

▸ **GetTx**(`transactionHash`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` |  |

#### Returns

`Promise`<`any`\>

___

### ListSidDocumentVersions

▸ **ListSidDocumentVersions**(`rootDocId`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rootDocId` | `string` |  |

#### Returns

`Promise`<`any`\>

___

### RemoveBinding

▸ **RemoveBinding**(`accountId`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` |  |

#### Returns

`Promise`<`any`\>

___

### Renew

▸ **Renew**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`OrderRenewProposal`](../modules/api_client_src.md#orderrenewproposal) |  |

#### Returns

`Promise`<`any`\>

___

### Store

▸ **Store**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`ClientOrderProposal`](../modules/api_client_src.md#clientorderproposal) |  |

#### Returns

`Promise`<`any`\>

___

### Terminate

▸ **Terminate**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`OrderTerminateProposal`](../modules/api_client_src.md#orderterminateproposal) |  |

#### Returns

`Promise`<`any`\>

___

### UpdateAccountAuths

▸ **UpdateAccountAuths**(`did`, `updates`, `removes`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` |  |
| `updates` | [`AccountAuth`](../modules/api_client_src.md#accountauth)[] |  |
| `removes` | `string`[] |  |

#### Returns

`Promise`<`any`\>

___

### UpdatePermission

▸ **UpdatePermission**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`UpdatePermissionProposal`](../modules/api_client_src.md#updatepermissionproposal) |  |

#### Returns

`Promise`<`any`\>

___

### UpdateSidDocument

▸ **UpdateSidDocument**(`keys`, `rootDocId?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | `Record`<`string`, `string`\> |  |
| `rootDocId?` | `string` |  |

#### Returns

`Promise`<`any`\>

___

### addPastSeed

▸ **addPastSeed**(`did`, `seed`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` |  |
| `seed` | `JWE` |  |

#### Returns

`Promise`<`any`\>

___

### getPastSeeds

▸ **getPastSeeds**(`did`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` |  |

#### Returns

`Promise`<`any`\>

___

### updatePaymentAddress

▸ **updatePaymentAddress**(`accountId`, `did`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` |  |
| `did` | `string` |  |

#### Returns

`Promise`<`any`\>
