/// <reference types="react-scripts" />
import { Keplr, getOfflineSigner } from '@keplr-wallet/types';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    keplr?:Keplr;
    getOfflineSigner?:getOfflineSigner;
  }
}
