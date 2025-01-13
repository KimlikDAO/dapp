import Css from "./birim.css";
import Cüzdan from "/birim/cüzdan/birim.jsx";
import SağMenü from "/birim/cüzdan/sağMenü.jsx";
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
  <div id={Css.Kök}>
    <Css />
    <a href={href} id={Css.Logo}><Logo id={Css.Logomark} inline />{title}</a>
    <div id={Css.Linkler}>
      <Dil piggyback={piggyback} />
      <Cüzdan Chains={Chains} DefaultChain={DefaultChain} ChainNotes={ChainNotes} piggyback={piggyback}>
        <SağMenü />
      </Cüzdan>
    </div>
  </div>
);

export default Başlık;
