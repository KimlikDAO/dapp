import Script from "kastro:./Mint.jsx";
import Css from "./Mint.css";
import Header from "/components/header/Header";
import Favicon from "/components/icon.svg";
import KPass from "/components/kpass/KPass";
import Lato400 from "/components/lato/l400.ttf";
import Lato700 from "/components/lato/l700.ttf";
import SharedCss from "/components/shared/SharedCss";
import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";
import { I18nString, LangCode } from "/lib/util/i18n";

/** @const {!Array<ChainId>} */
const Chains = [
  ChainId.x1,
  ChainId.xa4b1,
  ChainId.MinaMainnet,
  ChainId.x89,
  ChainId.xa86a,
  ChainId.x38
];

/** @const {!Object<ChainId, I18nString>} */
const ChainNotes = {
  [ChainId.xa4b1]: { en: "Signal chain", tr: "Ana ağ" },
  [ChainId.MinaMainnet]: { en: "New ✨", tr: "Yeni ✨" },
};

/** @const {ChainId} */
const DefaultChain = ChainId.xa4b1;

/** @const {!HTMLDivElement} */
const GalleryGrid = dom.div(Css.GalleryGrid);

const Gallery = () => (
  <div id={Css.Gallery}>
    <div>
      <h2 class={Css.GalleryTitle}>{{ en: "Add info", tr: "Bilgi ekle" }}</h2>
      <input
        type="search"
        id={Css.GallerySearch}
        placeholder={{ en: "Type country, state, or source", tr: "Ülke veya kaynak gir" }}
      />
      <GalleryGrid>
        <div class={Css.InfoSource}>{{ en: "Passport", tr: "Pasaport" }}</div>
        <div class={Css.InfoSource}>{{ en: "Population registry", tr: "Nüfus kayıt örneği" }}</div>
        <div class={Css.InfoSource}>ID.me</div>
        <div class={Css.InfoSource}>{{ en: "National ID card", tr: "Kimlik Kartı" }}</div>
        <div class={Css.InfoSource}>REAL ID</div>
        <div class={Css.InfoSource}>login.gov</div>
      </GalleryGrid>
    </div>
    <div nodisplay>
      <button>
        {{ en: "Back", tr: "Geri" }}
      </button>
    </div>
  </div>
);

const InfoSectionNav = () => (
  <ul id={Css.NavList}>
    <li class={Css.NavItem}>{{ en: "Personal info", tr: "Kişi bilgileri" }}</li>
    <li class={Css.NavItem}>{{ en: "Contact info", tr: "İletişim bilgileri" }}</li>
    <li class={Css.NavItem}>{{ en: "Address", tr: "Adres" }}</li>
    <li class={Css.NavItem}>{{ en: "Photo verification", tr: "Fotoğraf doğrulama" }}</li>
    <li class={Css.NavItem}>HumanID</li>
  </ul>
);

const Welcome = () =>
  <div>
    <h2>{{ en: "Welcome 👋", tr: "Hoşgeldiniz 👋" }}</h2>
    <p>{{
      en: "Here is your KPass. You can click on the regenerate button to customize its appearance. For now it contains no data and it's not written on chain. Let's add some data into it.",
      tr: "İşte KPass'iniz. Görünümünü özelleştirmek için yeniden oluştur düğmesini kullanabilirsiniz. Şu anda içinde veri yok ve zincire yazılmamış. Haydi içine bazı veriler ekleyelim."
    }}</p>
    <button class={[SharedCss.Button, SharedCss.Action]}>
      {{ en: "Got it!", tr: "Anladım!" }}
    </button>
  </div>;

/**
 * @param {{ Lang: LangCode}=} props
 * @return {Promise<string>}
 */
const Mint = ({ Lang }) => (
  <html lang={Lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Lato400 shared />
      <Lato700 shared />
      <title>KimlikDAO | {{ en: "Mint KPass", tr: "KPass al" }}</title>
      <Favicon raster={32} rel="icon" />
      <SharedCss />
      <Css />
      <Script Chains={Chains} DefaultChain={DefaultChain} />
    </head>
    <body>
      <Header DefaultChain={DefaultChain} Chains={Chains} ChainNotes={ChainNotes} />
      <div id={Css.Root}>
        <div id={Css.LeftColumn}>
          <KPass />
          <InfoSectionNav />
        </div>
        <div id={Css.RightColumn}>
          <div>
            <Welcome />
            <Gallery />
          </div>
        </div>
      </div>
    </body>
  </html >
);

export default Mint;
