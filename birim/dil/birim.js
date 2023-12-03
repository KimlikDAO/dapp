import dom from "/lib/util/dom";

/** @define {string} */
const KonumTR = "/?tr";
/** @define {string} */
const KonumEN = "/?en";

/** @const {Element} */
const DilButonu = dom.adla("dib");

dom.menüYarat(DilButonu, dom.adla("did"));
dom.adla("did").onclick = (/** @type {Event} */ event) => {
  /** @const {Element} */
  const li = event.target.nodeName == "LI"
    ? event.target : event.target.parentElement;

  /** @const {string} */
  const diğerDil = dom.TR ? "en" : "tr";
  if (li.id.slice(2) == diğerDil) {
    document.cookie = `l=${diğerDil};path=/;domain=.kimlikdao.org;SameSite=Strict;max-age=${1e6}`;
    window.location.href = (dom.TR ? KonumEN : KonumTR) + window.location.hash;
  }
};
