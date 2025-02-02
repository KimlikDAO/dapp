import Css from "./Header.css";
import ArrowImage from "/components/arrow.svg";
import LangPicker from "/components/langPicker/LangPicker";
import Logo from "/components/logo.svg";
import SharedCss from "/components/sharedCss/SharedCss";
import { ExternalPage, Page } from "/crate";
import { ChainId } from "/lib/crosschain/chains";
import { I18nString } from "/lib/util/i18n";

/**
 * @param {{
 *   Chains: !Array<ChainId>,
 *   ChainNotes: !Object<ChainId, I18nString>,
 *   DefaultChain: ChainId,
 * }=} props
 * @return {Promise<string>}
 */
const Header = ({ Chains, ChainNotes, DefaultChain }) => {
  // Wallet.onKPassChange((_, dosyaSözü) => {
  //   /** @const {!HTMLAnchorElement} */
  //   const eylemDüğmesi = dom.a(Css.ActionButton);
  //   /** @type {!Text} */(eylemDüğmesi.firstChild).data = dosyaSözü
  //     ? dom.i18n({ tr: "KPass’ini incele", en: "View KPass" })
  //     : dom.i18n({ tr: "Hemen KPass al", en: "Mint KPass" })
  //   eylemDüğmesi.href = dosyaSözü
  //     ? dom.i18n(Page.KPass)
  //     : dom.i18n(Page.Mint);
  // });
  return (
    <div id={Css.Header}>
      <Css />
      <a href="/" id={SharedCss.Header.Logo}>
        <Logo id={SharedCss.Header.Logomark} height={35} inline />KimlikDAO</a>
      <div id={SharedCss.Header.Links}>
        <a class={SharedCss.Header.Link} href={ExternalPage.Join}>{{
          en: "Join us", tr: "Aramıza katıl"
        }}</a>
        <a class={SharedCss.Header.Link} href={ExternalPage.Discord} target="_blank"
          rel="noreferrer">Discord</a>
        <LangPicker />
        <a id={Css.ActionButton} href={Page.Mint} class={[SharedCss.Button, SharedCss.Action]}>{{
          en: "Mint KPass", tr: "Hemen KPass al"
        }}<ArrowImage inline /></a>
      </div>
    </div>
  );
}

export default Header;
