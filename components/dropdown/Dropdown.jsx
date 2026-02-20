import Css from "./Dropdown.css";
import SharedCss from "/components/shared/SharedCss";
import dom from "/lib/util/dom";
import { Localizable } from "/lib/util/i18n";

/**
 * Generic dropdown: trigger button + panel. Content is supplied as children.
 * @param {{
 *   id: string,
 *   label$: Localizable,
 *   children?: Element[]
 * }} props
 */
const Dropdown = ({ id, label$, children }) => {
  /** @const {HTMLAnchorElement} */
  const Trigger = dom.a(id + ".");
  /** @const {HTMLDivElement} */
  const Panel = dom.div(id + ".p");

  return (
    <div id={id}>
      <Trigger
        controlsDropdown={Panel}
        class={SharedCss.Header.Link}
        href="javascript:;"
      >{label$}</Trigger>
      <Panel class={Css.Panel} nodisplay>{children}</Panel>
    </div>
  )
};

export default Dropdown;
