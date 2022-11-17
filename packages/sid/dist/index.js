export class Account {
    id() {
        return this.chainId + ":" + this.address;
    }
    constructor(chainId, address){
        this.chainId = chainId;
        this.address = address;
    }
}
