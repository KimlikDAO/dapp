import KPass from "../kpass/KPass";
import Css from "./Phone.css";
import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
const Address = dom.div(Css.Address);
/** @const {!HTMLDivElement} */
const AnaEkran = dom.div(Css.AnaEkran);
/** @const {!HTMLDivElement} */
const KPassDialog = dom.div(Css.KPassDialog);
/** @const {!HTMLDivElement} */
const Kutu = dom.div(Css.Kutu);
/** @const {!HTMLDivElement} */
const KPassDialogButton = dom.div(Css.KPassDialogButton);
/** @const {!HTMLDivElement} */
const Evet = dom.div(Css.Evet);

/** @enum {string} */
const JointCss = css`
  /** @export  */ .BüyükGöster {}
  #${KPass.Css.Root}.BüyükGöster {
    transform: translate(65px, 120px) scale(0.5);
  }
  #KPassDialog > #${KPass.Css.Root} {
    font-size: 10pt;
    height: 250px;
    left: 15px;
    position: absolute;
    top: 45px;
    width: 250px;
  }
  #KPassDialog .${KPass.Css.Card} {
    width: 250px;
    height: 250px;
  }
`;

/**
 * @param {{ withKPass: boolean, noshow: boolean }=} props
 * @return {Promise<string>}
 */
const Phone = ({ withKPass = true, noshow }) => (
  <div id={Css.Root} noshow={noshow}>
    <Css />
    <JointCss />
    <AnaEkran>
      <div id={Css.Balance}>$1523.74</div>
      <div id={Css.Account}>KimlikDAO</div>
      <Address>0x1DA0...1DA0</Address>
      <div id={Css.CüzdanSekmeler}>
        <div id={Css.Tokenler}>{{ en: "Tokens", tr: "Tokenler" }}</div>
        <div id={Css.Nftler}>{{ en: "NFTs", tr: "NFT’ler" }}</div>
      </div>
      <div id={Css.NftGaleri}>
        <div class={Css.NftÖrnek} />
      </div>
    </AnaEkran >
    <KPassDialog>
      {withKPass && <KPass />}
      <KPassDialogButton nodisplay>{{ en: "Hide", tr: "Gizle" }}</KPassDialogButton>
    </KPassDialog>
    <Kutu noshow>
      <div id={Css.KutuMetni} />
      <div id={Css.KutuDüğmeleri}>
        <div id={Css.Hayır}>{{ en: "Cancel", tr: "Hayır" }}</div>
        <Evet>{{ en: "Provide", tr: "Evet" }}</Evet>
      </div>
    </Kutu>
  </div >
);

/**
 * @param {?string} address Set the address of the mobile wallet.
 */
Phone.setAddress = (address = "0x1DA01DAO") =>
  Address.innerText = address.slice(0, 6) + "..." + address.slice(-4);

/**
 * @param {string} prompt İletişim kutusunda gösterilecek metin.
 * @param {string=} buttonText
 */
Phone.showDialog = (prompt, buttonText) => {
  if (buttonText) Evet.innerText = buttonText;
  Kutu.style.opacity = "";
  Kutu.firstElementChild.innerText = prompt;
  Kutu.classList.add(Css.Göster);
  AnaEkran.classList.add(Css.Blurred);
  KPassDialog.classList.add(Css.Blurred);
}

/**
 * Closes the dialog box on the phone.
 */
Phone.closeDialog = () => {
  Kutu.classList.remove(Css.Göster);
  KPassDialog.classList.remove(Css.Blurred);
  AnaEkran.classList.remove(Css.Blurred);
}

/**
 * Displays the NFT mock in the phone image.
 *
 * @param {boolean} büyükGöster NFT tek başına kutuda gösterilsin mi.
 * @param {boolean} bilgiYüzü NFT'nin bilgi yüzü gösterilsin.
 */
Phone.nftGöster = (büyükGöster, bilgiYüzü) => {
  KPass.showSide(bilgiYüzü);
  const showSide = () => {
    KPass.showSide(bilgiYüzü);
    KPassDialogButton.innerText = bilgiYüzü
      ? dom.i18n({ tr: "Gizle", en: "Encrypt" })
      : dom.i18n({ tr: "Aç", en: "Decrypt" });
  }
  showSide();
  if (büyükGöster) {
    KPass.Root.style.opacity = "";
    dom.göster(KPassDialogButton);
    KPassDialogButton.onclick ||= () => {
      bilgiYüzü = !bilgiYüzü;
      showSide();
    }
  }
  KPass.Root.classList.toggle(JointCss.BüyükGöster, !büyükGöster);
  KPassDialogButton.classList.toggle(Css.Göster, büyükGöster);
}

/** @enum {string} */
Phone.Css = Css;

export default Phone;
