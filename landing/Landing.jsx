import Script from "kastro:./Landing.jsx";
import Header from "./header/Header";
import Hero from "./hero/Hero";
import Holders from "./holders/Holders";
import Css from "./Landing.css";
import Learn2Earn from "./Learn2Earn";
import Meta, { Title } from "./Meta";
import Network from "./network/Network";
import Reports from "./Reports";
import Footer from "/components/footer/Footer";
import Favicon from "/components/icon.svg";
import Lato400 from "/components/lato/l400.ttf";
import Lato700 from "/components/lato/l700.ttf";
import SharedCss from "/components/sharedCss/SharedCss";
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
  [ChainId.xa4b1]: { en: "Signal chain", tr: "Ana ağ" },
  [ChainId.MinaMainnet]: { en: "New ✨", tr: "Yeni ✨" },
};

/** @const {ChainId} */
const DefaultChain = ChainId.xa4b1;

/**
 * @param {{ Lang: LangCode }=} props
 * @return {Promise<string>}
 */
const Landing = ({ Lang }) => (
  <html lang={Lang}>
    <head>
      <Meta />
      <Lato400 shared />
      <Lato700 shared />
      <SharedCss />
      <Css />
      <title>{Title}</title>
      <link rel="canonical" href={HostUrl} />
      <Favicon raster={32} rel="icon" />
      <Script DefaultChain={DefaultChain} Chains={Chains} />
    </head>
    <body id={Css.Root}>
      <Header DefaultChain={DefaultChain} Chains={Chains} ChainNotes={ChainNotes} />
      <Hero />
      <Learn2Earn />
      <Holders />
      <Network />
      <hr class={Css.Separator} />
      <Reports />
      <Footer />
    </body>
  </html>
);

export default Landing;
