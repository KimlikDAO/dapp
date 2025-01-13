import Css from "./birim.css";
import EnFlag from "./en.svg";
import TrFlag from "./tr.svg";
import BaşlıkCss from "/birim/başlık/birim.css";
import dom from "/lib/util/dom";
import { LangCode } from "/lib/util/i18n";

/** @const {!HTMLAnchorElement} */
export const DilDüğmesi = dom.a(Css.DilDüğmesi);
/** @const {!HTMLUListElement} */
export const DilListesi = dom.ul(Css.DilListesi);

const Dil = () => (
  <div id={Css.Kök}>
    <Css />
    <DilDüğmesi class={BaşlıkCss.Link} href="javascript:">{{ en: "EN", tr: "TR" }}</DilDüğmesi>
    <DilListesi style="display:none">
      <li id={Css.Kök + LangCode.EN}><EnFlag width={16} height={16} /> English</li>
      <li id={Css.Kök + LangCode.TR}><TrFlag width={16} height={16} /> Türkçe</li>
    </DilListesi>
  </div>
);

export default Dil;
