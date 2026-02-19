import Paths from "/components/icons/paths";
import dom from "/lib/util/dom";
import { css } from "/lib/kastro/stylesheet";

/** @enum {string} */
const Css = css`
  .CopyButton {
    cursor: pointer;
  }
`;

/**
 * @param {{
 *   id$: string,
 *   height$: number,
 *   width$: number
 * }} props
 */
const CopyButton = ({ id$, height$ = 24, width$ = 24 }) => (
  <svg id={id$}
    class={Css.CopyButton}
    width={width$}
    height={height$}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2">
    <g>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </g>
    <path d={Paths.Check} visibility="hidden" />
    <Css />
  </svg>
);

CopyButton.toggle = (button, isCopy) => {
  const [copy, check] = button.children;
  copy.setAttribute("visibility", isCopy ? "visible" : "hidden");
  check.setAttribute("visibility", isCopy ? "hidden" : "visible");
}

/**
 * @param {string} id
 * @param {string} text
 * @return {(e: Event | null) => void}
 */
CopyButton.setText = (id, text) => {
  const svg = dom.byId(id);
  return svg.onclick = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    CopyButton.toggle(svg, false);
    setTimeout(() => CopyButton.toggle(svg, true), 2000);
  }
}

export default CopyButton;
