import Css from "./birim.css";
import BaşlıkCss from "/birim/başlık/birim.css";

/**
 * @param {{ ad: string }=} props
 * @return {Promise<string>}
 */
const Yazar = ({ ad }) => (
  <div class={Css.Yazar}>
    <svg width={20} height={20}>
      <circle cx={10} cy={10} r={10} fill="none" stroke="#ddd" stroke-width={0.5} />
      <use href={`#${BaşlıkCss.Logomark}`} width={16} height={16} x={3.5} y={2} />
    </svg>
    <b class={Css.YazarAdı}>{ad}</b>
  </div>
);

export default Yazar;
