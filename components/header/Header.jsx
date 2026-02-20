import Css from "./Header.css";
import LangPicker from "/components/langPicker/LangPicker";
import Logo from "/components/logo.svg";
import Wallet, { ChainConfig } from "/components/wallet/Wallet";
import { css } from "/lib/kastro/stylesheet";

/** @enum {string} */
const JointCss = css`
  @media (max-width: 820px) {
    .Link, #${LangPicker.Css.Root} {
      display: none;
    }
  }`;

/**
 * @param {{
 *   chainConfig: ChainConfig,
 *   piggyback?: string,
 *   logoUrl$: string,
 *   title$: string,
 *   cookieDomain: string,
 *   mintKPassUrl$: string,
 *   viewKPassUrl: string,
 *   children?: unknown[],
 * }} props
 */
const Header = ({
  chainConfig,
  piggyback,
  logoUrl$,
  title$,
  cookieDomain,
  mintKPassUrl$,
  viewKPassUrl,
  children
}) => (
  <div id={Css.Header}>
    <JointCss />
    <a href={logoUrl$} id={Css.Logo}>
      <Logo id={Css.Logomark} inline />{title$}
    </a>
    <div id={Css.Links}>
      <LangPicker cookieDomain={cookieDomain} piggyback={piggyback} />
      <Wallet
        chainConfig={chainConfig}
        cookieDomain={cookieDomain}
        piggyback={piggyback}
        mintKPassUrl$={mintKPassUrl$}
        viewKPassUrl={viewKPassUrl}
      >
        {children}
      </Wallet>
    </div>
  </div>
);

export { LangPicker, Wallet };

export default Header;
