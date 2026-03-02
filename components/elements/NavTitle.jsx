import Paths from "/components/icons/paths";
import { css } from "/lib/kastro/StyleSheet";
import dom from "/lib/kastro/dom";
import { I18nString } from "/lib/util/i18n";

/** @enum {string} */
const Css = css`
  .NavTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px 0;
    background: #fff;
  }

  .Title {
    flex: 1;
    text-align: center;
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }

  .Button {
    padding: 8px 0;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }

  .Button:hover {
    color: #333;
  }
`;

/**
 * @param {{
 *   id: string,
 *   title$: I18nString,
 *   backFn: () => void
 * }} props 
 */
const NavTitle = ({ id, title$, backFn }) => {
  const Root = dom.div(id);
  return (
    <Root class={Css.NavTitle}>
      <button class={Css.Button} onClick={backFn}>
        <svg height={24} width={24}>
          <path d={Paths.ChevronLeft} stroke="#5256c9" fill="none" stroke-width="2" />
        </svg>
      </button>
      <h3 class={Css.Title}>
        {title$}
      </h3>
      <button class={Css.Button} onClick={backFn}>
        <svg width={24} height={24}>
          <path d={Paths.X} stroke="#666" stroke-width="2" />
        </svg>
      </button>
    </Root>
  );
}

export default NavTitle;
