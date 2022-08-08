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
    altbirimAdı = altbirimAdı.trim();
    try {
      let file = readFileSync(konum + "/" + altbirimAdı + ".html", "utf-8");
      stiller.push(konum + "/" + altbirimAdı + ".css");
      return file;
    } catch (e) {
      stiller.push(konum + "/" + altbirimAdı + "/birim.css");
      return readFileSync(konum + "/" + altbirimAdı + "/birim.html", "utf-8");
    }
  });
  let linkler = "";
  for (const stil of stiller)
    linkler += `  <link href="${stil}" rel="stylesheet" type="text/css" />\n`
  return sayfa.replace("</head>", linkler + "\n</head>");
}
/** @const {Object<string, string>} */
const PAGES = {
  "/": "ana/sayfa.html",
  "/al": "al/sayfa.html",
};

async function sun() {
  const app = express()

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use(["/", "/ana"], async (req, res, next) => {
    try {
      console.log("HELP")
      if (!(req.path in PAGES)) {
        console.log(req.originalUrl);
        res.status(200).end();
      } else {
        let sayfa = sayfaOku(PAGES[req.path]);
        sayfa = await vite.transformIndexHtml(req.path, sayfa)
        res.status(200)
          .set({ 'Content-type': 'text/html;charset=utf-8' })
          .end(sayfa);
      }
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
