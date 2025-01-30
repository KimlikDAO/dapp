import Kapak from "kastro:./cover.svg.jsx";
import AddressInfoCard from "./AddressInfoCard";
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
/** @const {!HTMLButtonElement} */
const SolDüğme = dom.button(Css.SolDüğme);
/** @const {!HTMLButtonElement} */
const SağDüğme = dom.button(Css.SağDüğme);
/** @const {!HTMLDivElement} */
const Nav = dom.div(Css.Nav);

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
  /** @type {!Text} */(Nav.childNodes[1]).data = `${Kart + 1} / ${KartSayısı}`;
}

const SolOk = () =>
  <svg width="10" height="10" viewBox="0 0 10 10">
    <use href={`#${Css.Ok}`} width={10} height={10} />
  </svg>;

const SağOk = () =>
  <svg width="10" height="10" viewBox="0 0 10 10">
    <use href={`#${Css.Ok}`} width={10} height={10} transform="translate(10,0)scale(-1,1)" />
  </svg>;

/**
 * @param {{ style: string, piggyback: string }=} props
 * @return {Promise<string>}
 */
const KPass = ({ style, piggyback }) => (
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
      <svg class={Css.Logo} height={24} width={24}>
        <defs>
          <path id={Css.Ok} d="M6.5 1.5L3 5L6.5 8.5C6.8 8.8 6.8 9.2 6.5 9.5C6.2 9.8 5.8 9.8 5.5 9.5L1.5 5.5C1.2 5.2 1.2 4.8 1.5 4.5L5.5 0.5C5.8 0.2 6.2 0.2 6.5 0.5C6.8 0.8 6.8 1.2 6.5 1.5Z" />
        </defs>
        <use href={`#${OrtakCss.Başlık.Logomark}`} width={24} height={24} />
      </svg>
      <Nav class={Css.Nav}>
        <SolDüğme
          onClick={() => kartDeğiştir(Kart == 0 ? KartSayısı - 1 : Kart - 1)}
          class={[Css.Düğme, Css.SolDüğme]}>
          <SolOk />
        </SolDüğme>
        1 / {KartSayısı}
        <SağDüğme
          onClick={() => kartDeğiştir(Kart == KartSayısı - 1 ? 0 : Kart + 1)}
          class={[Css.Düğme, Css.SağDüğme]}>
          <SağOk />
        </SağDüğme>
      </Nav>
    </div>
  </Kök >
);

/** @const {!HTMLDivElement} */
KPass.Kök = Kök;

KPass.SağOk = SağOk;

KPass.SolOk = SolOk;

/**
 * @param {boolean} bilgiYüzü
 */
KPass.yüzGöster = (bilgiYüzü) => Kök.classList.toggle(Css.Ters, bilgiYüzü);

/**
 * @return {boolean}
 */
KPass.çevir = () => Kök.classList.toggle(Css.Ters);

export default KPass;
