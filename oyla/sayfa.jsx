import Css from "./sayfa.css";
import Başlık from "/birim/başlık/birim.jsx";
import Favicon from "/birim/icon.svg";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";
import { ChainId } from "/lib/crosschain/chains";
import { assignGlobals } from "/lib/kastro/compiler/pageGlobals";

const Oyla = () => {
  assignGlobals({
    Chains: [
      ChainId.x1,
      ChainId.xa4b1,
      ChainId.x89,
      ChainId.xa86a,
      ChainId.x38
    ],
    DefaultChain: ChainId.xa4b1,
  });

  return (
    <html>

      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title data-en="KimlikDAO | Vote">KimlikDAO | Oylamalar</title>
        <Lato400 shared />
        <Lato700 shared />
        <Favicon raster={32} rel="icon" />
        <script type="module" src="/oyla/sayfa.js" data-inherit="Chains,DefaultChain"></script>
        <Css />
      </head>

      <body>
        <Başlık />
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
                <img id="oyyddok" src="/oyla/dropdownok.svg" width="10" height="10" data-inline />
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
                      <div id="oyyst2" class="oyyst"><img src="/birim/paralar/USDC.svg" height="24" width="24" /> USDC</div>
                      <div id="oyyst1" class="oyyst" style="display:none"><img src="/birim/paralar/USDT.svg" height="24"
                        width="24" /> USDT</div>
                      <div id="oyyst3" class="oyyst" style="display:none"><img src="/birim/paralar/TRYB.svg" height="24"
                        width="24" /> TRYB</div>
                      <div id="oyyst0x1" class="oyyst" style="display:none"><img src="/birim/paralar/ETH.svg" height="24"
                        width="24" /> ETH</div>
                      <div id="oyyst0xa86a" class="oyyst" style="display:none"><img src="/birim/paralar/AVAX.svg" height="24"
                        width="24" /> AVAX</div>
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
};

export default Oyla;
