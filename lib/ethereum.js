/**
 * @fileoverview Externs for injected ethereum wallets
 * @externs
 */

const ethereum = {};

/**
 * @return {Promise<string>}
 **/
ethereum.request = function(params) {};

/**
 * @return {boolean}
 */
ethereum.isConnected = function() {};

/**
 * @param {string} eventName
 */
ethereum.on = function(eventName, handler) {};
