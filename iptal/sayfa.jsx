import Css from "./sayfa.css";
import Başlık from "/birim/başlık/birim.jsx";
import Favicon from "/birim/icon.svg";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import OrtakCss from "/birim/ortakcss/birim.jsx";
import { ChainId } from "/lib/crosschain/chains";
import { assignGlobals } from "/lib/kastro/compiler/pageGlobals";
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

const İptal = () => {
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
        <title data-en="KimlikDAO | Revoke KPass">KimlikDAO | İptal işlemleri</title>
        <Lato400 shared />
        <Lato700 shared />
        <Favicon raster={32} rel="icon" />
        <script type="module" src="/iptal/sayfa.js" data-inherit="Chains,DefaultChain"></script>
        <OrtakCss />
        <Css />
      </head>
      <body>
        <Başlık />
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
          <KimKutusu class="ipstep" style="display:none">
            <b data-en="2. Select KPass address.">2. KPass adresi seçin.</b>
            <span>{{
              en: "The following addresses nominated you as a revoker. Select the one you would like to revoke.",
              tr: "Aşağıdaki adresler size iptal yetkisi vermiş. İptal etmek istediğiniz adresi seçin."
            }}</span>
            <div id="iplc" style="display:none">
              <div class="ipl"></div>{{
                en: "Loading",
                tr: "Yükleniyor"
              }}
            </div>
            <div id="ipmc" style="display:none">
              <div id="ipaym" style="display:none" data-en="There is no revoke address.">İptal edebileceğiniz bir adres yok.
              </div>
              <div id="iphm" style="display:none" data-en="Failed to fetch addresses.">Adresler alınırken hata oluştu.</div>
            </div>
            <div id="ipiilc" style="display:none">
              <b id="ipiilh" data-en="Addresses">Adresler</b>
              <ul id="ipiil"></ul>
            </div>
            <a href="javascript:" id="ipiio" class="act btn lft" data-en="Confirm">Onayla</a>
            <a href="javascript:" id="ipiir" class="btn" data-en="Cancel">İptal</a>
          </KimKutusu>
          <AdresKutusu class="ipstep" style="display:none">
            <b data-en="2. Select KPass address.">2. KPass adresi seçin.</b>{{
              en: "Do you want to revoke the KPass in your connected wallet?",
              tr: "Bağlı cüzdanınızdaki KPass'i mi iptal etmek istiyorsunuz?"
            }}
            <br />
            <br />
            <a href="javascript:" id="ip1a" class="act btn lft" data-en="Yes">Evet</a>
            <a href="javascript:" data-en-href="/report" id="ip1b" class="btn" data-en="No">Hayır</a>
          </AdresKutusu>
          <div id="iptaic" class="ipstep" style="display:none">
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
};

export default İptal;
