import dom from '/lib/dom';
import '/birim/TCKT/birim';

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
 * Ana sayfa Telefon görselinin içinde temsili nft'yi gösterir
 */
const nftGöster = () => {
  nft.style.display = "";
  nftButton.style.display = "";
  nftButton.onclick ||= nftÇevir;
  nft.classList.remove("moveintowallet");
  nft.classList.add("flipped");
  nftButton.classList.add("show");
}

const nftÇevir = () => nft.classList.toggle("flipped");

/**
 * Ana sayfa Telefon görselinin içinde temsili nft'yi kilitli olarak gösterir
 */
const nftKilitle = () => {
  nft.classList.remove("moveintowallet");
  nft.classList.remove("flipped");
  nftButton.classList.add("show");
}

/**
 * Temsili nft'yi nftler kısmına yollar
 */
const nftCüzdanaYolla = () => {
  nft.classList.add("moveintowallet");
  nftButton.classList.remove("show");
}

/**
 * Temsili nft'yi Al sayfasında daha yukarıda gösterir
 */
const nftYukarıGönder = () => {
  nft.classList.remove("flipped");
  nft.style.top = "0";
  nft.style.left = "20px";
  dom.adla("te").previousElementSibling.appendChild(nft);
  nft.style.display = "";
}

/**
 * Temsili nft'nin Al sayfasında bilgi içeren yüzünü gösterir
 */
const nftYukarıdaGöster = () => {
  nft.classList.add("flipped");
}

/**
 * Temsili nft'yi Al sayfasında tekrar telefon görseline içine alır
 */
const nftTeleGeriAl = () => {
  nft.classList.add("movedown");
  nftButton.style.display = "";
  nftButton.onclick = nftÇevir;
  nftButton.classList.add("show");
}

export default {
  adresGir,
  kutuGöster,
  kutuKapat,
  nftÇevir,
  nftCüzdanaYolla,
  nftGöster,
  nftKilitle,
  nftTeleGeriAl,
  nftYukarıdaGöster,
  nftYukarıGönder,
};
