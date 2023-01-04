# Class: ModelManager

[model/src](../modules/model_src.md).ModelManager

## Constructors

### constructor

• **new ModelManager**(`config`, `sidManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ModelProviderConfig`](../modules/model_src.md#modelproviderconfig) |
| `sidManager` | `SidManager` |

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

### createModel

▸ **createModel**<`T`\>(`def`, `modelConfig?`, `ownerDid?`): `Promise`<`string`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `def` | [`ModelDef`](../modules/model_src.md#modeldef)<`T`\> | `undefined` |  |
| `modelConfig` | [`ModelConfig`](../modules/model_src.md#modelconfig) | `defaultModelConfig` |  |
| `ownerDid?` | `string` | `undefined` |  |

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

### renewModel

▸ **renewModel**(`dataIds`, `modelConfig?`, `isPublish?`, `ownerDid?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `dataIds` | `string`[] | `undefined` | - |
| `modelConfig` | [`ModelConfig`](../modules/model_src.md#modelconfig) | `defaultModelConfig` |  |
| `isPublish?` | ``true`` | `undefined` |  |
| `ownerDid?` | `string` | `undefined` |  |

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

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `def` | [`ModelDef`](../modules/model_src.md#modeldef)<`T`\> | `undefined` |  |
| `modelConfig` | [`ModelConfig`](../modules/model_src.md#modelconfig) | `defaultModelConfig` |  |
| `ownerDid?` | `string` | `undefined` |  |

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
