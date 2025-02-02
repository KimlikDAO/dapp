import Gallery from "./Gallery";
import Css from "./Hero.css";
import SharedCss from "/components/ortakcss/birim.css";
import Phone from "/components/phone/Phone";
import { Page } from "/crate";
import { css } from "/lib/kastro/stylesheet";

/** @enum {string} */
const JointCss = css`
  @media (max-width: 1000px) {
    #Hero { border-radius: 0; }
    #${Phone.Css.Phone} { display: none; }
  }
`;

const Hero = () => (
  <div id={Css.Hero}>
    <Css />
    <JointCss />
    <div id={Css.Content}>
      <div id={Css.Left}>
        <h1>{{
          en: "KPass: Your ID token for web3",
          tr: "KPass: Blokzincirdeki kimlik kartın"
        }}</h1>
        <Gallery />
        <div id={Css.Buttons}>
          <a href={Page.Mint} id={Css.MintButton} class={[SharedCss.Düğme, SharedCss.Eylem]}>{{
            tr: "Hemen KPass al | ₺29",
            en: "Mint your KPass | $1"
          }}</a>
        </div>
      </div>
      <Phone withKPass />
    </div>
  </div>
);

export default Hero;
