import Css from "./sayfa.css";
import Başlık from "/birim/başlık/birim";
import Favicon from "/birim/icon.svg";
import KPass from "/birim/kpass/birim.jsx";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import OrtakCss from "/birim/ortakcss/birim";
import dom from "/lib/util/dom";

/** @const {!HTMLAnchorElement} */
const DiscordDüğmesi = dom.a("inbtn0");
/** @const {!HTMLAnchorElement} */
const İmeceİptalDüğmesi = dom.a("inbtn1");
/** @const {!HTMLAnchorElement} */
const EşikAzaltDüğmesi = dom.a("inbtn2");
/** @const {!HTMLAnchorElement} */
const SilDüğmesi = dom.a("inbtn3");
/** @const {!HTMLDivElement} */
const AçDüğmesi = dom.div("intcktb");
/** @const {!HTMLDivElement} */
const KPassYok = dom.div("inn");

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

const KPassim = () =>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title data-en="KimlikDAO | My KPass">KimlikDAO | KPass’im</title>
      <Lato400 shared />
      <Lato700 shared />
      <Favicon raster={32} rel="icon" />
      <OrtakCss />
      <Css />
      <script type="module" src="/kpassim/sayfa.js" Chains={Chains} DefaultChain={DefaultChain} />
    </head>
    <body>
      <Başlık DefaultChain={DefaultChain} Chains={Chains} ChainNotes={ChainNotes} />
      <div id="in">
        <div id="intckt">
          <KPassYok>
            <span style="display:none">{{
              en: "The connected wallet does not have a KPass on this chain.",
              tr: "Bağlıcüzdanda bu ağda KPass yok."
            }}<br /><br />
              <a href="/al" class="inl" data-en="Click here to get one.">Almak için tıklayın.</a>
            </span>
          </KPassYok>
          <KPass style="display:none" />
          <AçDüğmesi data-en="Unlock" style="display:none">Aç</AçDüğmesi>
        </div>
        <div id="inbtn">
          <DiscordDüğmesi href="javascript:" class="info btn" data-en="Claim Discord role">Discord rolü al</DiscordDüğmesi>
          <İmeceİptalDüğmesi href="javascript:" class="more btn" data-en="Add social revoker">İmece iptal adresi ekle</İmeceİptalDüğmesi>
          <EşikAzaltDüğmesi href="javascript:" class="more btn" data-en="Decrease revoke threshold">Eşik azalt</EşikAzaltDüğmesi>
          <SilDüğmesi href=" javascript:" id="inbtn3" class="danger btn" data-en="Revoke KPass">KPass iptal et</SilDüğmesi>
        </div>
      </div>
      <altbirim:pencere />
    </body>
  </html>


export default KPassim;
