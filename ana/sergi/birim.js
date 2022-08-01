import Cüzdan from "/birim/cüzdan/birim";
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
  if (yeniKart == 0) Telefon.nftGöster();
  if (yeniKart == 1) Telefon.nftKilitle();
  if (yeniKart == 2) Telefon.nftCüzdanaYolla();
  yeniKart == 3
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
  sergiSaatiKur();
}

SolDüğme.onclick = () => {
  kartDeğiştir((Kart + 3) % 4);
  sergiSaatiKur();
}

for (let i = 0; i < Boncuklar.childElementCount; ++i) {
  Boncuklar.children[i].onclick = () => kartDeğiştir(i);
}

let sergiSaatiKur = () => {
  if (SergiSaati) clearInterval(SergiSaati);
  SergiSaati = setInterval(() => kartDeğiştir((Kart + 1) % 4), 5000);
}

Cüzdan.bağlanınca((adres) =>
  Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres)));

Telefon.nftGöster();
sergiSaatiKur();
