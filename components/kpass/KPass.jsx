import Cover from "kastro:./cover.svg.jsx";
import AddressInfoCard from "./AddressInfoCard";
import ContactInfoCard from "./ContactInfoCard";
import FamilyInfoCard from "./FamilyInfoCard";
import Css from "./KPass.css";
import PersonInfoCard from "./PersonInfoCard";
import RegistryInfoCard from "./RegistryInfoCard";
import Paths from "/components/icons/paths";
import SharedCss from "/components/shared/SharedCss";
import "/lib/did/section.d";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
const Cards = dom.div(Css.Cards);

const LeftArrow = () =>
  <svg width={10} height={10} viewBox="0 0 24 24">
    <use href={`#${Css.Arrow}`} transform="translate(24,0)scale(-1,1)" />
  </svg>;

const RightArrow = () =>
  <svg width={10} height={10} viewBox="0 0 24 24">
    <use href={`#${Css.Arrow}`} />
  </svg>;

const Logo = () => (
  <svg class={Css.Logo} height={24} width={24}>
    <defs>
      <path id={Css.Arrow} d={Paths.Chevron2} />
    </defs>
    <use href={`#${SharedCss.Header.Logomark}`} width={24} height={24} />
  </svg>
);

const Nav = () => {
  /** @const {!HTMLDivElement} */
  const Root = dom.div(Css.Nav);
  /** @type {number} */
  let currentCard = 0;
  /** @type {number} */
  let totalCards = 3;

  const nextCard = () => {
    currentCard = (currentCard + 1) % totalCards;
    dom.slideCard(Cards, currentCard);
    /** @type {!Text} */(Root.childNodes[1]).data = `${currentCard + 1} / ${totalCards}`;
  }
  const prevCard = () => {
    currentCard += totalCards - 2;
    nextCard();
  }
  return (
    <Root class={Css.Nav}>
      <button onClick={prevCard} class={Css.Button}>
        <LeftArrow />
      </button>
      1 / {totalCards}
      <button onClick={nextCard} class={Css.Button}>
        <RightArrow />
      </button>
    </Root>
  );
}

/**
 * @param {{
 *   style: (string | undefined),
 *   piggyback: (string | undefined)
 * }} props
 */
const KPass = ({ style, piggyback }) => {
  /** @const {!HTMLDivElement} */
  KPass.root = dom.div(Css.Root);

  return (
    <KPass.root style={style}>
      <Css />
      <Cover id={Css.CoverSide} bundleName="KPASS.svg" piggyback={piggyback} />
      <div id={Css.InfoSide}>
        <Cards>
          <PersonInfoCard />
          <ContactInfoCard />
          <AddressInfoCard />
          <FamilyInfoCard />
          <RegistryInfoCard />
        </Cards>
        <Logo />
        <Nav />
      </div>
    </KPass.root>
  );
}
/** @enum {string} */
KPass.Css = Css;

KPass.RightArrow = RightArrow;

KPass.LeftArrow = LeftArrow;

/**
 * Shows the side given by the infoSide parameter. If no parameter is given,
 * the side is toggled.
 *
 * @param {boolean|undefined} infoSide
 */
KPass.showSide = (infoSide) => KPass.root.classList.toggle(Css.InfoSide, infoSide);

export default KPass;
