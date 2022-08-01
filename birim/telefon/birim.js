import dom from '/lib/dom';

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

const nftCevir = () => dom.adla("tenftt").classList.add("flipped");

export default { adresGir, kutuGöster, kutuKapat, nftCevir };
