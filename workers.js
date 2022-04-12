/**
 * @fileoverview Externs for Cloudflare Workers environment
 * @externs
 */

const KV = {};

/**
 * @param {string} key
 * @param {string} type
 * @return {Promise<ArrayBuffer>}
 */
KV.get = function(key, type) {};

/**
 * 
 */
function addEventListener(event, listener) {};

const caches = {};

caches.default = {};

/**
 * @param {string} key
 * @return {Promise<Response>}
 */
caches.default.match = function(key) {};

/**
 * @param {string} key
 * @param {Response} value
 */
caches.default.put = function(key, value) {};
