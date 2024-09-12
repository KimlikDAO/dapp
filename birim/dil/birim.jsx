import dom from "/lib/util/dom";

/** @const {!HTMLAnchorElement} */
export const DilButonu = dom.a("dib");
/** @const {!HTMLUListElement} */
export const DilListesi = dom.ul("did");

const Dil = () => (
  <div id="di">
    <link rel="stylesheet" href="/birim/dil/birim.css" data-shared />
    <DilButonu class="bae" data-en="EN" href="javascript:">TR</DilButonu>
    <DilListesi style="display:none">
      <li id="ditr"><img src="/birim/dil/tr.svg" width={16} height={16} /> Türkçe</li>
      <li id="dien"><img src="/birim/dil/en.svg" width={16} height={16} /> English</li>
    </DilListesi>
  </div>
);

export default Dil;
