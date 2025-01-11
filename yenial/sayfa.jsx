import Script from "kastro:./sayfa.js";
import Başlık from "/birim/başlık/birim";
import Favicon from "/birim/icon.svg";
import KPass from "/birim/kpass/birim.jsx";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import OrtakCss from "/birim/ortakcss/birim";
import { ChainId } from "/lib/crosschain/chains";
import Css from "./sayfa.css";

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

const Al = ({ Lang }) => (
  <html lang={Lang}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Lato400 shared />
      <Lato700 shared />
      <title>KimlikDAO | {{ en: "Mint KPass", tr: "KPass al" }}</title>
      <Favicon raster={32} rel="icon" />
      <OrtakCss />
      <Css />
      <Script Chains={Chains} DefaultChain={DefaultChain} />
    </head>
    <body id={Css.Kök}>
      <Başlık href="/" DefaultChain={DefaultChain} Chains={Chains} ChainNotes={ChainNotes} />
      <KPass />
    </body>
  </html >
);

export default Al;
