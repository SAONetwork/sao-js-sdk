import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgReset } from "./types/sao/node/tx";
import { MsgRemoveVstorage } from "./types/sao/node/tx";
import { MsgAddVstorage } from "./types/sao/node/tx";
import { MsgClaimReward } from "./types/sao/node/tx";
import { MsgCreate } from "./types/sao/node/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/saonetwork.sao.node.MsgReset", MsgReset],
    ["/saonetwork.sao.node.MsgRemoveVstorage", MsgRemoveVstorage],
    ["/saonetwork.sao.node.MsgAddVstorage", MsgAddVstorage],
    ["/saonetwork.sao.node.MsgClaimReward", MsgClaimReward],
    ["/saonetwork.sao.node.MsgCreate", MsgCreate],
    
];

export { msgTypes }