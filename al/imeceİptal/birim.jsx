import Yapıştır from "../paste.svg";
import Css from "./birim.css";
import İptalciCss from "./iptalci.css";
import dom from "/lib/util/dom";

/** @const {!HTMLInputElement} */
export const EşikGirdisi = dom.input("imt");
/** @const {!HTMLAnchorElement} */
export const GösterDüğmesi = dom.a("imbe");
/** @const {!HTMLAnchorElement} */
export const İptalDüğmesi = dom.a("imbh");
/** @const {!HTMLDivElement} */
export const İptalciler = dom.div("imf");
/** @const {!HTMLDivElement} */
export const Kök = dom.div("im");
/** @const {!HTMLDivElement} */
export const Kutu = dom.div("imc");
/** @const {!HTMLInputElement} */
export const ToplamAğırlık = dom.input("ims");

const İptalci = () =>
  <div class={İptalciCss.ipt}>
    <İptalciCss />
    <input class={İptalciCss.iptai} type="text" spellcheck="false" />
    <a href="javascript:" class={[İptalciCss.iptbtn, "paste"]} title={{ en: "Paste", tr: "Yapıştır" }}><Yapıştır inline /></a>
    <a href="javascript:" class={[İptalciCss.iptbtn, "minus"]}>-</a>
    <input class={İptalciCss.iptwi} type="number" value={1} />
    <a href="javascript:" class={[İptalciCss.iptbtn, "plus"]}>+</a>
    <a href="javascript:" class={İptalciCss.iptdel} title={{ en: "Delete address", tr: "Adresi sil" }}></a>
  </div>;

export default () =>
  <Kök class="step disabled">
    <Css />
    <b data-en="4. Social revoke addresses.">4. İmece iptal adresleri.</b>
    {{
      tr: <>Fiyatı <span id="imft">$1,5’dan</span> <span id="imfs">$1’a</span> düşürmek için
        (%<span id="imfu">33</span> indirim) imece iptal adresleri eklemek istiyor musunuz?</>,
      en: <>Would you like to set up social revoke addresses to reduce the price
        from <span id="imft">$1.5</span> to <span id="imfs">$1</span>
        (a discount of <span id="imfu">33</span>%)?</>
    }}
    <br />
    <br />
    <GösterDüğmesi href="javascript:" class="act btn lft" data-en="Yes">Evet</GösterDüğmesi>
    <İptalDüğmesi href="javascript:" class="btn" data-en="No">Hayır</İptalDüğmesi>
    <Kutu style="display:none">
      <div id="imlbl">
        <b data-en="Address">Adres</b>
        <b data-en="Weight">Ağırlık</b>
      </div>
      <İptalciler>
        <İptalci />
        <İptalci />
        <İptalci />
      </İptalciler>
      <br />
      <a href="javascript:" id="imba" class="btn" en:title="Add address" title="Adres ekle">+</a>
      <div class="imdc">
        <div class="imtc ipt">
          <b class="imb" data-en="Threshold ">Eşik </b>
          <a href="javascript:" id="imtm" class={[İptalciCss.iptbtn, "minus"]}>-</a>
          <EşikGirdisi type="number" class={İptalciCss.iptwi} value={2} />
          <a href="javascript:" id="imtp" class={[İptalciCss.iptbtn, "plus"]}>+</a>
        </div>
        <div>
          <b class="imb" data-en="Total weight">Toplam Ağırlık</b>
          <ToplamAğırlık type="number" readonly value={3} />
        </div>
      </div>
      <a href="javascript:" id="imbt" class="act btn lft" data-en="OK">Tamam</a>
      <a href="javascript:" id="imbi" class="btn" data-en="Cancel">İptal</a>
    </Kutu>
  </Kök>

export { İptalci };
