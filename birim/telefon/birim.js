import Tckt from "/birim/tckt/birim";
import dom from "/lib/util/dom";

/** @const {Element} */
const Nft = dom.adla("tc");
/** @const {Element} */
const NftButton = dom.adla("tenft-button");

/**
 * @param {?string} adres Telefonda gösterilecek adres.
 */
const adresGir = (adres) => {
  adres ||= "0xcCc0cCc";
  dom.adla("tetr").innerText = adres.slice(0, 6) + "..." + adres.slice(-4);
}

/**
 * @param {string} metin İletişim kutusunda gösterilecek metin.
 * @param {string=} sağDüğme
 */
const kutuGöster = (metin, sağDüğme) => {
  /** @const {Element} */
  const kutu = dom.adla("tefirw");
  if (sağDüğme) dom.adla("tefirwy").innerText = sağDüğme;
  kutu.style.opacity = "";
  kutu.firstElementChild.innerText = metin;
  kutu.classList.add("show");
  dom.adla("tebg").classList.add("whenmsg");
  dom.adla("tenftb").classList.add("whenmsg");
}

/**
 * Telefondaki iletişim kutusunu kapatır.
 */
const kutuKapat = () => {
  dom.adla("tefirw").classList.remove("show");
  dom.adla("tebg").classList.remove("whenmsg");
  dom.adla("tenftb").classList.remove("whenmsg");
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
    NftButton.innerText = bilgiYüzü
      ? dom.TR ? "Gizle" : "Encrypt"
      : dom.TR ? "Aç" : "Decrypt";
  }
  yüzGöster();
  if (kutudaGöster) {
    Nft.style.opacity = "";
    dom.göster(NftButton);
    NftButton.onclick ||= () => {
      bilgiYüzü = !bilgiYüzü;
      yüzGöster();
    }
  }

  Nft.classList.toggle("moveintowallet", !kutudaGöster);
  NftButton.classList.toggle("show", kutudaGöster);
}

/**
 * Temsili nft'yi Al sayfasında daha yukarıda gösterir
 */
const nftYukarıGönder = () => {
  dom.adla("te").previousElementSibling.appendChild(Nft);
  Nft.style.opacity = "";
}

const nftGeriAl = () => {
  Nft.classList.add('movedown');
  nftGöster(true, true);
}

export default {
  adresGir,
  kutuGöster,
  kutuKapat,
  nftGöster,
  nftYukarıGönder,
  nftGeriAl,
};
