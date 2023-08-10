import { AğBilgileri } from "./ağlar";
import { Bağlantı } from "./bağlantı";

/**
 * @param {!eth.UiProvider} provider
 * @param {string} ağ
 * @return {!Promise<void>}
 */
const ağSeç = (provider, ağ) => provider.request(/** @type {!eth.Request} */({
  method: "wallet_switchEthereumChain",
  params: [/** @type {!eth.SwitchChainParam} */({
    chainId: ağ
  })],
})).catch((e) => {
  /** @const {!AğBilgisi} */
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
 */
const bağla = (provider, ağ, ağDeğişti, adresDeğişti) => {
  if (!provider) return Promise.reject();
  provider.on("accountsChanged", adresDeğişti);
  provider.on("chainChanged", ağDeğişti);

  return provider.request(/** @type {!eth.Request} */({
    method: "eth_requestAccounts"
  })).then((adresler) =>
    ağSeç(provider, ağ).then(() => adresDeğişti(adresler))
  );
}

/**
 * @type {!Bağlantı}
 * @const
 */
const CoreBağlantısı = /** @type {!Bağlantı} */({
  varsaKur: () => {
    /** @const {boolean} */
    const varMı = window?.avalanche?.info?.name == "core";
    if (varMı)
      /** @const {!eth.UiProvider} */
      CoreBağlantısı.provider = window.avalanche;
    return varMı;
  },

  /**
   * @param {string} ağ
   * @param {function(string)} ağDeğişti
   * @param {function(!Array<string>)} adresDeğişti
   * @return {!Promise<void>}
   */
  bağla: (ağ, ağDeğişti, adresDeğişti) => bağla(CoreBağlantısı.provider, ağ, ağDeğişti, adresDeğişti),

  /**
   * @override
   */
  kopar: () => kopar(CoreBağlantısı.provider),

  /**
   * @override
   */
  ağSeç: (ağ) => ağSeç(CoreBağlantısı.provider, ağ),

  /**
   * @return {string}
   */
  indirURLi: () => navigator.userAgent.toLowerCase().includes("chrome")
    ? "//chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb"
    : "//core.app",
});

/** @const {!Bağlantı} */
const MetaMaskBağlantısı = /** @type {!Bağlantı} */({
  varsaKur: () => {
    /** @const {boolean} */
    const varMı = window?.ethereum?.isMetaMask
      && !window?.ethereum?.isRabby;
    if (varMı)
      /** @const {!eth.UiProvider} */
      MetaMaskBağlantısı.provider = window.ethereum;
    return varMı;
  },

  /**
   * @param {string} ağ
   * @param {function(string)} ağDeğişti
   * @param {function(!Array<string>)} adresDeğişti
   * @return {!Promise<void>}
   */
  bağla: (ağ, ağDeğişti, adresDeğişti) => bağla(MetaMaskBağlantısı.provider, ağ, ağDeğişti, adresDeğişti),

  /**
   * @override
   */
  kopar: () => kopar(MetaMaskBağlantısı.provider),

  /**
   * @override
   */
  ağSeç: (ağ) => ağSeç(MetaMaskBağlantısı.provider, ağ),

  indirURLi: () => "//metamask.io"
});

const RabbyBağlantısı = /** @type {Bağlantı} */({
  name: "Rabby",
  varsaKur: () => {
    /** @const {boolean} */
    const varMı = window?.ethereum?.isRabby;
    if (varMı)
      /** @const {!eth.UiProvider} */
      RabbyBağlantısı.provider = window.ethereum;
    return varMı;
  },

  /**
   * @param {string} ağ
   * @param {function(string)} ağDeğişti
   * @param {function(!Array<string>)} adresDeğişti
   * @return {!Promise<void>}
   */
  bağla: (ağ, ağDeğişti, adresDeğişti) => bağla(RabbyBağlantısı.provider, ağ, ağDeğişti, adresDeğişti),

  /**
   * @override
   */
  kopar: () => kopar(RabbyBağlantısı.provider),

  /**
   * @override
   */
  ağSeç: (ağ) => ağSeç(RabbyBağlantısı.provider, ağ),

  indirURLi: () => navigator.userAgent.toLowerCase().includes("chrome")
    ? "//chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch"
    : "//rabby.io",
});

export {
  CoreBağlantısı,
  MetaMaskBağlantısı,
  RabbyBağlantısı
};
