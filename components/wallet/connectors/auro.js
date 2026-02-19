import "./auro.d";
import { ChainId } from "/lib/crosschain/chains";
import { WalletConnector } from "/lib/crosschain/walletConnector";
import {
  ChainInfoArgs,
  Provider as MinaProvider,
  SignedData,
  SignMessageArgs,
  SwitchChainArgs,
} from "/lib/mina/provider.d";
import signature from "/lib/mina/signature";
import { SignerSignature } from "/lib/mina/signature.d";

/** @type {MinaProvider | undefined} */
let Provider;

/** @const {WalletConnector} */
const Auro = /** @type {WalletConnector} */({
  /**
   * @override
   *
   * @return {boolean}
   */
  isInitialized: () => {
    /** @const {boolean} */
    const isAvailable = !!(window?.mina?.isAuro);
    if (isAvailable)
      Provider = /** @type {MinaProvider} */(window.mina);
    return isAvailable;
  },

  /**
   * @override
   * @return {string}
   */
  downloadURL: () => "//aurowallet.com",

  /**
   * @param {ChainId} chainId
   * @param {(chainId: ChainId) => void} chainChanged
   * @param {(addresses: string[]) => void} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {Promise<void>}
   */
  connect: (chainId, chainChanged, addressChanged, onlyIfApproved) => onlyIfApproved
    ? Provider
      .getAccounts()
      .then((addresses) => {
        if (!addresses || !addresses.length) return Promise.reject();
        Provider.requestNetwork()
          .then((/** @type {ChainInfoArgs} */ chainInfo) => {
            chainChanged(/** @type {ChainId} */(chainInfo.networkID));
            addressChanged(addresses);
            Provider.on("accountsChanged", /** @type {(data?: unknown) => void} */(addressChanged));
            Provider.on("chainChanged", (chainInfo) =>
                chainChanged(/** @type {ChainId} */(/** @type {ChainInfoArgs} */(chainInfo).networkID))
            );
          })
      })
    : Provider
      .requestAccounts()
      .then((addresses) => Provider
        .switchChain(/** @type {SwitchChainArgs} */({
          networkID: chainId
        }))
        .then(() => {
          Provider.on("accountsChanged", /** @type {(data?: unknown) => void} */(addressChanged));
          Provider.on("chainChanged", (chainInfo) =>
            chainChanged(/** @type {ChainId} */(/** @type {ChainInfoArgs} */(chainInfo).networkID))
          );
          addressChanged(addresses);
        })
      ),

  /** @override */
  disconnect() {
    Provider.on("accountChanged", () => { });
    Provider.on("chainChanged", () => { });
  },

  /**
   * @override
   *
   * @param {ChainId} chainId
   * @return {Promise<void>}
   */
  switchChain: (chainId) => Provider
    .switchChain(
      /** @type {SwitchChainArgs} */({
        networkID: chainId
      }))
    .then((_) => { }),

  /**
   * @override
   *
   * @param {string} message
   * @param {string} _address
   * @return {Promise<SignerSignature>}
   */
  signMessage: (message, _address) => Provider.signMessage(
    /** @type {SignMessageArgs} */({
      message
    }))
    .then((/** @type {SignedData} */ signed) => /** @type {SignerSignature} */({
      signer: signed.publicKey,
      signature: signature.fromUnpacked({ r: BigInt(signed.signature.field), s: BigInt(signed.signature.scalar) })
    })),

  /**
   * @override
   *
   * @param {string} message
   * @param {string} _address
   * @return {Promise<ArrayBuffer>}
   */
  deriveSecret: (message, _address) => Provider.signMessage(
    /** @type {SignMessageArgs} */({
      message
    }))
    .then((/** @type {SignedData} */ signed) => crypto.subtle.digest(
      "SHA-256", new TextEncoder().encode(signed.signature.field + signed.signature.scalar))),

  /**
   * @override
   *
   * @param {ChainId} chainId
   * @return {boolean}
   */
  isChainSupported: (chainId) => chainId == ChainId.MinaMainnet
});

export { Auro };
