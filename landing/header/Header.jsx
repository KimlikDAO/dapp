import Css from "./Header.css";
import Dropdown from "/components/dropdown/Dropdown";
import { FatListItem } from "/components/elements/List";
import { Arrow } from "/components/icons/Icons";
import LangPicker from "/components/langPicker/LangPicker";
import Logo from "/components/logo.svg";
import SharedCss from "/components/shared/SharedCss";
import LandingMenu from "/components/wallet/rightPanes/LandingMenu";
import Wallet, { ChainConfig } from "/components/wallet/Wallet";
import dom from "../../lib/kastro/dom";
import { i18n } from "../../lib/util/i18n";
import { ExternalPage, HostUrl, Page } from "/mpa";

/**
 * @param {{ chainConfig: ChainConfig }} props
 */
const Header = ({ chainConfig }) => (
  <div id={Css.Header}>
    <a href="/" id={SharedCss.Header.Logo}>
      <Logo id={SharedCss.Header.Logomark} height={35} inline />KimlikDAO</a>
    <div id={SharedCss.Header.Links}>
      <Dropdown id={Css.Products} label$={{ en: "Products", tr: "Ürünler" }}>
        <FatListItem href$={Page.Mint} title$="KPass"
          desc$={{
            en: "A fully private, self-sovereign ID you hold in your crypto wallet",
            tr: "Kontrolü tamamen sende olan ve gizliliğini koruyan bir kimlik" }} />
        <FatListItem href$="#" title$="Factor"
          desc$={{
            en: "Persistent storage anchored to your Ethereum account. Start with 1 GB free and scale seamlessly with USDC",
            tr: "Ethereum hesabınıza bağlı kalıcı depolama. 1 GB ücretsiz başlayın, USDC ile yükseltin" }} />
        <FatListItem href$="#" title$="e-sign"
          desc$={{
            en: "Sign PDFs with your KPass or eIDAS-compatible hardware token",
            tr: "PDF’leri KPass veya 5070 uyumlu e-imza donanım token’ınızla imzalayın" }} />
      </Dropdown>
      <Dropdown id={Css.Developers} label$={{ en: "Developers", tr: "Geliştiriciler" }}>
        <FatListItem href$="//github.com/KimlikDAO/KPass" title$="KPass"
          desc$={{
            en: "Browse KPass code, documents and specification",
            tr: "KPass kodunu, belgelerini ve tanımlarını inceleyin" }} />
        <FatListItem href$="//github.com/KimlikDAO/kimlikdao-js/tree/ana/kdjs" title$="kdjs"
          desc$={{
            en: "A modern JavaScript compiler with advanced type-driven optimizations",
            tr: "Gelişmiş optimizasyonlarla donatılmış tip bilinçli bir JavaScript derleyicisi" }} />
        <FatListItem href$="//github.com/KimlikDAO/kimlikdao-js/tree/ana/kastro" title$="kastro"
          desc$={{
            en: "A react-like web framework with high performance focus and zero runtime",
            tr: "React benzeri, çok yüksek verimlilik odaklı web frameworkü" }} />
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
