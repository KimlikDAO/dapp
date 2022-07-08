/**
 * @fileoverview Externs for injected ethereum wallets
 * @externs
 */

const ethereum = {};

/**
 * @param {RequestParams} params
 * @return {Promise<string>}
 **/
ethereum.request = function (params) { };

/**
 * @return {boolean}
 */
ethereum.isConnected = function () { };

/**
 * @param {string} eventName
 */
ethereum.on = function (eventName, handler) { };

/**
 * Represent an ethereum transaction, to be sent to a provider.
 * 
 * @interface
 */
function Transaction() { }

/** @type {string} */
Transaction.prototype.to;

/** @type {string} */
Transaction.prototype.from;

/** @type {string} */
Transaction.prototype.value;

/** @type {string} */
Transaction.prototype.data;

/** @type {string} */
Transaction.prototype.chainId;

/** @interface */
function RequestParams() { }

/** @type {string} */
RequestParams.prototype.method;

/** @type {Array<*>} */
RequestParams.prototype.params;
