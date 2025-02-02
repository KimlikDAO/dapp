import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";

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
 *   className: (string|undefined),
 *   children: (!Array<!Promise<string>>|undefined),
 *   maximum: (number|undefined),
 *   ticker: (string|undefined)
 * }} props
 * @return {Promise<string>}
 */
const RemainingBar = ({ id, className, children, maximum, ticker }) => (
  <div id={id} class={[Css.Container, className]}>
    <Css />
    <div class={[Css.Bar, className]} style={`width:${Width}px`}></div>
    <div class={Css.Text}>
      {children}{" "}
      <span>{dom.paradanMetne(maximum)}</span>{" / "}{dom.paradanMetne(maximum)}
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
  /** @const {!HTMLDivElement} */
  const root = dom.div(id);
  /** @const {number} */
  const remainingWidth = remaining * Width / maximum;
  root.firstElementChild.style.width = remainingWidth + "px";
  root.lastElementChild
    .lastElementChild
    .innerText = dom.paradanMetne(remaining);
}

RemainingBar.Css = Css;

export default RemainingBar;
