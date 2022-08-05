// const NOTION_URL =
//  'https://kimlikdao.notion.site/KimlikDAO-5349424f906f45dbbb085b3dc8ed53ef';

// Sonda bölü işareti olması lazım.
/** @const {string} */
const HOST_URL = 'https://kimlikdao.org/';
/** @const {string} */
const PAGE_CACHE_CONTROL = 'public'
/** @const {string} */
const STATIC_CACHE_CONTROL = 'max-age=29030400,public'
/** @const {Object<string,string>} */
const MIMES = {
  "css": "text/css",
  "js": "application/javascript;charset=utf-8",
  "svg": "image/svg+xml",
  "ttf": "font/ttf",
  "woff2": "font/woff2",
};
/** @const {Object<string, string>} */
const PAGES = {
  "/": "ana.html",
  "/al": "al.html",
};

addEventListener('fetch', async (event) => {
  /** @const {URL} */
  const url = new URL(event.request.url)
  /** @const {string} */
  const enc = event.request['cf']['clientAcceptEncoding'];
  /** @const {string} */
  const ext = url.pathname.endsWith('.woff2') ? ''
    : enc.includes('br') ? '.br' : enc.includes('gz') ? '.gz' : '';
  /** @const {string} */
  const kvKey = (PAGES[url.pathname] ? PAGES[url.pathname] : url.pathname.substring(1)) + ext;
  /** @const {string} */
  const cacheKey = HOST_URL + kvKey;
  /** @const {number} */
  const idx = url.pathname.lastIndexOf('.');

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
        'content-length': body.byteLength,
        'accept-ranges': 'bytes'
      },
      // Eğer asset önceden sıkıştırılmışsa bunu işaretleyelim ki CF re-encode etmeye
      // çalışmasın.
      'encodeBody': 'manual'
    });

    // Sıkıştırılmış assetse 'content-encoding' yaz.
    if (ext) {
      response.headers.set('content-encoding', ext === '.br' ? 'br' : 'gzip');
    }

    if (idx == -1) {
      response.headers.set('content-type', "text/html;charset=utf-8");
      response.headers.set('x-frame-options', 'DENY')
    } else {
      response.headers.set('content-type', MIMES[url.pathname.slice(idx + 1)]);
    }

    // 'cache-control' ve 'expiration' yaz.
    response.headers.set('expires', 'Sun, 01 Jan 2034 00:00:00 GMT');
    response.headers.set('cache-control', STATIC_CACHE_CONTROL);

    // KV'den çektiğimiz asset'i cache'e yaz.
    event.waitUntil(caches.default.put(cacheKey, response.clone()))

    // Sayfaları CF cache'inde sonsuz dek ama kullanıcı cache'inde belli bir süre tutmak istiyoruz.
    // Bunun sebebi CF cachi'ni purge gerektiğinde purge edebilmemiz.
    if (idx != 1) {
      response.headers.set('cache-control', PAGE_CACHE_CONTROL);
    }
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
