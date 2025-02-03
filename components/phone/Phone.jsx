import KPass from "../kpass/KPass";
import Css from "./Phone.css";
import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
const KPassDialog = dom.div(Css.KPassDialog);
/** @const {!HTMLDivElement} */
const KPassDialogButton = dom.div(Css.KPassDialogButton);

/** @enum {string} */
const JointCss = css`
  /** @export  */ .ShowInWallet {}
  #${KPass.Css.Root}.ShowInWallet {
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

const WalletApp = () => {
  /** @const {!HTMLDivElement} */
  WalletApp.Root = dom.div(Css.WalletApp)
  return (
    <WalletApp.Root>
      <div id={Css.Balance}>$1523.74</div>
      <div id={Css.Account}>KimlikDAO</div>
      <div id={Css.Address}>0x1DA0...1DA0</div>
      <div id={Css.WalletAppTabs}>
        <div id={Css.WalletAppTokens}>{{ en: "Tokens", tr: "Tokenler" }}</div>
        <div id={Css.WalletAppNfts}>{{ en: "NFTs", tr: "NFT’ler" }}</div>
      </div>
      <div id={Css.WalletAppGallery}>
        <div class={Css.WalletAppNft} />
      </div>
    </WalletApp.Root>
  );
}

/**
 * @param {string=} address
 * @return {string}
 */
WalletApp.setAddress = (address = "0x1DA01DAO") => WalletApp
  .Root
  .children[2]
  .innerText = address.slice(0, 6) + "..." + address.slice(-4);


const InfoDialog = () => {
  /** @const {!HTMLDivElement} */
  InfoDialog.Root = dom.div(Css.InfoDialog);
  InfoDialog.Root.style.opacity = "";
  return (
    <InfoDialog.Root noshow>
      <div id={Css.InfoDialogText} />
      <div id={Css.InfoDialogButtons}>
        <div id={Css.InfoDialogNo}>{{ en: "Cancel", tr: "Hayır" }}</div>
        <div id={Css.InfoDialogYes}>{{ en: "Provide", tr: "Evet" }}</div>
      </div>
    </InfoDialog.Root>
  );
}

/**
 * @param {string} prompt
 * @param {string=} buttonText
 */
InfoDialog.show = (prompt, buttonText) => {
  if (buttonText) InfoDialog.Root.children[1].children[1].innerText = buttonText;
  const show = !!prompt;
  if (show) InfoDialog.Root.children[0].innerText = prompt;
  WalletApp.Root.classList.toggle(Css.Blurred, show);
  InfoDialog.Root.classList.toggle(Css.Show, show);
  KPassDialog.classList.toggle(Css.Blurred, show);
}

/**
 * @param {{ withKPass: boolean, noshow: boolean }=} props
 * @return {Promise<string>}
 */
const Phone = ({ withKPass = true, noshow }) => (
  <div id={Css.Root} noshow={noshow}>
    <Css />
    <JointCss />
    <WalletApp />
    <KPassDialog>
      {withKPass && <KPass />}
      <KPassDialogButton>{{ en: "Encrypt", tr: "Gizle" }}</KPassDialogButton>
    </KPassDialog>
    <InfoDialog />
  </div >
);

/**
 * @param {string=} address Set the address of the mobile wallet.
 */
Phone.setAddress = WalletApp.setAddress;

/**
 * @param {string} prompt
 * @param {string=} buttonText
 */
Phone.showDialog = InfoDialog.show;

/**
 * Displays the NFT mock in the phone image.
 *
 * @param {boolean} showInDialog NFT tek başına kutuda gösterilsin mi.
 * @param {boolean} infoSide NFT'nin bilgi yüzü gösterilsin.
 */
Phone.showKPass = (showInDialog, infoSide) => {
  /** @type {boolean} */
  Phone.InfoSide = infoSide;
  const showSide = () => {
    KPass.showSide(Phone.InfoSide);
    KPassDialogButton.innerText = Phone.InfoSide
      ? dom.i18n({ tr: "Gizle", en: "Encrypt" })
      : dom.i18n({ en: "Decrypt", tr: "Aç" });
  }
  showSide();
  KPassDialogButton.onclick ||= () => {
    Phone.InfoSide = !Phone.InfoSide;
    showSide();
  }
  KPass.Root.classList.toggle(JointCss.ShowInWallet, !showInDialog);
  KPassDialogButton.classList.toggle(Css.Hide, !showInDialog);
}

/** @enum {string} */
Phone.Css = Css;

export default Phone;
