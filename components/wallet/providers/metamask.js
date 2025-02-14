import { BaseEvmProvider } from "./evm";
import { Provider } from "/lib/crosschain/provider";

/** @const {!Provider} */
const MetaMask = /** @type {!Provider} */({
  ...BaseEvmProvider,
  /** @return {string} */
  downloadURL: () => "//metamask.io",
});

export {
  MetaMask
};
