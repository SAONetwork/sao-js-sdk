export class HttpClient {
    groupId: string

    constructor(groupId: string) {
        this.groupId = groupId;
    }

    info(): string {
        return "groupId: "+this.groupId;
    }
}
