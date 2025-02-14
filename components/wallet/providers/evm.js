import { ChainInfo, ChainInfos } from "/components/chains/chains";
import { ChainGroup, ChainId } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";
import evm from "/lib/ethereum/evm";
import hex from "/lib/util/hex";

/** @const {!Provider} */
const BaseEvmProvider = /** @type {!Provider} */({

  isInitialized() {
    return !!this.nativeProvider;
  },

  /**
   * @noinline
   * @param {ChainId} chainId
   * @return {!Promise<void>}
   */
  switchChain(chainId) {
    return this.nativeProvider.request(/** @type {!eth.Request} */({
      method: "wallet_switchEthereumChain",
      params: [/** @type {!eth.SwitchChainParam} */({
        chainId
      })],
    })).catch((e) => {
      /**
       * @type {!ChainInfo}
       * @const
       */
      const chainInfo = ChainInfos[chainId];
      if (/** @type {eth.ProviderRpcError} */(e).code == 4902)
        return this.nativeProvider.request(/** @type {!eth.Request} */({
          method: "wallet_addEthereumChain",
          params: [/** @type {!eth.AddChainParam} */({
            chainId: chainId,
            chainName: chainInfo.uiName,
            nativeCurrency: {
              name: chainInfo.token || chainInfo.tokenCode,
              symbol: chainInfo.tokenCode,
              decimals: 18
            },
            rpcUrls: ["https://" + chainInfo.rpcUrl],
            blockExplorerUrls: ["https://" + chainInfo.explorer]
          })]
        }));
    });
  },

  disconnect() {
    this.nativeProvider.removeAllListeners();
  },

  /**
   * @param {ChainId} chainId
   * @return {boolean}
   */
  isChainSupported(chainId) {
    return chainId.startsWith(ChainGroup.EVM);
  },

  /**
   * @noinline
   * @param {ChainId} chainId
   * @param {function(ChainId)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {!Promise<void>}
   */
  connect(chainId, chainChanged, addressChanged, onlyIfApproved) {
    if (!this.nativeProvider) return Promise.reject();
    return onlyIfApproved
      ? this.nativeProvider.request(/** @type {!eth.Request} */({
        method: "eth_accounts"
      })).then((addresses) => {
        if (!addresses || !addresses.length) return Promise.reject();
        addressChanged(addresses);
        this.nativeProvider.request(/** @type {!eth.Request} */({
          method: "eth_chainId"
        })).then((chainId) => {
          chainChanged(chainId);
          this.nativeProvider.on("accountsChanged", addressChanged);
          this.nativeProvider.on("chainChanged", chainChanged);
        })
      })
      : this.nativeProvider.request(/** @type {!eth.Request} */({
        method: "eth_requestAccounts"
      })).then((addresses) =>
        this.switchChain(chainId).then(() => {
          this.nativeProvider.on("accountsChanged", addressChanged);
          this.nativeProvider.on("chainChanged", chainChanged);
          addressChanged(addresses);
        })
      )
  },

  setNativeProvider(nativeProvider) {
    this.nativeProvider = nativeProvider;
  },

  /**
   * @noinline
   * @param {string} text
   * @param {string} address
   * @param {boolean} hexEncode
   * @return {!Promise<eth.CompactSignature>}
   */
  signMessage(text, address, hexEncode) {
    return this.nativeProvider.request(
      /** @type {!eth.Request} */({
        method: "personal_sign",
        params: [hexEncode
          ? "0x" + hex.from(new TextEncoder().encode(text))
          : text, address]
      }))
      .then((signature) => evm.compactSignature(signature));
  },

  /**
   * @noinline
   * @param {string} text
   * @param {string} address
   * @param {boolean} hexEncode
   * @return {!Promise<!ArrayBuffer>}
   */
  deriveSecret(text, address, hexEncode) {
    return this.nativeProvider.request(
      /** @type {!eth.Request} */({
        method: "personal_sign",
        params: [hexEncode
          ? "0x" + hex.from(new TextEncoder().encode(text))
          : text, address]
      }))
      .then((signature) => crypto.subtle.digest("SHA-256", hex.toUint8Array(signature.slice(2))));
  }
});

/**
 * @const {boolean}
 */
const isChrome = navigator.userAgent.toLowerCase().includes("chrome");

export {
  isChrome,
  BaseEvmProvider
};
