import { create } from "/lib/cloudflare/pageWorker";

/** @define {string} */
const DappUrl = "https://kimlikdao.org/";

/** @const {!cloudflare.ModuleWorker} */
const ProdWorker = create(DappUrl, {
  "?tr": "ana-tr.html",
  "?en": "ana-en.html",
  "al": "al-tr.html",
  "mint": "al-en.html",
  "kpassim": "kpassim-tr.html",
  "kpass": "kpassim-en.html",
  "incele": "kpassim-tr.html", // TODO(KimlikDAO-bot): deprecate soon
  "view": "kpassim-en.html", // TODO(KimlikDAO-bot): deprecate soon
  "oyla": "oyla-tr.html",
  "vote": "oyla-en.html",
  "iptal": "iptal-tr.html",
  "revoke": "iptal-en.html"
});

globalThis["ProdWorker"] = ProdWorker;
export default ProdWorker;
