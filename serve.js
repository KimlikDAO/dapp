// const NOTION_URL =
//  'https://kimlikdao.notion.site/KimlikDAO-5349424f906f45dbbb085b3dc8ed53ef';

// Sonda bölü işareti olması lazım.
const HOST_URL = 'https://fujitestnet.kimlikdao.org/';
const PAGE_CACHE_CONTROL = 'public'
const STATIC_CACHE_CONTROL = 'max-age=29030400,public'

async function handleRequest(event) {
  const url = new URL(event.request.url)
  const enc = event.request['cf']['clientAcceptEncoding'];
  const ext = enc.includes('br') ? '.br' : enc.includes('gz') ? '.gz' : '';

  // Asset'lerin cache ve KV'deki anahtarı .br .gz gibi uzantıyı da içeriyor.
  const kvKey = (url.pathname === '/' ? 'ana' : url.pathname.substring(1)) + ext;
  const cacheKey = HOST_URL + kvKey;
  const isPage = !url.pathname.includes('.');

  let response = await caches.default.match(cacheKey);

  if (response) {
    if (isPage) {
      response = new Response(response.body, response);
      response.headers.set('cache-control', PAGE_CACHE_CONTROL)
    }
    return response
  }

  // Asset cache'te değil, KV'den çekmeye çalışıyoruz.
  const body = await KV.get(kvKey, 'arrayBuffer');

  // KV'de de yok; throw edelim, kullanıcı açıklamasız bir 404 alsın.
  if (!body) throw 0;

  response = new Response(body, {
    status: 200,
    headers: {
      'content-length': body.byteLength,
      'accept-ranges': 'bytes'
    },
    // Eğer asset önceden sıkıştırılmışsa bunu işaretleyelim ki CF re-encode etmeye
    // çalışmasın.
    'encodeBody': ext ? 'manual' : 'auto'
  });

  // Sıkıştırılmış assetse 'content-encoding' yaz.
  if (ext) {
    response.headers.set('content-encoding', ext === '.br' ? 'br' : 'gzip');
  }

  // 'content-type' yaz.
  const contentType = url.pathname.endsWith('.css') ? 'text/css' : ((url.pathname.endsWith('.js')
    ? 'application/javascript' : 'text/html') + ';charset=utf-8');
  response.headers.set('content-type', contentType);

  if (isPage) {
    response.headers.set('x-frame-options', 'DENY')
  }

  // 'cache-control' ve 'expiration' yaz.
  response.headers.set('expires', 'Sun, 01 Jan 2034 00:00:00 GMT');
  response.headers.set('cache-control', STATIC_CACHE_CONTROL);

  // KV'den çektiğimiz asset'i cache'e yaz.
  event.waitUntil(caches.default.put(cacheKey, response.clone()))

  // Sayfaları CF cache'inde sonsuz dek ama kullanıcı cache'inde belli bir süre tutmak istiyoruz.
  // Bunun sebebi CF cachi'ni purge gerektiğinde purge edebilmemiz.
  if (isPage) {
    response.headers.set('cache-control', PAGE_CACHE_CONTROL);
  }
  return response;
}

function hata(err) {
  return new Response('NAPIM? Hata oluştu ' + err, {
    status: 404,
    headers: { 'content-type': 'text/plain;charset=utf-8' }
  })
}

addEventListener('fetch', event => event.respondWith(handleRequest(event).catch(hata)));