import dom from '/lib/dom';

/**@const {Element} */
const nft = dom.adla("tenft");
/**@const {Element} */
const nftButton = dom.adla("tenft-button");

const adresGir = (adres) => dom.adla("tetr").innerText = adres;

const kutuGöster = (metin) => {
  /** @const {Element} */
  const kutu = dom.adla("tefirw");
  kutu.firstElementChild.innerText = metin;
  kutu.classList.add("show");
  dom.adla("tebg").classList.add("whenmsg");
}

const kutuKapat = () => {
  dom.adla("tefirw").classList.remove("show");
  dom.adla("tebg").classList.remove("whenmsg");
}

const nftGöster = () => {
  dom.adla("tenftb").style.display = "";
  nft.classList.remove("moveintowallet");
  nft.classList.add("flipped");
  nftButton.classList.add("show");
}

const nftKilitle = () => {
  nft.classList.remove("flipped");
}

const nftCüzdanaYolla = () => {
  nft.classList.add("moveintowallet");
  nftButton.classList.remove("show");
}

export default {
  adresGir,
  kutuGöster,
  kutuKapat,
  nftCüzdanaYolla,
  nftGöster,
  nftKilitle,
};
