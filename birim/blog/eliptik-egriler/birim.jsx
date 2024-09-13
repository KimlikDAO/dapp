import dom from "/lib/util/dom";
import Yazar from "../yazar/birim";

/** @const {!HTMLSpanElement} */
export const RemainingBar = dom.span("blee");

export default ({ href }) => (
  <a href={href} class="blp">
    <link href="/birim/blog/birim.css" rel="stylesheet" />
    <link href="/birim/blog/eliptik-egriler/birim.css" rel="stylesheet" />
    <div>
      <img src="/birim/blog/eliptik-egriler/banner.png" class="blpp" width="100%" />
      <h4 data-en="Elliptic curves and their applications in crypto">Eliptik eğriler ve kriptoda kullanımı</h4>
      <Yazar ad={{ "tr": "KimlikDAO öğren & kazan", "en": "KimlikDAO learn & earn" }} />
      <div class="bly"
        data-en="Elliptic curves are one of the most important primitives in modern cryptography. This article will delve into elliptic curves, with a special emphasis on their properties used in digital signatures. No previous knowledge of the subject is assumed.">
        Modern kriptografinin temel yapıtaşlarından biri olan eliptik eğrileri sıfırdan
        ele alıp dijital imzaların oluşturulmasında kullanılan özelliklerini inceleyeceğiz.
      </div>
    </div>
    <div class="blf">
      <button class="bloku blyes" data-en="Read">Oku</button>
      <div class="blpc dobby">
        <div class="blpi dobby" style="width:180px"></div>
        <div class="blpit">
          <img src="/birim/paralar/DOBBY.png" width="22" height="22" id="bldob" />{" "}
          <RemainingBar data-en="50,000">50.000</RemainingBar>/<span data-phantom data-en="50,000">50.000</span> DOBBY
        </div>
      </div>
    </div>
  </a >
);
