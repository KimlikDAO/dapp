import Css from "./birim.css";
import Kaydol from "/birim/kaydol/birim";
import OrtakCss from "/birim/ortakcss/birim";
import { ExternalPage } from "/crate";
import { i18n } from "/lib/util/i18n";

const Altdizin = () => (
  <div id={Css.Kök}>
    <Css />
    <div id={Css.KaydolKutusu}>
      <div id={Css.Logo}>
        <svg height={30} width={39}>
          <use href={`#${OrtakCss.Başlık.Logomark}`} height={30} x={-4} />
        </svg>KimlikDAO
      </div>
      <span id={Css.BrandMark}>{{
        en: "Wallet-login to all on/off-ramps with a single account you truly own.",
        tr: "Bir kez KPass al, tüm on/off-ramp’leri cüzdanınla hesap açmadan kullan."
      }}</span>
      <div id={Css.KaydolMetni}>{{
        en: "SUBSCRIBE TO THE KIMLIKDAO NEWSLETTER",
        tr: "KİMLİKDAO BÜLTEN'E KAYDOLUN"
      }}</div>
      <Kaydol id={Css.Kaydol} />
    </div>
    <div class={Css.Sütun}>
      <b>{{ en: "COMMUNITY", tr: "TOPLULUK" }}</b>
      <a href={ExternalPage.X}>X</a>
      <a href={ExternalPage.Discord}>Discord</a>
      <a href={i18n`${ExternalPage.Join}#sa-ambassador1`}>{{ en: "Ambassador program", tr: "Ambassador ol" }}</a>
      <a href={ExternalPage.Zealy}>Zealy</a>
      <a href={ExternalPage.GitHub}>GitHub</a>
      <a href={ExternalPage.DappRadar}>DappRadar</a>
      <a href={ExternalPage.LinkedIn}>LinkedIn</a>
    </div>
    <div class={Css.Sütun}>
      <b>{{ en: "DEVELOPERS", tr: "GELİŞTİRİCİLER" }}</b>
      <a href={ExternalPage.GitHub}>GitHub</a>
      <a href={ExternalPage.Docs}>Docs</a>
      <a href={ExternalPage.Join}>{{ en: "Join KimlikDAO", tr: "KimlikDAO’ya katıl" }}</a>
      <a href={ExternalPage.Discord}>Discord</a>
    </div>
  </div>
);

export default Altdizin;
