import AnaCss from "../sayfa.css";
import Css from "./birim.css";
import KpassCss from "/birim/kpass/birim.css";
import OrtakCss from "/birim/ortakcss/birim.css";
import { keccak256 } from "/lib/crypto/sha3";

/**
 * @param {{
 *   idx: string,
 * }=} props
 * @return {Promise<string>}
 */
const Node = ({ idx }) => (
  <div class={[Css.Düğümİmza, `ag${idx}`]}>
    <div class={[Css.DüğümNokta, `ag${idx}n`]}></div>{
      `0x${keccak256(idx).slice(0, 8)}...${keccak256(idx).slice(8, 16)}`
    }
  </div>
);

/** @const {!Object<string, !Array<string>>} */
const NODES = {
  kd: ["0x299A3490c8De309D855221468167aAD6C44c59E0", "node.kimlikdao.org", "9266ec", "4A00E0"],
  yb: ["0x86f6B34A26705E6a22B8e2EC5ED0cC5aB3f6F828", "yenibank.org", "83b4e2", "3182CE", "üst"],
  td: ["0x77c60E68158De0bC70260DFd1201be9445EfFc07", "timedogankoy.com", "edc7c7", "E5AFAF"],
  yl: ["0xE3581636Df37f1eBfFbdFE22F8719F57c555d4f7", "yenilira.org", "#bbe7d5", "9EDDC3", "üst"],
  di: ["0x4F1DBED3c377646c89B4F8864E0b41806f2B79fd", "dobbyinu.com", "#fe94f4", "FE66EF"],
  k3: ["0xc855dB548A6feB1f34AcAE6531c84261008ea55A", "kopru.xyz", "#b06ceb", "8E2DE2"],
  ls: ["0x384bF113dcdF3e7084C1AE2Bb97918c3Bf15A6d2", "lstcm.co", "666", "111"],
};

/**
 * @param {string} renk
 * @return {string} Başında # bulunan renk.
 */
const h = (renk) => (renk.startsWith("#") ? renk : "#" + renk).toUpperCase();

/**
 * @param {{ width: number }=} props
 * @return {Promise<string>}
 */
const Grafik = ({ width }) => {
  const keys = Object.keys(NODES);
  /** @const {number} */
  const n = keys.length;
  const cx = width / 2;
  const cy = cx;
  const r = cx - 80;

  return (
    <svg id={Css.Grafik} width="100%" viewBox={`0 0 ${width} 430`}>
      <defs>
        <path id={Css.Altıgen}
          d="M3.33 47.5C0.65 42.859 0.65 37.141 3.33 32.5L17.17 8.53C19.85 3.89 24.8 1 30.16 1.03H57.84C63.2 1 68.15 3.89 70.83 8.53L84.67 32.5C87.35 37.141 87.3494 42.859 84.67 47.5L70.83 71.47C68.15 76.11 63.2 78.97 57.84 78.97H30.16C24.8 78.97 19.85 76.11 17.17 71.47L3.33 47.5Z"
          stroke-width={2} shape-rendering="geometricPrecision" />
      </defs>
      <text class={Css.AğSvgText} x={cx} y={cy - 30}>{{ en: "The KimlikDAO", tr: "KimlikDAO" }}</text>
      <text class={Css.AğSvgText} x={cx} y={cy + 7}>{{ en: "Network", tr: "Ağı" }}</text>
      {keys.map((key, i) => {
        const x = Math.round(cx + r * Math.sin((Math.PI * 2 * i) / n));
        const y = Math.round(cy - r * Math.cos((Math.PI * 2 * i) / n));
        return (<>
          <use href={`#${Css.Altıgen}`} x={x - 45} y={y - 75} fill={h(NODES[key][2])} stroke={h(NODES[key][3])} />
          <text x={x} y={y - 30} text-anchor="middle" fill="#fff">{NODES[key][0].slice(0, 8)}</text>
          <text x={x} y={y + 23} text-anchor="middle" fill="#444">{NODES[key][1]}</text>
        </>);
      })}
    </svg>
  );
}

const Ağ = () => (
  <div id={Css.Kök} class={AnaCss.Üçlü}>
    <Css />
    <div id={Css.YazıSütunu}>
      <h2 class={OrtakCss.Mavi}>{{
        en: "Verified and signed by 7+ independent nodes.",
        tr: "7 bağımsız onay ve imza."
      }}</h2>
      <div class={AnaCss.Açıklama}>{{
        en: "The contents of each KPass are verified and digitally signed by at least seven independent nodes in the KimlikDAO network, all while fully preserving your privacy.",
        tr: "KPass’ler birbirinden bağımsız en az 7 KimlikDAO ağı düğümünün onay ve dijital imzası ile üretilebilir. Onay aşamasında veri gizliliğiniz tamamıyla korunur."
      }}</div>
      <a href={ExternalPage.GitHub + "/kimlikdao-node"} target="_blank" rel="noreferrer" class={[OrtakCss.Düğme, OrtakCss.Info, "anust"]}>{{
        en: "Learn about KimlikDAO nodes",
        tr: "KimlikDAO düğümü detayları"
      }}</a>
    </div>
    <div id={Css.OrtaSütun}>
      <div id={Css.KPass}>
        <div class={KpassCss.BilgiKartıİçi}>
          <div class={KpassCss.Ad}>{{ tr: "Doğum yeri", en: "City of birth" }}</div>
          <div>{{ tr: "İstanbul", en: "Palo Alto, CA" }}</div>
          <div class={KpassCss.Ad}>{{ tr: "Cinsiyet", en: "Gender" }}</div>
          <div>{{ tr: "K", en: "F" }}</div>
        </div>
        <svg height={24} width={24}>
          <use href={"#" + OrtakCss.Başlık.Logomark} width={24} height={24} />
        </svg>
        <a href="javascript:" class={[KpassCss.Düğme, KpassCss.SolDüğme]}></a>
        <a href="javascript:" class={[KpassCss.Düğme, KpassCss.SağDüğme]}></a>
      </div>
      {Object.keys(NODES).map((key) => <Node idx={key} />)}
    </div>
    <Grafik width={500} />
  </div>
);

export default Ağ;
