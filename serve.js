const NOTION_URL =
  'https://kimlikdao.notion.site/KimlikDAO-5349424f906f45dbbb085b3dc8ed53ef'

async function getPrecompressed() {
  
}

async function handleRequest(event) {
  const url = new URL(event.request.url)
  const enc = event.request.cf.clientAcceptEncoding;

  switch (url.pathname) {
    case '/':
      return new Response(enc + ' aaaa', {
        headers: { 'content-type': 'text/html;charset=utf-8' },
      })

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
