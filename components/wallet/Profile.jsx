import CopyImage from "../paste.svg";
import QmarkImage from "./img/qmark.svg";
import Css from "./Profile.css";
import WalletCss from "./Wallet.css";
import { ChainInfos } from "/components/chains/chains";
import { ChainGroup, ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

const Profile = () => (
  <div id={Css.Root}>
    <Css />
    <QmarkImage id={Css.KPassImage} height={80} width={80} />
    <div>
      <div id={Css.AddresText}>
        <span>0xcCc0...0cCc</span>
        <span><CopyImage inline /></span>
      </div>
      <span id={Css.DeBankLink}>DeBank</span>{" "}
      <span id={Css.ExplorerLink}>Explorer</span>
      <div class={WalletCss.Button} id={Css.KPassButton}>{{ en: "MINT KPASS", tr: "KPASS AL" }}</div>
    </div>
  </div >
);

/**
 * @param {string} address
 * @param {ChainId} chainId
 * @return {string}
 */
Profile.setAddress = (address, chainId) => {
  const shortAddr = address.slice(0, 6) + "..." + address.slice(-4);
  const addressText = dom.div(Css.AddresText);
  addressText.children[0].innerText = shortAddr;
  addressText.onclick = () => navigator.clipboard.writeText(address);
  const isEvm = chainId.startsWith(ChainGroup.EVM);
  if (isEvm)
    dom.span(Css.DeBankLink).onclick = () => window.open(`https://debank.com/profile/${address}`, "_blank");
  else
    dom.hideById(Css.DeBankLink);
  dom.span(Css.ExplorerLink).onclick = () =>
    window.open(`https://${ChainInfos[chainId].explorer}/${isEvm ? "address" : "wallet"}/${address}`, "_blank");
  return shortAddr;
}

/**
 * @param {boolean} exists
 * @param {string} url
 */
Profile.setKPass = (exists, url) => {
  const button = dom.div(Css.KPassButton);
  const image = dom.img(Css.KPassImage);
  if (exists) {
    Profile.mintText ||= button.innerText;
    button.innerText = dom.i18n({ tr: "KPASS’İNİ İNCELE", en: "VIEW KPASS" });
    if (Profile.placeholderImage) image.src = Profile.placeholderImage;
  } else {
    if (Profile.mintText) button.innerText = Profile.mintText;
  }
  button.onclick = image.onclick = () => window.location.href = url;
}

/**
 * @param {string} url
 */
Profile.setKPassImage = (url) => {
  const image = dom.img(Css.KPassImage);
  Profile.placeholderImage ||= image.src;
  image.src = url;
}

export default Profile;
