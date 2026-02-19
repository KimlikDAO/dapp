import { EthereumWalletConnector, extend } from "./ethereum";
import { WalletConnector } from "/lib/crosschain/walletConnector";
import dom from "/lib/util/dom";

/** @type {WalletConnector} */
const Rabby = extend({
  /**
   * @this {EthereumWalletConnector}
   * @return {string}
   */
  downloadURL: () => dom.IsChrome
    ? "//chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch"
    : "//rabby.io",
});
  
export { Rabby };
