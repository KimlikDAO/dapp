import { ChainId } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";

/**
 * @interface
 * @struct
 */
class IDummyProvider extends Provider {
  /**
   * @param {ChainId} chainId
   */
  chainChanged(chainId) { }

  /**
   * @param {!Array<string>} addresses
   */
  addressChanged(addresses) { }
}

/**
 * @type {!IDummyProvider}
 */
const Dummy = /** @type {!IDummyProvider} */({
  /**
   * @override
   *
   * @return {boolean}
   */
  initIfAvailable: () => true,

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
  connect: (chain, chainChanged, addressChanged, onlyIfApproved) => {
    Dummy.chainChanged = chainChanged;
    Dummy.addressChanged = addressChanged;
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
    Dummy.chainChanged(chainId);
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
