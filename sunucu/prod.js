import { create } from "/lib/cloudflare/pageWorker";

/** @define {string} */
const DappUrl = "https://kimlikdao.org/";

/** @const {!cloudflare.ModuleWorker} */
const ProdWorker = create(DappUrl, {
  "?tr": "ana-tr.html",
  "?en": "ana-en.html",
  "al": "al-tr.html",
  "mint": "al-en.html",
  "tcktm": "tcktm-tr.html",
  "my-tckt": "tcktm-en.html",
  "oyla": "oyla-tr.html",
  "vote": "oyla-en.html",
  "iptal": "iptal-tr.html",
  "revoke": "iptal-en.html"
});

globalThis["ProdWorker"] = ProdWorker;
export default ProdWorker;
