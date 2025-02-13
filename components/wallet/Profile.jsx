import CopyImage from "../paste.svg";
import QmarkImage from "./img/qmark.svg";
import Css from "./Profile.css";
import WalletCss from "./Wallet.css";
import dom from "/lib/util/dom";

/**
 * @param {{
 *   copyAddress: function(),
 *   openExplorer: function(),
 *   openDeBank: function(),
 * }} props
 */
const Profile = ({ copyAddress, openExplorer, openDeBank }) => {
  /** @const {!HTMLDivElement} */
  Profile.pane = dom.div(Css.Pane);
  /** @type {?string} */
  Profile.placeholderImage = null;

  return (
    <div id={Css.Root}>
      <Css />
      <QmarkImage id={Css.KPassImage} height={80} width={80} />
      <Profile.pane><div id={Css.AddresText} onClick={copyAddress}>
        <span>0xcCc0...0cCc</span>
        <span><CopyImage inline /></span>
      </div>
        <span id={Css.DeBankLink} onClick={openDeBank}>DeBank</span>{" "}
        <span id={Css.ExplorerLink} onClick={openExplorer}>Explorer</span>
        <div class={WalletCss.Button} id={Css.KPassButton}>{{ en: "MINT KPASS", tr: "KPASS AL" }}</div>
      </Profile.pane>
    </div >
  );
}

/**
 * @param {boolean} exists
 * @param {string} url
 */
Profile.setKPass = (exists, url) => {
  const elements = Profile.pane.children;
  const button = elements[3];
  /** @const {!HTMLImageElement} */
  const image = /** @type {!HTMLImageElement} */(Profile.pane.previousElementSibling);

  if (exists) {
    Profile.mintText ||= button.innerText;
    button.innerText = dom.i18n({ tr: "KPASS’İNİ İNCELE", en: "VIEW KPASS" });
    if (Profile.placeholderImage) image.src = Profile.placeholderImage;
  } else {
    button.innerText = Profile.mintText;
  }
  button.onclick = image.onclick = () => window.location.href = url;
}

/**
 * @param {string} url
 */
Profile.setKPassImage = (url) => {
  /** @const {!HTMLImageElement} */
  const image = /** @type {!HTMLImageElement} */(Profile.pane.previousElementSibling);
  Profile.placeholderImage ||= image.src;
  image.src = url;
}

export default Profile;
