import HeaderCss from "/components/header/Header.css";
import { css } from "/lib/kastro/stylesheet";
import { I18nString } from "/lib/util/i18n";

const Css = css`
  .Author {
    display: flex;
    align-items: center;
    margin: 10px 18px 20px;
    color: #666;
  }
  .AuthorName {
    margin-left: 5px;
  }
`;

/**
 * @param {{ name: (string | I18nString) }} props
 */
const Author = ({ name }) => (
  <div class={Css.Author}>
    <Css />
    <svg width={20} height={20}>
      <circle cx={10} cy={10} r={9.1} fill="none" stroke="#ddd" stroke-width={0.9} />
      <use href={`#${HeaderCss.Logomark}`} width={16} height={16} x={3.5} y={2} />
    </svg>
    <b class={Css.AuthorName}>{name}</b>
  </div>
);

export default Author;
