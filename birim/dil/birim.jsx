import Css from "./birim.css";
import EnFlag from "./en.svg";
import TrFlag from "./tr.svg";
import dom from "/lib/util/dom";

/** @const {!HTMLAnchorElement} */
export const DilButonu = dom.a("dib");
/** @const {!HTMLUListElement} */
export const DilListesi = dom.ul("did");

const Dil = () => (
  <div id="di">
    <Css />
    <DilButonu class="bae" data-en="EN" href="javascript:">TR</DilButonu>
    <DilListesi style="display:none">
      <li id="ditr"><TrFlag width={16} height={16} /> Türkçe</li>
      <li id="dien"><EnFlag width={16} height={16} /> English</li>
    </DilListesi>
  </div>
);

export default Dil;
