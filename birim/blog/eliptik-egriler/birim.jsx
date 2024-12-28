import BlogCss from "../birim.css";
import Yazar from "../yazar/birim";
import Banner from "./banner.png";
import Css from "./birim.css";
import dom from "/lib/util/dom";
import DobbyResmi from "/birim/paralar/DOBBY.png";

/** @const {!HTMLSpanElement} */
export const RemainingBar = dom.span("blee");

export default ({ href }) =>
  <a href={href} class="blp">
    <Css />
    <BlogCss />
    <div>
      <Banner class="blpp" width="100%" />
      <h4 data-en="Elliptic curves and their applications in crypto">Eliptik eğriler ve kriptoda kullanımı</h4>
      <Yazar ad={{ tr: "KimlikDAO öğren & kazan", en: "KimlikDAO learn & earn" }} />
      <div class="bly">{{
        en: "Elliptic curves are one of the most important primitives in modern cryptography. " +
          "This article will delve into elliptic curves, with a special emphasis on their properties used in digital signatures. No previous knowledge of the subject is assumed.",
        tr: "Modern kriptografinin temel yapıtaşlarından biri olan eliptik eğrileri sıfırdan ele alıp dijital imzaların oluşturulmasında kullanılan özelliklerini inceleyeceğiz."
      }}</div>
    </div>
    <div class="blf">
      <button class="bloku blyes" data-en="Read">Oku</button>
      <div class="blpc dobby">
        <div class="blpi dobby" style="width:180px"></div>
        <div class="blpit">
          <DobbyResmi width="22" height="22" id="bldob" />{" "}
          <RemainingBar data-en="50,000">50.000</RemainingBar>/{{
            en: "50,000",
            tr: "50.000"
          }} DOBBY
        </div>
      </div>
    </div>
  </a >;
