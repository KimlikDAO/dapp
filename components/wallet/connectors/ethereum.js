import { ChainInfo, ChainInfos } from "/components/chains/chains";
import { ChainGroup, ChainId } from "/lib/crosschain/chains";
import { Signature } from "/lib/crosschain/signer";
import { Provider, WalletConnector } from "/lib/crosschain/walletConnector";
import {
  AddChainParam,
  EIP1193Provider as EthereumProvider,
  RequestArguments,
  SwitchChainParam,
  ProviderRpcError
} from "/lib/ethereum/provider.d";
import signature from "/lib/ethereum/signature";
import hex from "/lib/util/hex";
import { WideSignature } from "/lib/ethereum/signature.d";

/** 
 * @abstract
 * @implements {WalletConnector}
 */
class EthereumWalletConnector {
  /** @const {EthereumProvider | null} */
  provider;

  isInitialized() {
    return !!this.provider;
  }

  /** @param {Provider} provider */
  setProvider(provider) {
    this.provider = /** @type {EthereumProvider} */(provider);
  }

  /**
   * @noinline
   * @param {ChainId} chainId
   * @return {Promise<unknown>}
   */
  switchChain(chainId) {
    return this.provider.request(/** @type {RequestArguments} */({
      method: "wallet_switchEthereumChain",
      params: [/** @type {SwitchChainParam} */({
        chainId
      })],
    })).catch((e) => {
      /**
       * @type {ChainInfo}
       * @const
       */
      const chainInfo = ChainInfos[chainId];
      if (/** @type {ProviderRpcError} */(e).code == 4902)
        return this.provider.request(/** @type {RequestArguments} */({
          method: "wallet_addEthereumChain",
          params: [/** @type {AddChainParam} */({
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
  }

  /**
   * @param {ChainId} chainId
   * @return {boolean}
   */
  isChainSupported(chainId) {
    return chainId.startsWith(ChainGroup.EVM);
  }

  /**
   * @noinline
   * @param {ChainId} chainId
   * @param {(chainId: ChainId) => void} chainChanged
   * @param {(addresses: string[]) => void} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {Promise<void>}
   */
  connect(chainId, chainChanged, addressChanged, onlyIfApproved) {
    if (!this.provider) return Promise.reject();
    return onlyIfApproved
      ? this.provider.request(/** @type {RequestArguments} */({
        method: "eth_accounts"
      })).then((/** @type {string[] | string} */ addresses) => {
        if (!addresses || !addresses.length) return Promise.reject();
        addressChanged(/** @type {string[]} */(addresses));
        this.provider.request(/** @type {RequestArguments} */({
          method: "eth_chainId"
        })).then((chainId) => {
          chainChanged(/** @type {ChainId} */(chainId));
          this.provider.on("accountsChanged", addressChanged);
          this.provider.on("chainChanged", chainChanged);
        })
      })
      : this.provider.request(/** @type {RequestArguments} */({
        method: "eth_requestAccounts"
      })).then((addresses) =>
        this.switchChain(chainId).then(() => {
          this.provider.on("accountsChanged", addressChanged);
          this.provider.on("chainChanged", chainChanged);
          addressChanged(/** @type {string[]} */(addresses));
        })
      )
  }

  disconnect() {
    this.provider.removeAllListeners();
  }

  /**
   * @noinline
   * @param {string} text
   * @param {string} address
   * @return {Promise<Signature>}
   */
  signMessage(text, address) {
    return this.provider.request(
      /** @type {RequestArguments} */({
        method: "personal_sign",
        params: ["0x" + hex.from(new TextEncoder().encode(text)), address]
      }))
      .then((sig) => signature.fromWide(/** @type {WideSignature} */(sig)));
  }

  /**
   * @noinline
   * @param {string} text
   * @param {string} address
   * @return {Promise<ArrayBuffer>}
   */
  deriveSecret(text, address) {
    return this.provider.request(
      /** @type {RequestArguments} */({
        method: "personal_sign",
        params: ["0x" + hex.from(new TextEncoder().encode(text)), address]
      }))
      .then((sig) => crypto.subtle.digest("SHA-256", hex.toUint8Array(sig.slice(2))));
  }
}

/**
 * @param {Object} obj
 * @return {EthereumWalletConnector}
 */
const extend = (obj) => /** @type {EthereumWalletConnector} */(
  Object.assign(Object.create(EthereumWalletConnector.prototype), obj));

export {
  EthereumWalletConnector,
  extend
};
