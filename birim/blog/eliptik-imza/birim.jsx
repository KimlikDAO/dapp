import BlogCss from "../birim.css";
import Yazar from "../yazar/birim";
import Banner from "./banner.svg";
import Css from "./birim.css";
import USDT from "/birim/paralar/USDT.svg";
import dom from "/lib/util/dom";

/** @const {!HTMLSpanElement} */
export const RemainingBar = dom.span("blei");

export default ({ href }) => (
  <a href={href} class="blp">
    <Css />
    <BlogCss />
    <div>
      <Banner class="blpp" inline />
      <h4 data-en="Elliptic curve digital signature algorithm">Eliptik eğri imza algoritması</h4>
      <Yazar ad={{ tr: "KimlikDAO öğren & kazan", en: "KimlikDAO learn & earn" }} />
      <div class="bly"
        data-en="Cryptocurrencies such as Bitcoin and Ether can only be spent by their owners thanks to ECDSA (elliptic curve digital signature algorithm). In this article, we’ll construct ECDSA by starting from a simple prover-challenger game and gradually extending it. We assume some familiarity with elliptic curves.">
        Bitcoin ve Ether gibi kripto paraların sadece sahibi tarafından harcanabilmesini ECDSA sağlıyor.
        ECDSA’yı iki kişinin oynadığı bir kanıtlama oyunuyla başlayıp adım adım
        ilerleyerek oluşturacağız. Temel eliptik eğri bilgisi gerektirir.
      </div>
    </div>
    <div class="blf">
      <button class="bloku blmor" data-en="Read">Oku</button>
      <div class="blpc usdt">
        <div class="blpi usdt" style="width:180px"></div>
        <div class="blpit">
          <USDT inline width="22" height="22" />{" "}
          <RemainingBar data-en="5,000">5.000</RemainingBar>/{{ en: "5,000", tr: "5.000" }} USDT
        </div>
      </div>
    </div>
  </a >
);
