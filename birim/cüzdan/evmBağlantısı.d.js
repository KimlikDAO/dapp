/**
 * @externs
 */

import eth from "/lib/ethereum/eth.d";

/** @const {eth.UiProvider|undefined} */
window.ethereum;

/** @const {boolean} */
window.ethereum.isRabby;

/** @const {boolean} */
window.ethereum.isMetaMask;

/**
 * @interface
 * @extends {eth.UiProvider}
 */
eth.CoreProvider = function () { }

/**
 * @typedef {{
 *   name: string
 * }}
 */
eth.CoreProvider.prototype.info;

/** @const {eth.CoreProvider|undefined} */
window.avalanche;
