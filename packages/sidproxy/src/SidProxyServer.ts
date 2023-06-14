import { fromEvent, Subscription } from 'rxjs';
import { tap, filter, map} from 'rxjs/operators';
import { AccountProvider , SaoAccountProvider, DidStore, AuthenticateParam, CreateJWSParam, SidManager, CosmosDidStore} from '@saonetwork/sid';

/**
 * {
 *     "method": "authenticate"/"createJWS"
 * }
 */
export class SidProxyServer {
  private sidManager: SidManager | undefined;
  private subscription: Subscription;

  constructor() {
    console.log("init sid proxy server");
  }

  Start(target) {
    // start message listener to handle auth/create jws
    const source = fromEvent<MessageEvent>(target, 'message');
    this.subscription = source.pipe(tap(payload => console.log(payload))).subscribe(async message => {
      // handle request
      console.log(message.data);
      const payload = JSON.parse(message.data) as ProxyPayload
      const data = await this.handle(payload);
      const respPayload: ProxyPayload = {
        Id: payload.Id,
        Method: payload.Method,
        Data: data,
      };
      target.parent.postMessage(respPayload, '*');
    });
  }

  async SetAccountProvider(accountProvider: AccountProvider) {
    // TODO: a signer
    const signer = undefined;
    const didStore = new CosmosDidStore(signer);
    this.sidManager = await SidManager.createManager(accountProvider, didStore);
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
