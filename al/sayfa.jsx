import Css from "./sayfa.css";
import Tanışma from "./tanışma/birim.jsx";
import Ödeme from "./ödeme/birim.jsx";
import Başlık from "/birim/başlık/birim";
import Favicon from "/birim/icon.svg";
import KPass from "/birim/kpass/birim.jsx";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import Telefon from "/birim/telefon/birim.jsx";
import { ChainId } from "/lib/crosschain/chains";
import { assignGlobals } from "/lib/kastro/compiler/pageGlobals";

const CüzdanBağlama = () =>
  <div id="al1" class="step">
    <b data-en="1. Connect your wallet.">1. Cüzdanınızı bağlayın. </b>{{
      tr: "Cüzdan bağlayarak devam edin.",
      en: "Proceed with a crypto wallet."
    }}<br /><br />
    <a href="javascript:" id="al1a" class="act btn" data-en="Connect wallet">Cüzdan bağla</a>
  </div>;

const Şifreleme = () =>
  <div id="al3" class="step disabled">
    <b data-en="3. Let’s encrypt your KPass.">3. KPass’inizi şifreleyelim. </b>{{
      en: "We need 4 signatures from you to encrypt your KPass.",
      tr: "KPass’ini şifrelememiz için sizden 4 adet imzaya ihtiyacımız var. Bu işlem off-chain, tamamen ücretsiz ve güvenli."
    }}<br /><br />
    <a href="javascript:" id="al3a" class="act btn" data-en="Request 4 signatures">4 imza isteği yolla</a>
  </div>;

const Al = () => {
  assignGlobals({
    Chains: [
      ChainId.x1,
      ChainId.MinaMainnet,
      ChainId.xa4b1,
      ChainId.x89,
      ChainId.xa86a,
      ChainId.x38
    ],
    ChainNotes: {
      [ChainId.MinaMainnet]: { tr: "Yeni ✨", en: "New ✨" },
      [ChainId.xa4b1]: { tr: "Ana ağ", en: "Signal chain" }
    },
    DefaultChain: ChainId.xa4b1,
  });
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Lato400 shared />
        <Lato700 shared />
        <title data-en="KimlikDAO | Mint KPass">KimlikDAO | KPass al</title>
        <birim:ortakcss />
        <Favicon raster={32} rel="icon" />
        <Css />
        <script type="module" src="/al/sayfa.js" data-loose></script>
      </head>

      <body>
        <Başlık href="/" />
        <div id="al">
          <div id="als">
            <CüzdanBağlama />
            <Tanışma />
            <Şifreleme />
            <altbirim:imeceİptal />
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
}

export default Al;
