import Tckt from '/birim/tckt/birim';
import dom from '/lib/util/dom';

/** @const {Element} */
const nft = dom.adla("tc");
/** @const {Element} */
const nftButton = dom.adla("tenft-button");

/**
 * @param {string} adres Telefonda gösterilecek adres.
 */
const adresGir = (adres) => dom.adla("tetr").innerText = adres;

/**
 * @param {string} metin İletişim kutusunda gösterilecek metin.
 */
const kutuGöster = (metin) => {
  /** @const {Element} */
  const kutu = dom.adla("tefirw");
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
 * Ana sayfa Telefon görselinin içinde temsili nft'yi gösterir
 */
const nftGöster = (kutudaGöster) => {
  if (kutudaGöster) {
    nft.style.opacity = "";
    dom.göster(nftButton);
    nftButton.onclick ||= Tckt.çevir;
  }

  nft.classList.toggle("moveintowallet", !kutudaGöster);
  nftButton.classList.toggle("show", kutudaGöster);
}

/**
 * Temsili nft'yi Al sayfasında daha yukarıda gösterir
 */
const nftYukarıGönder = () => {
  dom.adla("te").previousElementSibling.appendChild(nft);
  nft.style.opacity = "";
}

const nftGeriAl = () => {
  nft.classList.add('movedown');
  nftGöster(true);
}

export default {
  adresGir,
  kutuGöster,
  kutuKapat,
  nftGöster,
  nftYukarıGönder,
  nftGeriAl,
};
