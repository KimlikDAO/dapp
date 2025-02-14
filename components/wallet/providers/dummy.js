import { ChainId } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";

/**
 * @type {!Provider}
 */
const Dummy = /** @type {!Provider} */({
  isInitialized: () => true,
  setNativeProvider: () => { },

  /**
   * @return {string}
   */
  downloadURL: () => "",

  /**
   * @override
   *
   * @param {function(ChainId)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @param {ChainId} chain
   * @param {boolean=} onlyIfApproved
   * @return {Promise<void>|void}
   */
  connect(chain, chainChanged, addressChanged, onlyIfApproved) {
    this.chainChanged = chainChanged;
  },

  /**
   * @override
   */
  disconnect() { },

  /**
   * @override
   *
   * @param {ChainId} chainId
   * @return {Promise<void>|void}
   */
  switchChain(chainId) {
    this.chainChanged(chainId);
  },

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<string>}
   */
  signMessage: (message, address) => Promise.reject(),

  /**
   * @override
   *
   * @param {ChainId} _
   */
  isChainSupported: (_) => true
});

export {
  Dummy
};
