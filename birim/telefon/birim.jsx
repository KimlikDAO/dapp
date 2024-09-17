import Css from "./birim.css";
import KPass from "/birim/kpass/birim.jsx";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
export const Adres = dom.div("ted");
/** @const {!HTMLDivElement} */
export const AnaEkran = dom.div("tea");
/** @const {!HTMLDivElement} */
export const DüğmeliNft = dom.div("tel");
/** @const {!HTMLDivElement} */
export const Kutu = dom.div("tek");
/** @const {!HTMLDivElement} */
export const NftDüğmesi = dom.div("tez");

const Telefon = ({ kpass = true, style } = {}) => (
  <div id="te" style={style}>
    <Css />
    <AnaEkran>
      <div id="teb">$1523.74</div>
      <div id="tec">KimlikDAO</div>
      <Adres>0xcCc0...0cCc</Adres>
      <div id="tee">
        <div id="tef">Tokens</div>
        <div id="teg">NFTs</div>
      </div>
      <div id="teh">
        <div class="tei"></div>
        <div class="tei"></div>
      </div>
    </AnaEkran>
    <Kutu style="opacity:0">
      <div id="tet"></div>
      <div id="tes">
        <div id="ten" data-en="Cancel">Hayır</div>
        <div id="tey" data-en="Provide">Evet</div>
      </div>
    </Kutu>
    <DüğmeliNft>
      {kpass && <KPass />}
      <NftDüğmesi style="display:none" data-en="Encrypt">Gizle</NftDüğmesi>
    </DüğmeliNft>
  </div >
);

export default Telefon;
