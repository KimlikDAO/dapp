import { BaseEvmProvider, isChrome } from "./evm";
import { Provider } from "/lib/crosschain/provider";
import "./core.d";

/**
 * @type {!Provider}
 * @const
 */
const Core = /** @type {!Provider} */({
  /** @return {boolean} */
  initIfAvailable() {
    /** @const {boolean} */
    const isAvailable = window.avalanche?.info?.name === 'core';
    if (isAvailable)
      /** @const {!eth.UiProvider} */
      this.provider = /** @type {!eth.UiProvider} */(window.avalanche);
    return isAvailable;
  },

  /** @return {string} */
  downloadURL: () => isChrome
    ? "//chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb"
    : "//core.app",

  ...BaseEvmProvider
});

export {
  Core
};
