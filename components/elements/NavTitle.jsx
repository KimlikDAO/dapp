import Paths from "/components/icons/paths";
import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";
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
 *   title$: (I18nString | undefined),
 *   backFn: function():void
 * }} props 
 */
const NavTitle = ({ id, title$, backFn }) => {
  const Root = dom.div(id);
  return (
    <Root class={Css.NavTitle}>
      <Css />
      <button class={Css.Button} onClick={backFn}>
        <svg viewBox="0 0 24 24" width={18} height={18}>
          <path d={Paths.Chevron} fill="#5256c9" transform="scale(-1,1) translate(-8,0)" />
        </svg>
      </button>
      <h3 class={Css.Title}>
        {title$}
      </h3>
      <button class={Css.Button} onClick={backFn}>
        <svg viewBox="0 0 24 24" width={18} height={18}>
          <path d={Paths.X} />
        </svg>
      </button>
    </Root>
  );
}

export default NavTitle;
