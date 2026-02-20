import { css } from "/lib/kastro/stylesheet";
import { I18nString, Localizable } from "/lib/util/i18n";

/** @enum {string} */
const Css = css`
  .FatListItem {
    color: inherit;
    display: block;
    margin: 1px;
    padding: 12px 16px;
    border-radius: 8px;
    text-decoration: none;
  }

  .FatListItem:hover {
    background-color: #f2f2f2;
  }

  .FatListItemTitle {
    display: block;
    font-weight: 700;
    padding: 2px 8px;
  }

  .FatListItemDesc {
    color: #666;
    display: block;
    font-size: 10pt;
    font-weight: 400;
    line-height: 1.6;
    margin-top: 4px;
    min-height: 32px;
    padding: 2px 8px;
  }
`;

/**
 * @param {{
 *   href$: Localizable,
 *   title$: Localizable,
 *   desc$: I18nString
 * }} props
 */
const FatListItem = ({ href$, title$, desc$ }) => (
  <a href={href$} class={Css.FatListItem}>
    <span class={Css.FatListItemTitle}>{title$}</span>
    <span class={Css.FatListItemDesc}>{desc$}</span>
  </a>
);

export { FatListItem };
