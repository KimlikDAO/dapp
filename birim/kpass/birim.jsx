import Kapak from "kastro:./cover.svg.jsx";
import Css from "./birim.css";
import ContactInfoCard from "./ContactInfoCard";
import FamilyInfoCard from "./FamilyInfoCard";
import PersonInfoCard from "./PersonInfoCard";
import RegistryInfoCard from "./RegistryInfoCard";
import OrtakCss from "/birim/ortakcss/birim";
import "/lib/did/section.d";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
const Kartlar = dom.div(Css.Kartlar);
/** @const {!HTMLDivElement} */
const Kök = dom.div(Css.Kök);
/** @const {!HTMLAnchorElement} */
const SolDüğme = dom.a(Css.SolDüğme);
/** @const {!HTMLAnchorElement} */
const SağDüğme = dom.a(Css.SağDüğme);

/** @type {number} */
let Kart = 0;
/** @type {number} */
let KartSayısı = 3;

/**
 * @param {number} yeniKart
 */
const kartDeğiştir = (yeniKart) => {
  /** @const {number} */
  const width = Kartlar.children[0].getBoundingClientRect().width;
  Kartlar.style.transform = `translate3d(-${yeniKart * width}px,0,0)`;
  Kart = yeniKart;
}

/**
 * @param {{ style: string, piggyback: string }=} props
 * @return {Promise<string>}
 */
const KPass = ({ style, piggyback }) => {
  SağDüğme.onclick = () => kartDeğiştir((Kart + 1) % KartSayısı);
  SolDüğme.onclick = () => kartDeğiştir((Kart + (KartSayısı - 1)) % KartSayısı);

  return (
    <Kök style={style}>
      <Css />
      <Kapak bundleName="KPASS.svg" id={Css.KapakYüzü} piggyback={piggyback} />
      <div id={Css.BilgiYüzü}>
        <Kartlar>
          <PersonInfoCard />
          <ContactInfoCard />
          <AddressInfoCard />
          <FamilyInfoCard />
          <RegistryInfoCard />
        </Kartlar>
        <svg id={Css.Logo} height={24} width={24}>
          <use href={"#" + OrtakCss.Başlık.Logomark} width={24} height={24} />
        </svg>
        <SolDüğme href="javascript:" class={[Css.Düğme, Css.SolDüğme]} />
        <SağDüğme href="javascript:" class={[Css.Düğme, Css.SağDüğme]} />
      </div>
    </Kök >
  );
}

/** @const {!HTMLDivElement} */
KPass.Kök = Kök;

/**
 * @param {boolean} bilgiYüzü
 */
KPass.yüzGöster = (bilgiYüzü) => Kök.classList.toggle("flp", bilgiYüzü);

/**
 * @return {boolean}
 */
KPass.çevir = () => Kök.classList.toggle("flp");

export default KPass;
