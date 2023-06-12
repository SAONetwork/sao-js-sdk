import { SaoAccountProvider } from "@saonetwork/sid";
const HIDE_IFRAME_STYLE = 'position: fixed; width:0; height:0; border:0; border:none !important'
const IFRAME_URL = "";

export class SidProxy {
  iframe: HTMLIFrameElement
  accountProvider: SaoAccountProvider | undefined
  accountId: string | undefined

  constructor() {
    this.iframe = this.initIframe(IFRAME_URL);
    document.body.appendChild(this.iframe);
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

  async setAccountProvider(accountProvider: SaoAccountProvider): Promise<void> {
    this.accountProvider = accountProvider;
    this.accountId = (await this.accountProvider.accountId()).toString();
  }

  async authenticate(): Promise<void> {

  }

}
