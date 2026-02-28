import { EthereumWalletConnector, extend } from "./ethereum";
import { WalletConnector } from "/lib/crosschain/walletConnector";
import dom from "../../../lib/kastro/dom";

/** @type {WalletConnector} */
const Core = extend({
  /**
   * @this {EthereumWalletConnector}
   * @return {string}
   */
  downloadURL: () => dom.IsChrome
    ? "//chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb"
    : "//core.app",
});

export { Core };
