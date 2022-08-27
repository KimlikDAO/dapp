import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import Tckt from "/birim/tckt/birim";
import dom from '/lib/dom';

Tckt.yüzGöster(true);
Telefon.nftGöster(true);

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

/**
 * @param {number} yeniKart
 */
const kartDeğiştir = (yeniKart) => {
  /** @const {number} */
  const width = Kartlar.firstElementChild.getBoundingClientRect().width;

  Telefon.nftGöster(yeniKart <= 1);
  Tckt.yüzGöster(yeniKart == 0);
  yeniKart === 3
    ? Telefon.kutuGöster(dom.TR
      ? "Bağlı app TCKT'nizin açık haline erişmek istiyor. İzin veriyor musunuz?"
      : "The connected app would like to access your TCKT.")
    : Telefon.kutuKapat();
  Boncuklar.children[Kart].classList.remove("current");
  Boncuklar.children[yeniKart].classList.add("current");
  Kartlar.style.transform = `translate3d(-${yeniKart * width}px,0,0)`;
  Kart = yeniKart;

  // Saati sıfırla ki kullanıcı yeni geldiği sayfaya 4sn bakabilsin.
  sergiSaatiKur();
}

SağDüğme.onclick = () => kartDeğiştir((Kart + 1) % 4);

SolDüğme.onclick = () => kartDeğiştir((Kart + 3) % 4);

for (let /** number */ i = 0; i < Boncuklar.childElementCount; ++i) {
  Boncuklar.children[i].onclick = () => kartDeğiştir(i);
}

const sergiSaatiKur = () => {
  if (SergiSaati) clearInterval(SergiSaati);
  SergiSaati = setInterval(() => kartDeğiştir((Kart + 1) % 4), 4000);
}

Cüzdan.bağlanınca((adres) =>
  Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres)));

sergiSaatiKur();
