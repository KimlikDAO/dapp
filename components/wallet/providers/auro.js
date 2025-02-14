import "./auro.d";
import { ChainId } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";
import { Signature } from "/lib/mina/mina";

/**
 * @type {!Provider}
 * @const
 */
const Auro = /** @type {!Provider} */({
  /**
   * @override
   *
   * @return {boolean}
   */
  isInitialized: () => {
    /** @const {boolean} */
    const isAvailable = !!(window?.mina?.isAuro);
    if (isAvailable)
      /** @type {!mina.Provider} */
      Auro.nativeProvider = /** @type {!mina.Provider} */(window.mina);
    return isAvailable;
  },

  /**
   * @return {string}
   */
  downloadURL: () => "//aurowallet.com",

  /**
   * @param {ChainId} chainId
   * @param {function(ChainId)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {!Promise<void>}
   */
  connect: (chainId, chainChanged, addressChanged, onlyIfApproved) => onlyIfApproved
    ? Auro.nativeProvider.getAccounts()
      .then((addresses) => {
        if (!addresses || !addresses.length) return Promise.reject();
        Auro.nativeProvider.requestNetwork()
          .then((/** @type {!mina.ChainInfoArgs} */ chainInfo) => {
            chainChanged(/** @type {ChainId} */(chainInfo.networkID));
            addressChanged(addresses);
            Auro.nativeProvider.on("accountsChanged", addressChanged);
            Auro.nativeProvider.on("chainChanged",
              (/** @type {!mina.ChainInfoArgs} */ chainInfo) =>
                chainChanged(/** @type {ChainId} */(chainInfo.networkID))
            );
          })
      })
    : Auro.nativeProvider.requestAccounts()
      .then((addresses) => Auro.nativeProvider.switchChain(/** @type {!mina.SwitchChainArgs} */({
        networkID: chainId
      }))
        .then(() => {
          Auro.nativeProvider.on("accountsChanged", addressChanged);
          Auro.nativeProvider.on("chainChanged",
            (/** @type {!mina.ChainInfoArgs} */ chainInfo) =>
              chainChanged(/** @type {ChainId} */(chainInfo.networkID))
          );
          addressChanged(addresses);
        })
      ),

  disconnect() {
    Auro.nativeProvider.on("accountChanged", () => { });
    Auro.nativeProvider.on("chainChanged", () => { });
  },

  /**
   * @override
   *
   * @param {ChainId} chainId
   * @return {!Promise<void>}
   */
  switchChain: (chainId) => Auro.nativeProvider.switchChain(
    /** @type {!mina.SwitchChainArgs} */({
      networkID: chainId
    })
  ).then((_) => { }),

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<mina.SignerSignature>}
   */
  signMessage: (message, address) => Auro.nativeProvider.signMessage(
      /** @type {mina.SignMessageArgs} */({
      message
    }))
    .then((/** @type {mina.SignedData} */ signed) => /** @type {mina.SignerSignature} */({
      signer: signed.publicKey,
      signature: new Signature(BigInt(signed.signature.field), BigInt(signed.signature.scalar)).toBase58()
    })),

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<!ArrayBuffer>}
   */
  deriveSecret: (message, address) => Auro.nativeProvider.signMessage(
    /** @type {mina.SignMessageArgs} */({
      message
    }))
    .then((/** @type {mina.SignedData} */ signed) => crypto.subtle.digest(
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
