import { Provider } from "/lib/crosschain/provider";

const LedgerVendorId = 0x2c97;

/**
 * @const {!Provider}
 */
const LedgerBağlantısı = /** @type {!Provider} */({
  /**
   * @override
   *
   * @return {boolean}
   */
  initIfAvailable: () => {
    if ("hid" in navigator) {
      LedgerBağlantısı.hid = navigator.hid;
      return true;
    }
    return false;
  },

  downloadURL: () => "https://twitter.com/KimlikDAO",

  /**
   * @override
   *
   * @return {!Promise<void>}
   */
  connect: (chain, chainChanged, addressChanged, onlyIfApproved) => {
    LedgerBağlantısı.chainChanged = chainChanged;
    LedgerBağlantısı.chain = chain;
    chainChanged(chain);
    return LedgerBağlantısı.hid.getDevices()
      .then((devices) => {
        /** @const {!Array<!HIDDevice>} */
        const approvedDevices = devices.filter(
          (device) => device.vendorId == LedgerVendorId)
        return approvedDevices.length
          ? approvedDevices
          : LedgerBağlantısı.hid.requestDevice({
            filters: [{ vendorId: LedgerVendorId }],
          })
      })
      .then((devices) => devices.length
        ? console.log("Devices:", devices)
        : Promise.reject());
  },

  /**
   * @override
   */
  disconnect: () => { },

  switchChain: (chain) => {
    LedgerBağlantısı.chain = chain;
    LedgerBağlantısı.chainChanged(chain);
    return Promise.resolve();
  },

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<string>}
   */
  signMessage: (message, address) => Promise.resolve("")
})

export {
  LedgerBağlantısı
};
