import express from 'express'
import { readFileSync, rmSync } from 'fs'
import { createServer as createViteServer } from 'vite'

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    if (req.originalUrl == '/favicon.cio')
      return res.status(404).end();

    const file = req.originalUrl == '/' ? 'ana/page.html' : 'al/page.html';

    console.log(req.originalUrl);
    let page = readFileSync(file, 'utf-8');

    res.status(200).set({ 'Content-type': 'text/html;charset=utf-8' }).end(page);
  })

  app.listen(8787)
}

createServer()
