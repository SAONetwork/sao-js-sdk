import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgStore } from "./types/sao/sao/tx";
import { MsgCancel } from "./types/sao/sao/tx";
import { MsgTerminate } from "./types/sao/sao/tx";
import { MsgRenew } from "./types/sao/sao/tx";
import { MsgRecoverFaults } from "./types/sao/sao/tx";
import { MsgUpdataPermission } from "./types/sao/sao/tx";
import { MsgMigrate } from "./types/sao/sao/tx";
import { MsgReportFaults } from "./types/sao/sao/tx";
import { MsgReady } from "./types/sao/sao/tx";
import { MsgComplete } from "./types/sao/sao/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/saonetwork.sao.sao.MsgStore", MsgStore],
    ["/saonetwork.sao.sao.MsgCancel", MsgCancel],
    ["/saonetwork.sao.sao.MsgTerminate", MsgTerminate],
    ["/saonetwork.sao.sao.MsgRenew", MsgRenew],
    ["/saonetwork.sao.sao.MsgRecoverFaults", MsgRecoverFaults],
    ["/saonetwork.sao.sao.MsgUpdataPermission", MsgUpdataPermission],
    ["/saonetwork.sao.sao.MsgMigrate", MsgMigrate],
    ["/saonetwork.sao.sao.MsgReportFaults", MsgReportFaults],
    ["/saonetwork.sao.sao.MsgReady", MsgReady],
    ["/saonetwork.sao.sao.MsgComplete", MsgComplete],
    
];

export { msgTypes }