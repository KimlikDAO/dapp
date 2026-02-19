import { EthereumWalletConnector, extend } from "./ethereum";
import { WalletConnector } from "/lib/crosschain/walletConnector";

/** @type {WalletConnector} */
const MetaMask = extend({
  /**
   * @this {EthereumWalletConnector}
   * @return {string}
   */
  downloadURL: () => "//metamask.io",
});

export { MetaMask };
