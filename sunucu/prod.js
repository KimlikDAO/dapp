// Has to end with a slash
/** @define {string} */
const HOST_URL = "https://kimlikdao.org/";
/** @const {string} */
const PAGE_CACHE_CONTROL = "max-age=90,public";
/** @const {string} */
const STATIC_CACHE_CONTROL = "max-age=29030400,public,immutable";
/** @const {!Object<string, string>} */
const MIMES = {
  "css": "text/css",
  "js": "application/javascript;charset=utf-8",
  "svg": "image/svg+xml",
  "ttf": "font/ttf",
  "woff2": "font/woff2",
  "ico": "image/x-icon",
  "txt": "text/plain",
};
/** @const {!Object<string, string>} */
const PAGES = {
  "?tr": "ana-tr.html",
  "?en": "ana-en.html",
  "al": "al-tr.html",
  "mint": "al-en.html",
  "incele": "incele-tr.html",
  "view": "incele-en.html",
  "oyla": "oyla-tr.html",
  "vote": "oyla-en.html",
  "iptal": "iptal-tr.html",
  "revoke": "iptal-en.html"
};

/**
 * @return {!Response}
 */
const err = () => new Response("NAPİM?", {
  status: 404,
  headers: { "content-type": "text/plain;charset=utf-8" }
})

/**
 * @implements {cloudflare.ModuleWorker}
 */
const ProdWorker = {
  /**
   * @override
   *
   * @param {!cloudflare.Request} req
   * @param {!ProdEnvironment} env
   * @param {!cloudflare.Context} ctx
   * @return {!Promise<!Response>}
   */
  fetch(req, env, ctx) {
    /** @const {string} */
    const url = req.url;
    /** @const {string} */
    const enc = req.cf.clientAcceptEncoding || "";
    /** @const {string} */
    const ext = url.endsWith(".woff2") ? ""
      : enc.includes("br") ? ".br" : enc.includes("gz") ? ".gz" : "";
    /** @const {number} */
    const idx = url.lastIndexOf(".");

    /** @type {?string} */
    let kvKey = url.slice(HOST_URL.length);
    /** @type {?string} */
    let cacheKey;
    if (kvKey && idx != HOST_URL.lastIndexOf("."))
      cacheKey = url;
    else {
      /** @const {number} */
      const qmark = kvKey.lastIndexOf("?");
      if (qmark != -1 && kvKey.length > 3)
        kvKey = kvKey.slice(0, qmark);
      if (kvKey) kvKey = PAGES[kvKey];
      else {
        /** @const {?string} */
        const cookie = req.headers.get("cookie");
        kvKey = (cookie ? cookie.includes("l=tr")
          : req.headers.get("accept-language")?.includes("tr"))
          ? "ana-tr.html" : "ana-en.html";
      }
      cacheKey = HOST_URL + kvKey
    }
    kvKey += ext;
    cacheKey += ext;

    /** @type {boolean} */
    let inCache = false;
    /**
     * We search the CF cache for the asset.
     *
     * @const {!Promise<!Response>}
     */
    const fromCache = caches.default.match(cacheKey).then((response) => {
      if (!response) return Promise.reject();
      inCache = true;
      return response;
    });

    /**
     * @param {!ArrayBuffer} body
     * @return {!Response}
     */
    const makeResponse = (body) => new Response(body, {
      headers: {
        "cache-control": idx == HOST_URL.lastIndexOf(".")
          ? PAGE_CACHE_CONTROL
          : STATIC_CACHE_CONTROL,
        ...(idx == HOST_URL.lastIndexOf(".") && { "cdn-cache-control": STATIC_CACHE_CONTROL }),
        "content-encoding": ext === ".br" ? "br" : ext === ".gz" ? "gzip" : "",
        "content-length": body.byteLength,
        "content-type": idx == HOST_URL.lastIndexOf(".")
          ? "text/html;charset=utf-8"
          : MIMES[url.slice(idx + 1)],
        "expires": "Sun, 01 Jan 2034 00:00:00 GMT",
        "vary": "accept-encoding",
      },
      "encodeBody": "manual"
    });

    /**
     * In parallel, we also query the CF KV. Under normal circumstances, if
     * the asset is present in the CF cache, `fromCache` promise should always
     * win the race.
     * If the asset has been evicted from CF cache, this promise will get it
     * from KV and write it to CF cache (after a small header modification).
     * If the asset is present in CF cache and the cache returns in a timely
     * manner, this promise will not re-write to CF cache, as the `fromCache`
     * promise will set the `inCache` flag, which prevents this promise from
     * recaching the response.
     * In all other cases (either the response is not present in CF cache or
     * CF cache is taking unusually long), the response will be served from the
     * KV.
     *
     * @const {!Promise<!Response>}
     */
    const fromKV = env.KV.get(kvKey, "arrayBuffer").then((body) => {
      if (!body) return Promise.reject();
      // Remember to cache the response, but only after we finish serving the
      // request.
      ctx.waitUntil(new Promise((/** function(?):void */ resolve) =>
        resolve(inCache ? null : caches.default.put(/** @type {string} */(cacheKey),
          makeResponse(/** @type {!ArrayBuffer} */(body))))
      ));
      return makeResponse(body);
    })

    return Promise.any([fromCache, fromKV]).catch(err);
  }
}

globalThis["ProdWorker"] = ProdWorker;
export default ProdWorker;
