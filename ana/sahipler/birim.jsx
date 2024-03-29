/** @const {!Object<string, number>} */
const Sayılar = {
  "polygon": 2,
  "eth": 13,
  "avax": 57,
  "bnb": 5,
  "arb": 8,
  "mina": 130,
};

const Sahipler = () => (
  <div id="sa">
    <div id="sai">
      <div class="ansag">
        <h2 data-en="TCKT holders&lt;br>by chain.">Ağlara göre<br />TCKT sahipleri.</h2>
        <span class="sat anac">
          <span data-phantom data-en="Join over ">6 farklı zincirde </span>
          {Object.values(Sayılar).reduce((x, y) => x + y)}
          <span data-phantom data-en=" happy TCKT users across 6 different chains."> üzerinde
            mutlu TCKT kullanıcısı arasına katılın.</span>
        </span>
        <div id="saz"><a data-en-href="/mint" id="sal" href="/al" class="act btn"><span data-phantom
          data-en="Become a TCKT holder">Sen de TCKT
          sahibi ol</span> <img src="/ana/ok.svg" data-inline /></a>
        </div>
      </div>
      <div id="sak">
        <div class="sac eth">
          <img src="/birim/ağlar/ethereum.svg" height="40" width="40" />
          <div>
            <div class="sau">{Sayılar["eth"]}</div>
            <span class="saa" data-en="HOLDERS ON ETHEREUM">ETHEREUM’DA TCKT</span>
          </div>
        </div>
        <div class="sac avax">
          <img src="/birim/ağlar/avalanche.svg" height="40" width="40" />
          <div>
            <div class="sau">{Sayılar["avax"]}</div>
            <span class="saa" data-en="HOLDERS ON AVALANCHE">AVALANCHE’TA TCKT</span>
          </div>
        </div>
        <div class="sac bnb">
          <img src="/birim/ağlar/bnbchain.svg" height="40" width="40" />
          <div>
            <div class="sau">{Sayılar["bnb"]}</div>
            <span class="saa" data-en="HOLDERS ON BNB CHAIN">BNB CHAIN’DE TCKT</span>
          </div>
        </div>
        <div class="sac arb">
          <img src="/birim/ağlar/arbitrumone.svg" height="40" width="40" />
          <div>
            <div class="sau">{Sayılar["arb"]}</div>
            <span class="saa" data-en="HOLDERS ON ARBITRUM">ARBITRUM’DA TCKT</span>
          </div>
        </div>
        <div class="sac mina">
          <img src="/birim/ağlar/mina.png" height="40" width="40" />
          <div>
            <div class="sau">{Sayılar["mina"]}</div>
            <span class="saa" data-en="HOLDERS ON MINA">MINA’DA TCKT</span>
          </div>
        </div>
        <div class="sac polygon">
          <img src="/birim/ağlar/polygon.svg" height="40" width="40" />
          <div>
            <div class="sau">{Sayılar["polygon"]}</div>
            <span class="saa" data-en="HOLDERS ON POLYGON">POLYGON’DA TCKT</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Sahipler;
