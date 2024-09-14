import Css from "./birim.css";
import Cüzdan from "/birim/cüzdan/birim.jsx";
import Dil from "/birim/dil/birim.jsx";
import Logo from "/birim/logo.svg";

/**
 * @param {{
 *   href: string,
 *   title: string,
 *   piggyback: (string|undefined)
 * }} props
 * @return {string}
 */
const Başlık = ({ href, title = "KimlikDAO", piggyback }) => (
  <div id="ba">
    <Css shared />
    <a href={href} id="bag"><Logo id="bak" inline />{title}</a>
    <div id="baf">
      <Dil piggyback={piggyback} />
      <Cüzdan piggyback={piggyback} />
    </div>
  </div>
);

export default Başlık;
