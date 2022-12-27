# Class: SidManager

[sid/src](../modules/sid_src.md).SidManager

## Methods

### getSidProvider

▸ **getSidProvider**(`did?`): `Promise`<`SidProvider`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did?` | `string` |

#### Returns

`Promise`<`SidProvider`\>

___

### listDids

▸ **listDids**(): `string`[]

#### Returns

`string`[]

___

### setAccountProvider

▸ **setAccountProvider**(`accountProvider`, `did?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountProvider` | `AccountProvider` |
| `did?` | `string` |

#### Returns

`Promise`<`void`\>

___

### unbind

▸ **unbind**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### updatePaymentAddress

▸ **updatePaymentAddress**(`did?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did?` | `string` |

#### Returns

`Promise`<`void`\>

___

### createManager

▸ `Static` **createManager**(`accountProvider`, `didStore`, `did?`): `Promise`<[`SidManager`](sid_src.SidManager.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountProvider` | `AccountProvider` |
| `didStore` | `DidStore` |
| `did?` | `string` |

#### Returns

`Promise`<[`SidManager`](sid_src.SidManager.md)\>
