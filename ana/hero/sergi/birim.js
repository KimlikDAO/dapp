import { Boncuklar, Kartlar } from './birim.jsx';
import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import dom from '/lib/util/dom';

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
  if (Kart > 2 && yeniKart == 0) yeniKart = 4;
  const yeniKartDengi = yeniKart % 4;
  Telefon.nftGöster(yeniKartDengi <= 1, !yeniKartDengi);
  yeniKartDengi === 3
    ? Telefon.kutuGöster(dom.i18n({
      tr: "Bağlı app KPass’inizdeki iletişim bilgilerinize erişmek istiyor. İzin veriyor musunuz?",
      en: "The connected app would like to access your contact info section of your KPass."
    }))
    : Telefon.kutuKapat();
  Boncuklar.children[Kart % 4].firstElementChild.classList.remove("sel");
  Boncuklar.children[yeniKartDengi].firstElementChild.classList.add("sel");
  Kart = yeniKart;
  yerleştir();
  if (yeniKart == 4)
    setTimeout(() => {
      Kartlar.style.transition = "none";
      Kart = 0;
      yerleştir();
      setTimeout(() => Kartlar.style.transition = "", 600)
    }, 1200);
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
  SergiSaati = setInterval(() => kartDeğiştir(Kart + 1), 12000);
}

Cüzdan.adresDeğişince((adres) => Telefon.adresGir(adres));

Kartlar.appendChild(Kartlar.firstElementChild.cloneNode(true));
Kartlar.style.width = "500%";
sergiSaatiKur();
