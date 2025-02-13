import "./auro.d";
import { ChainGroup, ChainId } from "/lib/crosschain/chains";
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
  initIfAvailable() {
    /** @const {boolean} */
    const isAvailable = !!(window?.mina?.isAuro);
    if (isAvailable)
      /** @type {!mina.Provider} */
      this.provider = /** @type {!mina.Provider} */(window.mina);
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
  connect(chainId, chainChanged, addressChanged, onlyIfApproved) {
    return onlyIfApproved
      ? this.provider.getAccounts()
        .then((addresses) => {
          if (!addresses || !addresses.length) return Promise.reject();
          this.provider.requestNetwork()
            .then((/** @type {!mina.ChainInfoArgs} */ chainInfo) => {
              chainChanged(/** @type {ChainId} */(chainInfo.networkID));
              addressChanged(addresses);
              this.provider.on("accountsChanged", addressChanged);
              this.provider.on("chainChanged",
                (/** @type {!mina.ChainInfoArgs} */ chainInfo) =>
                  chainChanged(/** @type {ChainId} */(chainInfo.networkID))
              );
            })
        })
      : this.provider.requestAccounts()
        .then((addresses) => this.provider.switchChain(/** @type {!mina.SwitchChainArgs} */({
          networkID: chainId
        }))
          .then(() => {
            this.provider.on("accountsChanged", addressChanged);
            this.provider.on("chainChanged",
              (/** @type {!mina.ChainInfoArgs} */ chainInfo) =>
                chainChanged(/** @type {ChainId} */(chainInfo.networkID))
            );
            addressChanged(addresses);
          })
        );
  },

  disconnect() {
    this.provider.on("accountChanged", () => { });
    this.provider.on("chainChanged", () => { });
  },

  /**
   * @override
   *
   * @param {ChainId} chainId
   * @return {!Promise<void>}
   */
  switchChain(chainId) {
    return this.provider.switchChain(
    /** @type {!mina.SwitchChainArgs} */({
        networkID: chainId
      })
    ).then((_) => { });
  },

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<mina.SignerSignature>}
   */
  signMessage(message, address) {
    return this.provider.signMessage(
      /** @type {mina.SignMessageArgs} */({
        message
      }))
      .then((/** @type {mina.SignedData} */ signed) => /** @type {mina.SignerSignature} */({
        signer: signed.publicKey,
        signature: new Signature(BigInt(signed.signature.field), BigInt(signed.signature.scalar)).toBase58()
      }));
  },

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<!ArrayBuffer>}
   */
  deriveSecret: (message, address) => Auro.provider.signMessage(
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
  isChainSupported: (chainId) => chainId.startsWith(ChainGroup.MINA)
});

export { Auro };
