export class Model {
    cast() {
        return JSON.parse(Uint8ArrayToString(this.content));
    }
    toString() {
        return JSON.stringify(this);
    }
    constructor(dataId, alias, content){
        this.dataId = dataId;
        this.alias = alias;
        this.content = content;
    }
}
export class ModelProvider {
    async load(request) {
        return new Promise((resolve, reject)=>{
            this.nodeApiClient.load({
                KeyWord: request.keyword,
                PublicKey: this.ownerSid,
                GroupId: this.groupId,
                CommitId: request.commitId,
                Version: request.version
            }).then((res)=>{
                try {
                    const model = JSON.parse(res);
                    resolve(new Model(model.dataId, model.alias, model.Content));
                } catch  {
                    reject("not found");
                }
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    constructor(ownerSid, groupId, nodeApiClient){
        this.ownerSid = ownerSid;
        this.groupId = groupId;
        this.nodeApiClient = nodeApiClient;
    }
}
export const Uint8ArrayToString = (dataArray)=>{
    var dataString = "";
    for(var i = 0; i < dataArray.length; i++){
        dataString += String.fromCharCode(dataArray[i]);
    }
    return dataString;
};
export const stringToUint8Array = (dataString)=>{
    var dataArray = [];
    for(var i = 0, j = dataString.length; i < j; ++i){
        dataArray.push(dataString.charCodeAt(i));
    }
    var tmpUint8Array = new Uint8Array(dataArray);
    return tmpUint8Array;
};
