import Css from "./birim.css";
import { CoreBağlantısı, MetaMaskBağlantısı, RabbyBağlantısı } from "./evmBağlantısı";
import { AuroConnection as AuroBağlantısı } from "./minaBağlantısı";
import { ChainId, ChainGroup } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";
import { Image } from "/lib/kastro/image";



/** @const {!Object<string, !Provider>} */
const Bağlantılar = {
  [BağlantıAdı.Core]: CoreBağlantısı,
  [BağlantıAdı.Rabby]: RabbyBağlantısı,
  [BağlantıAdı.MetaMask]: MetaMaskBağlantısı,
  [BağlantıAdı.Auro]: AuroBağlantısı,
};

/** @type {function(ChainId)} */
let AğDeğişti;
/** @type {function(!Array<string>)} */
let AdresDeğişti;

/**
 * @type {!Provider}
 * @const
 */
const BoşBağlantı = /** @type {!Provider} */({
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
   * @param {ChainId} chain
   * @param {function(ChainId)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {!Promise<void>}
   */
  connect: (chain, chainChanged, addressChanged, onlyIfApproved) => {
    AğDeğişti = chainChanged;
    AdresDeğişti = addressChanged;
    return Promise.resolve();
  },

  /**
   * @override
   */
  disconnect() { },

  /**
   * @override
   *
   * @param {ChainId} ağ
   * @return {!Promise<void>}
   */
  switchChain(ağ) {
    AğDeğişti(ağ);
    return Promise.resolve();
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
  Bağlantı,
  BağlantıAdı,
  Bağlantılar,
  BoşBağlantı,
  EvmBağlantıları,
  MinaBağlantıları
};
