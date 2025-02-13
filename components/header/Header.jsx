import Css from "./Header.css";
import LangPicker from "/components/langPicker/LangPicker";
import Logo from "/components/logo.svg";
import { Wallet } from "/components/wallet/Wallet";
import { ChainId } from "/lib/crosschain/chains";
import { css } from "/lib/kastro/stylesheet";
import { I18nString } from "/lib/util/i18n";

/** @enum {string} */
const JointCss = css`
  @media (max-width: 820px) {
    .Link, #${LangPicker.Css.Root} {
      display: none;
    }
  }`;

/**
 * @param {{
 *   Chains: !Array<ChainId>,
 *   DefaultChain: ChainId,
 *   ChainNotes: !Object<ChainId, I18nString>,
 *   href: string,
 *   title: string,
 *   piggyback: (string|undefined)
 * }=} props
 */
const Header = ({
  Chains,
  DefaultChain,
  ChainNotes,
  href = "/",
  title = "KimlikDAO",
  piggyback
}) => (
  <div id={Css.Header}>
    <Css />
    <JointCss />
    <a href={href} id={Css.Logo}>
      <Logo id={Css.Logomark} inline />{title}
    </a>
    <div id={Css.Links}>
      <LangPicker piggyback={piggyback} />
      <Wallet Chains={Chains} DefaultChain={DefaultChain} ChainNotes={ChainNotes} piggyback={piggyback}>
        <RightPane />
      </Wallet>
    </div>
  </div>
);

export { LangPicker };

export default Header;
