import Tckt from "/birim/tckt/birim";
import dom from "/lib/util/dom";

/** @const {!Element} */
const NftDüğmesi = /** @type {!Element} */(dom.adla("tez"));
/** @const {!Element} */
const Kutu = /** @type {!Element} */(dom.adla("tek"));
/** @const {!Element} */
const DüğmeliNft = /** @type {!Element} */(dom.adla("tel"))
/** @const {!Element} */
const Adres = /** @type {!Element} */(dom.adla("ted"));
/** @const {!Element} */
const AnaEkran = /** @type {!Element} */(dom.adla("tea"));

/**
 * @param {?string} adres Telefonda gösterilecek adres.
 */
const adresGir = (adres) => {
  adres ||= "0xcCc0cCc";
  Adres.innerText = adres.slice(0, 6) + "..." + adres.slice(-4);
}

/**
 * @param {string} metin İletişim kutusunda gösterilecek metin.
 * @param {string=} sağDüğme
 */
const kutuGöster = (metin, sağDüğme) => {
  if (sağDüğme) dom.adla("tey").innerText = sağDüğme;
  Kutu.style.opacity = "";
  Kutu.firstElementChild.innerText = metin;
  Kutu.classList.add("teg");
  AnaEkran.classList.add("tem");
  DüğmeliNft.classList.add("tem");
}

/**
 * Telefondaki iletişim kutusunu kapatır.
 */
const kutuKapat = () => {
  Kutu.classList.remove("teg");
  DüğmeliNft.classList.remove("tem");
  AnaEkran.classList.remove("tem");
}

/**
 * @param {boolean} kutudaGöster NFT tek başına kutuda gösterilsin mi.
 * @param {boolean} bilgiYüzü NFT'nin bilgi yüzü gösterilsin.
 *
 * Ana sayfa Telefon görselinin içinde temsili nft'yi gösterir.
 */
const nftGöster = (kutudaGöster, bilgiYüzü) => {
  Tckt.yüzGöster(bilgiYüzü);

  const yüzGöster = () => {
    Tckt.yüzGöster(bilgiYüzü);
    NftDüğmesi.innerText = bilgiYüzü
      ? dom.TR ? "Gizle" : "Encrypt"
      : dom.TR ? "Aç" : "Decrypt";
  }
  yüzGöster();
  if (kutudaGöster) {
    Tckt.Kök.style.opacity = "";
    dom.göster(NftDüğmesi);
    NftDüğmesi.onclick ||= () => {
      bilgiYüzü = !bilgiYüzü;
      yüzGöster();
    }
  }

  Tckt.Kök.classList.toggle("tew", !kutudaGöster);
  NftDüğmesi.classList.toggle("teg", kutudaGöster);
}

const nftGeriAl = () => {
  Tckt.Kök.classList.add("tex");
  nftGöster(true, false);
}

export default {
  adresGir,
  kutuGöster,
  kutuKapat,
  nftGöster,
  nftGeriAl,
};
