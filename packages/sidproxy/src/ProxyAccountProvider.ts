import { AccountProvider } from "@saonetwork/sid/dist/account_provider";
import { DidTxTypes } from "@saonetwork/saochain-ts-client";
import { AccountId } from "caip";
import { filter, fromEvent, map, Observable } from "rxjs";
import { v4 as uuidv4 } from "uuid";

class ProxyAccountProvider implements AccountProvider {
  private target: Window;
  private messageSource: Observable<ProxyPayload>;

  constructor(target: Window = window.parent) {
    this.target = target;

    this.messageSource = fromEvent<MessageEvent>(target, 'message').pipe(
      filter(f => {
        try {
          const payload = JSON.parse(f.data) as ProxyPayload
          if (payload.Id == 0) {
            return false;
          }
          return true;
        } catch (error) {
          return false;
        }
      }),
      map(f => {
        return JSON.parse(f.data) as ProxyPayload
      }),
    );
  }

  accountId(): Promise<AccountId> {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const payload: ProxyPayload = {
        Id: id,
        Method: "accountprovider.accountid",
        Data: "",
      };
      try {
        this.target.postMessage(payload, '*');
        const sub = this.messageSource.subscribe({
          next(value) {
            if (value.Id === payload.Id && value.Method === payload.Method) {
              if (sub) {
                sub.unsubscribe();
              }
              resolve(new AccountId(value.Data));
              return;
            }
          },
          complete() {
            console.log("accountprovider.accountid complete");
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  sign(message: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const payload: ProxyPayload = {
        Id: id,
        Method: "accountprovider.sign",
        Data: message,
      };
      try {
        this.target.postMessage(payload, '*');
        const sub = this.messageSource.subscribe({
          next(value) {
            if (value.Id === payload.Id && value.Method === payload.Method) {
              if (sub) {
                sub.unsubscribe();
              }
              resolve(value.Data);
              return;
            }
          },
          complete() {
            console.log("accountprovider.sign complete");
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  generateBindingProof(did: string, timestamp: number): Promise<DidTxTypes.BindingProof> {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const payload: ProxyPayload = {
        Id: id,
        Method: "accountprovider.generateBindingProof",
        Data: JSON.stringify([did, timestamp + ""]),
      };
      try {
        this.target.postMessage(payload, '*');
      } catch (error) {
        const sub = this.messageSource.subscribe({
          next(value) {
            if (value.Id === payload.Id && value.Method === payload.Method) {
              if (sub) {
                sub.unsubscribe();
              }
              resolve(JSON.parse(value.Data) as DidTxTypes.BindingProof);
              return;
            }
          },
          complete() {
            console.log("accountprovider.generateBindingProo complete");
          },
        });
        reject(error);
      }
    });
  }

}
