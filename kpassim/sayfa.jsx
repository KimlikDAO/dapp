import Script from "kastro:./sayfa.js";
import Pencere from "./pencere/birim.jsx";
import Css from "./sayfa.css";
import Başlık from "/birim/başlık/birim";
import Favicon from "/birim/icon.svg";
import KPass from "/birim/kpass/birim.jsx";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import OrtakCss from "/birim/ortakcss/birim";
import { Page } from "/crate";
import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
export const AçDüğmesi = dom.div("intcktb");
/** @const {!HTMLAnchorElement} */
export const DiscordDüğmesi = dom.a("inbtn0");
/** @const {!HTMLAnchorElement} */
export const EşikAzaltmaDüğmesi = dom.a("inbtn2");
/** @const {!HTMLAnchorElement} */
export const İmeceİptalDüğmesi = dom.a("inbtn1");
/** @const {!HTMLDivElement} */
export const KPassYok = dom.div("inn");
/** @const {!HTMLAnchorElement} */
export const SilDüğmesi = dom.a("inbtn3");

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

const KPassim = ({ Lang }) =>
  <html lang={Lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>KimlikDAO | {{ tr: "KPass’im", en: "My KPass" }}</title>
      <Lato400 shared />
      <Lato700 shared />
      <Favicon raster={32} rel="icon" />
      <OrtakCss />
      <Css />
      <Script Chains={Chains} DefaultChain={DefaultChain} />
    </head>
    <body>
      <Başlık DefaultChain={DefaultChain} Chains={Chains} ChainNotes={ChainNotes} />
      <div id="in">
        <div id="intckt">
          <KPassYok>
            <span nodisplay>{{
              en: "The connected wallet does not have a KPass on this chain.",
              tr: "Bağlıcüzdanda bu ağda KPass yok."
            }}<br /><br />
              <a href={Page.Al} class="inl">{{ en: "Almak için tıklayın.", tr: "Almak için tıklayın." }}</a>
            </span>
          </KPassYok>
          <KPass nodisplay />
          <AçDüğmesi nodisplay>{{ en: "Unlock", tr: "Aç" }}</AçDüğmesi>
        </div>
        <div id="inbtn">
          <DiscordDüğmesi href="javascript:" class="info btn">{{ en: "Claim Discord role", tr: "Discord rolü al" }}</DiscordDüğmesi>
          <İmeceİptalDüğmesi href="javascript:" class="more btn">{{ en: "Add social revoker", tr: "İmece iptal adresi ekle" }}</İmeceİptalDüğmesi>
          <EşikAzaltmaDüğmesi href="javascript:" class="more btn">{{ en: "Decrease revoke threshold", tr: "Eşik azalt" }}</EşikAzaltmaDüğmesi>
          <SilDüğmesi href="javascript:" class="danger btn">{{ en: "Revoke KPass", tr: "KPass iptal et" }}</SilDüğmesi>
        </div>
      </div>
      <Pencere />
    </body>
  </html>

export default KPassim;
