# Module: api-client/src

## Classes

- [ChainApiClient](../classes/api_client_src.ChainApiClient.md)

## Interfaces

- [SaoNodeAPISchema](../interfaces/api_client_src.SaoNodeAPISchema.md)

## Type Aliases

### APIConfig

Ƭ **APIConfig**: [`RequestPath`](api_client_src.md#requestpath) \| [`RequestOptions`](api_client_src.md#requestoptions) \| [`RequestFunction`](api_client_src.md#requestfunction)

___

### APISchema

Ƭ **APISchema**: `Record`<`string`, { `request`: `Record`<`string`, `any`\> \| `void` ; `response`: `Record`<`string`, `any`\> \| `any`  }\>

___

### AccountAuth

Ƭ **AccountAuth**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accountDid` | `string` |
| `accountEncryptedSeed` | `JWE` |
| `sidEncryptedAccount` | `JWE` |

___

### ChainApiClientConfig

Ƭ **ChainApiClientConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `apiURL` | `string` |
| `prefix` | `string` |
| `rpcURL` | `string` |
| `signer` | `OfflineSigner` |

___

### ClientOrderProposal

Ƭ **ClientOrderProposal**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `JwsSignature` | `SaoTypes.JwsSignature` |
| `Proposal` | `SaoTypes.Proposal` |

___

### CreateRequestClient

Ƭ **CreateRequestClient**<`T`\>: { [K in keyof RemoveIndexSignature<T\>]: RequestFunction<RemoveIndexSignature<T\>[K][any], AxiosResponse<RemoveIndexSignature<T\>[K][any]\>\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`APISchema`](api_client_src.md#apischema) |

___

### CreateRequestConfig

Ƭ **CreateRequestConfig**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`APISchema`](api_client_src.md#apischema) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `apis?` | { [K in keyof RemoveIndexSignature<T\>]: APIConfig } |
| `baseURL` | `string` |
| `errorHandler?` | [`RequestErrorHandler`](api_client_src.md#requesterrorhandler) |
| `headerHandlers?` | [`HeaderHandler`](api_client_src.md#headerhandler)[] |
| `headers?` | `RawAxiosRequestHeaders` \| `Partial`<`HeadersDefaults`\> |

___

### HeaderHandler

Ƭ **HeaderHandler**: (`config?`: `AxiosRequestConfig`) => `Promise`<`AxiosRequestHeaders`\>

#### Type declaration

▸ (`config?`): `Promise`<`AxiosRequestHeaders`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `AxiosRequestConfig` |

##### Returns

`Promise`<`AxiosRequestHeaders`\>

___

### JsonRpcRequest

Ƭ **JsonRpcRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `jsonrpc` | `string` |
| `method` | `string` |
| `params` | `any`[] |

___

### JsonRpcResponse

Ƭ **JsonRpcResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error` | `string` |
| `id` | `number` |
| `jsonrpc` | `string` |
| `result` | `any` |

___

### NodeApiClientConfig

Ƭ **NodeApiClientConfig**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`APISchema`](api_client_src.md#apischema) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `apis?` | { [K in keyof RemoveIndexSignature<T\>]: APIConfig } |
| `baseURL` | `string` |
| `errorHandler?` | [`RequestErrorHandler`](api_client_src.md#requesterrorhandler) |
| `headerHandlers?` | [`HeaderHandler`](api_client_src.md#headerhandler)[] |
| `headers?` | `Partial`<`HeadersDefaults`\> |

___

### OrderRenewProposal

Ƭ **OrderRenewProposal**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `JwsSignature` | `SaoTypes.JwsSignature` |
| `Proposal` | `SaoTypes.RenewProposal` |

___

### OrderTerminateProposal

Ƭ **OrderTerminateProposal**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `JwsSignature` | `SaoTypes.JwsSignature` |
| `Proposal` | `SaoTypes.TerminateProposal` |

___

### QueryMetadataProposal

Ƭ **QueryMetadataProposal**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `JwsSignature` | `SaoTypes.JwsSignature` |
| `Proposal` | `SaoTypes.QueryProposal` |

___

### RequestErrorHandler

Ƭ **RequestErrorHandler**: (`error`: `AxiosError`) => `void`

#### Type declaration

▸ (`error`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `AxiosError` |

##### Returns

`void`

___

### RequestFunction

Ƭ **RequestFunction**<`P`, `R`\>: (`params`: `P`, ...`args`: `any`[]) => `Promise`<`R`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `Record`<`string`, `any`\> \| `void` |
| `R` | `any` |

#### Type declaration

▸ (`params`, `...args`): `Promise`<`R`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `P` |
| `...args` | `any`[] |

##### Returns

`Promise`<`R`\>

___

### RequestOptions

Ƭ **RequestOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `headers?` | `AxiosRequestHeaders` |
| `method` | ``"GET"`` \| ``"POST"`` \| ``"PUT"`` \| ``"DELETE"`` \| ``"HEAD"`` \| ``"OPTIONS"`` \| ``"CONNECT"`` \| ``"TRACE"`` \| ``"PATCH"`` |
| `path` | `string` |

___

### RequestPath

Ƭ **RequestPath**: \`${Uppercase<RequestOptions["method"]\>} ${string}\`

___

### Result

Ƭ **Result**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `status` | `number` |

___

### TxResult

Ƭ **TxResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `code` | `number` |
| `transactionHash` | `string` |

___

### UpdatePermissionProposal

Ƭ **UpdatePermissionProposal**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `JwsSignature` | `SaoTypes.JwsSignature` |
| `Proposal` | `SaoTypes.PermissionProposal` |

## Properties

### SaoTypes

• **SaoTypes**: `any`

## Variables

### BindingProofV1

• `Const` **BindingProofV1**: ``1``

## Functions

### BuildGetNodeAddressReqParams

▸ **BuildGetNodeAddressReqParams**(): [`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

#### Returns

[`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

___

### BuildModelCreateFileReqParams

▸ **BuildModelCreateFileReqParams**(`query`, `proposal`, `orderId`): [`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `any` |
| `proposal` | `any` |
| `orderId` | `number` |

#### Returns

[`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

___

### BuildModelCreateReqParams

▸ **BuildModelCreateReqParams**(`query`, `proposal`, `orderId`, `content`): [`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `any` |
| `proposal` | `any` |
| `orderId` | `number` |
| `content` | `number`[] |

#### Returns

[`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

___

### BuildModelDeleteReqParams

▸ **BuildModelDeleteReqParams**(`req`): [`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `any` |

#### Returns

[`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

___

### BuildModelLoadReqParams

▸ **BuildModelLoadReqParams**(`query`): [`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `any` |

#### Returns

[`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

___

### BuildModelRenewOrderReqParams

▸ **BuildModelRenewOrderReqParams**(`req`): [`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `any` |

#### Returns

[`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

___

### BuildModelShowCommitsReqParams

▸ **BuildModelShowCommitsReqParams**(`query`): [`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `any` |

#### Returns

[`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

___

### BuildModelUpdatePermissionReqParams

▸ **BuildModelUpdatePermissionReqParams**(`req`): [`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `any` |

#### Returns

[`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

___

### BuildModelUpdateReqParams

▸ **BuildModelUpdateReqParams**(`query`, `proposal`, `orderId`, `patch`): [`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `any` |
| `proposal` | `any` |
| `orderId` | `number` |
| `patch` | `number`[] |

#### Returns

[`JsonRpcRequest`](api_client_src.md#jsonrpcrequest)

___

### GetNodeApiClient

▸ **GetNodeApiClient**(`config`): [`CreateRequestClient`](api_client_src.md#createrequestclient)<[`SaoNodeAPISchema`](../interfaces/api_client_src.SaoNodeAPISchema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`CreateRequestConfig`](api_client_src.md#createrequestconfig)<[`SaoNodeAPISchema`](../interfaces/api_client_src.SaoNodeAPISchema.md)\> |

#### Returns

[`CreateRequestClient`](api_client_src.md#createrequestclient)<[`SaoNodeAPISchema`](../interfaces/api_client_src.SaoNodeAPISchema.md)\>
