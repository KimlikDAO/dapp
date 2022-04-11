const NOTION_URL =
  'https://kimlikdao.notion.site/KimlikDAO-5349424f906f45dbbb085b3dc8ed53ef';

const HOST_URL = 'https://fujitestnet.kimlikdao.org';

async function getPrecompressed(path, comp) {
  let cache = caches.default;
  console.log(HOST_URL);
  const url = HOST_URL + path + (comp ? '.' + comp : '');
  console.log(url);
  let cached = await cache.match(url);
  return new Response('SDLFKJ', {
    headers: { 'content-type': 'text/plain'}
  });
}

async function handleRequest(event) {
  const url = new URL(event.request.url)
  const enc = event.request.cf.clientAcceptEncoding;
  const compression = enc.includes('br') ? 'br' : enc.includes('gz') ? 'gz' : null;

  switch (url.pathname) {
    case '/':
      return getPrecompressed('/ana', compression);

    case '/al':
      return new Response('al.html', {
        headers: { 'content-type': 'text/plain;charset=utf-8' },
      })

    case '/ortaklar':
    case '/ortaklocası':
      return Response.redirect(NOTION_URL, 302)

    case '/favicon.ico':
      return new Response('', { status: 404 })

    default:
      console.log(event.request.url)
      throw 'NAPİM?'
  }
}

addEventListener('fetch', event => {
  try {
    return event.respondWith(handleRequest(event))
  } catch (e) {
    return event.respondWith(
      new Response('Hata ' + e.message, {
        headers: { 'content-type': 'text/plain;charset=utf-8' },
      }),
    )
  }
})
