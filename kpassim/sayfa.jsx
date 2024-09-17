import Başlık from "/birim/başlık/birim";
import Favicon from "/birim/icon.svg";
import Css from "./sayfa.css";
import KPass from "/birim/kpass/birim.jsx";
import dom from "/lib/util/dom";
import Lato400 from "/birim/lato/l400.ttf";
import Lato700 from "/birim/lato/l700.ttf";

/** @const {!HTMLAnchorElement} */
const DiscordDüğmesi = dom.a("inbtn0");
/** @const {!HTMLAnchorElement} */
const İmeceİptalDüğmesi = dom.a("inbtn1");
/** @const {!HTMLAnchorElement} */
const EşikAzaltDüğmesi = dom.a("inbtn2");
/** @const {!HTMLAnchorElement} */
const SilDüğmesi = dom.a("inbtn3");
/** @const {!HTMLDivElement} */
const AçDüğmesi = dom.div("intcktb");
/** @const {!HTMLDivElement} */
const KPassYok = dom.div("inn");

const KPassim = () =>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title data-en="KimlikDAO | My KPass">KimlikDAO | KPass’im</title>
      <Lato400 shared />
      <Lato700 shared />
      <birim:ortakcss />
      <Favicon raster={32} rel="icon" />
      <Css />
      <script type="module" src="/kpassim/sayfa.js" data-inherit="Chains,DefaultChain"></script>
    </head>
    <body>
      <Başlık />
      <div id="in">
        <div id="intckt">
          <KPassYok>
            <span style="display:none">{{
              en: "The connected wallet does not have a KPass on this chain.",
              tr: "Bağlıcüzdanda bu ağda KPass yok."
            }}<br /><br />
              <a href="/al" class="inl" data-en="Click here to get one.">Almak için tıklayın.</a>
            </span>
          </KPassYok>
          <KPass style="display:none" />
          <AçDüğmesi data-en="Unlock" style="display:none">Aç</AçDüğmesi>
        </div>
        <div id="inbtn">
          <DiscordDüğmesi href="javascript:" class="info btn" data-en="Claim Discord role">Discord rolü al</DiscordDüğmesi>
          <İmeceİptalDüğmesi href="javascript:" class="more btn" data-en="Add social revoker">İmece iptal adresi ekle</İmeceİptalDüğmesi>
          <EşikAzaltDüğmesi href="javascript:" class="more btn" data-en="Decrease revoke threshold">Eşik azalt</EşikAzaltDüğmesi>
          <SilDüğmesi href=" javascript:" id="inbtn3" class="danger btn" data-en="Revoke KPass">KPass iptal et</SilDüğmesi>
        </div>
      </div>
      <altbirim:pencere />
    </body>
  </html>


export default KPassim;
