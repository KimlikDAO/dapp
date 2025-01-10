import OkResmi from "../ok.svg";
import AnaCss from "../sayfa.css";
import Css from "./birim.css";
import { ağResmi } from "/birim/ağlar/birim";
import OrtakCss from "/birim/ortakcss/birim.jsx";
import { Page } from "/crate";
import { ChainId } from "/lib/crosschain/chains";
import { Image } from "/lib/kastro/image";

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
  <div class={[Css.Balon, chainId == ChainId.MinaMainnet ? "mina" : chainId.slice(1)]}>
    <Image src={ağResmi(chainId)} height={40} width={40} bundleHeight={40} bundleWidth={40} />
    <div>
      <div class={Css.BalonSayı}>{Tablo[chainId].holders}</div>
      <span class={Css.BalonAd} data-en={`HOLDERS ON ${Tablo[chainId].ad}`}>{
        Tablo[chainId].ad + Tablo[chainId].ek} KPASS</span>
    </div>
  </div>
);

const Sahipler = () => (
  <div id={Css.Kök}>
    <Css />
    <div id={Css.İçerik}>
      <div class={AnaCss.SağaYaslı}>
        <h2>{{
          tr: <>Ağlara göre<br />KPass sahipleri.</>,
          en: <>KPass holders<br />by chain.</>
        }}</h2>
        <span class={[Css.Metin, "anac"]}>{{
          en: `Join over ${Object.values(Tablo).reduce((sum, x) => sum + x.holders, 0)} KPass holders across 6 different chains.`,
          tr: `6 farklı zincirde ${Object.values(Tablo).reduce((sum, x) => sum + x.holders, 0)} KPass sahibi arasına katılın.`
        }}</span>
        <div id={Css.Eylem}>
          <a href={Page.Al} id={Css.EylemDüğmesi} class={[OrtakCss.Düğme, "act"]}>{{
            en: "Become a KPass holder",
            tr: "Sen de KPass sahibi ol"
          }} <OkResmi inline /></a>
        </div>
      </div>
      <div id={Css.Balonlar}>{Object.keys(Tablo).map((chainId) => <Balon chainId={chainId} />)}</div>
    </div>
  </div>
);

export default Sahipler;
