import Cüzdan from "./birim";
import CüzdanCss from "./birim.css";
import AmbassadorResmi from "/components/cüzdan/img/ambassador.svg";
import DeğiştirResmi from "/components/cüzdan/img/external-link.svg";
import İptalResmi from "/components/cüzdan/img/iptal.svg";
import VoteResmi from "/components/cüzdan/img/vote.svg";
import dom from "/lib/util/dom";
import { css } from "/lib/kastro/stylesheet";

const Css = css`
  /** @export */
  #Kök {
    margin: 0;
    padding: 0;
  }
`;

/**
 * @return {Promise<string>} 
 */
const SağMenü = () => {
  /** @const {HTMLUListElement} */
  const Kök = dom.ul(Css.Kök);
  /** @const {!NodeList<!Element>} */
  const children = Kök.children;
  children[0].onclick = () => window.location.href = "//join.kimlikdao.org/#sa-ambassador1";
  children[1].onclick = () => window.location.href = "//kimlikdao.org/" + dom.i18n({ tr: "oyla", en: "vote" });
  children[2].onclick = () => window.location.href = "//kimlikdao.org/" + dom.i18n({ tr: "iptal", en: "revoke" });
  children[3].onclick = () => Cüzdan.kopar();

  return (
    <Kök style={CüzdanCss.MenüListsi}>
      <li><AmbassadorResmi inline />{{
        en: " Ambassador program",
        tr: " Ambassador ol"
      }}</li>
      <li><VoteResmi width={16} height={16} />{{
        en: " Vote",
        tr: " Oy kullan"
      }}</li>
      <li><İptalResmi inline />{{
        en: " Revoke KPass",
        tr: " İptal işlemleri"
      }}</li>
      <li><DeğiştirResmi inline />{{
        en: " Switch wallet",
        tr: " Cüzdan değiştir"
      }}</li>
    </Kök>
  );
}

export default SağMenü;
