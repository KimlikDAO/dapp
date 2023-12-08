import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import dom from "/lib/util/dom";

/** @const {!NodeList<!Element>} */
const Liste = dom.adla("li").children;
/** @type {number} */
let Seçili = 0;
/** @type {number} */
let Saat = 0;

Telefon.nftGöster(true, true);

const saatKur = () => {
  if (Saat) clearInterval(Saat);
  Saat = setInterval(() => seçiliDeğiştir((Seçili + 1) % 4), 1e4);
}

/**
 * @param {number} seçili
 */
const seçiliDeğiştir = (seçili) => {
  Telefon.nftGöster(seçili <= 1, !seçili);
  seçili == 3
    ? Telefon.kutuGöster(dom.TR
      ? "Bağlı app TCKT’nizdeki iletişim bilgilerinize erişmek istiyor. İzin veriyor musunuz?"
      : "The connected app would like to access your contact info section of your TCKT.")
    : Telefon.kutuKapat();
  Liste[Seçili].classList.remove("sel");
  Liste[seçili].classList.add("sel");
  Seçili = seçili;

  // Saati sıfırla ki kullanıcı yeni geldiği sayfaya 10sn bakabilsin.
  saatKur();
}

Cüzdan.adresDeğişince(Telefon.adresGir);

for (let /** number */ i = 0; i < Liste.length; ++i)
  Liste[i].onclick = () => seçiliDeğiştir(i);
