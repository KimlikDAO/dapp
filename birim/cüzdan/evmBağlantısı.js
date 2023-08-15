import { AğBilgisi, AğBilgileri } from "./ağlar";
import { Provider } from "/lib/crosschain/provider";
import { hex } from "/lib/util/çevir";

/**
 * @param {!eth.Provider} provider
 * @param {string} ağ
 * @return {!Promise<void>}
 */
const ağSeç = (provider, ağ) => provider.request(/** @type {!eth.Request} */({
  method: "wallet_switchEthereumChain",
  params: [/** @type {!eth.SwitchChainParam} */({
    chainId: ağ
  })],
})).catch((e) => {
  /**
   * @type {!AğBilgisi}
   * @const
   */
  const ağBilgisi = AğBilgileri[ağ];
  if (e.code == 4902)
    return provider.request(/** @type {!eth.Request} */({
      method: "wallet_addEthereumChain",
      params: [/** @type {!eth.AddChainParam} */({
        chainId: ağ,
        chainName: ağBilgisi.ad,
        nativeCurrency: {
          name: ağBilgisi.token || ağBilgisi.tokenKodu,
          symbol: ağBilgisi.tokenKodu,
          decimals: 18
        },
        rpcUrls: ["https://" + ağBilgisi.rpcUrl],
        blockExplorerUrls: ["https://" + ağBilgisi.izleyici]
      })]
    }));
});

/**
 * @param {!eth.UiProvider} provider
 */
const kopar = (provider) => provider.removeAllListeners();

/**
 * @param {!eth.UiProvider} provider
 * @param {string} ağ
 * @param {function(string)} ağDeğişti
 * @param {function(!Array<string>)} adresDeğişti
 * @param {boolean=} izinliyse
 * @return {!Promise<void>}
 */
const bağla = (provider, ağ, ağDeğişti, adresDeğişti, izinliyse) => provider
  ? izinliyse
    ? provider.request(/** @type {!eth.Request} */({
      method: "eth_accounts"
    })).then((adresler) => {
      if (!adresler || !adresler.length) return Promise.reject();
      adresDeğişti(adresler);
      provider.request(/** @type {!eth.Request} */({
        method: "eth_chainId"
      })).then((ağ) => {
        ağDeğişti(ağ);
        provider.on("accountsChanged", adresDeğişti);
        provider.on("chainChanged", ağDeğişti);
      })
    })
    : provider.request(/** @type {!eth.Request} */({
      method: "eth_requestAccounts"
    })).then((adresler) =>
      ağSeç(provider, ağ).then(() => {
        provider.on("accountsChanged", adresDeğişti);
        provider.on("chainChanged", ağDeğişti);
        adresDeğişti(adresler);
      })
    )
  : Promise.reject();

/**
 * @param {!eth.Provider} provider
 * @param {string} metin
 * @param {string} adres
 * @param {boolean} hexeÇevir
 * @return {!Promise<string>}
 */
const imzala = (provider, metin, adres, hexeÇevir) => provider.request(
  /** @type {!eth.Request} */({
    method: "personal_sign",
    params: [hexeÇevir
      ? "0x" + hex(new TextEncoder().encode(metin))
      : metin, adres]
  }));

/**
 * @type {!Provider}
 * @const
 */
const CoreBağlantısı = /** @type {!Provider} */({
  /**
   * @override
   *
   * @return {boolean}
   */
  initIfAvailable: () => {
    /** @const {boolean} */
    const varMı = !!(window?.avalanche?.info?.name == "core");
    if (varMı)
      /** @const {!eth.UiProvider} */
      CoreBağlantısı.provider = /** @type {!eth.UiProvider} */(window.avalanche);
    return varMı;
  },

  /**
   * @override
   *
   * @return {string}
   */
  downloadURL: () => navigator.userAgent.toLowerCase().includes("chrome")
    ? "//chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb"
    : "//core.app",

  /**
   * @override
   *
   * @param {string} chain
   * @param {function(string)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {!Promise<void>}
   */
  connect: (chain, chainChanged, addressChanged, onlyIfApproved) =>
    bağla(CoreBağlantısı.provider, chain, chainChanged, addressChanged, onlyIfApproved),

  /**
   * @override
   */
  disconnect: () => kopar(CoreBağlantısı.provider),

  /**
   * @override
   *
   * @param {string} chain
   */
  switchChain: (chain) => ağSeç(CoreBağlantısı.provider, chain),

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<string>}
   */
  signMessage: (message, address) =>
    imzala(CoreBağlantısı.provider, message, address, true)
});

/** @const {!Provider} */
const MetaMaskBağlantısı = /** @type {!Provider} */({
  initIfAvailable: () => {
    /** @const {boolean} */
    const varMı = !!(window?.ethereum
      && !window?.ethereum?.isRabby
      && !window?.avalanche)
    if (varMı)
      /** @const {!eth.UiProvider} */
      MetaMaskBağlantısı.provider = /** @type {!eth.UiProvider} */(window.ethereum);
    return varMı;
  },

  /**
   * @override
   *
   * @return {string}
   */
  downloadURL: () => "//metamask.io",

  /**
   * @override
   *
   * @param {string} chain
   * @param {function(string)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {!Promise<void>}
   */
  connect: (chain, chainChanged, addressChanged, onlyIfApproved) =>
    bağla(MetaMaskBağlantısı.provider, chain, chainChanged, addressChanged, onlyIfApproved),

  /**
   * @override
   */
  disconnect: () => kopar(MetaMaskBağlantısı.provider),

  /**
   * @override
   *
   * @param {string} chain
   */
  switchChain: (chain) => ağSeç(MetaMaskBağlantısı.provider, chain),

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<string>}
   */
  signMessage: (message, address) =>
    imzala(MetaMaskBağlantısı.provider, message, address, false)
});

/**
 * @const {!Provider}
 */
const RabbyBağlantısı = /** @type {!Provider} */({
  /**
   * @override
   *
   * @return {boolean}
   */
  initIfAvailable: () => {
    /** @const {boolean} */
    const varMı = !!(window?.ethereum?.isRabby);
    if (varMı)
      /** @const {!eth.UiProvider} */
      RabbyBağlantısı.provider = /** @type {!eth.UiProvider} */(window.ethereum);
    return varMı;
  },

  /**
   * @override
   *
   * @return {string}
   */
  downloadURL: () => navigator.userAgent.toLowerCase().includes("chrome")
    ? "//chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch"
    : "//rabby.io",

  /**
   * @override
   *
   * @param {string} chain
   * @param {function(string)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {!Promise<void>}
   */
  connect: (chain, chainChanged, addressChanged, onlyIfApproved) =>
    bağla(RabbyBağlantısı.provider, chain, chainChanged, addressChanged, onlyIfApproved),

  /**
   * @override
   */
  disconnect: () => kopar(RabbyBağlantısı.provider),

  /**
   * @override
   *
   * @param {string} chain
   */
  switchChain: (chain) => ağSeç(RabbyBağlantısı.provider, chain),

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<string>}
   */
  signMessage: (message, address) =>
    imzala(RabbyBağlantısı.provider, message, address, false)
});

export {
  CoreBağlantısı,
  MetaMaskBağlantısı,
  RabbyBağlantısı
};
