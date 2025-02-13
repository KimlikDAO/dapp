import { BaseEvmProvider } from "./evm";
import "./metamask.d";
import { Provider } from "/lib/crosschain/provider";

/** @const {!Provider} */
const MetaMask = /** @type {!Provider} */({
  /** @return {boolean} */
  initIfAvailable() {
    /** @const {boolean} */
    const isAvailable = !!window.ethereum;
    if (isAvailable)
      /** @const {!eth.UiProvider} */
      this.provider = /** @type {!eth.UiProvider} */(window.ethereum);
    return isAvailable;
  },

  /** @return {string} */
  downloadURL: () => "//metamask.io",
  ...BaseEvmProvider
});

export {
  MetaMask
};
