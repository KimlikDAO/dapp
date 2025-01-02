import Css from "./birim.css";
import Sergi from "./sergi/birim";
import OrtakCss from "/birim/ortakcss/birim.css";
import Telefon from "/birim/telefon/birim.jsx";
import { Page } from "/crate";

const Hero = () => (
  <div id={Css.Kök}>
    <Css />
    <div id={Css.İçerik}>
      <div id={Css.Sol}>
        <h1>{{
          en: "KPass: Your ID token for web3",
          tr: "KPass: Blokzincirdeki kimlik kartın"
        }}</h1>
        <Sergi />
        <div id={Css.Düğmeler}>
          <a href={Page.Al} id={Css.AlDüğmesi} class={[OrtakCss.Düğme, "act"]}>{{
            tr: "Hemen KPass al | ₺29",
            en: "Mint your KPass | $1"
          }}</a>
        </div>
      </div>
      <Telefon kpass={true} />
    </div>
  </div>
);

export default Hero;
