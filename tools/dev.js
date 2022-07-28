import express from 'express'
import { readFileSync } from 'fs'
import { createServer } from 'vite'

async function run() {
  const app = express()

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    try {
      const file = req.originalUrl == '/' ? 'ana/page.html' : 'al/page.html';
      let page = readFileSync(file, 'utf-8');
      page = await vite.transformIndexHtml(req.originalUrl, page)

      res.status(200).set({ 'Content-type': 'text/html;charset=utf-8' }).end(page);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  const port = 8787;
  app.listen(port)
  console.log(`Ana sayfaya şu adreste çalışıyor: http://localhost:${port}`)
}

run()
