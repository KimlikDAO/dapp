import Script from "kastro:./sayfa.js";
import Ağ from "./ağ/birim.jsx";
import Hero from "./hero/birim";
import Kazan from "./kazan/birim.jsx";
import OkResmi from "./ok.svg";
import OpenGraph, { Description, Title } from "./opengraph";
import Raporlar from "./raporlar/birim";
import Sahipler from "./sahipler/birim.jsx";
import Css from "./sayfa.css";
import TwitterCard from "./twittercard";
import Altdizin from "/birim/altdizin/birim";
import Cüzdan from "/birim/cüzdan/birim";
import Dil from "/birim/dil/birim";
import Favicon from "/birim/icon.svg";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import Logo from "/birim/logo.svg";
import OrtakCss from "/birim/ortakcss/birim";
import { Page } from "/crate";
import { ChainId } from "/lib/crosschain/chains";
import { I18nString } from "/lib/util/i18n"

/** @const {!Array<ChainId>} */
const Chains = [
  ChainId.x1,
  ChainId.xa4b1,
  ChainId.MinaMainnet,
  ChainId.x89,
  ChainId.xa86a,
  ChainId.x38
];

/** @const {!Object<ChainId, I18nString>} */
const ChainNotes = {
  [ChainId.xa4b1]: { tr: "Ana ağ", en: "Signal chain" },
  [ChainId.MinaMainnet]: { tr: "Yeni ✨", en: "New ✨" },
};

/** @const {ChainId} */
const DefaultChain = ChainId.xa4b1;

const Ana = ({ Lang }) => (
  <html lang={Lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={Description} />
      <OpenGraph />
      <TwitterCard />
      <Lato400 shared />
      <Lato700 shared />
      <title>{Title}</title>
      <link rel="canonical" href="https://kimlikdao.org" />
      <OrtakCss />
      <Css />
      <Favicon raster={32} rel="icon" />
      <Script Chains={Chains} DefaultChain={DefaultChain} />
    </head>
    <body id={Css.Kök}>
      <div id={Css.Başlık}>
        <a href="/" id={OrtakCss.Başlık.Logo}>
          <Logo id={OrtakCss.Başlık.Logomark} height={35} inline />KimlikDAO</a>
        <div id={OrtakCss.Başlık.Linkler}>
          <a class={OrtakCss.Başlık.Link} href={{ en: "//join.kimlikdao.org/?en", tr: "//join.kimlikdao.org/?tr" }}>{{
            tr: "Aramıza katıl", en: "Join us"
          }}</a>
          <a class={OrtakCss.Başlık.Link} href="//discord.gg/H2wg6pcWXG" target="_blank" rel="noreferrer">Discord</a>
          <Dil />
          <Cüzdan Chains={Chains} DefaultChain={DefaultChain} ChainNotes={ChainNotes} />
          <a id={Css.EylemDüğmesi} href={Page.Al} class={[OrtakCss.Düğme, "act"]}>{{
            en: "Mint KPass",
            tr: "Hemen KPass al"
          }}<OkResmi inline /></a>
        </div>
      </div>
      <Hero />
      <Kazan />
      <Sahipler />
      <Ağ />
      <hr class={Css.Ayraç} />
      <Raporlar />
      <Altdizin />
    </body>
  </html>
);

export default Ana;
