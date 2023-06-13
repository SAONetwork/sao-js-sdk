import { fromEvent } from 'rxjs';
import { tap, filter, map} from 'rxjs/operators';

export class SidProxyServer {
  constructor() {
    console.log("init sid proxy server");
  }

  Start(target) {
    // start message listener to handle auth/create jws
    const source = fromEvent<MessageEvent>(target, 'message');
    source.pipe(map(message => {
      // handle request
      console.log(message);
      return {
        response: "",
        message: "",
      }
    }), tap((payload) => {
        if (payload.response != null) {
            // const source = payload.message.source ?? window;
            // source.postMessage(payload.response, payload.message.origin || '*');
        }
    }));
  }
}
