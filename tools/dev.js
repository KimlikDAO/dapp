import express from 'express'
import { readFileSync } from 'fs'
import { createServer as createViteServer } from 'vite'

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    if (req.originalUrl == '/favicon.ico')
      return res.status(404).end();

    const file = req.originalUrl == '/' ? 'ana/page.html' : 'al/page.html';

    console.log(req.originalUrl);
    let page = readFileSync(file, 'utf-8');

    res.status(200).set({ 'Content-type': 'text/html;charset=utf-8' }).end(page);
  })

  const port = 8787;
  app.listen(port)
  console.log(`Ana sayfaya şu adreste çalışıyor: http://localhost:${port}`)
}

createServer()
