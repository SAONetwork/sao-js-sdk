# Class: ModelManager

[model/src](../modules/model_src.md).ModelManager

## Constructors

### constructor

• **new ModelManager**(`config`, `sidManager`, `defaultModelConfig?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config` | [`ModelProviderConfig`](../modules/model_src.md#modelproviderconfig) | `undefined` |
| `sidManager` | `SidManager` | `undefined` |
| `defaultModelConfig` | [`ModelConfig`](../modules/model_src.md#modelconfig) | `DefaultModelConfig` |

## Methods

### addModelProvider

▸ **addModelProvider**(`config`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`ModelProviderConfig`](../modules/model_src.md#modelproviderconfig) |  |

#### Returns

`void`

___

### buildQueryRequest

▸ **buildQueryRequest**(`provider`, `proposal`): `Promise`<`QueryMetadataProposal`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | [`ModelProvider`](model_src.ModelProvider.md) |  |
| `proposal` | `QueryProposal` |  |

#### Returns

`Promise`<`QueryMetadataProposal`\>

___

### createFile

▸ **createFile**<`T`\>(`def`, `modelConfig?`, `ownerDid?`): `Promise`<`string`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `def` | [`FileDef`](../modules/model_src.md#filedef)<`T`\> |  |
| `modelConfig` | [`ModelConfig`](../modules/model_src.md#modelconfig) |  |
| `ownerDid?` | `string` |  |

#### Returns

`Promise`<`string`\>

___

### createModel

▸ **createModel**<`T`\>(`def`, `modelConfig?`, `ownerDid?`): `Promise`<`string`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `def` | [`ModelDef`](../modules/model_src.md#modeldef)<`T`\> |  |
| `modelConfig` | [`ModelConfig`](../modules/model_src.md#modelconfig) |  |
| `ownerDid?` | `string` |  |

#### Returns

`Promise`<`string`\>

___

### deleteModel

▸ **deleteModel**(`dataId`, `isPublish?`, `ownerDid?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataId` | `string` |  |
| `isPublish?` | ``false`` |  |
| `ownerDid?` | `string` |  |

#### Returns

`Promise`<`string`\>

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### loadModel

▸ **loadModel**<`T`\>(`keyword`, `keywordType?`, `ownerDid?`, `groupId?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyword` | `string` |  |
| `keywordType?` | `number` |  |
| `ownerDid?` | `string` |  |
| `groupId?` | `string` |  |

#### Returns

`Promise`<`T`\>

___

### loadModelByCommitId

▸ **loadModelByCommitId**<`T`\>(`keyword`, `commitId`, `keywordType?`, `ownerDid?`, `groupId?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyword` | `string` |  |
| `commitId` | `string` |  |
| `keywordType?` | `number` |  |
| `ownerDid?` | `string` |  |
| `groupId?` | `string` |  |

#### Returns

`Promise`<`T`\>

___

### loadModelByVersion

▸ **loadModelByVersion**<`T`\>(`keyword`, `version`, `keywordType?`, `ownerDid?`, `groupId?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyword` | `string` |  |
| `version` | `string` |  |
| `keywordType?` | `number` |  |
| `ownerDid?` | `string` |  |
| `groupId?` | `string` |  |

#### Returns

`Promise`<`T`\>

___

### loadModelFileContent

▸ **loadModelFileContent**(`keyword`, `keywordType?`, `ownerDid?`, `groupId?`): `Promise`<`ArrayBufferLike`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyword` | `string` |  |
| `keywordType?` | `number` |  |
| `ownerDid?` | `string` |  |
| `groupId?` | `string` |  |

#### Returns

`Promise`<`ArrayBufferLike`\>

___

### renewModel

▸ **renewModel**(`dataIds`, `modelConfig?`, `isPublish?`, `ownerDid?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataIds` | `string`[] | - |
| `modelConfig` | [`ModelConfig`](../modules/model_src.md#modelconfig) |  |
| `isPublish?` | ``true`` |  |
| `ownerDid?` | `string` |  |

#### Returns

`Promise`<`string`\>

___

### updateModel

▸ **updateModel**<`T`\>(`def`, `modelConfig?`, `ownerDid?`): `Promise`<`string`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `def` | [`ModelDef`](../modules/model_src.md#modeldef)<`T`\> |  |
| `modelConfig` | [`ModelConfig`](../modules/model_src.md#modelconfig) |  |
| `ownerDid?` | `string` |  |

#### Returns

`Promise`<`string`\>

___

### updateModelPermission

▸ **updateModelPermission**(`dataId`, `readonlyDids?`, `readwriteDids?`, `isPublish?`, `ownerDid?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataId` | `string` |  |
| `readonlyDids?` | `string`[] |  |
| `readwriteDids?` | `string`[] |  |
| `isPublish?` | ``true`` |  |
| `ownerDid?` | `string` |  |

#### Returns

`Promise`<`string`\>

___

### uploadFileChunk

▸ **uploadFileChunk**(`buffer`, `address`, `peerInfo`, `chunkId`, `totalChunks`): `Promise`<{ `cid`: `string` ; `contentLength`: `number`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `ArrayBuffer` |  |
| `address` | `string` |  |
| `peerInfo` | `any` |  |
| `chunkId` | `number` |  |
| `totalChunks` | `number` |  |

#### Returns

`Promise`<{ `cid`: `string` ; `contentLength`: `number`  }\>
