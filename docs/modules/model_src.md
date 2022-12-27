# Module: model/src

## Classes

- [Model](../classes/model_src.Model.md)
- [ModelManager](../classes/model_src.ModelManager.md)
- [ModelProvider](../classes/model_src.ModelProvider.md)

## Type Aliases

### ModelConfig

Ƭ **ModelConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `duration?` | `number` \| ``365`` |
| `isPublish?` | `boolean` \| ``false`` |
| `operation?` | `number` \| ``1`` |
| `replica?` | `number` \| ``3`` |
| `timeout?` | `number` \| ``300`` |

___

### ModelDef

Ƭ **ModelDef**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alias?` | `string` |
| `data` | `T` |
| `dataId?` | `string` |
| `extendInfo?` | `string` |
| `groupId?` | `string` |
| `rule?` | `string` |
| `tags?` | `string`[] \| [] |

___

### ModelProviderConfig

Ƭ **ModelProviderConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chainApiToken` | `string` |
| `chainApiUrl` | `string` |
| `chainPrefix` | `string` |
| `chainRpcUrl` | `string` |
| `nodeApiToken` | `string` |
| `nodeApiUrl` | `string` |
| `ownerDid` | `string` |
| `platformId` | `string` |
| `signer` | `OfflineSigner` |
