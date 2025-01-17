import BlogCss from "../birim.css";
import Yazar from "../Yazar";
import Banner from "./banner.png";
import Css from "./birim.css";
import { AğBilgileri } from "/birim/ağlar/birim";
import DobbyResmi from "/birim/paralar/DOBBY.png";
import jsonrpc from "/lib/api/jsonrpc";
import { ChainId } from "/lib/crosschain/chains";
import { address } from "/lib/ethereum/provider";
import "/lib/ethereum/transaction.d";
import dom from "/lib/util/dom";

/** @const {!HTMLSpanElement} */
const RemainingBar = dom.span(Css.RemainingBar);
/** @const {string} */
const USDC_AVALANCHE = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";
/** @const {string} */
const DEV_FUND = "0x79883D9aCBc4aBac6d2d216693F66FcC5A0BcBC1".toLowerCase();
/** @const {string} */
const ODUL = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"

/**
 * @param {{ href: string, piggyback: string }=} props
 * @return {Promise<string>}
 */
const EliptikEğriler = ({ href, piggyback }) => {
  jsonrpc.call("https://" + AğBilgileri[ChainId.xa86a].rpcUrl, "eth_call", [
    /** @type {!eth.Transaction} */({
      to: USDC_AVALANCHE,
      data: "0xdd62ed3e" + address(DEV_FUND) + address(ODUL)
    }), "latest"
  ]).then((izin) => {
    /** @const {number} */
    const kalan = parseInt(izin.slice(-36), 16);
    RemainingBar.innerText = "" + kalan;
    RemainingBar.parentElement.previousElementSibling.style.width = kalan * 180 / 50000 + "px";
  });

  return (
    <a href={href} class={BlogCss.Preview}>
      <Css />
      <BlogCss />
      <div>
        <Banner class={BlogCss.PreviewBanner} width="100%" quality={60}
          piggyback={piggyback}
          bundleWidth={36 * 13}
          bundleHeight={19 * 13} />
        <h4>{{
          en: "Elliptic curves and their applications in crypto",
          tr: "Eliptik eğriler ve kriptoda kullanımı"
        }}</h4>
        <Yazar ad={{ tr: "KimlikDAO öğren & kazan", en: "KimlikDAO learn & earn" }} />
        <div class={BlogCss.PreviewMetni}>{{
          en: <>Elliptic curves are one of the most important primitives in modern
            cryptography. This article will delve into elliptic curves, with a special
            emphasis on their properties used in digital signatures.
            No previous knowledge of the subject is assumed.</>,
          tr: <>Modern kriptografinin temel yapıtaşlarından biri olan eliptik eğrileri
            sıfırdan ele alıp dijital imzaların oluşturulmasında kullanılan
            özelliklerini inceleyeceğiz.</>
        }}</div>
      </div>
      <div class={BlogCss.PreviewFooter}>
        <button class={[BlogCss.OkuDüğmesi, Css.Yeşil]}>{{
          en: "Read", tr: "Oku"
        }}</button>
        <div class={[BlogCss.ProgressContainer, Css.Dobby]}>
          <div class={[BlogCss.ProgressIndicator, Css.Dobby]} style="width:180px"></div>
          <div class={BlogCss.ProgressText}>
            <DobbyResmi width={22} height={22} id={Css.DobbyResmi} piggyback={piggyback} />{" "}
            <RemainingBar>{{ en: "50,000", tr: "50.000" }}</RemainingBar>/{{
              en: "50,000", tr: "50.000"
            }} DOBBY
          </div>
        </div>
      </div>
    </a>
  );
}

export default EliptikEğriler;
