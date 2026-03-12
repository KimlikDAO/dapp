import Pencere from "./pencere/birim.jsx";
import Css from "./sayfa.css";
import Başlık from "/components/başlık/birim";
import Favicon from "/components/icon.svg";
import KPass from "/components/kpass/KPass.jsx";
import KPassContract from "/lib/ethereum/KPassLite";
import Lato400 from "/components/lato/l400.ttf";
import Lato700 from "/components/lato/l700.ttf";
import OrtakCss from "/components/shared/SharedCss.jsx";
import { Page } from "/mpa";
import { ChainId } from "/lib/crosschain/chains";
import dom from "@kimlikdao/lib/kastro/dom.js";
import { I18nString } from "@kimlikdao/lib/util/i18n.js";

/** @const {Array<ChainId>} */
const Chains = [
  ChainId.x1,
  ChainId.MinaMainnet,
  ChainId.xa4b1,
  ChainId.x89,
  ChainId.xa86a,
  ChainId.x38
];

/** @const {Object<ChainId, I18nString>} */
const ChainNotes = {
  [ChainId.MinaMainnet]: { tr: "Yeni ✨", en: "New ✨" },
  [ChainId.xa4b1]: { tr: "Ana ağ", en: "Signal chain" }
};

/** @const {ChainId} */
const DefaultChain = ChainId.xa4b1;

const AçDüğmesi = dom.div(Css.AçDüğmesi);
/** @const {HTMLAnchorElement} */
const DiscordDüğmesi = dom.button("inbtn0");
/** @const {HTMLAnchorElement} */
const EşikAzaltmaDüğmesi = dom.a("inbtn2");
/** @const {HTMLAnchorElement} */
const İmeceİptalDüğmesi = dom.a("inbtn1");
/** @const {HTMLDivElement} */
const KPassYokPaneli = dom.div(Css.KPassYokPaneli);
/** @const {HTMLAnchorElement} */
const SilDüğmesi = dom.a("inbtn3");

const KPassim = ({ Lang }) => {
  return (
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
        <div id={Css.Kök}>
          <div id={Css.KPassKutusu}>
            <KPassYokPaneli>
              <span nodisplay>{{
                en: "The connected wallet does not have a KPass on this chain.",
                tr: "Bağlıcüzdanda bu ağda KPass yok."
              }}<br /><br />
                <a href={Page.Al} class="inl">{{ en: "Almak için tıklayın.", tr: "Almak için tıklayın." }}</a>
              </span>
            </KPassYokPaneli>
            <KPass nodisplay />
            <AçDüğmesi nodisplay>{{ en: "Unlock", tr: "Aç" }}</AçDüğmesi>
          </div>
          <div id="inbtn">
            <DiscordDüğmesi class={[OrtakCss.Düğme, OrtakCss.Bilgi]}>
              {{ en: "Claim Discord role", tr: "Discord rolü al" }}
            </DiscordDüğmesi>
            <İmeceİptalDüğmesi class={[OrtakCss.Düğme, OrtakCss.More]}>
              {{ en: "Add social revoker", tr: "İmece iptal adresi ekle" }}
            </İmeceİptalDüğmesi>
            <EşikAzaltmaDüğmesi class={[OrtakCss.Düğme, OrtakCss.More]}>
              {{ en: "Decrease revoke threshold", tr: "Eşik azalt" }}
            </EşikAzaltmaDüğmesi>
            <SilDüğmesi class={[OrtakCss.Düğme, OrtakCss.Tehlike]}>
              {{ en: "Revoke KPass", tr: "KPass iptal et" }}
            </SilDüğmesi>
          </div>
        </div>
        <Pencere />
      </body>
    </html>
  );
}

export default KPassim;
