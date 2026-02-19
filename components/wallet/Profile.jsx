import QmarkImage from "./img/qmark.svg";
import Css from "./Profile.css";
import WalletCss from "./Wallet.css";
import { ChainInfos } from "/components/chains/chains";
import CopyButton from "/components/elements/CopyButton";
import { ChainGroup, ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

/**
 * @param {{
 *   mintKPassUrl$: string,
 *   viewKPassUrl: string
 * }} props
 */
const Profile = ({ mintKPassUrl$, viewKPassUrl }) => {
  /** @const {string} */
  Profile.viewKPassUrl = viewKPassUrl;
  return (
    <div id={Css.Root}>
      <Css />
      <QmarkImage id={Css.KPassImage} height={80} width={80} />
      <div>
        <div id={Css.AddresText}>
          0xcCc0...0cCc
          <CopyButton id$={Css.CopyButton} height$={12} width$={12} />
        </div>
        <span id={Css.ExplorerLink}>Explorer</span>{" "}
        <span id={Css.DeBankLink}>DeBank</span>
        <a href={mintKPassUrl$} class={WalletCss.Button} id={Css.KPassButton}>{{
          en: "MINT KPASS", tr: "KPASS AL"
        }}</a>
      </div>
    </div >
  );
}

/**
 * @param {string} address
 * @param {ChainId} chainId
 * @return {string}
 */
Profile.setAddress = (address, chainId) => {
  const shortAddr = address.slice(0, 6) + "..." + address.slice(-4);
  const addressText = dom.div(Css.AddresText);
  dom.text.update(addressText, shortAddr);
  addressText.onclick = CopyButton.setText(Css.CopyButton, address);
  const isEvm = chainId.startsWith(ChainGroup.EVM);
  if (isEvm)
    dom.span(Css.DeBankLink).onclick = () =>
      window.open(`https://debank.com/profile/${address}`, "_blank");
  dom.showById(Css.DeBankLink, isEvm);
  dom.span(Css.ExplorerLink).onclick = () =>
    window.open(`https://${ChainInfos[chainId].explorer}/${isEvm ? "address" : "wallet"}/${address}`, "_blank");
  return shortAddr;
}

/**
 * @param {boolean} exists
 */
Profile.setKPass = (exists) => {
  const link = dom.a(Css.KPassButton);
  const image = dom.img(Css.KPassImage);
  if (exists) {
    Profile.mintKPassUrl ||= link.href;
    dom.text.setPreserve(link, dom.i18n({ tr: "KPASS’İNİ İNCELE", en: "VIEW KPASS" }));
    link.href = Profile.viewKPassUrl;
  } else {
    dom.text.setPreserve(link);
    link.href = Profile.mintKPassUrl || link.href;
  }
  if (Profile.placeholderImage) image.src = Profile.placeholderImage;
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
