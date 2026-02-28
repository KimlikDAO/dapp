import Author from "../Author";
import BlogCss from "../blog.css";
import RemainingBar from "../RemainingBar";
import Banner from "./banner.png";
import { PublicProvider } from "/components/chains/provider";
import UBInuImage from "/components/tokens/UBINU.png";
import { ChainId } from "/lib/crosschain/chains";
import { ERC20 } from "/lib/ethereum/contract/ERC20";
import { css } from "/lib/kastro/StyleSheet";
import dom from "../../../lib/kastro/dom";

/** @enum {string} */
const Css = css`
  .${RemainingBar.Css.Container}.UBInu {
    border: 2px solid #F4BCFD;
    background-color: rgba(244, 188, 253, 0.07);
  }
  .${RemainingBar.Css.Bar}.UBInu {
    background-color: rgba(244, 188, 253, 0.3);
  }
  /** @export */ .UBInu {}
  img.UBInu {
    border-radius: 11px;
  }
  .Green {
    color: #066a52;
    background-color: #cff4ea;
  }
`;

/** @const {string} */
const USDC_AVALANCHE = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";
/** @const {string} */
const DEV_FUND = "0x79883D9aCBc4aBac6d2d216693F66FcC5A0BcBC1".toLowerCase();
/** @const {string} */
const ODUL = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
/** @const {number} */
const TOTAL = 50_000_000_000;

/**
 * @param {{
 *   href: string,
 *   piggyback?: string
 * }} props
 */
const EllipticCurves = ({ href, piggyback }) => {
  dom.schedule(() =>
    new ERC20(ChainId.xa86a, USDC_AVALANCHE)
      .allowance(PublicProvider, DEV_FUND, ODUL)
      .then((allowance) =>
        RemainingBar.setRemaining(Css.UBInu, parseInt(allowance.slice(-36), 16), TOTAL))
    , 1000
  );

  return (
    <a href={href} class={BlogCss.Preview}>
      <div>
        <Banner class={BlogCss.PreviewBanner} width="100%" quality={60}
          piggyback={piggyback}
          bundleWidth={36 * 15}
          bundleHeight={19 * 15} />
        <h4>{{
          en: "Elliptic curves and their applications in crypto",
          tr: "Eliptik eğriler ve kriptoda kullanımı"
        }}</h4>
        <Author name={{ tr: "KimlikDAO öğren & kazan", en: "KimlikDAO learn & earn" }} />
        <div class={BlogCss.PreviewText}>{{
          en: <>Elliptic curves are one of the most important primitives in modern
            cryptography. This article will explore elliptic curves, focusing on
            their properties used in digital signatures. No previous knowledge of
            the subject is assumed.</>,
          tr: <>Modern kriptografinin temel yapıtaşlarından biri olan eliptik eğrileri
            sıfırdan ele alıp dijital imzaların oluşturulmasında kullanılan
            özelliklerini inceleyeceğiz.</>
        }}</div>
      </div>
      <div class={BlogCss.PreviewFooter}>
        <button class={[BlogCss.ReadButton, Css.Green]}>{{
          en: "Read", tr: "Oku"
        }}</button>
        <RemainingBar id={Css.UBInu} className={Css.UBInu} maximum={TOTAL} ticker="UBINU">
          <UBInuImage width={22} height={22} class={Css.UBInu} piggyback={piggyback} />
        </RemainingBar>
      </div>
    </a>
  );
}

export default EllipticCurves;
