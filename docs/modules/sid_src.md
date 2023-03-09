# Module: sid/src

## Classes

- [CosmosDidStore](../classes/sid_src.CosmosDidStore.md)
- [EthAccountProvider](../classes/sid_src.EthAccountProvider.md)
- [SaoAccountProvider](../classes/sid_src.SaoAccountProvider.md)
- [SaoKeplrAccountProvider](../classes/sid_src.SaoKeplrAccountProvider.md)
- [SidManager](../classes/sid_src.SidManager.md)

## Type Aliases

### AuthenticateParam

Ƭ **AuthenticateParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `aud?` | `string` |
| `nonce` | `string` |
| `paths` | `string`[] |

___

### BindingParam

Ƭ **BindingParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accountAuth` | `AccountAuth` |
| `proof` | `DidTxTypes.BindingProof` |
| `rootDocId` | `string` |

___

### CreateJWSParam

Ƭ **CreateJWSParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `payload` | `string` \| `Record`<`string`, `any`\> |
| `protected?` | `Record`<`string`, `any`\> |

___

### JWS

Ƭ **JWS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `payload` | `string` |
| `signatures` | `SaoTypes.JwsSignature`[] |
