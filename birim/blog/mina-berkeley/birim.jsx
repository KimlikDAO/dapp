import Banner from "./banner.png";
import Css from "./birim.css";
import BlogCss from "/birim/blog/birim.css";
import Yazar from "/birim/blog/yazar/birim";
import MINA from "/birim/paralar/MINA.png";

/** @const {!HTMLSpanElement} */
export const RemainingBar = dom.span("blmb");

export default ({ href }) => (
  <a href={href} class="blp">
    <BlogCss />
    <Css />
    <div>
      <Banner class="blpp" width="100%" />
      <h4 data-en="Mina Berkeley upgrade">Mina Berkeley güncellemesi</h4>
      <Yazar ad={{ "tr": "KimlikDAO öğren & kazan", "en": "KimlikDAO learn & earn" }} />
      <div class="bly">{{
        "en": "Learn about Mina's Berkeley upgrade, interact with your first zkApp and earn 10 MINAs. In this article, we'll learn how to create a Mina wallet, how to fund it and use it to interact with a zkApp. Each participant will be awarded 10 MINAs.",
        "tr": "Mina Berkeley güncellemesini öğren ve 10 MINA kazan! Bu makalede Mina Berkeley güncellemesini inceleyecek, Mina cüzdanı kurmayı ve para aktarmayı öğreneceğiz. Bu cüzdanla ilk zkApp'imizle etkilşime girip 10 MINA kazancağız."
      }}</div>
    </div>
    <div class="blf">
      <button class="bloku bltur" data-en="Read">Oku</button>
      <div class="blpc mina">
        <div class="blpi mina" style="width:180px"></div>
        <div class="blpit">
          <MINA width="22" height="22" />{" "}
          <RemainingBar data-en="5,000">5.000</RemainingBar>/{{ en: "5,000", "tr": "5.000" }} MINA
        </div>
      </div>
    </div>
  </a>
);
