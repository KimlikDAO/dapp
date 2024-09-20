import dom from "/lib/util/dom";
import Css from "./birim.css";

/** @const {!HTMLAnchorElement} */
export const DilButonu = dom.a("dib");
/** @const {!HTMLUListElement} */
export const DilListesi = dom.ul("did");

const Dil = () => (
  <div id="di">
    <Css />
    <DilButonu class="bae" data-en="EN" href="javascript:">TR</DilButonu>
    <DilListesi style="display:none">
      <li id="ditr"><img src="/birim/dil/tr.svg" width={16} height={16} /> Türkçe</li>
      <li id="dien"><img src="/birim/dil/en.svg" width={16} height={16} /> English</li>
    </DilListesi>
  </div>
);

export default Dil;
