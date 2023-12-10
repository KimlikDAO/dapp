import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import dom from '/lib/util/dom';

/** @const {!Element} */
//const SolDüğme = /** @type {!Element} */(dom.adla("seso"));
/** @const {!Element} */
// const SağDüğme = /** @type {!Element} */(dom.adla("sesa"));
/** @const {!Element} */
const Boncuklar = /** @type {!Element} */(dom.adla("sen"));
/** @const {!Element} */
const Kartlar = /** @type {!Element} */(dom.adla("sem"));
/** @type {number} */
let Kart = 0;
/** @type {number} */
let SergiSaati = 0;

Telefon.nftGöster(true, true);

/**
 * @param {number} yeniKart
 */
const kartDeğiştir = (yeniKart) => {
  /** @const {number} */
  const width = Kartlar.firstElementChild.getBoundingClientRect().width;

  Telefon.nftGöster(yeniKart <= 1, !yeniKart);
  yeniKart === 3
    ? Telefon.kutuGöster(dom.TR
      ? "Bağlı app TCKT'nizin açık haline erişmek istiyor. İzin veriyor musunuz?"
      : "The connected app would like to access your TCKT.")
    : Telefon.kutuKapat();
  Boncuklar.children[Kart].firstElementChild.classList.remove("sel");
  Boncuklar.children[yeniKart].firstElementChild.classList.add("sel");
  Kartlar.style.transform = `translate3d(-${yeniKart * width}px,0,0)`;
  Kart = yeniKart;

  // Saati sıfırla ki kullanıcı yeni geldiği sayfaya 8sn bakabilsin.
  sergiSaatiKur();
}

// SağDüğme.onclick = () => kartDeğiştir((Kart + 1) % 4);

// SolDüğme.onclick = () => kartDeğiştir((Kart + 3) % 4);

for (let /** number */ i = 0; i < Boncuklar.childElementCount; ++i) {
  Boncuklar.children[i].onclick = () => kartDeğiştir(i);
}

const sergiSaatiKur = () => {
  if (SergiSaati) clearInterval(SergiSaati);
  SergiSaati = setInterval(() => kartDeğiştir((Kart + 1) % 4), 8000);
}

Cüzdan.adresDeğişince((adres) => Telefon.adresGir(adres));

sergiSaatiKur();