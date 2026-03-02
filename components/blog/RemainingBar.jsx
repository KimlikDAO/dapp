import { css } from "/lib/kastro/StyleSheet";
import dom from "/lib/kastro/dom";

/** @const {number} */
const Width = 180;
/** @enum {string} */
const Css = css`
  .Container {
    display: flex;
    align-items: center;
    justify-content: left;
    width: ${Width}px;
    height: 35px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }
  .Bar {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.5s;
    z-index: -1;
  }
  .Text {
    margin-left: 7px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 10pt;
    color: #555;
  }
`;

/**
 * @param {{
 *   id: string,
 *   className?: string,
 *   children?: Promise<string>[],
 *   maximum?: number,
 *   ticker?: string,
 * }} props
 */
const RemainingBar = ({ id, className, children, maximum, ticker }) => (
  <div class={[Css.Container, className]}>
    <div id={id} class={[Css.Bar, className]} style={`width:${Width}px`}></div>
    <div class={Css.Text}>
      {children}{" "}
      <span id={[id, "t"]}>{dom.renderCurrency(maximum)}</span>{" / "}{dom.renderCurrency(maximum)}
      {" " + ticker}
    </div>
  </div>
);

/**
 * Sets the remaining amount. The maximum needs to be provided as hint as the
 * component is stateless.
 *
 * @param {string} id
 * @param {number} remaining
 * @param {number} maximum
 */
RemainingBar.setRemaining = (id, remaining, maximum) => {
  /** @const {number} */
  const remainingWidth = remaining * Width / maximum;
  /** @const {HTMLDivElement} */
  const bar = dom.div(id);
  bar.style.width = remainingWidth + "px";
  /** @const {Text} */
  const text = /** @type {Text} */(dom.span(`${id}.t`).firstChild);
  text.data = dom.renderCurrency(remaining);
}

RemainingBar.Css = Css;

export default RemainingBar;
