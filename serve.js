// const NOTION_URL =
//  'https://kimlikdao.notion.site/KimlikDAO-5349424f906f45dbbb085b3dc8ed53ef';

const HOST_URL = 'https://fujitestnet.kimlikdao.org/';

async function handleRequest(event) {
  const url = new URL(event.request.url)
  const enc = event.request['cf']['clientAcceptEncoding'];
  const ext = enc.includes('br') ? '.br' : enc.includes('gz') ? '.gz' : '';

  // We store assets in the cache with the compression suffix appended.
  const kvKey = (url.pathname === '/' ? 'ana' : url.pathname.substring(1)) + ext;
  const cacheKey = HOST_URL + kvKey;

  let response = await caches.default.match(cacheKey);

  if (!response) {
    const body = await KV.get(kvKey, 'arrayBuffer');

    // If we don't have it, throw which prints a generic 404.
    if (!body) throw "";

    response = new Response(body, {
      status: 200,
      headers: {
        'content-length': body.byteLength,
        'accept-ranges': 'bytes'
      },
      'encodeBody': ext ? 'manual' : 'auto' // If the file is compressed, tell CF not to re-encodde it.
    });

    // If the file is compressed, set the 'Content-Encoding'.
    if (ext) {
      response.headers.append('content-encoding', ext === '.br' ? 'br' : 'gzip');
    }

    // Set the mimeType.
    const mimeType = url.pathname.endsWith('.css') ? 'text/css' : ((url.pathname.endsWith('.js')
      ? 'application/javascript' : 'text/html') + ';charset=utf-8');
    response.headers.set('content-type', mimeType);

    // Set Cache-control and expiration
    if (url.pathname.includes('.')) { // Each file with a dot in the name is content hashed
      response.headers.set('cache-control', 'max-age=29030400,public');
      response.headers.set('expires', 'Sun, 01 Jan 2034 00:00:00 GMT');
    } else {
      response.headers.set('cache-control', 'max-age=10,public');
    }

    // Write response to cache lazily
    event.waitUntil(caches.default.put(cacheKey, response.clone()))
    response.headers.set('X-KimlikDAO', 'AQ');
  }
  return response;
}

function hata(err) {
  return new Response('NAPIM? Hata oluştu ' + err, {
    status: 404,
    headers: { 'content-type': 'text/plain;charset=utf-8' }
  })
}

addEventListener('fetch', event => event.respondWith(handleRequest(event)));