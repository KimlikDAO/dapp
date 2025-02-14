import { BaseEvmProvider, isChrome } from "./evm";
import { Provider } from "/lib/crosschain/provider";

/**
 * @const {!Provider}
 */
const Rabby = /** @type {!Provider} */({
  ...BaseEvmProvider,

  downloadURL: () => isChrome
    ? "//chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch"
    : "//rabby.io",
});

export {
  Rabby
};
