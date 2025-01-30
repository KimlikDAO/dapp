import Css from "./birim.css";
import EnFlag from "./en.svg";
import TrFlag from "./tr.svg";
import BaşlıkCss from "/birim/başlık/birim.css";
import { HostUrl } from "/crate";
import dom from "/lib/util/dom";
import { I18nString, LangCode } from "/lib/util/i18n";

/** @define {I18nString} */
const Route = { tr: "tr", en: "en" };
/** @const {!HTMLAnchorElement} */
const DilDüğmesi = dom.a(Css.DilDüğmesi);
/** @const {!HTMLUListElement} */
const DilListesi = dom.ul(Css.DilListesi);

/**
 * @param {Event} event 
 */
const dilSeçilince = (event) => {
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

const Dil = () => (
  <div id={Css.Kök}>
    <Css />
    <DilDüğmesi
      controlsDropdown={DilListesi}
      class={BaşlıkCss.Link} href="javascript:">{{ en: "EN", tr: "TR" }}</DilDüğmesi>
    <DilListesi nodisplay onClick={dilSeçilince}>
      <li id={Css.Kök + LangCode.EN}><EnFlag width={16} height={16} /> English</li>
      <li id={Css.Kök + LangCode.TR}><TrFlag width={16} height={16} /> Türkçe</li>
    </DilListesi>
  </div>
);

export default Dil;
