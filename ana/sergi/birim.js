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
/** @type {number} */
let SergiSaati = 0;
/** @const {number} */
const width = document.getElementById("sepgc").getBoundingClientRect().width;

/**
 * @param {number} yeniKart
 */
const kartDeğiştir = (yeniKart) => {
  if (yeniKart === 0) Telefon.nftGöster();
  if (yeniKart === 1) Telefon.nftKilitle();
  if (yeniKart === 2) Telefon.nftCüzdanaYolla();
  yeniKart === 3
    ? Telefon.kutuGöster(
      "Bağlı app TCKT'nizin açık haline erişmek istiyor. İzin veriyor musunuz?")
    : Telefon.kutuKapat();
  Boncuklar.children[Kart].classList.remove("current");
  Boncuklar.children[yeniKart].classList.add("current");
  Kartlar.style.transform = `translate3d(-${yeniKart * width}px, 0, 0)`;
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

for (let /** number */ i = 0; i < Boncuklar.childElementCount; ++i) {
  Boncuklar.children[i].onclick = () => kartDeğiştir(i);
}

const sergiSaatiKur = () => {
  if (SergiSaati) clearInterval(SergiSaati);
  SergiSaati = setInterval(() => kartDeğiştir((Kart + 1) % 4), 4000);
}

Cüzdan.bağlanınca((adres) =>
  Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres)));

Telefon.nftGöster();
sergiSaatiKur();
