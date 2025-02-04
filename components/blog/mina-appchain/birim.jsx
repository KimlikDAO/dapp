import Author from "../Author";
import BlogCss from "../blog.css";
import RemainingBar from "../RemainingBar";
import Banner from "./banner.png";
import { ChainInfos } from "/components/chains/chains";
import MINA from "/components/tokens/MINA.png";
import { ChainId } from "/lib/crosschain/chains";
import { css } from "/lib/kastro/stylesheet";

const Css = css`
  .${RemainingBar.Css.Container}.MINA {
    border: 2px solid #979bed
  }
  .${RemainingBar.Css.Bar}.MINA {
    background-color: #f5f5fd;
  }
  /** @export */ #MINA {}
  .Orange {
    color: #ff603b;
    background-color: #ffdfd8
  }
`;

/** @const {string} */
const ZkAppAddress = "B62qmuv9skuJS8564ZptVbp9NmMR5a1wjMaFDEUFcmBciZuekQJZ4gD";
/** @const {number} */
const TOTAL = 10_000_000_000_000;

/**
 * @param {{ href: string, piggyback: string }=} props
 */
const MinaAppchain = ({ href, piggyback }) => {
  fetch(`https://${ChainInfos[ChainId.MinaMainnet].rpcUrl}/accounts/${ZkAppAddress}`)
    .then((res) => res.json())
    .then((data) =>
      RemainingBar.setRemaining(Css.MINA, +data["account"]["balance"]["total"] | 0, TOTAL)
    );

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
        <Author name={{ en: "KimlikDAO learn & earn", tr: "KimlikDAO öğren & kazan" }} />
        <div class={BlogCss.PreviewText}>{{
          en: "Learn about Mina's Berkeley upgrade, interact with your first zkApp and earn 10 MINAs. In this article, we'll learn how to create a Mina wallet, how to fund it and use it to interact with a zkApp. Each participant will be awarded 10 MINAs.",
          tr: "Mina Berkeley güncellemesini öğren ve 10 MINA kazan! Bu makalede Mina Berkeley güncellemesini inceleyecek, Mina cüzdanı kurmayı ve para aktarmayı öğreneceğiz. Bu cüzdanla ilk zkApp'imizle etkilşime girip 10 MINA kazancağız."
        }}</div>
      </div>
      <div class={BlogCss.PreviewFooter}>
        <button class={[BlogCss.ReadButton, Css.Orange]}>{{
          en: "Read",
          tr: "Oku"
        }}</button>
        <RemainingBar id={Css.MINA} className={Css.MINA} maximum={TOTAL} ticker="MINA">
          <MINA width={22} height={22} piggyback={piggyback} />
        </RemainingBar>
      </div>
    </a>
  );
}

export default MinaAppchain;
