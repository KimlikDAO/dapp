import Css from "./Footer.css";
import Subscribe from "../subscribe/Subscribe";
import SharedCss from "/components/ortakcss/birim";
import { ExternalPage } from "/crate";
import { i18n } from "/lib/util/i18n";

const SubscribeBox = () => (
  <div id={Css.SubscribeBox}>
    <div id={Css.Logo}>
      <svg height={30} width={39}>
        <use href={`#${SharedCss.Header.Logomark}`} height={30} x={-4} />
      </svg>KimlikDAO
    </div>
    <span id={Css.BrandMark}>{{
      en: "Wallet-login to all on/off-ramps with a single account you truly own.",
      tr: "Bir kez KPass al, tüm on/off-ramp’leri cüzdanınla hesap açmadan kullan."
    }}</span>
    <div id={Css.SubscribeText}>{{
      en: "SUBSCRIBE TO THE KIMLIKDAO NEWSLETTER",
      tr: "KİMLİKDAO BÜLTEN'E KAYDOLUN"
    }}</div>
    <Subscribe id={Css.Subscribe} />
  </div>
);

const Footer = () => (
  <div id={Css.Footer}>
    <Css />
    <SubscribeBox />
    <div class={Css.Column}>
      <b>{{ en: "COMMUNITY", tr: "TOPLULUK" }}</b>
      <a href={ExternalPage.X}>X</a>
      <a href={ExternalPage.Discord}>Discord</a>
      <a href={i18n`${ExternalPage.Join}#sa-ambassador1`}>{{ en: "Ambassador program", tr: "Ambassador ol" }}</a>
      <a href={ExternalPage.Zealy}>Zealy</a>
      <a href={ExternalPage.GitHub}>GitHub</a>
      <a href={ExternalPage.DappRadar}>DappRadar</a>
      <a href={ExternalPage.LinkedIn}>LinkedIn</a>
    </div>
    <div class={Css.Column}>
      <b>{{ en: "DEVELOPERS", tr: "GELİŞTİRİCİLER" }}</b>
      <a href={ExternalPage.GitHub}>GitHub</a>
      <a href={ExternalPage.Docs}>Docs</a>
      <a href={ExternalPage.Join}>{{ en: "Join KimlikDAO", tr: "KimlikDAO’ya katıl" }}</a>
      <a href={ExternalPage.Discord}>Discord</a>
    </div>
  </div>
);

export default Footer;
