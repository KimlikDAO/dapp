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
import SharedCss from "/components/shared/SharedCss";
import { ChainConfig } from "/components/wallet/Wallet";
import { HostUrl } from "/crate";
import { ChainId } from "/lib/crosschain/chains";
import { LangCode } from "/lib/util/i18n";

/** @type {ChainConfig} */
const WalletConfig = {
  defaultChain: ChainId.xa4b1,
  chains: [
    ChainId.x1,
    ChainId.xa4b1,
    ChainId.MinaMainnet,
    ChainId.x89,
    ChainId.xa86a,
    ChainId.x38,
  ],
  chainNotes$: {
    [ChainId.xa4b1]: { en: "Signal chain", tr: "Ana ağ" },
    [ChainId.MinaMainnet]: { en: "New ✨", tr: "Yeni ✨" },
  },
};

/**
 * @param {{ Lang: LangCode }} props
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
    </head>
    <body id={Css.Root}>
      <Header chainConfig={WalletConfig} />
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
