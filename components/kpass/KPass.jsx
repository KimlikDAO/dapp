import Cover from "kastro:./cover.svg.jsx";
import AddressInfoCard from "./AddressInfoCard";
import ContactInfoCard from "./ContactInfoCard";
import FamilyInfoCard from "./FamilyInfoCard";
import Css from "./KPass.css";
import PersonInfoCard from "./PersonInfoCard";
import RegistryInfoCard from "./RegistryInfoCard";
import SharedCss from "/components/sharedCss/SharedCss";
import "/lib/did/section.d";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
const Cards = dom.div(Css.Cards);
/** @const {!HTMLDivElement} */
const Root = dom.div(Css.Root);
/** @const {!HTMLButtonElement} */
const LeftButton = dom.button(Css.LeftButton);
/** @const {!HTMLButtonElement} */
const RightButton = dom.button(Css.RightButton);
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
  const width = Cards.children[0].getBoundingClientRect().width;
  Cards.style.transform = `translate3d(-${yeniKart * width}px,0,0)`;
  Kart = yeniKart;
  /** @type {!Text} */(Nav.childNodes[1]).data = `${Kart + 1} / ${KartSayısı}`;
}

const LeftArrow = () =>
  <svg width="10" height="10" viewBox="0 0 10 10">
    <use href={`#${Css.Arrow}`} width={10} height={10} />
  </svg>;

const RightArrow = () =>
  <svg width="10" height="10" viewBox="0 0 10 10">
    <use href={`#${Css.Arrow}`} width={10} height={10} transform="translate(10,0)scale(-1,1)" />
  </svg>;

/**
 * @param {{ style: string, piggyback: string }=} props
 * @return {Promise<string>}
 */
const KPass = ({ style, piggyback }) => (
  <Root style={style}>
    <Css />
    <Cover bundleName="KPASS.svg" id={Css.CoverSide} piggyback={piggyback} />
    <div id={Css.InfoSide}>
      <Cards>
        <PersonInfoCard />
        <ContactInfoCard />
        <AddressInfoCard />
        <FamilyInfoCard />
        <RegistryInfoCard />
      </Cards>
      <svg class={Css.Logo} height={24} width={24}>
        <defs>
          <path id={Css.Arrow} d="M6.5 1.5L3 5L6.5 8.5C6.8 8.8 6.8 9.2 6.5 9.5C6.2 9.8 5.8 9.8 5.5 9.5L1.5 5.5C1.2 5.2 1.2 4.8 1.5 4.5L5.5 0.5C5.8 0.2 6.2 0.2 6.5 0.5C6.8 0.8 6.8 1.2 6.5 1.5Z" />
        </defs>
        <use href={`#${SharedCss.Header.Logomark}`} width={24} height={24} />
      </svg>
      <Nav class={Css.Nav}>
        <LeftButton
          onClick={() => kartDeğiştir(Kart == 0 ? KartSayısı - 1 : Kart - 1)}
          class={[Css.Button, Css.LeftButton]}>
          <LeftArrow />
        </LeftButton>
        1 / {KartSayısı}
        <RightButton
          onClick={() => kartDeğiştir(Kart == KartSayısı - 1 ? 0 : Kart + 1)}
          class={[Css.Button, Css.RightButton]}>
          <RightArrow />
        </RightButton>
      </Nav>
    </div>
  </Root>
);

/** @enum {string} */
KPass.Css = Css;

/** @const {!HTMLDivElement} */
KPass.Root = Root;

KPass.RightArrow = RightArrow;

KPass.LeftArrow = LeftArrow;

/**
 * @param {boolean} infoSide
 */
KPass.showSide = (infoSide) => Root.classList.toggle(Css.Flipped, infoSide);

/**
 * @return {boolean}
 */
KPass.flip = () => Root.classList.toggle(Css.Flipped);

export default KPass;
