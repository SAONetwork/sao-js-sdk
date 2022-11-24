import { CreateJWSParam, JWS } from "@js-sao-did/common";

export class MockSidManager {
    async getSidProvider(_ownerSid:string): Promise<MockSidProvider> {
        return new MockSidProvider()
    }
}

export class MockSidProvider {
    async sign(payload: string): Promise<JWS> {
        return {
            payload,
            signatures: [{ protected: "", signature: "" }],
        }
    }

    async createJWS(param: CreateJWSParam): Promise<JWS> {
        const jws = await this.sign(JSON.stringify(param.payload));
        return jws;
    }
}
