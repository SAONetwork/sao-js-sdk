import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgWithdraw } from "./types/sao/loan/tx";
import { MsgDeposit } from "./types/sao/loan/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/saonetwork.sao.loan.MsgWithdraw", MsgWithdraw],
    ["/saonetwork.sao.loan.MsgDeposit", MsgDeposit],
    
];

export { msgTypes }