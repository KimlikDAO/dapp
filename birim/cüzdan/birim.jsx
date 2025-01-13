import { AğBilgileri, ağResmi } from "../ağlar/birim";
import Css from "./birim.css";
import QmarkResmi from "/birim/cüzdan/img/qmark.svg";
import KopyalaResmi from "/birim/paste.svg";
import { ChainId } from "/lib/crosschain/chains";
import { Image } from "/lib/kastro/image";
import dom from "/lib/util/dom";
import { I18nString } from "/lib/util/i18n";

/** @const {!HTMLButtonElement} */
export const AdresDüğmesi = dom.button(Css.AdresDüğmesi);
/** @const {!HTMLButtonElement} */
export const AğDüğmesi = dom.button(Css.AğDüğmesi);
/** @const {!HTMLDivElement} */
export const CüzdanAdresi = dom.div(Css.CüzdanAdresi);
/** @const {!HTMLSpanElement} */
export const DebankLinki = dom.span(Css.DebankLinki);
/** @const {!HTMLDivElement} */
export const Menü = dom.div(Css.Menü);
/** @const {!HTMLUListElement} */
export const SağPanel = dom.ul(Css.SağPanel);

/**
 * @param {string} ad
 * @return {string} url
 */
const bağlantıResmi = (ad) => `birim/cüzdan/img/${ad.split(" ")[0].toLowerCase()}.svg`;

/**
 * @param {!Object<string, string>} props
 * @return {string}
 */
const Bağlantı = ({ idx, name }) => (
  <li id={Css.Kök + idx}>
    <Image src={bağlantıResmi(name)} width={32} height={32} />
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
const Cüzdan = ({ DefaultChain, Chains, ChainNotes, children, piggyback }) => (
  <div id={Css.Kök}>
    <Css />
    <AğDüğmesi><Image src={ağResmi(DefaultChain)} height={32} width={32} inline /></AğDüğmesi>
    <AdresDüğmesi>{{ tr: "Cüzdan bağla", en: "Connect wallet" }}</AdresDüğmesi>
    <Menü style="display:none">
      <ul id={Css.AğListesi}>
        {Chains.map((id) => (
          <li id={Css.AğListesi + id} class={id == DefaultChain ? "sel" : ""}>
            {id == DefaultChain ? <span></span> : <Image src={ağResmi(id)} width={32} height={32} bundleWidth={40} bundleHeight={40} />}
            {" "}
            {ChainNotes[id]
              ? <div>{AğBilgileri[id].ad}<div class={Css.AğNotu}>{ChainNotes[id]}</div></div>
              : AğBilgileri[id].ad}
          </li>
        ))}
      </ul>
      <ul id="cuf0x" class={Css.BağlantıListesi}>
        <Bağlantı idx="ra" name="Rabby Wallet" />
        <Bağlantı idx="co" name="Core" />
        <Bağlantı idx="mm" name="Metamask" />
      </ul>
      <ul id="cufmi" class={Css.BağlantıListesi} style="display:none">
        <Bağlantı idx="au" name="Auro" />
      </ul>
      <SağPanel style="display:none">
        <div id={Css.Profil}>
          <QmarkResmi id={Css.ProfilResmi} height={80} width={80} />
          <div>
            <CüzdanAdresi><span>0xcCc...cCc</span><span id="cuadi"><KopyalaResmi inline /></span></CüzdanAdresi>
            <DebankLinki>DeBank</DebankLinki> <span id={Css.ExplorerLinki}>Explorer</span>
            <div id={Css.KPassDüğmesi}>{{ en: "MINT KPASS", tr: "KPASS AL" }}</div>
          </div>
        </div>
        <hr />
        {children}
      </SağPanel>
    </Menü>
  </div>
);

export default Cüzdan;
