import Script from "kastro:./sayfa.jsx";
import Css from "./sayfa.css";
import Başlık from "/birim/başlık/birim";
import Favicon from "/birim/icon.svg";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import OrtakCss from "/birim/ortakcss/birim";
import { ChainId } from "/lib/crosschain/chains";
import { I18nString, LangCode } from "/lib/util/i18n";

/** @const {!Array<ChainId>} */
const Chains = [
  ChainId.x1,
];

/** @const {!Object<ChainId, I18nString>} */
const ChainNotes = {
  [ChainId.x1]: { tr: "Ana ağ", en: "Treasury chain" },
};

/** @const {ChainId} */
const DefaultChain = ChainId.x1;

/**
 * @param {{ Lang: LangCode }=} props
 * @return {Promise<string>}
 */
const KDAO = ({ Lang }) => (
  <html lang={Lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Lato400 shared />
      <Lato700 shared />
      <title>KimlikDAO | KDAO</title>
      <Favicon raster={32} rel="icon" />
      <OrtakCss />
      <Css />
      <Script Chains={Chains} DefaultChain={DefaultChain} />
    </head>
    <body>
      <Başlık href="/" DefaultChain={DefaultChain} Chains={Chains} ChainNotes={ChainNotes} />
      <div id={Css.Hero}>Graph</div>
    </body>
  </html>
);

export default KDAO;
