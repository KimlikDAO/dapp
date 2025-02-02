import Script from "kastro:./sayfa.js";
import Css from "./sayfa.css";
import Başlık from "/components/başlık/birim.jsx";
import Favicon from "/components/icon.svg";
import Lato400 from "/components/lato/l400.ttf";
import Lato700 from "/components/lato/l700.ttf";
import OrtakCss from "/components/sharedCss/SharedCss.jsx";
import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
export const AdresKutusu = dom.div("iptac");
/** @const {!HTMLAnchorElement} */
export const BaşkasıDüğmesi = dom.a("ipbtnb");
/** @const {!HTMLAnchorElement} */
export const BenDüğmesi = dom.a("ipbtna");
/** @const {!HTMLDivElement} */
export const KimKutusu = dom.div("ipiic");
/** @const {!HTMLDivElement} */
export const KiminKutusu = dom.div("ipssc");

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

const İptal = ({ Lang }) => (
  <html lang={Lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>KimlikDAO | {{ tr: "İptal işlemleri", en: "Revoke KPass" }}</title>
      <Lato400 shared />
      <Lato700 shared />
      <Favicon raster={32} />
      <OrtakCss />
      <Css />
      <Script Chains={Chains} DefaultChain={DefaultChain} />
    </head>
    <body>
      <Başlık DefaultChain={DefaultChain} Chains={Chains} ChainNotes={ChainNotes} />
      <div id="ippc">
        <KiminKutusu class="ipstep">
          <b data-en="1. Select KPass owner.">1. KPass sahibini seçin.</b>{{
            en: "Whose KPass would you like to revoke?",
            tr: "İptal etmek istediğiniz KPass kime ait?"
          }}
          <br />
          <br />
          <BenDüğmesi href="javascript:" class="act btn lft" data-en="Mine">Bana ait</BenDüğmesi>
          <BaşkasıDüğmesi href="javascript:" class="act btn" data-en="Someone else's">Başkasına ait</BaşkasıDüğmesi>
        </KiminKutusu>
        <KimKutusu class="ipstep" nodisplay>
          <b data-en="2. Select KPass address.">2. KPass adresi seçin.</b>
          <span>{{
            en: "The following addresses nominated you as a revoker. Select the one you would like to revoke.",
            tr: "Aşağıdaki adresler size iptal yetkisi vermiş. İptal etmek istediğiniz adresi seçin."
          }}</span>
          <div id="iplc" nodisplay>
            <div class="ipl"></div>{{
              en: "Loading",
              tr: "Yükleniyor"
            }}
          </div>
          <div id="ipmc" nodisplay>
            <div id="ipaym" nodisplaydata-en="There is no revoke address.">İptal edebileceğiniz bir adres yok.
            </div>
            <div id="iphm" nodisplay data-en="Failed to fetch addresses.">Adresler alınırken hata oluştu.</div>
          </div>
          <div id="ipiilc" nodisplay>
            <b id="ipiilh">{{ en: "Addresses", tr: "Adresler" }}</b>
            <ul id="ipiil"></ul>
          </div>
          <a href="javascript:" id="ipiio" class="act btn lft">{{ en: "Confirm", tr: "Onayla" }}</a>
          <a href="javascript:" id="ipiir" class="btn">{{ en: "Cancel", tr: "İptal" }}</a>
        </KimKutusu>
        <AdresKutusu class="ipstep" nodisplay>
          <b data-en="2. Select KPass address.">2. KPass adresi seçin.</b>{{
            en: "Do you want to revoke the KPass in your connected wallet?",
            tr: "Bağlı cüzdanınızdaki KPass'i mi iptal etmek istiyorsunuz?"
          }}
          <br />
          <br />
          <a href="javascript:" id="ip1a" class="act btn lft" data-en="Yes">Evet</a>
          <a href="javascript:" data-en-href="/report" id="ip1b" class="btn" data-en="No">Hayır</a>
        </AdresKutusu>
        <div id="iptaic" class="ipstep" nodisplay>
          <b data-en="2. Revoke connected KPass." data-tr="2. Bağlı KPass iptali."></b>{{
            en: "Now you'll revoke the KPass in your connected wallet. You don't need to revoke your KPass to get a new one.",
            tr: "Devam ederseniz bağlı cüzdanınızdaki KPass'i iptal edeceksiniz. Yeni bir KPass almak için eskisini iptaletmeye gerek yok."
          }}<br /><br />{{
            en: "Only revoke your KPass if you think your private key was exposed.",
            tr: "Sadece cüzdanınızın gizli anahtarını başkasına verdiğinizi düşünüyorsanız KPass'inizi iptal etmeniz gerekir."
          }}<br /><br />{{
            en: "Confirm below to proceed.",
            tr: "Devam etmek için onaylayın."
          }}
          <br />
          <br />
          <a href="javascript:" id="ip1c" class="btn danger lft" data-en="Revoke KPass">KPass iptal et</a>
          <a href="javascript:" id="ip1d" class="btn" data-en="Cancel">İptal</a>
        </div>
      </div>
    </body>
  </html >
);

export default İptal;
