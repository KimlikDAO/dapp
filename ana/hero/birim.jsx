import Sergi from "./sergi/birim";
import Telefon from "/birim/telefon/birim.jsx";

const Hero = () => (
  <div id="he">
    <link rel="stylesheet" href="/ana/hero/birim.css" />
    <div id="het">
      <div id="hes">
        <h1 data-en="KPass: Your ID token for web3">KPass: Blokzincirdeki kimlik kartın</h1>
        <Sergi />
        <div id="heb">
          <a en:href="/mint" href="/al" id="hel" class="act btn" data-en="Mint your KPass | $1">Hemen KPass
            al | ₺29</a>
          {/* <a href="//docs.kimlikdao.org/v/turkce" data-en-href="//docs.kimlikdao.org" class="btn"
            data-en="Learn more">Daha fazla bilgi</a> */}
        </div>
      </div>
      <Telefon kpass={true} />
    </div>
  </div>
);

export default Hero;
