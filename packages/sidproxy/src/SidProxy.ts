import { AccountProvider } from "@saonetwork/sid/dist/account_provider";
import { fromEvent } from "rxjs";
import { tap, filter, map} from 'rxjs/operators';

const HIDE_IFRAME_STYLE = 'position: fixed; width:0; height:0; border:0; border:none !important'
const IFRAME_URL = "";

/**
 * {
 *     "Method": "authenticate"/"createJWS"
 *     "Id": "",
 *     "Data": ""
 * }
 */
export class SidProxy {
  iframe: HTMLIFrameElement
  accountProvider: AccountProvider | undefined
  accountId: string | undefined

  constructor() {
    this.iframe = this.initIframe(IFRAME_URL);
    document.body.appendChild(this.iframe);
  }

  private start(target: Window = window) {
    const source = fromEvent<MessageEvent>(target, 'message');
    source.pipe(tap((payload) => {
      console.log(payload);
    })).subscribe(async message => {
      const payload = JSON.parse(message.data) as ProxyPayload
      const respData = await this.handle(payload);
      const response: ProxyPayload = {
        Method: payload.Method,
        Id: payload.Id,
        Data: respData,
      };

      this.iframe.contentWindow.postMessage(JSON.stringify(response), '*');
    });
  }

  private async handle(payload: ProxyPayload): Promise<string> {
    const respPayload: ProxyPayload = {
      Method: payload.Method,
      Id: payload.Id,
      Data: "",
    };
    if (payload.Method === "accountprovider.accountId") {
      respPayload.Data = this.accountId;
    } else if (payload.Method === "accountprovider.sign") {
      const signedMessage = await this.accountProvider.sign(payload.Data);
      respPayload.Data = signedMessage;
    } else if (payload.Method === "accountprovider.generateBindingProof") {
      const bindingData = JSON.parse(payload.Data) as Array<string>;
      const bindingProof = await this.accountProvider.generateBindingProof(bindingData[0], parseInt(bindingData[1]));
      respPayload.Data = JSON.stringify(bindingProof);
    }
    return JSON.stringify(respPayload);
  }

  private initIframe = (url): HTMLIFrameElement => {
    console.log("initiframe");
    const iframe = document.createElement('iframe');
    iframe.src = url
    // @ts-ignore
    iframe.style = HIDE_IFRAME_STYLE;
    // @ts-ignore
    iframe.allowTransparency= true;
    // @ts-ignore
    iframe.frameBorder = 0;
    return iframe;
  }

  async setAccountProvider(accountProvider: AccountProvider): Promise<void> {
    console.log("set account provider");
    this.accountProvider = accountProvider;
    this.accountId = (await this.accountProvider.accountId()).toString();
  }

}
