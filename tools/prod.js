// Sonda bölü işareti olması lazım.
/** @const {string} */
const HOST_URL = 'https://kimlikdao.org/';
/** @const {string} */
const PAGE_CACHE_CONTROL = 'max-age=0,private'
/** @const {string} */
const STATIC_CACHE_CONTROL = 'max-age=29030400,public'
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
  "/": "ana",
  "/al": "al",
  "/get": "al",
  "/incele": "incele",
  "/view": "incele"
};
/** @const {Object<string, null>} */
const EN_PAGES = {
  "/get": 0,
  "/view": 0,
};

addEventListener('fetch', async (event) => {
  /** @const {URL} */
  const url = new URL(event.request.url)
  /** @const {string} */
  const enc = event.request['cf']['clientAcceptEncoding'];
  /** @const {string} */
  const ext = url.pathname.endsWith('.woff2') ? ''
    : enc.includes('br') ? '.br' : enc.includes('gz') ? '.gz' : '';
  /** @const {number} */
  const idx = url.pathname.lastIndexOf('.');
  /** @const {?string} */
  const lang = (idx !== -1) ? null : (() => {
    /** @const {?string} */
    const cookie = event.request.headers.get('cookie');
    if (cookie)
      return cookie.startsWith('l=en') ? "en" : "tr";
    if (url.pathname !== "/")
      return url.pathname in EN_PAGES ? "en" : "tr";
    /** @const {?string} */
    const acceptLang = event.request.headers.get('accept-language');
    return acceptLang && acceptLang.includes('tr') ? "tr" : "en";
  })();
  /** @const {string} */
  const kvKey = (idx == -1 ? PAGES[url.pathname] + `-${lang}.html` : url.pathname.substring(1)) + ext;
  /** @const {string} */
  const cacheKey = HOST_URL + kvKey;

  // Asset'i CF cache'ten almaya çalışıyoruz.
  /** @const {Promise<Response>} */
  const fromCache = caches.default.match(cacheKey).then((response) => {
    if (!response) return Promise.reject();
    if (idx == -1) {
      response = new Response(response.body, response);
      response.headers.set('cache-control', PAGE_CACHE_CONTROL);
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
        'cache-control': STATIC_CACHE_CONTROL,
        'content-length': body.byteLength,
        'content-type': idx == -1 ? "text/html;charset=utf-8" : MIMES[url.pathname.slice(idx + 1)],
        'expires': 'Sun, 01 Jan 2034 00:00:00 GMT',
      },
      'encodeBody': 'manual'
    });

    // Sıkıştırılmış assetse 'content-encoding' yaz.
    if (ext) {
      response.headers.set('content-encoding', ext === '.br' ? 'br' : 'gzip');
    }

    if (idx == -1) {
      response.headers.set('content-language', lang == 'tr' ? 'tr-TR' : 'en-US');
      response.headers.set('x-frame-options', 'DENY')
    }

    // KV'den çektiğimiz asset'i cache'e yaz.
    event.waitUntil(caches.default.put(cacheKey, response.clone()))

    // Sayfaları CF cache'inde sonsuz dek ama kullanıcı cache'inde belli bir süre tutmak istiyoruz.
    // Bunun sebebi CF cachi'ni purge gerektiğinde purge edebilmemiz.
    if (idx == -1)
      response.headers.set('cache-control', PAGE_CACHE_CONTROL);
    return response;
  })

  event.respondWith(Promise.any([fromCache, fromKV]).catch(bulunamadı));
});

/**
 * @return {Response}
 */
function bulunamadı(err) {
  return new Response('NAPİM? Hata oluştu ' + err, {
    status: 404,
    headers: { 'content-type': 'text/plain;charset=utf-8' }
  })
}
