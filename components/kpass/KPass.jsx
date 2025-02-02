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

const LeftArrow = () =>
  <svg width="10" height="10" viewBox="0 0 10 10">
    <use href={`#${Css.Arrow}`} width={10} height={10} />
  </svg>;

const RightArrow = () =>
  <svg width="10" height="10" viewBox="0 0 10 10">
    <use href={`#${Css.Arrow}`} width={10} height={10} transform="translate(10,0)scale(-1,1)" />
  </svg>;

const Logo = () => (
  <svg class={Css.Logo} height={24} width={24}>
    <defs>
      <path id={Css.Arrow} d="M6.5 1.5L3 5L6.5 8.5C6.8 8.8 6.8 9.2 6.5 9.5C6.2 9.8 5.8 9.8 5.5 9.5L1.5 5.5C1.2 5.2 1.2 4.8 1.5 4.5L5.5 0.5C5.8 0.2 6.2 0.2 6.5 0.5C6.8 0.8 6.8 1.2 6.5 1.5Z" />
    </defs>
    <use href={`#${SharedCss.Header.Logomark}`} width={24} height={24} />
  </svg>
);

const Nav = () => {
  /** @const {!HTMLButtonElement} */
  const LeftButton = dom.button(Css.LeftButton);
  /** @const {!HTMLButtonElement} */
  const RightButton = dom.button(Css.RightButton);
  /** @type {number} */
  let currentCard = 0;
  /** @type {number} */
  let totalCards = 3;

  const nextCard = () => {
    currentCard = (currentCard + 1) % totalCards;
    dom.slideCard(Cards, currentCard);
    /** @type {!Text} */(LeftButton.nextSibling).data = `${currentCard + 1} / ${totalCards}`;
  }
  const prevCard = () => {
    currentCard += totalCards - 2;
    nextCard();
  }
  return (
    <div class={Css.Nav}>
      <LeftButton onClick={prevCard} class={[Css.Button, Css.LeftButton]}>
        <LeftArrow />
      </LeftButton>
      1 / {totalCards}
      <RightButton onClick={nextCard} class={[Css.Button, Css.RightButton]}>
        <RightArrow />
      </RightButton>
    </div>
  );
}

/**
 * @param {{ style: string, piggyback: string }=} props
 * @return {Promise<string>}
 */
const KPass = ({ style, piggyback }) => {
  /** @const {!HTMLDivElement} */
  KPass.Root = dom.div(Css.Root);

  return (
    <KPass.Root style={style}>
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
    </KPass.Root>
  );
}
/** @enum {string} */
KPass.Css = Css;

KPass.RightArrow = RightArrow;

KPass.LeftArrow = LeftArrow;

/**
 * @param {boolean} infoSide
 */
KPass.showSide = (infoSide) => KPass.Root.classList.toggle(Css.InfoSide, infoSide);

/**
 * @return {boolean}
 */
KPass.flip = () => KPass.Root.classList.toggle(Css.InfoSide);

export default KPass;
