import Yazar from "../Yazar";
import Banner from "./banner.png";
import Css from "./birim.css";
import { AğBilgileri } from "/birim/ağlar/birim";
import BlogCss from "/birim/blog/birim.css";
import MINA from "/birim/paralar/MINA.png";
import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

/** @const {!HTMLSpanElement} */
const RemainingBar = dom.span(Css.RemainingBar);
/** @const {string} */
const ZkAppAddress = "B62qmuv9skuJS8564ZptVbp9NmMR5a1wjMaFDEUFcmBciZuekQJZ4gD";

/**
 * @param {{ href: string, piggyback: string }=} props
 * @return {Promise<string>}
 */
const MinaAppchain = ({ href, piggyback }) => {
  fetch(`https://${AğBilgileri[ChainId.MinaTestnet].rpcUrl}/accounts/${ZkAppAddress}`)
    .then((res) => res.json())
    .then((data) => {
      /** @const {number} */
      const kalan = +data["account"]["balance"]["total"] | 0;
      RemainingBar.innerText = kalan;
      RemainingBar.parentElement.previousElementSibling.style.width =
        (kalan * 180) / 5000 + "px";
    });
  return (
    <a href={href} class={BlogCss.Preview}>
      <BlogCss />
      <Css />
      <div>
        <Banner class={BlogCss.PreviewBanner} width="100%" piggyback={piggyback} />
        <h4>{{
          en: "KimlikDAO Mina Appchain",
          tr: "KimlikDAO Mina Appchain’i"
        }}</h4>
        <Yazar ad={{ tr: "KimlikDAO öğren & kazan", en: "KimlikDAO learn & earn" }} />
        <div class={BlogCss.PreviewMetni}>{{
          en: "Learn about Mina's Berkeley upgrade, interact with your first zkApp and earn 10 MINAs. In this article, we'll learn how to create a Mina wallet, how to fund it and use it to interact with a zkApp. Each participant will be awarded 10 MINAs.",
          tr: "Mina Berkeley güncellemesini öğren ve 10 MINA kazan! Bu makalede Mina Berkeley güncellemesini inceleyecek, Mina cüzdanı kurmayı ve para aktarmayı öğreneceğiz. Bu cüzdanla ilk zkApp'imizle etkilşime girip 10 MINA kazancağız."
        }}</div>
      </div>
      <div class={BlogCss.PreviewFooter}>
        <button class={[BlogCss.OkuDüğmesi, Css.Turuncu]}>{{
          en: "Read",
          tr: "Oku"
        }}</button>
        <div class={[BlogCss.ProgressContainer, "mina"]}>
          <div class={[BlogCss.ProgressIndicator, "mina"]} style="width:180px"></div>
          <div class={[BlogCss.ProgressText, "mina"]}>
            <MINA width={22} height={22} />{" "}
            <RemainingBar data-en="5,000">5.000</RemainingBar>/{{ en: "5,000", tr: "5.000" }} MINA
          </div>
        </div>
      </div>
    </a>
  );
}

export default MinaAppchain;
