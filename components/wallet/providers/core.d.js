import eth from "/lib/ethereum/eth.d";

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
