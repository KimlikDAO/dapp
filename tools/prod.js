// Has to end with a slash
/** @define {string} */
const HOST_URL = 'https://staging.kimlikdao.org/';
/** @const {string} */
const PAGE_CACHE_CONTROL = 'max-age=90,public';
/** @const {string} */
const STATIC_CACHE_CONTROL = 'max-age=29030400,public,immutable';
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
  "/al": "al-tr.html",
  "/get": "al-en.html",
  "/incele": "incele-tr.html",
  "/view": "incele-en.html",
  "/oyla": "oyla-tr.html",
  "/vote": "oyla-en.html",
  "/iptal": "iptal-tr.html",
  "/revoke": "iptal-en.html"
};

/**
 * @implements {cloudflare.ModuleWorker}
 */
const ProdWorker = {
  /**
   * @override
   *
   * @param {!cloudflare.Request} request
   * @param {!ProdEnvironment} env
   * @param {!cloudflare.Context} ctx
   * @return {!Promise<!Response>}
   */
  fetch(request, env, ctx) {
    /** @const {!URL} */
    const url = new URL(request.url);
    /** @const {string} */
    const enc = request.cf.clientAcceptEncoding || "";
    /** @const {string} */
    const ext = url.pathname.endsWith('.woff2') ? ''
      : enc.includes('br') ? '.br' : enc.includes('gz') ? '.gz' : '';
    /** @const {number} */
    const idx = url.pathname.lastIndexOf('.');
    /** @const {string} */
    const kvKey = url.pathname == '/' ? /** @type {function():string} */(() => {
      if (url.search) return PAGES[url.search];
      /** @const {?string} */
      const cookie = request.headers.get('cookie');
      if (cookie)
        return cookie.startsWith('l=en') ? "ana-en.html" : "ana-tr.html";
      const acceptLang = request.headers.get('accept-language');
      return acceptLang && acceptLang.includes('tr') ? "ana-tr.html" : "ana-en.html";
    })() + ext : (idx == -1 ? PAGES[url.pathname] : url.pathname.substring(1)) + ext;
    /** @const {string} */
    const cacheKey = HOST_URL + kvKey;

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
        'cache-control': idx == -1 ? PAGE_CACHE_CONTROL : STATIC_CACHE_CONTROL,
        'cdn-cache-control': STATIC_CACHE_CONTROL,
        'content-encoding': ext === '.br' ? 'br' : ext === '.gz' ? 'gzip' : '',
        'content-length': body.byteLength,
        'content-type': idx == -1 ? "text/html;charset=utf-8" : MIMES[url.pathname.slice(idx + 1)],
        'expires': 'Sun, 01 Jan 2034 00:00:00 GMT',
        'vary': 'accept-encoding',
      },
      'encodeBody': 'manual'
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
    const fromKV = env.KV.get(kvKey, 'arrayBuffer').then((body) => {
      if (!body) return Promise.reject();

      // Remember to cache the response, but only after we finish serving the
      // request.
      ctx.waitUntil(new Promise((resolve) => {
        if (inCache) return;
        caches.default.put(cacheKey, makeResponse(body));
        resolve();
      }));

      return makeResponse(body);
    })

    return Promise.any([fromCache, fromKV]).catch(bulunamadı);
  }
}

/**
 * @return {!Response}
 */
const bulunamadı = () => new Response('NAPİM?', {
  status: 404,
  headers: { 'content-type': 'text/plain;charset=utf-8' }
})

globalThis["ProdWorker"] = ProdWorker;
export default ProdWorker;
