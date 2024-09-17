import Css from "./birim.css";
import { ağResmi } from "/birim/ağlar/birim";
import { ChainId } from "/lib/crosschain/chains";

/**
 * @const {!Object<ChainId, {
 *   ad: string,
 *   ek: string,
 *   holders: number
 * }>}
 */
const Tablo = {
  [ChainId.x1]: { ad: "ETHEREUM", ek: "’DA", holders: 13 },
  [ChainId.xa86a]: { ad: "AVALANCHE", ek: "’TA", holders: 57 },
  [ChainId.x38]: { ad: "BNB CHAIN", ek: "’DE", holders: 5 },
  [ChainId.xa4b1]: { ad: "ARBITRUM", ek: "’DA", holders: 8 },
  [ChainId.MinaMainnet]: { ad: "MINA", ek: "’DA", holders: 130 },
  [ChainId.x89]: { ad: "POLYGON", ek: "’DA", holders: 2 },
};

const Balon = ({ chainId }) => (
  <div class={`sac ${chainId == ChainId.MinaMainnet ? "mina" : chainId.slice(1)}`}>
    <img src={ağResmi(chainId)} height={40} width={40} />
    <div>
      <div class="sau">{Tablo[chainId].holders}</div>
      <span class="saa" data-en={`HOLDERS ON ${Tablo[chainId].ad}`}>{
        Tablo[chainId].ad + Tablo[chainId].ek} KPASS</span>
    </div>
  </div>
);

const Sahipler = () => (
  <div id="sa">
    <Css />
    <div id="sai">
      <div class="ansag">
        <h2 data-en="KPass holders&lt;br>by chain.">Ağlara göre<br />KPass sahipleri.</h2>
        <span class="sat anac">
          <i18n data-en="Join over ">6 farklı zincirde </i18n>
          {Object.values(Tablo).reduce((sum, x) => sum + x.holders, 0)}
          <i18n data-en=" happy KPass holders across 6 different chains."> üzerinde
            mutlu KPass kullanıcısı arasına katılın.</i18n>
        </span>
        <div id="saz"><a data-en:href="/mint" id="sal" href="/al" class="act btn">{{
          en: "Become a KPass holder",
          tr: "Sen de KPass sahibi ol"
        }} <img src="/ana/ok.svg" data-inline /></a>
        </div>
      </div>
      <div id="sak">
        {Object.keys(Tablo).map((chainId) => <Balon chainId={chainId} />)}
      </div>
    </div>
  </div>
);

export default Sahipler;
