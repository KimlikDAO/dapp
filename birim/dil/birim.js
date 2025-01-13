import { DilDüğmesi, DilListesi } from "./birim.jsx";
import dom from "/lib/util/dom";
import { I18nString, LangCode } from "/lib/util/i18n";
import { HostUrl } from "/crate";

/** @define {I18nString} */
const Route = { tr: "tr", en: "en" };

dom.menüYarat(DilDüğmesi, DilListesi);
DilListesi.onclick = (/** @type {Event} */ event) => {
  /** @const {!Element} */
  const targetElem = /** @type {!Element} */(event.target);
  /** @const {!HTMLLIElement} */
  const li = /** @type {!HTMLLIElement} */(targetElem.closest("li"));

  /** @const {LangCode} */
  const seçilenDil = /** @type {LangCode} */(li.id.slice(2));
  if (seçilenDil != dom.Lang) {
    document.cookie = `l=${seçilenDil};path=/;domain=.${HostUrl.slice(8)};SameSite=Strict;max-age=${1e6}`;
    window.location.href = Route[seçilenDil] + window.location.hash;
  }
};
