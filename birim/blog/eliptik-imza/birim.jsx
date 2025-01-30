import BlogCss from "../birim.css";
import RemainingBar from "../RemainingBar";
import Yazar from "../Yazar";
import Banner from "./Banner.jsx";
import { AğBilgileri } from "/birim/ağlar/birim";
import USDT from "/birim/paralar/USDT.svg";
import { ChainId } from "/lib/crosschain/chains";
import { ERC20 } from "/lib/ethereum/ERC20";
import "/lib/ethereum/transaction.d";
import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";

const Css = css`
  .${RemainingBar.Css.Container}.USDT {
    border: 2px solid rgba(42, 157, 143, 0.5);
  }
  .${RemainingBar.Css.Bar}.USDT {
    background-color: rgba(42, 157, 143, 0.1);
  }
  /** @export */ .USDT {}
  .Mor {
    color: rgb(88, 84, 214);
    background-color: #EDE6FC
  }
`;

/** @const {string} */
const DEV_FUND = "0x79883D9aCBc4aBac6d2d216693F66FcC5A0BcBC1".toLowerCase();
/** @const {string} */
const ODUL = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
/** @const {string} */
const USDT_ARB = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";
/** @const {number} */
const TOTAL = 5_000_000_000;

/**
 * @param {{ href: string}=} props
 * @return {Promise<string>}
 */
const EliptikImza = ({ href }) => {
  dom.schedule(() =>
    new ERC20("https://" + AğBilgileri[ChainId.xa4b1].rpcUrl, USDT_ARB)
      .allowance(DEV_FUND, ODUL)
      .then((izin) =>
        RemainingBar.setRemaining(Css.USDT, parseInt(izin.slice(-36), 16), TOTAL)
      ),
    1000);

  return (
    <a href={href} class={BlogCss.Preview}>
      <Css />
      <BlogCss />
      <div>
        <Banner class={BlogCss.PreviewBanner} inline />
        <h4>{{
          en: "Elliptic curve digital signature algorithm",
          tr: "Eliptik eğri imza algoritması"
        }}</h4>
        <Yazar ad={{ tr: "KimlikDAO öğren & kazan", en: "KimlikDAO learn & earn" }} />
        <div class={BlogCss.PreviewMetni}>{{
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
        <button class={[BlogCss.OkuDüğmesi, Css.Mor]}>{{
          en: "Read", tr: "Oku"
        }}</button>
        <RemainingBar id={Css.USDT} className={Css.USDT} maximum={TOTAL} ticker="USDT">
          <USDT inline width={22} height={22} />
        </RemainingBar>
      </div>
    </a >
  );
};

export default EliptikImza;
