import Script from "kastro:./sayfa.jsx";
import Ağ from "./ağ/birim";
import Başlık from "./başlık/birim";
import Hero from "./hero/birim";
import Kazan from "./Kazan";
import OpenGraph, { Description, Title } from "./opengraph";
import Raporlar from "./Raporlar";
import Sahipler from "./sahipler/birim";
import Css from "./sayfa.css";
import TwitterCard from "./twittercard";
import Altdizin from "/birim/altdizin/birim";
import Favicon from "/birim/icon.svg";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import OrtakCss from "/birim/ortakcss/birim";
import { HostUrl } from "/crate";
import { ChainId } from "/lib/crosschain/chains";
import { I18nString, LangCode } from "/lib/util/i18n";

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

/**
 * @param {{ Lang: LangCode }=} props
 * @return {Promise<string>}
 */
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
      <OrtakCss />
      <Css />
      <title>{Title}</title>
      <link rel="canonical" href={HostUrl} />
      <Favicon raster={32} rel="icon" />
      <Script DefaultChain={DefaultChain} Chains={Chains} />
    </head>
    <body id={Css.Kök}>
      <Başlık Chains={Chains} ChainNotes={ChainNotes} DefaultChain={DefaultChain} />
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
