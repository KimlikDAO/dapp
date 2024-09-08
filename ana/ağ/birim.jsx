
const Node = (props) => (
  <div class={`agi ag${props.idx}`}>
    <div class={`agp ag${props.idx}n`}></div>{props.addr}
  </div>
);

/** @const {!Array<!Array<string>>} */
const NODES = [
  ["0x299A3490c8De309D855221468167aAD6C44c59E0", "node.kimlikdao.org", "9266ec", "4A00E0"],
  ["0x86f6B34A26705E6a22B8e2EC5ED0cC5aB3f6F828", "yenibank.org", "83b4e2", "3182CE", "üst"],
  ["0x77c60E68158De0bC70260DFd1201be9445EfFc07", "sstg.io", "edc7c7", "E5AFAF"],
  ["0xE3581636Df37f1eBfFbdFE22F8719F57c555d4f7", "yenilira.org", "#bbe7d5", "9EDDC3", "üst"],
  ["0xc855dB548A6feB1f34AcAE6531c84261008ea55A", "kopru3.com", "#b06ceb", "8E2DE2"],
  ["0x4F1DBED3c377646c89B4F8864E0b41806f2B79fd", "dobbyinu.com", "#fe94f4", "FE66EF"],
  ["0x384bF113dcdF3e7084C1AE2Bb97918c3Bf15A6d2", "lstcm.co", "666", "111"],
];

/**
 * @param {string} renk
 * @return {string} Başında # bulunan renk.
 */
const h = (renk) => (renk.startsWith("#") ? renk : "#" + renk).toUpperCase();

/**
 * @param {{
 *   width: number
 * }} props
 * @return {string}
 */
const Grafik = ({ width }) => {
  /** @const {number} */
  const n = NODES.length;
  const cx = width / 2;
  const cy = cx;
  const r = cx - 80;

  return (
    <svg id="agn" width="100%" viewBox={`0 0 ${width} 430`}>
      <defs>
        <path id="ag6"
          d="M3.33 47.5C0.65 42.859 0.65 37.141 3.33 32.5L17.17 8.53C19.85 3.89 24.8 1 30.16 1.03H57.84C63.2 1 68.15 3.89 70.83 8.53L84.67 32.5C87.35 37.141 87.3494 42.859 84.67 47.5L70.83 71.47C68.15 76.11 63.2 78.97 57.84 78.97H30.16C24.8 78.97 19.85 76.11 17.17 71.47L3.33 47.5Z"
          stroke-width={2} shape-rendering="geometricPrecision" />
      </defs>
      <text class="agsvgt" x={cx} y={cy - 30} data-en="The KimlikDAO">KimlikDAO</text>
      <text class="agsvgt" x={cx} y={cy + 7} data-en="Network">Ağı</text>
      {Array.from({ length: n }).map((_, i) => {
        const x = Math.round(cx + r * Math.sin((Math.PI * 2 * i) / n));
        const y = Math.round(cy - r * Math.cos((Math.PI * 2 * i) / n));
        return (<>
          <use href="#ag6" x={x - 45} y={y - 75} fill={h(NODES[i][2])} stroke={h(NODES[i][3])} />
          <text x={x} y={y - 30} text-anchor="middle" fill="#fff">{NODES[i][0].slice(0, 8)}</text>
          <text x={x} y={y + 23} text-anchor="middle" fill="#444">{NODES[i][1]}</text>
        </>);
      })}
    </svg>
  );
}

const Ağ = () => (
  <div id="ag" class="an3">
    <div id="agy">
      <h2 class="oblu" data-en="Verified and signed by 7+ independent nodes.">7 bağımsız onay ve imza.</h2>
      <div class="anac"
        data-en="The contents of each KPass are verified and digitally signed by at least seven independent nodes in the KimlikDAO network, all while fully preserving your privacy.">
        KPass’ler birbirinden bağımsız en az 7 KimlikDAO ağı düğümünün onay ve dijital imzası ile üretilebilir.
        Onay aşamasında veri gizliliğiniz tamamıyla korunur.
      </div>
      <a href="//github.com/KimlikDAO/kimlikdao-node" target="_blank" rel="noreferrer" class="info btn anust"><span
        data-phantom data-en="Learn about KimlikDAO nodes">KimlikDAO düğümü detayları</span>
      </a>
    </div>
    <div id="agt">
      <div id="agtc">
        <div class="tcip">
          <div class="tcl" data-en="City of birth">Doğum yeri</div>
          <div data-en="Istanbul">İstanbul</div>
          <div class="tcl" data-en="Gender">Cinsiyet</div>
          <div data-en="F">K</div>
        </div>
        <svg id="tclo" height={24} width={24}>
          <use href="#bak" width={24} height={24} />
        </svg>
        <a href="javascript:" class="tcd tcso"></a>
        <a href="javascript:" class="tcd tcsa"></a>
      </div>
      <Node idx="kd" addr="0x9c342cd5...0c706978" />
      <Node idx="yb" addr="0xbf0896da...e541dfca" />
      <Node idx="ss" addr="0x53fdd7a3...8b9b67e4" />
      <Node idx="dp" addr="0x754523c5...c7b6eafb" />
      <Node idx="do" addr="0x8f43e70c...4b43f25d" />
      <Node idx="k3" addr="0xb82cd972...f543e33e" />
      <Node idx="ls" addr="0x3cded416...615afd40" />
    </div>
    <Grafik width={500} />
  </div >
);

export default Ağ;
