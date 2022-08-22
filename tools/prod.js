// Sonda bölü işareti olması lazım.
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

  // Asset'i CF cache'ten almaya çalışıyoruz.
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

  // Paralel olarak asset'i KV'de de arıyoruz. Normal şartlar altında asset
  // cache'te varsa, `fromCache`'in yarışı kazanması lazım.
  // Asset cache'te değilse (veya cache'te beklenmedik bir yoğunluk varsa)
  // KV'den gelen sonucu cache'e yazılmak üzere sıraya alıp KV sonucunu
  // döndürüyoruz
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

    // Sıkıştırılmış assetse 'content-encoding' yaz.
    // If the content-encoding is gzip, we record it as PIZG before writing it
    // to CF cache so it won't be decompressed.
    // We transform PIZG to gzip just before serving the `Response` to the user-agent.
    if (ext)
      response.headers.set('content-encoding', ext === '.br' ? 'br' : 'gzip');

    if (idx == -1)
      response.headers.set('x-frame-options', 'DENY')

    // Cache'te bulundu. Tekrar cache'e yazmadan işlemi bitir.
    if (inCache) return Promise.reject();

    // KV'den çektiğimiz asset'i cache'e yaz.
    event.waitUntil(Promise.resolve().then(() => {
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
