import Css from "./birim.css";
import Sergi from "./sergi/birim";
import Telefon from "/birim/telefon/birim.jsx";
import { Page } from "/crate";

const Hero = () => (
  <div id="he">
    <Css />
    <div id="het">
      <div id="hes">
        <h1 data-en="KPass: Your ID token for web3">KPass: Blokzincirdeki kimlik kartın</h1>
        <Sergi />
        <div id="heb">
          <a href={Page.Al} id="hel" class="act btn">{{
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
