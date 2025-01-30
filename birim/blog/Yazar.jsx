import BaşlıkCss from "/birim/başlık/birim.css";
import { css } from "/lib/kastro/stylesheet";

const Css = css`
  .Yazar {
    display: flex;
    align-items: center;
    margin: 10px 18px 20px;
    color: #666;
  }
  .YazarAdı {
    margin-left: 5px;
  }
`;

/**
 * @param {{ ad: string }=} props
 * @return {Promise<string>}
 */
const Yazar = ({ ad }) => (
  <div class={Css.Yazar}>
    <Css />
    <svg width={20} height={20}>
      <circle cx={10} cy={10} r={9.1} fill="none" stroke="#ddd" stroke-width={0.9} />
      <use href={`#${BaşlıkCss.Logomark}`} width={16} height={16} x={3.5} y={2} />
    </svg>
    <b class={Css.YazarAdı}>{ad}</b>
  </div>
);

export default Yazar;
