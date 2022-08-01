import Telefon from "/birim/telefon/birim";
import dom from '/lib/dom';

/** @const {Element} */
const SolDüğme = dom.adla("seso");
/** @const {Element} */
const SağDüğme = dom.adla("sesa");
/** @const {Element} */
const Boncuklar = dom.adla("senavs");
/** @const {Element} */
const Kartlar = dom.adla("sepgs");
/** @type {number} */
let Kart = 0;
/** @type {?Interval} */
let SergiSaati = null;

/**
 * @param {number} yeni
 */
const kartDeğiştir = (yeniKart) => {
  if (yeniKart == 1) Telefon.nftCevir();
  yeniKart == 2
    ? Telefon.kutuGöster(
      "Bağlı app TCKT'nizin açık haline erişmek istiyor. İzin veriyor musunuz?")
    : Telefon.kutuKapat();
  Kartlar.children[Kart].classList.remove("selected");
  Boncuklar.children[Kart].classList.remove("current");
  Kartlar.children[yeniKart].classList.add("selected");
  Boncuklar.children[yeniKart].classList.add("current");
  Kart = yeniKart;
}

SağDüğme.onclick = () => {
  kartDeğiştir((Kart + 1) % 4);
  clearInterval(SergiSaati);
  sergiSaatiKur();
}

SolDüğme.onclick = () => {
  kartDeğiştir((Kart + 3) % 4);
  clearInterval(SergiSaati);
  sergiSaatiKur();
}

for (let i = 0; i < Boncuklar.childElementCount; ++i) {
  Boncuklar.children[i].onclick = () => kartDeğiştir(i);
}

let sergiSaatiKur = () =>
  SergiSaati = setInterval(() => kartDeğiştir((Kart + 1) % 4), 3000);

sergiSaatiKur();
