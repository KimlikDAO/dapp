import Css from "./Header.css";
import Dropdown from "/components/dropdown/Dropdown";
import { Arrow } from "/components/icons/Icons";
import LangPicker from "/components/langPicker/LangPicker";
import Logo from "/components/logo.svg";
import SharedCss from "/components/shared/SharedCss";
import LandingMenu from "/components/wallet/rightPanes/LandingMenu";
import Wallet, { ChainConfig } from "/components/wallet/Wallet";
import { ExternalPage, HostUrl, Page } from "/crate";
import dom from "/lib/util/dom";
import { i18n } from "/lib/util/i18n";

/**
 * @param {{ chainConfig: ChainConfig }} props
 */
const Header = ({ chainConfig }) => (
  <div id={Css.Header}>
    <a href="/" id={SharedCss.Header.Logo}>
      <Logo id={SharedCss.Header.Logomark} height={35} inline />KimlikDAO</a>
    <div id={SharedCss.Header.Links}>
      <Dropdown id={Css.Products} label$={{ en: "Products", tr: "Ürünler" }}>
        <a href={Page.Mint} class={Css.DropdownItem}>
          <span class={Css.DropdownItemTitle}>KPass</span>
          <span class={Css.DropdownItemDesc}>{{
            en: "Self-sovereign identity you hold in your crypto wallet",
            tr: "Kripto cüzdanınızda tuttuğunuz kendi kendine egemen kimlik"
          }}</span>
        </a>
        <a href="#" class={Css.DropdownItem}>
          <span class={Css.DropdownItemTitle}>KBox</span>
          <span class={Css.DropdownItemDesc}>{{
            en: "Storage for your Ethereum account. 1GB free. Expand with USDC.",
            tr: "Ethereum hesabınız için depolama. 1GB ücretsiz. USDC ile yükseltin."
          }}</span>
        </a>
        <a href="#" class={Css.DropdownItem}>
          <span class={Css.DropdownItemTitle}>e-sign</span>
          <span class={Css.DropdownItemDesc}>{{
            en: "Sign PDFs with your KPass or eIDAS-compatible hardware token",
            tr: "PDF'leri KPass veya 5070 uyumlu e-imza donanım token'ınızla imzalayın"
          }}</span>
        </a>
      </Dropdown>
      <Dropdown id={Css.Developers} label$={{ en: "Developers", tr: "Geliştiriciler" }}>
        <a href="//github.com/KimlikDAO/KPass" class={Css.DropdownItem}>
          <span class={Css.DropdownItemTitle}>KPass</span>
          <span class={Css.DropdownItemDesc}>{{
            en: "Browse KPass spec and docs",
            tr: "KPass tanımları ve belgeleri"
          }}</span>
        </a>
        <a href="/kdjs" class={Css.DropdownItem}>
          <span class={Css.DropdownItemTitle}>kdjs</span>
          <span class={Css.DropdownItemDesc}>{{
            en: "JavaScript library for KimlikDAO protocols",
            tr: "KimlikDAO protokolleri için JavaScript kütüphanesi"
          }}</span>
        </a>
        <a href="//github.com/KimlikDAO/kimlikdao-js/tree/ana/kastro" class={Css.DropdownItem}>
          <span class={Css.DropdownItemTitle}>kastro</span>
          <span class={Css.DropdownItemDesc}>{{
            en: "JSX framework with build-time rendering and client-side interactivity",
            tr: "Build-time rendering ve client-side interaktivite ile JSX framework"
          }}</span>
        </a>
      </Dropdown>
      
      <LangPicker cookieDomain={`.${HostUrl.slice(8)}`} />
      <Wallet
        chainConfig={chainConfig}
        cookieDomain={`.${HostUrl.slice(8)}`}
        mintKPassUrl$={Page.Mint}
        viewKPassUrl={dom.i18n(Page.KPass)}
      >
        <LandingMenu
          ambassadorUrl$={i18n`${ExternalPage.Join}#sa-ambassador1`}
          voteUrl$={Page.Vote}
          revokeUrl$={Page.Revoke}
        />
      </Wallet>
      <a id={Css.ActionButton} href={Page.Mint} class={[SharedCss.Button, SharedCss.Action]}>{{
        en: "Mint KPass", tr: "Hemen KPass al"
      }}<Arrow /></a>
    </div>
  </div>
);

export default Header;
