import Script from "kastro:./sayfa.js";
import OkResmi from "./dropdownok.svg";
import Css from "./sayfa.css";
import Başlık from "/birim/başlık/birim.jsx";
import Favicon from "/birim/icon.svg";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import OrtakCss from "/birim/ortakcss/birim.jsx";
import AvaxResmi from "/birim/paralar/AVAX.svg";
import EthResmi from "/birim/paralar/ETH.svg";
import TrybResmi from "/birim/paralar/TRYB.svg";
import UsdcResmi from "/birim/paralar/USDC.svg";
import UsdtResmi from "/birim/paralar/USDT.svg";
import { ChainId } from "/lib/crosschain/chains";

/** @const {!Array<ChainId>} */
const Chains = [
  ChainId.x1,
  ChainId.MinaMainnet,
  ChainId.xa4b1,
  ChainId.x89,
  ChainId.xa86a,
  ChainId.x38
];

/** @const {!Object<ChainId, I18nString>} */
const ChainNotes = {
  [ChainId.MinaMainnet]: { tr: "Yeni ✨", en: "New ✨" },
  [ChainId.xa4b1]: { tr: "Ana ağ", en: "Signal chain" }
};

/** @const {ChainId} */
const DefaultChain = ChainId.xa4b1;

const Oyla = () => (
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title data-en="KimlikDAO | Vote">KimlikDAO | Oylamalar</title>
      <Lato400 shared />
      <Lato700 shared />
      <Favicon raster={32} rel="icon" />
      <OrtakCss />
      <Css />
      <Script Chains={Chains} DefaultChain={DefaultChain} />
    </head>
    <body>
      <Başlık DefaultChain={DefaultChain} Chains={Chains} ChainNotes={ChainNotes} />
      <div id="oy">
        <div id="oyyb" data-en="Create a proposal">Yeni Oylama Öner</div>
        <div id="oyy" style="display:none">
          <div id="oyyddc">
            <div id="oyytitle" data-en="Create Proposal">Yeni Oylama Öner</div>
            <button id="oyyddb">
              <div id="oyyso2" data-en="Community Vote">Topluluk Önerisi</div>
              <div id="oyyso0" data-en="Price Change" style="display:none">Fiyat Değişikliği</div>
              <div id="oyyso1" data-en="Trade Proposal" style="display:none">Takas Önerisi</div>
              <div id="oyyso3" data-en="Custom Proposal" style="display:none">Kendin Belirle</div>
              <OkResmi id="oyyddok" width={10} height={10} inline />
            </button>
            <ul id="oyyul" style="display:none">
              <li id="oyyo2" class="oyyli" data-en="Community Vote">Topluluk Önerisi</li>
              <li id="oyyo0" class="oyyli" data-en="Price Change">Fiyat Değişikliği</li>
              <li id="oyyo1" class="oyyli" data-en="Trade Proposal">Takas Önerisi</li>
              <li id="oyyo3" class="oyyli" data-en="Custom Proposal">Kendin Belirle</li>
            </ul>
          </div>
          <div id="oyyc">
            <div id="oyy0" style="display:none">
              <div id="oyywc">
                <div id="oyyfb" class="oyyb" data-en="Enter new price for KPass.">KPass'in yeni fiyatını girin.</div>
                <div id="oyyfddc">
                  <input type="number" id="oyyfi" placeholder="0.0" />
                  <button id="oyytb">
                    <div id="oyyst2" class="oyyst"><UsdcResmi height="24" width="24" /> USDC</div>
                    <div id="oyyst1" class="oyyst" style="display:none"><UsdtResmi height="24" width="24" /> USDT</div>
                    <div id="oyyst3" class="oyyst" style="display:none"><TrybResmi height="24" width="24" /> TRYB</div>
                    <div id="oyyst0x1" class="oyyst" style="display:none"><EthResmi height="24" width="24" /> ETH</div>
                    <div id="oyyst0xa86a" class="oyyst" style="display:none"><AvaxResmi height="24" width="24" /> AVAX</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
);

export default Oyla;
