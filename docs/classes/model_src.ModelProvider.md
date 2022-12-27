# Class: ModelProvider

[model/src](../modules/model_src.md).ModelProvider

## Constructors

### constructor

• **new ModelProvider**(`ownerSid`, `groupId`, `nodeApiClient`, `chainApiClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ownerSid` | `string` |
| `groupId` | `string` |
| `nodeApiClient` | `CreateRequestClient`<`SaoNodeAPISchema`\> |
| `chainApiClient` | `ChainApiClient` |

## Methods

### create

▸ **create**(`query`, `clientProposal`, `orderId`, `content`): `Promise`<[`Model`](model_src.Model.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `QueryMetadataProposal` |  |
| `clientProposal` | `ClientOrderProposal` |  |
| `orderId` | `number` |  |
| `content` | `number`[] |  |

#### Returns

`Promise`<[`Model`](model_src.Model.md)\>

___

### getGroupId

▸ **getGroupId**(): `string`

#### Returns

`string`

___

### getLatestHeight

▸ **getLatestHeight**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

___

### getNodeAddress

▸ **getNodeAddress**(): `string`

#### Returns

`string`

___

### getOwnerSid

▸ **getOwnerSid**(): `string`

#### Returns

`string`

___

### getPeerInfo

▸ **getPeerInfo**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### load

▸ **load**(`query`): `Promise`<[`Model`](model_src.Model.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `QueryMetadataProposal` |  |

#### Returns

`Promise`<[`Model`](model_src.Model.md)\>

___

### renew

▸ **renew**(`request`, `isPublish`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `OrderRenewProposal` |  |
| `isPublish` | `boolean` |  |

#### Returns

`Promise`<`void`\>

___

### store

▸ **store**(`request`): `Promise`<`number`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `ClientOrderProposal` |  |

#### Returns

`Promise`<`number`\>

___

### terminate

▸ **terminate**(`request`, `isPublish`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `OrderTerminateProposal` |  |
| `isPublish` | `boolean` |  |

#### Returns

`Promise`<`void`\>

___

### update

▸ **update**(`query`, `clientProposal`, `orderId`, `patch`): `Promise`<[`Model`](model_src.Model.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `QueryMetadataProposal` |  |
| `clientProposal` | `ClientOrderProposal` |  |
| `orderId` | `number` |  |
| `patch` | `number`[] |  |

#### Returns

`Promise`<[`Model`](model_src.Model.md)\>

___

### updatePermission

▸ **updatePermission**(`request`, `isPublish`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `UpdatePermissionProposal` |  |
| `isPublish` | `boolean` |  |

#### Returns

`Promise`<`void`\>

___

### validate

▸ **validate**(`proposal`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proposal` | `Proposal` |

#### Returns

`boolean`
