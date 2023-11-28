export * from "./chain_switch";
export * from "./chainlink";
import { Keplr } from "@keplr-wallet/types";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    keplr?: Keplr;
  }
}
