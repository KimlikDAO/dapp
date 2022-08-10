import dom from '/lib/dom';

/** @const {Element} */
const Kartlar = dom.adla("tck");
/** @type {number} */
let Kart = 0;

const kartDeğiştir = (yeniKart) => {
  /** @const {number} */
  const width = Kartlar.children[0].getBoundingClientRect().width;
  Kartlar.style.transform = `translate3d(-${yeniKart * width}px, 0, 0)`;
  Kart = yeniKart;
}

dom.adla("tcso").onclick = () => {
  kartDeğiştir((Kart + 1) % 2);
}

dom.adla("tcsa").onclick = () => {
  kartDeğiştir((Kart + 1) % 2);
}
