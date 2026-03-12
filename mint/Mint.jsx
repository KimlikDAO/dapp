import { LangCode } from "../lib/util/i18n";
import Credentials from "./Credentials";
import Css from "./Mint.css";
import Welcome from "./Welcome";
import Header from "/components/header/Header";
import Favicon from "/components/icon.svg";
import KPass from "/components/kpass/KPass";
import Lato400 from "/components/lato/l400.ttf";
import Lato700 from "/components/lato/l700.ttf";
import SharedCss from "/components/shared/SharedCss.css";
import { ChainConfig } from "/components/wallet/Wallet";
import { EthereumChainId, MinaChainId } from "/lib/crosschain/chains";
import Router from "/lib/kastro/Router";
import { css } from "/lib/kastro/StyleSheet";
import Switch from "/lib/kastro/Switch";
import { HostUrl, Page } from "/mpa";

/** @type {ChainConfig} */
const MintChainConfig = {
  defaultChain: EthereumChainId.x1,
  chains: [
    EthereumChainId.x1,
    EthereumChainId.xa4b1,
    MinaChainId.Mainnet,
    EthereumChainId.x89,
    EthereumChainId.xa86a,
    EthereumChainId.x38,
  ],
  chainNotes$: {
    [EthereumChainId.x1]: { en: "Signal chain", tr: "Ana ağ" },
    [MinaChainId.Mainnet]: { en: "New ✨", tr: "Yeni ✨" },
  },
};

/** @enum {string} */
const JointCss = css`
  .Header {
    grid-column: 1 / 3;
    grid-row: 1;
  }
`;

/**
 * @param {{ Lang: LangCode }} props
 */
const Mint = ({ Lang }) => (
  <html lang={Lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>KimlikDAO | {{ en: "Mint KPass", tr: "KPass al" }}</title>
      <Lato400 shared />
      <Lato700 shared />
      <Favicon raster={32} rel="icon" />
      <SharedCss />
      <Css />
      <JointCss />
    </head>
    <body>
      <Header
        chainConfig={MintChainConfig}
        logoUrl$="/"
        title$="KimlikDAO"
        cookieDomain={`.${HostUrl.slice(8)}`}
        mintKPassUrl$={Page.Mint}
        viewKPassUrl={""} />
      <Router routeHandler={(route) => {
        if (route) {
          Mint.panes.showPane(1);
          Credentials.show(route);
        } else
          Mint.panes.showPane(0);
      }} />
      <div id={Css.Root}>
        <div id={Css.LeftColumn}>
          <KPass style="" />
        </div>
        <Switch instance={Mint.panes} id={Css.Panes} initialPane={0}>
          <Welcome />
          <Credentials />
        </Switch>
      </div>
    </body>
  </html>
);

export default Mint;
