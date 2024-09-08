import { AğBilgileri, ağResmi } from "/birim/ağlar/birim";
import { ChainId } from "/lib/crosschain/chains";

/**
 * @const {!Object<ChainId, {
 *   ek: string,
 *   holder: number
 * }>}
 */
const Tablo = {
  [ChainId.x1]: { ad: "ETHEREUM", ek: "’DA", holder: 13 },
  [ChainId.xa86a]: { ad: "AVALANCHE", ek: "’TA", holder: 57 },
  [ChainId.x38]: { ad: "BNB CHAIN", ek: "’DE", holder: 5 },
  [ChainId.xa4b1]: { ad: "ARBITRUM", ek: "’DA", holder: 8 },
  [ChainId.MinaMainnet]: { ad: "MINA", ek: "’DA", holder: 130 },
  [ChainId.x89]: { ad: "POLYGON", ek: "’DA", holder: 2 },
};

const Balon = ({ chainId }) => (
  <div class={`sac ${chainId == ChainId.MinaMainnet ? "mina" : chainId.slice(1)}`}>
    <img src={ağResmi(chainId)} height={40} width={40} />
    <div>
      <div class="sau">{Tablo[chainId].holder}</div>
      <span class="saa" data-en={`HOLDERS ON ${Tablo[chainId].ad}`}>{
        AğBilgileri[chainId].ad.toUpperCase() + Tablo[chainId].ek} KPASS</span>
    </div>
  </div>
)
const Sahipler = () => (
  <div id="sa">
    <div id="sai">
      <div class="ansag">
        <h2 data-en="KPass holders&lt;br>by chain.">Ağlara göre<br />KPass sahipleri.</h2>
        <span class="sat anac">
          <i18n data-en="Join over ">6 farklı zincirde </i18n>
          {Object.values(Tablo).reduce((sum, x) => sum + x.holder, 0)}
          <i18n data-en=" happy KPass holders across 6 different chains."> üzerinde
            mutlu KPass kullanıcısı arasına katılın.</i18n>
        </span>
        <div id="saz"><a en:href="/mint" id="sal" href="/al" class="act btn"><i18n
          data-en="Become a KPass holder">Sen de KPass
          sahibi ol</i18n> <img src="/ana/ok.svg" data-inline /></a>
        </div>
      </div>
      <div id="sak">
        {Object.keys(Tablo).map((chainId) => <Balon chainId={chainId} />)}
      </div>
    </div>
  </div>
);

export default Sahipler;
