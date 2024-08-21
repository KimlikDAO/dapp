import { minify } from "csso";
import { writeFile } from "node:fs/promises";
import { getCacheEntry } from "../lib/birimler/fileCache";
import { runIfStale } from "../lib/birimler/targets";
import { compile } from "../lib/kdjs/compile";

const js = (lang) => runIfStale(compile, {
  entry: "ana/sayfa.js",
  define: [
    `TR$$module$lib$util$dom=${lang == "tr"}`,
    `KonumTR$$module$birim$dil$birim="?tr"`,
    `KonumEN$$module$birim$dil$birim="?en"`,
  ],
  output: `build/ana/sayfa-${lang}.js`,
});

const css = (lang) => Promise.all([
  "ana/ağ/birim.css",
  "ana/hero/birim.css",
  "ana/hero/sergi/birim.css",
  "ana/kazan/birim.css",
  "ana/sahipler/birim.css",
  "ana/sayfa.css",
  "ana/sayılar/birim.css",
  "birim/altdizin/birim.css",
  "birim/başlık/birim.css",
  "birim/blog/birim.css",
  "birim/blog/eliptik-imza/birim.css",
  "birim/blog/mina-berkeley/birim.css",
  "birim/cüzdan/birim.css",
  "birim/dil/birim.css",
  "birim/kaydol/birim.css",
  "birim/kpass/birim.css",
  "birim/ortak.css",
  "birim/telefon/birim.css",
].map(getCacheEntry))
  .then((entries) => {
    console.log(minify(entries.map((e) => e.content).join("")).css);
    writeFile(
      `build/ana/sayfa-${lang}.css`,
      minify(entries.map((e) => e.content).join("")).css
    )
  })
  .then((_) => `build/ana/sayfa-${lang}.css`);

await css("en");
