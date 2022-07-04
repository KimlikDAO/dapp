const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer: createViteServer } = require('vite')

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    const file = req.originalUrl == '/' ? 'ana/page.html' : 'al/page.html';

    console.log(req.originalUrl);
    let page = fs.readFileSync(path.resolve(__dirname, "../", file), 'utf-8');
    res.status(200).set({ 'Content-type': 'text/html;charset=utf-8' }).end(page);
  })

  app.listen(8787)
}

createServer()
