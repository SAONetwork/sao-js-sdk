export * from "./chain_switch";
import { Keplr } from "@keplr-wallet/types";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    keplr?: Keplr;
  }
}
