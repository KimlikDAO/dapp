import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import dom from '/lib/util/dom';

/** @const {!Element} */
const Boncuklar = /** @type {!Element} */(dom.adla("sen"));
/** @const {!Element} */
const Kartlar = /** @type {!Element} */(dom.adla("sem"));
/** @type {number} */
let Kart = 0;
/** @type {number} */
let SergiSaati = 0;
/** @type {number} */
let YerleştirSaati = 0;

Telefon.nftGöster(true, true);


/**
 * Kartları `Kart` değişkenine göre doğru konuma çeker.
 */
const yerleştir = () => {
  /** @const {number} */
  const width = Kartlar.firstElementChild.getBoundingClientRect().width;
  Kartlar.style.transform = `translate3d(-${Kart * width}px,0,0)`;
}

/**
 * @param {number} yeniKart
 */
const kartDeğiştir = (yeniKart) => {
  Telefon.nftGöster(yeniKart <= 1, !yeniKart);
  yeniKart === 3
    ? Telefon.kutuGöster(dom.TR
      ? "Bağlı app TCKT’nizdeki iletişim bilgilerinize erişmek istiyor. İzin veriyor musunuz?"
      : "The connected app would like to access your contact info section of your TCKT.")
    : Telefon.kutuKapat();
  Boncuklar.children[Kart].firstElementChild.classList.remove("sel");
  Boncuklar.children[yeniKart].firstElementChild.classList.add("sel");
  Kart = yeniKart;
  yerleştir();
}

window.onresize = () => {
  clearTimeout(YerleştirSaati);
  YerleştirSaati = setTimeout(yerleştir, 100);
}

for (let /** number */ i = 0; i < Boncuklar.childElementCount; ++i) {
  Boncuklar.children[i].onclick = () => {
    kartDeğiştir(i);
    sergiSaatiKur();
  }
}

const sergiSaatiKur = () => {
  if (SergiSaati) clearInterval(SergiSaati);
  SergiSaati = setInterval(() => kartDeğiştir((Kart + 1) % 4), 8000);
}

Cüzdan.adresDeğişince((adres) => Telefon.adresGir(adres));

sergiSaatiKur();

setInterval(() => console.log("tick"), 1000);