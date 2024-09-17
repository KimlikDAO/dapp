import Ağ from "./ağ/birim.jsx";
import Hero from "./hero/birim";
import Kazan from "./kazan/birim.jsx";
import OkResmi from "./ok.svg";
import OpenGraph, { Description, Title } from "./opengraph/birim";
import Raporlar from "./raporlar/birim";
import Sahipler from "./sahipler/birim.jsx";
import TwitterCard from "./twittercard/birim";
import Altdizin from "/birim/altdizin/birim";
import BaşlıkCss from "/birim/başlık/birim.css";
import Cüzdan from "/birim/cüzdan/birim";
import Dil from "/birim/dil/birim";
import Favicon from "/birim/icon.svg";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import Logo from "/birim/logo.svg";
import { ChainId } from "/lib/crosschain/chains";
import { assignGlobals } from "/lib/kastro/compiler/pageGlobals";

const Ana = () => {
  assignGlobals({
    Chains: [
      ChainId.x1,
      ChainId.MinaMainnet,
      ChainId.xa4b1,
      ChainId.x89,
      ChainId.xa86a,
      ChainId.x38
    ],
    ChainNotes: {
      [ChainId.MinaMainnet]: { tr: "Yeni ✨", en: "New ✨" },
      [ChainId.xa4b1]: { tr: "Ana ağ", en: "Signal chain" }
    },
    DefaultChain: ChainId.xa4b1,
  });
  return (
    <html>
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
        <birim:ortakcss />
        <Favicon raster={32} rel="icon" />
        <BaşlıkCss shared />
        <script src="/ana/sayfa.js" type="module"></script>
      </head>

      <body id="an">
        <div id="baa">
          <a href="/" id="bag"><Logo id="bak" height={35} inline />KimlikDAO</a>
          <div id="baf">
            <a class="bae" href={{ en: "//join.kimlikdao.org/en", tr: "//join.kimlikdao.org/tr" }}
              data-en="Join us">Aramıza katıl</a>
            <a class="bae" href="//discord.gg/H2wg6pcWXG" target="_blank" rel="noreferrer">Discord</a>
            <Dil />
            <Cüzdan />
            <a id="bal" href={{ en: "mint", tr: "al" }} class="btn act">{{
              en: "Mint KPass",
              tr: "Hemen KPass al"
            }}<OkResmi inline /></a>
          </div>
        </div>
        <Hero />
        <Kazan />
        <Sahipler />
        <Ağ />
        <hr class="anhr" />
        <Raporlar />
        <Altdizin />
      </body>
    </html>
  );
}

export default Ana;
