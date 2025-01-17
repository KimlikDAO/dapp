import Banner from "kastro:./banner.svg.jsx";
import BlogCss from "../birim.css";
import Yazar from "../Yazar";
import Css from "./birim.css";
import { AğBilgileri } from "/birim/ağlar/birim";
import USDT from "/birim/paralar/USDT.svg";
import jsonrpc from "/lib/api/jsonrpc";
import { ChainId } from "/lib/crosschain/chains";
import { address } from "/lib/ethereum/provider";
import "/lib/ethereum/transaction.d";
import dom from "/lib/util/dom";

/** @const {!HTMLSpanElement} */
const RemainingBar = dom.span(Css.RemainingBar);
/** @const {string} */
const DEV_FUND = "0x79883D9aCBc4aBac6d2d216693F66FcC5A0BcBC1".toLowerCase();
/** @const {string} */
const ODUL = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
/**
 * USDT contract address on Arbitrum One.
 *
 * @const {string}
 */
const USDT_ARB = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";

/**
 * @param {{ href: string}=} props
 * @return {Promise<string>}
 */
const EliptikImza = ({ href }) => {
  jsonrpc.call("https://" + AğBilgileri[ChainId.xa4b1].rpcUrl, "eth_call", [
    /** @type {!eth.Transaction} */({
      to: USDT_ARB,
      data: "0xdd62ed3e" + address(DEV_FUND) + address(ODUL)
    }), "latest"
  ]).then((izin) => {
    const kalan = parseInt(izin.slice(-36), 16);
    RemainingBar.innerText = kalan;
    RemainingBar.parentElement.previousElementSibling.style.width = kalan * 180 / 5000 + "px";
  });

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
          en: "Cryptocurrencies such as Bitcoin and Ether can only be spent by their owners thanks to ECDSA (elliptic curve digital signature algorithm). In this article, we’ll construct ECDSA by starting from a simple prover-challenger game and gradually extending it. We assume some familiarity with elliptic curves.",
          tr: "Bitcoin ve Ether gibi kripto paraların sadece sahibi tarafından harcanabilmesini ECDSA sağlıyor. ECDSA’yı iki kişinin oynadığı bir kanıtlama oyunuyla başlayıp adım adım ilerleyerek oluşturacağız. Temel eliptik eğri bilgisi gerektirir."
        }}</div>
      </div>
      <div class={BlogCss.PreviewFooter}>
        <button class={[BlogCss.OkuDüğmesi, Css.Mor]}>{{
          en: "Read", tr: "Oku"
        }}</button>
        <div class={[BlogCss.ProgressContainer, "usdt"]}>
          <div class={[BlogCss.ProgressIndicator, "usdt"]} style="width:180px"></div>
          <div class={[BlogCss.ProgressText, "usdt"]}>
            <USDT inline width={22} height={22} />{" "}
            <RemainingBar>{{ en: "5,000", tr: "5.000" }}</RemainingBar>/{{ en: "5,000", tr: "5.000" }} USDT
          </div>
        </div>
      </div>
    </a >
  );
};

export default EliptikImza;
