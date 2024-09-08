import { Adlar } from "../ağlar/adlar";
import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";

/** @const {!HTMLButtonElement} */
export const AdresButonu = dom.button("cua");
/** @const {!HTMLButtonElement} */
export const AğButonu = dom.button("cuc");
/** @const {!HTMLDivElement} */
export const Menü = dom.div("cub");
/** @const {!HTMLSpanElement} */
export const DebankLinki = dom.span("cude");

/**
 * @param {ChainId} ağAdı
 * @return {string}
 */
const resimAdı = (ağAdı) => "birim/ağlar/" + (ağAdı.startsWith("mi")
  ? "mina.png"
  : Adlar[ağAdı].replaceAll(" ", "").toLowerCase() + ".svg");

/**
 * @param {!Object<string, string>} props
 * @return {string}
 */
const Cüzdan = (props) => {
  const { DefaultChain, Chains } = props;
  const resimSrc = resimAdı(/** @type {ChainId} */(DefaultChain));

  return (
    <div id="cu">
      <link rel="stylesheet" href="/birim/cüzdan/birim.css" data-shared />
      <AğButonu><img src={resimSrc} height={32} width={32} /></AğButonu>
      <AdresButonu data-en="Connect wallet">Cüzdan bağla</AdresButonu>
      <Menü style="display:none" tabindex="0">
        <ul id="cud">
          {Chains.split("|").map((chain) => {
            const [chainId, tr, en] = chain.split(",");
            return (
              <li id={`cud${chainId}`} class={chainId == DefaultChain ? "sel" : ""}>
                {chainId == DefaultChain ? <span></span> : <img src={resimAdı(chainId)} width={32} height={32} />}
                {" "}
                {tr
                  ? <div>{Adlar[chainId]}<div class="cuo" data-en={en}>{tr}</div></div>
                  : Adlar[chainId]}
              </li>
            );
          })}
        </ul>
        <ul id="cuf0x" class="cuf">
          <li id="cura">
            <img src="/birim/cüzdan/img/rabby.svg" width={32} height={32} />
            <div class="cust"></div> Rabby Wallet<span class="cui" style="display:none" data-en="GET">İNDİR</span>
          </li>
          <li id="cuco">
            <img src="/birim/cüzdan/img/core.svg" width={32} height={32} />
            <div class="cust">
            </div> Core<span class="cui" style="display:none" data-en="GET">İNDİR</span>
          </li>
          <li id="cumm">
            <img src="/birim/cüzdan/img/metamask.svg" width={32} height={32} />
            <div class="cust"></div> MetaMask<span class="cui" style="display:none" data-en="GET">İNDİR</span>
          </li>
        </ul>
        <ul id="cufmi" class="cuf" style="display:none">
          <li id="cuau">
            <img src="/birim/cüzdan/img/auro.svg" width={32} height={32} />
            <div class="cust"></div> Auro Wallet<span class="cui" style="display:none" data-en="GET">İNDİR</span>
          </li>
        </ul>
        <ul id="cue" style="display:none">
          <div id="cueh">
            <img id="cutc" height="80" width="80" src="/birim/cüzdan/img/qmark.svg" />
            <div>
              <div id="cuad"><span>0xcCc...cCc</span><span id="cuadi"><img src="/birim/paste.svg" data-inline /></span></div>
              <DebankLinki>DeBank</DebankLinki> <span id="cuex">Explorer</span>
              <div id="cuin" date-en="MINT KPASS">KPASS AL</div>
            </div>
          </div>
          <hr />
          <li><img src="/birim/cüzdan/img/ambassador.svg" data-inline /><span phantom
            data-en=" Ambassador program"> Ambassador ol</span>
          </li>
          <li><img src="/birim/cüzdan/img/vote.svg" width="16" height="16" /><span data-phantom data-en=" Vote"> Oy
            kullan</span>
          </li>
          <li><img src="/birim/cüzdan/img/iptal.svg" data-inline /><span data-phantom data-en=" Revoke KPass"> İptal
            işlemleri</span></li>
          <li><img src="/birim/cüzdan/img/external-link.svg" data-inline /><span data-phantom data-en=" Switch wallet"> Cüzdan
            değiştir</span></li>
        </ul>
      </Menü>
    </div >
  );
}

export default Cüzdan;
