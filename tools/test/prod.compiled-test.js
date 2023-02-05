import ProdWorker from "../prod";
import { assertEq, assertStats } from "/lib/testing/assert";

/**
 * @constructor
 * @implements {cloudflare.KeyValue}
 */
function KeyKey() { }

/**
 * @override
 *
 * @param {string} key
 * @param {string} type
 * @return {!Promise<ArrayBuffer>}
 */
KeyKey.prototype.get = (key, type) =>
  Promise.resolve(new TextEncoder().encode(key).buffer);

/**
 * @param {string} key
 * @param {string|!ArrayBuffer} value
 * @return {!Promise<void>}
 */
KeyKey.prototype.put = (key, value) => Promise.resolve()
  .then(() => console.log(key, value));

globalThis["caches"] = {};
globalThis["caches"]["default"] = /** @type {!Cache} */({
  /**
   * @param {string} key
   * @return {!Promise<Response>}
   */
  match(key) {
    console.log(key)
    return Promise.resolve(null);
  },

  /**
   * @param {string} key
   * @param {!Response} res
   */
  put(key, res) { }
});

/** @const {!ProdEnvironment} */
const env = /** @type {!ProdEnvironment} */({
  KV: new KeyKey()
});

/** @const {!cloudflare.Context} */
const ctx = /** @type {!cloudflare.Context} */({
  /**
   * @param {!Promise<*>} promise
   */
  waitUntil(promise) { }
})

/**
 * @param {string} url
 * @param {string} encoding
 * @param {string} cookie
 * @return {!cloudflare.Request}
 */
const createRequest = (url, encoding, cookie) => /** @type {!cloudflare.Request} */({
  url,
  headers: {
    /**
     * @param {string} key
     * @return {?string}
     */
    get(key) { return key.toLowerCase() == "cookie" ? cookie : ""; }
  },
  cf: {
    clientAcceptEncoding: encoding
  }
});

const testKvName = (url, acceptEncoding, cookie, kvName) => ProdWorker.fetch(
  createRequest(url, acceptEncoding, cookie), env, ctx)
  .then((res) => res.text())
  .then((res) => assertEq(res, kvName));

Promise.all([
  testKvName("https://kimlikdao.org/", "br", "l=tr", "ana-tr.html.br"),
  testKvName("https://kimlikdao.org/", "br", null, "ana-en.html.br"),
  testKvName("https://kimlikdao.org/?tr", "gzip", "l=en", "ana-tr.html.gz"),
  testKvName("https://kimlikdao.org/?en", "", "l=tr", "ana-en.html"),
  testKvName("https://kimlikdao.org/abc.woff2", "br", null, "abc.woff2"),
  testKvName("https://kimlikdao.org/vote", "br", null, "oyla-en.html.br"),
  testKvName("https://kimlikdao.org/vote", "gzip", "l=tr", "oyla-en.html.gz"),
]).then(assertStats);
