import express from 'express'
import { readFileSync } from 'fs'
import path from 'path'
import { createServer } from 'vite'

const sayfaOku = (dosyaAdı) => {
  let stiller = [];
  let sayfa = readFileSync(dosyaAdı, 'utf-8');
  const konum = path.dirname(dosyaAdı);

  sayfa = sayfa.replace(/<birim:([^\/]*)\/>/g, (_, birimAdı) => {
    stiller.push("birim/" + birimAdı.trim() + "/birim.css");
    return readFileSync("birim/" + birimAdı.trim() + "/birim.html", "utf-8");
  });
  sayfa = sayfa.replace(/<altbirim:([^\/]*)\/>/g, (_, altbirimAdı) => {
    stiller.push(konum + "/" + altbirimAdı.trim() + ".css");
    return readFileSync(konum + "/" + altbirimAdı.trim() + ".html", "utf-8");
  });
  let linkler = "";
  for (const stil of stiller)
    linkler += `  <link href="${stil}" rel="stylesheet" type="text/css" />\n`
  return sayfa.replace("</head>", linkler + "\n</head>");
}

async function sun() {
  const app = express()

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use(["/", "/al"], async (req, res, next) => {
    try {
      console.log(req.originalUrl);
      const dosyaAdı = req.originalUrl == '/' ? 'ana/sayfa.html' : 'al/sayfa.html';
      let sayfa = sayfaOku(dosyaAdı);
      sayfa = await vite.transformIndexHtml(req.originalUrl, sayfa)
      res.status(200)
        .set({ 'Content-type': 'text/html;charset=utf-8' })
        .end(sayfa);
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  const port = 8787;
  app.listen(port)
  console.log(`Ana sayfaya şu adreste çalışıyor: http://localhost:${port}`)
}

sun()
