import Gallery from "./Gallery";
import Css from "./Hero.css";
import Phone from "/components/phone/Phone";
import SharedCss from "/components/shared/SharedCss.css";
import { css } from "/lib/kastro/StyleSheet";
import { Page } from "/mpa";

/** @enum {string} */
const JointCss = css`
  @media (max-width: 1000px) {
    #Hero { border-radius: 0; }
    #${Phone.Css.Root} { display: none; }
  }
`;

const Hero = () => (
  <div id={Css.Hero}>
    <JointCss />
    <div id={Css.Content}>
      <div id={Css.Left}>
        <h1>{{
          en: "KPass: Your ID token for web3",
          tr: "KPass: Blokzincirdeki kimlik kartın"
        }}</h1>
        <Gallery />
        <div id={Css.Buttons}>
          <a href={Page.Mint} id={Css.MintButton} class={[SharedCss.Button, SharedCss.Action]}>{{
            en: "Mint your KPass | $1",
            tr: "Hemen KPass al | ₺29",
          }}</a>
        </div>
      </div>
      <Phone noshow={false} />
    </div>
  </div>
);

export default Hero;
