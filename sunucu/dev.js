import express from "express";
import { readFileSync } from "fs";
import { parse } from "toml";
import { createServer } from "vite";
import { sayfaOku } from "../lib/util/birimler.js";

/** @const {Object<string, string>} */
const SAYFALAR = {
  "/": { ad: "ana/sayfa.html", dil: "tr" },
  "/al": { ad: "al/sayfa.html", dil: "tr" },
  "/mint": { ad: "al/sayfa.html", dil: "en" },
  "/incele": { ad: "incele/sayfa.html", dil: "tr" },
  "/view": { ad: "incele/sayfa.html", dil: "en" },
  "/oyla": { ad: "oyla/sayfa.html", dil: "tr" },
  "/vote": { ad: "oyla/sayfa.html", dil: "en" },
  "/iptal": { ad: "iptal/sayfa.html", dil: "tr" },
  "/revoke": { ad: "iptal/sayfa.html", dil: "en" },
};

createServer({
  server: { middlewareMode: true },
  appType: 'custom'
}).then((vite) => {
  const app = express()
  app.get("/*.svg", (req, res) => {
    const sayfaAdı = decodeURIComponent(req.path.slice(1));
    const svg = sayfaOku(sayfaAdı, { dil: "en", dev: true })
    res.status(200).set({ "content-type": "image/svg+xml" }).end(svg);
  })
  app.use(vite.middlewares)
  app.use(Object.keys(SAYFALAR), (req, res, next) => {
    if (!(req.path in SAYFALAR)) {
      res.status(200).end(); // Dev sunucuda hata vermemeye çalış
    } else {
      const { ad, dil } = SAYFALAR[req.path]
      /** @const {string} */
      const sayfa = sayfaOku(ad, {
        dil: "tr" in req.query ? "tr" : "en" in req.query ? "en" : dil,
        dev: true
      });
      vite.transformIndexHtml(req.path, sayfa).then((sayfa) => {
        res.status(200)
          .set({ 'Content-type': 'text/html;charset=utf-8' })
          .end(sayfa);
      }).catch((e) => {
        vite.ssrFixStacktrace(e)
        next(e)
      })
    }
  })
  const config = parse(readFileSync('sunucu/dev.toml'));
  console.log(`Ana sayfaya şu adreste çalışıyor: http://localhost:${config.port}`)
  app.listen(config.port);
})
