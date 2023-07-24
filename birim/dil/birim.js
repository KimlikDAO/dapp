import dom from "/lib/util/dom";

/** @const {Element} */
const DilButonu = dom.adla("dib");

dom.menüYarat(DilButonu, dom.adla("did"));
dom.adla("did").onclick = (/** @type {Event} */ event) => {
  /** @const {Element} */
  const li = event.target.nodeName == "LI"
    ? event.target : event.target.parentElement;
  /** @const {string} */
  const dil = li.id.slice(2);
  if (dom.TR) {
    if (dil == "en") {
      const sayfalar = {
        "/": "/?en",
        "/al": "/mint",
        "/incele": "/view",
        "/oyla": "/vote",
        "/iptal": "/revoke"
      };
      document.cookie = "l=en;path=/;domain=.kimlikdao.org;max-age=" + 1e6;
      window.location.href = sayfalar[window.location.pathname] + window.location.hash;
    }
  } else {
    if (dil == "tr") {
      const sayfalar = {
        "/": "/?tr",
        "/mint": "/al",
        "/view": "/incele",
        "/vote": "/oyla",
        "/revoke": "/iptal"
      };
      document.cookie = "l=tr;path=/;domain=.kimlikdao.org;max-age=" + 1e6;
      window.location.href = sayfalar[window.location.pathname] + window.location.hash;
    }
  }
};