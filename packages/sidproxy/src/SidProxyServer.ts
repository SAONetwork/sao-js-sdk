import { fromEvent } from 'rxjs';
import { tap, filter, map} from 'rxjs/operators';
import { CosmosDidStore, AuthenticateParam, CreateJWSParam} from '@saonetwork/sid';

/**
 * {
 *     "method": "authenticate"/"createJWS"
 * }
 */
class ProxyPayload {
  Method: string
  Data: string
}

export class SidProxyServer {
  // private didStore: DidStore;

  constructor() {
    console.log("init sid proxy server");
  }

  Start(target) {
    // start message listener to handle auth/create jws
    const source = fromEvent<MessageEvent>(target, 'message');
    source.pipe(map(async message => {
      // handle request
      console.log(message.data);
      const payload = JSON.parse(message.data) as ProxyPayload
      this.handle(payload);
      return {
        response: "",
        message: "",
      }
    }), tap((payload) => {
      console.log(payload);
    }));
  }

  async handle(payload: ProxyPayload): Promise<string> {
    if (this.isAuthenticate(payload)) {
      const param = JSON.parse(payload.Data) as AuthenticateParam;
      return await this.handleAuthenticate(param);
    } else if (this.isCreateJWS(payload)) {
      const param = JSON.parse(payload.Data) as CreateJWSParam;
      return await this.handleCreateJWS(param);
    } else {
      throw new Error("unsupport message");
    }
  }

  async handleAuthenticate(param: AuthenticateParam): Promise<string> {
    return "";
  }

  async handleCreateJWS(param: CreateJWSParam): Promise<string> {
    return "";
  }

  isAuthenticate(payload: ProxyPayload): boolean {
    return payload.Method === "authenticate";
  }

  isCreateJWS(payload: ProxyPayload): boolean {
    return payload.Method === "createJWS";
  }

}
