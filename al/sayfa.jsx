import Css from "./sayfa.css";
import { ChainId } from "/lib/crosschain/chains";
import { assignGlobals } from "/lib/kastro/compiler/pageGlobals";

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
        <title data-en="KimlikDAO | Mint KPass">KimlikDAO | KPass al</title>
        <birim:lato />
        <birim:ortakcss />
        <birim:favicon />
        <Css />
        <script type="module" src="/al/sayfa.js" data-loose></script>
      </head>

      <body>
        <birim:başlık data-href="/" />
        <div id="al">
          <div id="als">
            <div id="al1" class="step"><b data-en="1. Connect your wallet.">1. Cüzdanınızı bağlayın.</b><span
              data-en="Proceed with a crypto wallet.">
              Cüzdan bağlayarak devam edin.</span>
              <br />
              <br />
              <a href="javascript:" id="al1a" class="act btn" data-en="Connect wallet">Cüzdan bağla</a>
            </div>
            <altbirim:tanışma />
            <div id="al3" class="step disabled">
              <b data-en="3. Let’s encrypt your KPass.">3. KPass’inizi şifreleyelim.</b><span phantom
                data-en="We need 4 signatures from you to encrypt your KPass.">KPass’ini
                şifrelememiz için sizden <span id="al3b">4</span> adet imzaya ihtiyacımız var.
                Bu işlem off-chain, tamamen ücretsiz ve güvenli.</span>
              <br /><br />
              <a href="javascript:" id="al3a" class="act btn" data-en="Request 4 signatures">4 imza isteği yolla</a>
            </div>
            <altbirim:imeceİptal />
            <altbirim:ödeme />
          </div>
          <div id="alr">
            <div id="alu">
              <birim:kpass />
            </div>
            <birim:telefon style="opacity:0" data-kpass="true" />
          </div>
        </div>
      </body>
    </html>
  );
}

export default Al;
