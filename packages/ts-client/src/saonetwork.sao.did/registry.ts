import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgBinding } from "./types/sao/did/tx";
import { MsgUpdate } from "./types/sao/did/tx";
import { MsgUpdatePaymentAddress } from "./types/sao/did/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/saonetwork.sao.did.MsgBinding", MsgBinding],
    ["/saonetwork.sao.did.MsgUpdate", MsgUpdate],
    ["/saonetwork.sao.did.MsgUpdatePaymentAddress", MsgUpdatePaymentAddress],
    
];

export { msgTypes }