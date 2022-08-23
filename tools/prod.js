// Has to end with a slash
/** @const {string} */
const HOST_URL = 'https://kimlikdao.org/';
/** @const {string} */
const PAGE_CACHE_CONTROL = 'max-age=90,public';
/** @const {string} */
const STATIC_CACHE_CONTROL = 'no-transform,max-age=29030400,public,immutable';
/** @const {Object<string, string>} */
const MIMES = {
  "css": "text/css",
  "js": "application/javascript;charset=utf-8",
  "svg": "image/svg+xml",
  "ttf": "font/ttf",
  "woff2": "font/woff2",
  "ico": "image/x-icon",
  "txt": "text/plain",
};
/** @const {Object<string, string>} */
const PAGES = {
  "?tr": "ana-tr.html",
  "?en": "ana-en.html",
  "/al": "al-tr.html",
  "/get": "al-en.html",
  "/incele": "incele-tr.html",
  "/view": "incele-en.html",
  "/oyla": "oyla-tr.html",
  "/vote": "oyla-en.html",
};

addEventListener('fetch', (event) => {
  /** @const {URL} */
  const url = new URL(event.request.url)
  /** @const {string} */
  const enc = event.request['cf']['clientAcceptEncoding'];
  /** @const {string} */
  const ext = url.pathname.endsWith('.woff2') ? ''
    : enc.includes('br') ? '.br' : enc.includes('gz') ? '.gz' : '';
  /** @const {number} */
  const idx = url.pathname.lastIndexOf('.');
  /** @const {string} */
  const kvKey = url.pathname == '/' ? (() => {
    if (url.search) return PAGES[url.search];
    const cookie = event.request.headers.get('cookie');
    if (cookie)
      return cookie.startsWith('l=en') ? "ana-en.html" : "ana-tr.html";
    const acceptLang = event.request.headers.get('accept-language');
    return acceptLang && acceptLang.includes('tr') ? "ana-tr.html" : "ana-en.html";
  })() + ext : (idx == -1 ? PAGES[url.pathname] : url.pathname.substring(1)) + ext;
  /** @const {string} */
  const cacheKey = HOST_URL + kvKey;

  /** @type {boolean} */
  let inCache = false;

  // We search the CF cache for the asset.
  /** @const {Promise<Response>} */
  const fromCache = caches.default.match(cacheKey).then((response) => {
    if (!response) return Promise.reject();
    inCache = true;
    if (idx == -1 || ext === '.gz') {
      response = new Response(response.body, {
        headers: response.headers,
        "encodeBody": "manual"
      });
      if (idx == -1)
        response.headers.set('cache-control', PAGE_CACHE_CONTROL);
      // Transform 'GEEZEEP' back to gzip.
      if (ext === '.gz')
        response.headers.set('content-encoding', 'gzip');
    }
    return response;
  });

  // In parallel, we also query the CF KV. Under normal circumstances, if
  // the asset is present in the CF cache, `fromCache` promise should always
  // win the race.
  // If the asset has been evicted from CF cache, this promise will get it
  // from KV and write it to CF cache (after a small header modification).
  // If the asset is present in CF cache and the cache returns in a timely
  // manner, this promise will not re-write to CF cache, as the `fromCache`
  // promise will set the `inCache` flag, which prevents this promise from
  // recaching the response.
  // In all other cases (either the response is not present in CF cache or
  // CF cache is taking unusually long), the response will be served from the
  // KV.
  /** @const {Promise<Response>} */
  const fromKV = KV.get(kvKey, 'arrayBuffer').then((body) => {
    if (!body) return Promise.reject();

    /** @type {Response} */
    let response = new Response(body, {
      status: 200,
      headers: {
        'accept-ranges': 'bytes',
        'cache-control': idx == -1 ? PAGE_CACHE_CONTROL : STATIC_CACHE_CONTROL,
        'content-length': body.byteLength,
        'content-type': idx == -1 ? "text/html;charset=utf-8" : MIMES[url.pathname.slice(idx + 1)],
        'expires': 'Sun, 01 Jan 2034 00:00:00 GMT',
        'vary': 'accept-encoding'
      },
      'encodeBody': 'manual'
    });

    // If we are serving a precompressed asset, set the 'content-encoding'
    // header. Note we serve a precompressed asset iff ext != '';
    if (ext)
      response.headers.set('content-encoding', ext === '.br' ? 'br' : 'gzip');

    if (idx == -1)
      response.headers.set('x-frame-options', 'DENY')

    // Remember to cache the response, but only after we finish serving the
    // request.
    event.waitUntil(Promise.resolve().then(() => {
      if (inCache) return;
      // We modify the response in two ways before we place it in CloudFlare
      // cache:
      //
      // (1) We remove the 'content-encoding: gzip' to prevent CF cache doing
      // decompression / header modification, which currently only happens for
      // 'content-encoding: gzip' responses.
      //
      // (2) We set cache control to indefinite caching so that the response
      // stays in CF cache for as long as possible, even for non-content-hashed
      // assets. We always purge the CF cache after non-content-hashed assets
      // change, which ensures the CF cache never goes stale.
      let toCache = response.clone();
      if (ext === '.gz')
        toCache.headers.set('content-encoding', 'GEEZEEP');
      toCache.headers.set('cache-control', STATIC_CACHE_CONTROL);
      return caches.default.put(cacheKey, toCache);
    }));

    return response;
  })

  event.respondWith(Promise.any([fromCache, fromKV]).catch(bulunamadı));
});

/**
 * @return {Response}
 */
const bulunamadı = (err) => new Response('NAPİM?', {
  status: 404,
  headers: { 'content-type': 'text/plain;charset=utf-8' }
})
