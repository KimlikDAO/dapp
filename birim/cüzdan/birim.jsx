import { AğBilgileri, ağResmi } from "../ağlar/birim";
import Css from "./birim.css";
import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";
import { I18nString } from "/lib/util/i18n";

/** @const {!HTMLButtonElement} */
export const AdresButonu = dom.button("cua");
/** @const {!HTMLSpanElement} */
export const AdresMetni = dom.span("cuad");
/** @const {!HTMLButtonElement} */
export const AğButonu = dom.button("cuc");
/** @const {!HTMLSpanElement} */
export const DebankLinki = dom.span("cude");
/** @const {!HTMLDivElement} */
export const Menü = dom.div("cub");

/**
 * @param {string} ad
 * @return {string} url
 */
const bağlantıResmi = (ad) => `/birim/cüzdan/img/${ad.split(" ")[0].toLowerCase()}.svg`;

/**
 * @param {!Object<string, string>} props
 * @return {string}
 */
const Bağlantı = ({ idx, name }) => (
  <li id={"cu" + idx}>
    <img src={bağlantıResmi(name)} width={32} height={32} />
    <div class="cust"></div> {name}<span class="cui" style="display:none" data-en="GET">İNDİR</span>
  </li>
);

/**
 * @param {{
 *   DefaultChain: ChainId,
 *   Chains: !Array<ChainId>,
 *   ChainNotes: !Object<ChainId, I18nString>,
 *   piggyback: string
 * }} props
 * @return {string}
 */
const Cüzdan = ({ DefaultChain, Chains, ChainNotes, piggyback }) => (
  <div id="cu" data-piggyback={piggyback}>
    <Css />
    <AğButonu><img src={ağResmi(DefaultChain)} height={32} width={32} /></AğButonu>
    <AdresButonu data-en="Connect wallet">Cüzdan bağla</AdresButonu>
    <Menü style="display:none" tabindex="0">
      <ul id="cud">
        {Chains.map((id) => (
          <li id={`cud${id}`} class={id == DefaultChain ? "sel" : ""}>
            {id == DefaultChain ? <span></span> : <img src={ağResmi(id)} width={32} height={32} />}
            {" "}
            {ChainNotes[id]
              ? <div>{AğBilgileri[id].ad}<div class="cuo">{ChainNotes[id]}</div></div>
              : AğBilgileri[id].ad}
          </li>
        ))}
      </ul>
      <ul id="cuf0x" class="cuf">
        <Bağlantı idx="ra" name="Rabby Wallet" />
        <Bağlantı idx="co" name="Core" />
        <Bağlantı idx="mm" name="Metamask" />
      </ul>
      <ul id="cufmi" class="cuf" style="display:none">
        <Bağlantı idx="au" name="Auro" />
      </ul>
      <ul id="cue" style="display:none">
        <div id="cueh">
          <img id="cutc" height={80} width={80} src="/birim/cüzdan/img/qmark.svg" />
          <div>
            <div id="cuad"><span>0xcCc...cCc</span><span id="cuadi"><img src="/birim/paste.svg" data-inline /></span></div>
            <DebankLinki>DeBank</DebankLinki> <span id="cuex">Explorer</span>
            <div id="cuin" date-en="MINT KPASS">KPASS AL</div>
          </div>
        </div>
        <hr />
        <li><img src="/birim/cüzdan/img/ambassador.svg" data-inline /><span data-phantom
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

export default Cüzdan;
