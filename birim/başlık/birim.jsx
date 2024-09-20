import Css from "./birim.css";
import Cüzdan from "/birim/cüzdan/birim.jsx";
import Dil from "/birim/dil/birim.jsx";
import Logo from "/birim/logo.svg";

/**
 * @param {{
 *   Chains: !Array<ChainId>,
 *   DefaultChain: ChainId,
 *   ChainNotes: !Object<ChainId, I18nString>,
 *   href: string,
 *   title: string,
 *   piggyback: (string|undefined)
 * }} props
 * @return {string}
 */
const Başlık = ({ Chains, DefaultChain, ChainNotes, href = "/", title = "KimlikDAO", piggyback }) => (
  <div id="ba">
    <Css />
    <a href={href} id="bag"><Logo id="bak" inline />{title}</a>
    <div id="baf">
      <Dil piggyback={piggyback} />
      <Cüzdan Chains={Chains} DefaultChain={DefaultChain} ChainNotes={ChainNotes} piggyback={piggyback} />
    </div>
  </div>
);

export default Başlık;
