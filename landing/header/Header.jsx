import Css from "./Header.css";
import ArrowImage from "/components/arrow.svg";
import LangPicker from "/components/langPicker/LangPicker";
import Logo from "/components/logo.svg";
import SharedCss from "/components/shared/SharedCss";
import Wallet from "/components/wallet/Wallet";
import { ExternalPage, Page } from "/crate";
import { ChainId } from "/lib/crosschain/chains";
import { I18nString } from "/lib/util/i18n";

/**
 * @param {{
 *   Chains: !Array<ChainId>,
 *   ChainNotes: !Object<ChainId, I18nString>,
 *   DefaultChain: ChainId,
 * }=} props
 */
const Header = ({ Chains, ChainNotes, DefaultChain }) => {
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
        <Wallet
          defaultChain={DefaultChain}
          chains={Chains}
          chainNotes={ChainNotes}
        />
        <a id={Css.ActionButton} href={Page.Mint} class={[SharedCss.Button, SharedCss.Action]}>{{
          en: "Mint KPass", tr: "Hemen KPass al"
        }}<ArrowImage inline /></a>
      </div>
    </div>
  );
}

export default Header;
