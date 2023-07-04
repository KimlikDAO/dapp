/**
 * @fileoverview Externs for prod environment.
 * @author KimlikDAO
 * @externs
 */

/**
 * @interface
 * @struct
 * @extends {cloudflare.Environment}
 */
function ProdEnvironment() { }

/** @type {!cloudflare.KeyValue} */
ProdEnvironment.prototype.KV;
