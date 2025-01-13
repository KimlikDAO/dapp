import Css from "./birim.css";
import Kaydol from "/birim/kaydol/birim.jsx";
import OrtakCss from "/birim/ortakcss/birim.jsx";
import { ExternalPage } from "/crate";

const Altdizin = () => (
  <div id={Css.Kök}>
    <Css />
    <div id={Css.KaydolKutusu}>
      <div id={Css.Logo}>
        <svg height={30} width={39}>
          <use href={"#" + OrtakCss.Başlık.Logomark} height={30} x={-4} />
        </svg>KimlikDAO
      </div>
      <span id={Css.BrandMark}>{{
        en: "Wallet-login to all on/off-ramps with a single account you truly own.",
        tr: "Bir kez KPass al, tüm on/off-ramp’leri cüzdanınla hesap açmadan kullan."
      }}</span>
      <div id={Css.KaydolMetni} data-en="SUBSCRIBE TO THE KIMLIKDAO NEWSLETTER">KİMLİKDAO BÜLTEN'E KAYDOLUN</div>
      <Kaydol id={Css.KaydolBirimi} />
    </div>
    <div class={Css.Sütun}>
      <b data-en="COMMUNITY">TOPLULUK</b>
      <a href="//x.com/KimlikDAO">X</a>
      <a href="//discord.gg/H2wg6pcWXG">Discord</a>
      <a href={ExternalPage.Join + "#sa-ambassador1"}>{{ en: "Ambassador program", tr: "Ambassador ol" }}</a>
      <a href="//zealy.io/c/kimlikdao">Zealy</a>
      <a href="//github.com/KimlikDAO">GitHub</a>
      <a href="//dappradar.com/dapp/kimlikdao-2">DappRadar</a>
      <a href="//linkedin.com/company/KimlikDAO/">LinkedIn</a>
    </div>
    <div class={Css.Sütun}>
      <b data-en="DEVELOPERS">GELİŞTİRİCİLER</b>
      <a href="//github.com/KimlikDAO">GitHub</a>
      <a href={ExternalPage.Docs}>Docs</a>
      <a href={ExternalPage.Join}>{{ en: "Join KimlikDAO", tr: "KimlikDAO’ya katıl" }}</a>
      <a href="//discord.gg/H2wg6pcWXG">Discord</a>
    </div>
  </div>
);

export default Altdizin;
