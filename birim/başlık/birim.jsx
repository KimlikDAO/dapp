import Css from "./birim.css";
import Cüzdan from "/birim/cüzdan/birim";
import SağMenü from "/birim/cüzdan/sağMenü";
import Dil from "/birim/dil/birim";
import Logo from "/birim/logo.svg";
import { ChainId } from "/lib/crosschain/chains";
import { I18nString } from "/lib/util/i18n";

/**
 * @param {{
 *   Chains: !Array<ChainId>,
 *   DefaultChain: ChainId,
 *   ChainNotes: !Object<ChainId, I18nString>,
 *   href: string,
 *   title: string,
 *   piggyback: (string|undefined)
 * }=} props
 * @return {Promise<string>}
 */
const Başlık = ({
  Chains,
  DefaultChain,
  ChainNotes,
  href = "/",
  title = "KimlikDAO",
  piggyback
}) => (
  <div id={Css.Kök}>
    <Css />
    <a href={href} id={Css.Logo}>
      <Logo id={Css.Logomark} inline />{title}
    </a>
    <div id={Css.Linkler}>
      <Dil piggyback={piggyback} />
      <Cüzdan Chains={Chains} DefaultChain={DefaultChain} ChainNotes={ChainNotes} piggyback={piggyback}>
        <SağMenü />
      </Cüzdan>
    </div>
  </div>
);

export { Cüzdan, Dil };

export default Başlık;
