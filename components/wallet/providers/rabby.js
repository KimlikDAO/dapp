import { BaseEvmProvider, isChrome } from "./evm";
import { Provider } from "/lib/crosschain/provider";
import "./rabby.d";

/**
 * @const {!Provider}
 */
const Rabby = /** @type {!Provider} */({
  /**
   * @return {boolean}
   */
  initIfAvailable() {
    /** @const {boolean} */
    const isAvailable = !!(window.ethereum?.isRabby);
    if (isAvailable)
      /** @const {!eth.UiProvider} */
      this.provider = /** @type {!eth.UiProvider} */(window.ethereum);
    return isAvailable;
  },

  /**
   * @return {string}
   */
  downloadURL: () => isChrome
    ? "//chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch"
    : "//rabby.io",

  ...BaseEvmProvider
});

export {
  Rabby
};
