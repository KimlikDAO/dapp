import Css from "./Dropdown.css";
import Paths from "/components/icons/paths";
import SharedCss from "/components/shared/SharedCss";
import dom from "../../lib/kastro/dom";
import { Localizable } from "../../lib/util/i18n";

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
      >{label$}<svg class={Css.Chevron} width={12} height={12}
        viewBox="0 0 24 24" fill="none" stroke="#999"
        stroke-width={2} stroke-linecap="round"
        stroke-linejoin="round"><path d={Paths.ChevronDown} /></svg></Trigger>
      <Panel class={Css.Panel} nodisplay>{children}</Panel>
    </div>
  )
};

export default Dropdown;
