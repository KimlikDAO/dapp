import { LangCode } from "../lib/util/i18n";
import Css from "./Kdao.css";
import Header from "/components/header/Header";
import Favicon from "/components/icon.svg";
import Lato400 from "/components/lato/l400.ttf";
import Lato700 from "/components/lato/l700.ttf";
import SharedCss from "/components/shared/SharedCss";
import { ChainConfig } from "/components/wallet/Wallet";
import { EthereumChainId } from "/lib/crosschain/chains";
import { HostUrl, Page } from "/mpa";

/** @type {ChainConfig} */
const KdaoChainConfig = {
  defaultChain: EthereumChainId.x1,
  chains: [EthereumChainId.x1],
  chainNotes$: {
    [EthereumChainId.x1]: { tr: "Ana ağ", en: "Treasury chain" },
  },
};

/**
 * @param {{ Lang: LangCode }} props
 */
const Kdao = ({ Lang }) => (
  <html lang={Lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Lato400 shared />
      <Lato700 shared />
      <SharedCss />
      <Css />
      <title>KimlikDAO | KDAO</title>
      <Favicon raster={32} rel="icon" />
    </head>
    <body>
      <Header
        chainConfig={KdaoChainConfig}
        logoUrl$="/"
        title$="KimlikDAO"
        cookieDomain={`.${HostUrl.slice(8)}`}
        mintKPassUrl$={Page.Mint}
        viewKPassUrl={""} />
      <div id={Css.Hero}>Graph</div>
    </body>
  </html>
);

export default Kdao;
