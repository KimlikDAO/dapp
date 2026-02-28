import Author from "../Author";
import BlogCss from "../blog.css";
import RemainingBar from "../RemainingBar";
import Banner from "./Banner";
import { PublicProvider } from "/components/chains/provider";
import USDT from "/components/tokens/USDT.svg";
import { ChainId } from "/lib/crosschain/chains";
import { ERC20 } from "/lib/ethereum/contract/ERC20";
import { css } from "/lib/kastro/StyleSheet";
import dom from "../../../lib/kastro/dom";

/** @enum {string} */
const Css = css`
  .${RemainingBar.Css.Container}.USDT {
    border: 2px solid rgba(42, 157, 143, 0.5);
    background-color: rgba(42, 157, 143, 0.04);
  }
  .${RemainingBar.Css.Bar}.USDT {
    background-color: rgba(42, 157, 143, 0.1);
  }
  /** @export */ .USDT {}
  .Purple {
    color: rgb(88, 84, 214);
    background-color: #EDE6FC
  }
  .Purple:hover {
    background-color: #DED8F9;
  }
`;

/** @const {string} */
const DEV_FUND = "0x79883D9aCBc4aBac6d2d216693F66FcC5A0BcBC1".toLowerCase();
/** @const {string} */
const ODUL = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
/** @const {string} */
const USDT_ARB = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";
/** @const {number} */
const TOTAL = 5_000e6;

/**
 * @param {{
 *   href: string,
 *   piggyback?: string
 * }} props
 */
const ECDSA = ({ href, piggyback }) => {
  dom.schedule(() =>
    new ERC20(ChainId.xa4b1, USDT_ARB)
      .allowance(PublicProvider, DEV_FUND, ODUL)
      .then((allowance) =>
        RemainingBar.setRemaining(Css.USDT, parseInt(allowance.slice(-36), 16), TOTAL)
      ),
    1000);

  return (
    <a href={href} class={BlogCss.Preview}>
      <div>
        <Banner piggyback={piggyback} />
        <h4>{{
          en: "Elliptic curve digital signature algorithm",
          tr: "Eliptik eğri imza algoritması"
        }}</h4>
        <Author name={{ tr: "KimlikDAO öğren & kazan", en: "KimlikDAO learn & earn" }} />
        <div class={BlogCss.PreviewText}>{{
          en: <>Cryptocurrencies such as Bitcoin and Ether can only be spent
            by their owners thanks to ECDSA (elliptic curve digital signature
            algorithm). In this article, we’ll construct ECDSA by starting from
            a simple prover-challenger game and gradually extending it. We
            assume some familiarity with elliptic curves.</>,
          tr: <>Bitcoin ve Ether gibi kripto paraların sadece sahibi tarafından
            harcanabilmesini ECDSA sağlıyor. ECDSA’yı iki kişinin oynadığı bir
            kanıtlama oyunuyla başlayıp adım adım ilerleyerek oluşturacağız.
            Temel eliptik eğri bilgisi gerektirir.</>
        }}</div>
      </div>
      <div class={BlogCss.PreviewFooter}>
        <button class={[BlogCss.ReadButton, Css.Purple]}>{{
          en: "Read", tr: "Oku"
        }}</button>
        <RemainingBar id={Css.USDT} className={Css.USDT} maximum={TOTAL} ticker="USDT">
          <USDT inline width={22} height={22} />
        </RemainingBar>
      </div>
    </a >
  );
};

export default ECDSA;
