import { BaseEvmProvider, isChrome } from "./evm";
import { Provider } from "/lib/crosschain/provider";

/**
 * @type {!Provider}
 * @const
 */
const Core = /** @type {!Provider} */({
  ...BaseEvmProvider,
  /** @return {string} */
  downloadURL: () => isChrome
    ? "//chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb"
    : "//core.app",
});

export {
  Core
};
