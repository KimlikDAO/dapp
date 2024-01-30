import { ChainId } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";

/**
 * @param {!mina.Provider} provider
 * @param {ChainId} chainId
 * @param {function(ChainId)} chainChanged
 * @param {function(!Array<string>)} addressChanged
 * @param {boolean=} onlyIfApproved
 * @return {!Promise<void>}
 */
const connectWithProvider = (provider, chainId, chainChanged, addressChanged, onlyIfApproved) => onlyIfApproved
  ? provider.getAccounts()
    .then((addresses) => {
      if (!addresses || !addresses.length) return Promise.reject();
      addressChanged(addresses);
      provider.requestNetwork()
        .then((/** @type {!mina.ChainInfoArgs} */ chainInfo) => {
          chainChanged(/** @type {ChainId} */("m:" + chainInfo.chainId));
          provider.on("accountsChanged", addressChanged);
          provider.on("chainChanged",
            (/** @type {!mina.ChainInfoArgs} */ chainInfo) =>
              chainChanged(/** @type {ChainId} */("m:" + chainInfo.chainId))
          );
        })
    })
  : provider.requestAccounts()
    .then((addresses) => provider.switchChain(/** @type {!mina.SwitchChainArgs} */({
      chainId: chainId.slice(2)
    }))
      .then(() => {
        provider.on("accountsChanged", addressChanged);
        provider.on("chainChanged",
          (/** @type {!mina.ChainInfoArgs} */ chainInfo) =>
            chainChanged(/** @type {ChainId} */("m:" + chainInfo.chainId))
        );
        addressChanged(addresses);
      })
    );

/**
 * @param {!mina.Provider} provider
 */
const disconnectWithProvider = (provider) => {
  provider.on("accountChanged", () => { });
  provider.on("chainChanged", () => { });
}

/**
 * @type {!Provider}
 * @const
 */
const AuroConnection = /** @type {!Provider} */({
  /**
   * @override
   *
   * @return {boolean}
   */
  initIfAvailable: () => {
    /** @const {boolean} */
    const varMı = !!(window?.mina?.isAuro);
    if (varMı)
      /** @type {!mina.Provider} */
      AuroConnection.provider = /** @type {!mina.Provider} */(window.mina);
    return varMı;
  },

  /**
   * @return {string}
   */
  downloadURL: () => "//aurowallet.com",

  /**
   * @override
   *
   * @param {ChainId} chainId
   * @param {function(ChainId)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {!Promise<void>}
   */
  connect: (chainId, chainChanged, addressChanged, onlyIfApproved) =>
    connectWithProvider(AuroConnection.provider, chainId, chainChanged, addressChanged, onlyIfApproved),

  /**
   * @override
   */
  disconnect: () => disconnectWithProvider(AuroConnection.provider),

  /**
   * @override
   *
   * @param {ChainId} chainId
   * @return {!Promise<void>}
   */
  switchChain: (chainId) => AuroConnection.provider.switchChain(
    /** @type {!mina.SwitchChainArgs} */({
      chainId: chainId.slice(2)
    })
  ).then((_) => { }),

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<string>}
   */
  signMessage: (message, address) => AuroConnection.provider.signMessage(
    /** @type {!mina.SignMessageArgs} */({
      message
    }))
    .then((/** @type {!mina.SignedData} */ signed) =>
      signed.signature.field + signed.signature.scalar),
});

export { AuroConnection };
