import { DilButonu, DilListesi } from "./birim.jsx";
import dom from "/lib/util/dom";
import { I18nString, LangCode } from "/lib/util/i18n";

/** @define {I18nString} */
const Route = { tr: "tr", en: "en" };

dom.menüYarat(DilButonu, DilListesi);
DilListesi.onclick = (/** @type {Event} */ event) => {
  /** @const {!Element} */
  const targetElem = /** @type {!Element} */(event.target);
  /** @const {!Element} */
  const li = targetElem.nodeName == "LI"
    ? targetElem
    : /** @type {!Element} */(targetElem.parentElement);

  /** @const {LangCode} */
  const diğerDil = dom.Lang == LangCode.TR ? LangCode.EN : LangCode.TR;
  if (li.id.slice(2) == diğerDil) {
    document.cookie = `l=${diğerDil};path=/;domain=.kimlikdao.org;SameSite=Strict;max-age=${1e6}`;
    window.location.href = Route[diğerDil] + window.location.hash;
  }
};
