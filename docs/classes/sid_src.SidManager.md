# Class: SidManager

[sid/src](../modules/sid_src.md).SidManager

## Methods

### bind

▸ **bind**(`param`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`BindingParam`](../modules/sid_src.md#bindingparam) |  |

#### Returns

`Promise`<`void`\>

___

### getDidProvider

▸ **getDidProvider**(`did?`): `Promise`<`SidProvider`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did?` | `string` |  |

#### Returns

`Promise`<`SidProvider`\>

___

### listDids

▸ **listDids**(): `string`[]

#### Returns

`string`[]

___

### setAccountProvider

▸ **setAccountProvider**(`accountProvider`, `lazy?`, `did?`): `Promise`<[`BindingParam`](../modules/sid_src.md#bindingparam)\>

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `accountProvider` | `AccountProvider` | `undefined` |  |
| `lazy` | `boolean` | `true` | - |
| `did?` | `string` | `undefined` |  |

#### Returns

`Promise`<[`BindingParam`](../modules/sid_src.md#bindingparam)\>

___

### unbind

▸ **unbind**(`accountId?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId?` | `string` |

#### Returns

`Promise`<`void`\>

___

### updatePaymentAddress

▸ **updatePaymentAddress**(`did?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did?` | `string` |  |

#### Returns

`Promise`<`void`\>

___

### createManager

▸ `Static` **createManager**(`accountProvider`, `didStore`, `lazy?`, `did?`): `Promise`<[`SidManager`](sid_src.SidManager.md)\>

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `accountProvider` | `AccountProvider` | `undefined` |  |
| `didStore` | `DidStore` | `undefined` |  |
| `lazy` | `boolean` | `true` | - |
| `did?` | `string` | `undefined` |  |

#### Returns

`Promise`<[`SidManager`](sid_src.SidManager.md)\>
