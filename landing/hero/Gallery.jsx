import Css from "./Gallery.css";
import SharedCss from "/components/sharedCss/SharedCss.css";
import Phone from "/components/phone/Phone";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
const Bullets = dom.div(Css.Bullets);
/** @const {!HTMLUListElement} */
const CardSlider = dom.ul(Css.CardSlider);

/** @type {number} */
let SelectedCard = 0;
/** @type {number} */
let GalleryTimer = 0;
/** @type {number} */
let SlideTimer = 0;

/**
 * Slides the cards to the correct position based on the `SelectedCard` value.
 * Uses CSS transform to smoothly animate the horizontal movement.
 */
const slideCards = () => {
  /** @const {number} */
  const width = CardSlider.firstElementChild.getBoundingClientRect().width;
  CardSlider.style.transform = `translate3d(-${SelectedCard * width}px,0,0)`;
}

/**
 * @param {number} newCard
 */
const selectCard = (newCard) => {
  if (SelectedCard > 2 && newCard == 0) newCard = 4;
  const newCardModulo = newCard % 4;
  Phone.nftGöster(newCardModulo <= 1, !newCardModulo);
  newCardModulo === 3
    ? Phone.showDialog(dom.i18n({
      en: "The connected app would like to access your contact info section of your KPass.",
      tr: "Bağlı app KPass’inizdeki iletişim bilgilerinize erişmek istiyor. İzin veriyor musunuz?",
    }))
    : Phone.closeDialog();
  Bullets.children[SelectedCard % 4].firstElementChild.classList.remove(SharedCss.Selected);
  Bullets.children[newCardModulo].firstElementChild.classList.add(SharedCss.Selected);
  SelectedCard = newCard;
  slideCards();
  if (newCard == 4)
    setTimeout(() => {
      CardSlider.style.transition = "none";
      SelectedCard = 0;
      slideCards();
      setTimeout(() => CardSlider.style.transition = "", 600)
    }, 1200);
}

const startGalleryTimer = () => {
  if (GalleryTimer) clearInterval(GalleryTimer);
  GalleryTimer = setInterval(() => selectCard(SelectedCard + 1), 12000);
}

/**
 * @param {{
 *   title: string,
 *   children: !Array<Promise<string>>
 * }=} props
 * @return {Promise<string>}
 */
const Card = ({ title, children }) => (
  <li class={Css.Card}>
    <h3>{title}</h3>
    {children}
  </li>
);

const Gallery = () => {
  window.onresize = () => {
    clearTimeout(SlideTimer);
    SlideTimer = setTimeout(slideCards, 100);
  }
  for (let /** number */ i = 0; i < Bullets.childElementCount; ++i) {
    Bullets.children[i].onclick = () => {
      selectCard(i);
      startGalleryTimer();
    }
  }
  Phone.nftGöster(true, true);
  // Cüzdan.adresDeğişince((adres) => Telefon.adresGir(adres));
  CardSlider.appendChild(CardSlider.firstElementChild.cloneNode(true));
  CardSlider.style.width = "500%";
  dom.run(startGalleryTimer);

  return (
    <div id={Css.Gallery}>
      <Css />
      <div id={Css.Carousel}>
        <CardSlider>
          <Card title={{
            tr: "Kontrolü tamamen sende olan on-chain bir hesap",
            en: "An on-chain account that you truly own"
          }}>{{
            en: <>
              Mint your KPass and wallet login to all supported on/off-ramps
              with an account you truly own</>,
            tr: <>
              Bir kez KPass al, destekleyen tüm platformlarda cüzdanını bağla,
              gerekli bilgileri güvenle sun, hesap açmadan işlem yap</>
          }}</Card>
          <Card title={{
            tr: "İçeriği kendi cüzdan anahtarlarınla şifrelenir",
            en: "Your data is encrypted under your wallet private key"
          }}>{{
            en: "The contents of your KPass is encrypted in your browser under your wallet private key. KimlikDAO will never store your data",
            tr: "KPass içeriği kendi tarayıcında kendi cüzdan anahtarlarınla şifrelenir. KimlikDAO asla bilgilerini göremez ve saklamaz"
          }}</Card>
          <Card title={{
            en: "Store your KPass in your favorite NFT wallet like MetaMask",
            tr: "KPass herhangi bir NFT cüzdanında taşınabilir",
          }}>{{
            en: "KPass is an ERC-721 non-fungible token meaning that you can see it in any NFT wallet",
            tr: "KPass ERC-721 standardına uygun bir NFT olduğu için NFT destekleyen her cüzdanda görülebilir"
          }}</Card>
          <Card title={{
            en: "Control who can access your info",
            tr: "dApp’lere istediğin bilgileri paylaş, istediklerini gizli tut",
          }}>{{
            en: "The connected dApp may send you requests for accessing parts of your KPass. Approve the sections you’d like to share, reject others",
            tr: "Bağlı dApp KPass’inin içindeki bölümlere erişim isteği yollayabilir. Paylaşmak istediklerini onayla, gizli tutmak istediklerini onaylama"
          }}</Card>
        </CardSlider>
      </div>
      <Bullets>
        {[...Array(4)].map((_, i) => (
          <div class={Css.BulletContainer}>
            <div class={[Css.Bullet].concat(i == 0 ? SharedCss.Selected : [])}></div>
          </div>
        ))}
      </Bullets>
    </div >
  );
}

export default Gallery;
