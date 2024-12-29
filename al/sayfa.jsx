import Script from "kastro:./sayfa.js";
import PowWorker from "kastro:./tanışma/powWorker.js";
import İmeceİptal from "./imeceİptal/birim.jsx";
import Css from "./sayfa.css";
import Tanışma from "./tanışma/birim.jsx";
import Ödeme from "./ödeme/birim.jsx";
import Başlık from "/birim/başlık/birim";
import Favicon from "/birim/icon.svg";
import KPass from "/birim/kpass/birim.jsx";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import OrtakCss from "/birim/ortakcss/birim";
import Telefon from "/birim/telefon/birim.jsx";
import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

/** @const {!HTMLAnchorElement} */
export const BağlaDüğmesi = dom.a("al1a");

/** @const {!Array<ChainId>} */
const Chains = [
  ChainId.x1,
  ChainId.MinaMainnet,
  ChainId.xa4b1,
  ChainId.x89,
  ChainId.xa86a,
  ChainId.x38
];

/** @const {!Object<ChainId, I18nString>} */
const ChainNotes = {
  [ChainId.MinaMainnet]: { tr: "Yeni ✨", en: "New ✨" },
  [ChainId.xa4b1]: { tr: "Ana ağ", en: "Signal chain" }
};

/** @const {ChainId} */
const DefaultChain = ChainId.xa4b1;

const CüzdanBağlama = () =>
  <div id="al1" class="step">
    <b data-en="1. Connect your wallet.">1. Cüzdanınızı bağlayın.</b>{{
      tr: "Cüzdan bağlayarak devam edin.",
      en: "Proceed with a crypto wallet."
    }}<br /><br />
    <BağlaDüğmesi href="javascript:" class="act btn" data-en="Connect wallet">Cüzdan bağla</BağlaDüğmesi>
  </div>;

const Şifreleme = () =>
  <div id="al3" class="step disabled">
    <b data-en="3. Let’s encrypt your KPass.">3. KPass’inizi şifreleyelim. </b>{{
      en: "We need 4 signatures from you to encrypt your KPass.",
      tr: "KPass’ini şifrelememiz için sizden 4 adet imzaya ihtiyacımız var. Bu işlem off-chain, tamamen ücretsiz ve güvenli."
    }}<br /><br />
    <a href="javascript:" id="al3a" class="act btn" data-en="Request 4 signatures">4 imza isteği yolla</a>
  </div>;

const Al = ({ Lang }) => (
  <html lang={Lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Lato400 shared />
      <Lato700 shared />
      <title>KimlikDAO | {{ tr: "KPass al", en: "Mint KPass" }}</title>
      <Favicon raster={32} rel="icon" />
      <OrtakCss />
      <Css />
      <Script Chains={Chains} DefaultChain={DefaultChain}>
        <PowWorker bundleKey="POW_WORKER_PATH" strict />
      </Script>
    </head>
    <body>
      <Başlık href="/" DefaultChain={DefaultChain} Chains={Chains} ChainNotes={ChainNotes} />
      <div id="al">
        <div id="als">
          <CüzdanBağlama />
          <Tanışma />
          <Şifreleme />
          <İmeceİptal />
          <Ödeme />
        </div>
        <div id="alr">
          <div id="alu">
            <KPass />
          </div>
          <Telefon style="opacity:0" kpass={false} />
        </div>
      </div>
    </body>
  </html>
);

export default Al;
