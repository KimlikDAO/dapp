import dom from '/lib/dom';

/** @const {Element} */
const Kartlar = dom.adla("tck");
/** @const {Element} */
const tckt = dom.adla("tc");
/** @type {number} */
let Kart = 0;

const kartDeğiştir = (yeniKart) => {
  /** @const {number} */
  const width = Kartlar.children[0].getBoundingClientRect().width;
  Kartlar.style.transform = `translate3d(-${yeniKart * width}px,0,0)`;
  Kart = yeniKart;
}

dom.adla("tcso").onclick = () => kartDeğiştir((Kart + 2) % 3);

dom.adla("tcsa").onclick = () => kartDeğiştir((Kart + 1) % 3);

const yüzGöster = (bilgiYüzü) => tckt.classList.toggle("flipped", bilgiYüzü);

const çevir = () => tckt.classList.toggle("flipped");

export default { çevir, yüzGöster };
