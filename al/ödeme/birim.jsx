import AvaxResmi from "/birim/paralar/AVAX.svg";
import BnbResmi from "/birim/paralar/BNB.svg";
import EthResmi from "/birim/paralar/ETH.svg";
import FtmResmi from "/birim/paralar/FTM.svg";
import MaticResmi from "/birim/paralar/MATIC.svg";
import MinaResmi from "/birim/paralar/MINA.png";
import TrybResmi from "/birim/paralar/TRYB.svg";
import UsdcResmi from "/birim/paralar/USDC.svg";
import UsdtResmi from "/birim/paralar/USDT.svg";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
export const Kök = dom.div("od");

const Dot = {
  en: ".",
  tr: ","
};

const Ödeme = () => (
  <div id="od" class="step disabled">
    <b data-en="5. Send the payment and receive your KPass.">5. Ödemeyi yapın KPass cüzdanınıza gelsin</b>{{
      en: <>We'll send your wallet a request for a transaction of value <span id="odf">$1.5</span>. When confirmed, your KPass will be minted in the same transaction.</>,
      tr: <>Cüzdanınıza <span id="odf">$1,5</span> alımı için bir istek yollayacağız.Onayladığınızda
        cüzdanınızdan ücret alınır ve KPass'iniz cüzdanınıza mint edilir.</>
    }}
    <table id="odi">
      <tr>
        <td data-en="KimlikDAO fee">KimlikDAO ücreti</td>
        <td><i></i><span class="odv">1</span>{Dot}<span class="odv0">00</span></td>
      </tr>
      <tr>
        <td data-en="Social revoke omission fee">İmece iptal kurmama</td>
        <td><i></i><span class="odv">0</span>{Dot}<span class="odv0">50</span></td>
      </tr>
      <tr class="ode">
        <td data-en="Network fee (estimated)">Tahmini ağ ücreti</td>
        <td><i></i><span class="odv">0</span>{Dot}<span class="odv0">002</span></td>
      </tr>
      <tr class="odt">
        <td data-en="Total">Toplam</td>
        <td><i></i><span class="odv">0</span>{Dot}<span class="odv0">002</span>
          <span> + <i></i><span class="odv">0</span>{Dot}<span class="odv0">002</span></span>
        </td>
      </tr>
    </table>
    <div id="odc">
      <a href="javascript:" id="oda" class="act btn" data-en="Authorize payment in wallet">Ödeme isteği yolla</a>
      <a href="javascript:" id="odb">
        <AvaxResmi height={32} width={32} />
      </a>
      <ul id="odd" style="display:none">
        <li id="odd2">
          <span class="ods" data-en="1.00">1,00</span><span class="odp">USDC</span><UsdcResmi height={32} width={32} />
        </li>
        <li id="odd1">
          <span class="ods" data-en="1.00">1,00</span><span class="odp">USDT</span><UsdtResmi height={32} width={32} />
        </li>
        <li id="odd3">
          <span class="ods" data-en="19.00">19,00</span><span class="odp">TRYB</span><TrybResmi height={32} width={32} />
        </li>
        <li id="odd0xa86a">
          <span class="ods" data-en="0.01">0,01</span><span class="odp">AVAX</span><AvaxResmi height={32} width={32} />
        </li>
        <li id="odd0x1">
          <span class="ods" data-en="0.0006">0,0006</span><span class="odp">ETH</span><EthResmi height={32} width={32} />
        </li>
        <li id="odd0x89">
          <span class="ods" data-en="0.0006">0,0006</span><span class="odp">MATIC</span><MaticResmi height={32} width={32} />
        </li>
        <li id="odd0xa4b1">
          <span class="ods" data-en="0.0006">0,0006</span><span class="odp">ETH</span><EthResmi height={32} width={32} />
        </li>
        <li id="odd0x38">
          <span class="ods" data-en="0.0006">0,0006</span><span class="odp">BNB</span><BnbResmi height={32} width={32} />
        </li>
        <li id="odd0xfa">
          <span class="ods" data-en="0.0006">0,0006</span><span class="odp">FTM</span><FtmResmi height={32} width={32} />
        </li>
        <li id="odd0x144">
          <span class="ods" data-en="0.0006">0,0006</span><span class="odp">ETH</span><EthResmi height={32} width={32} />
        </li>
        <li id="oddmina:mainnet">
          <span class="ods">1</span><span class="odp">tMINA</span><MinaResmi height={32} width={32} />
        </li>
      </ul>
    </div>
  </div >
);

export default Ödeme;
