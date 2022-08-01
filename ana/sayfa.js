import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import dom from '/lib/dom'

Cüzdan.bağlanınca((adres) =>
  Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres)));

let currentPageIndex = 0;
const nextBtn = dom.adla("crsnb");
const prevBtn = dom.adla("crspb");
const navs = dom.adla("crsnavs");
const page = dom.adla("crspgs");
const navButtons = dom.adla("crsnavs");

/**
 * @param {number} eski
 * @param {number} yeni
 */
const sayfaDeğiştir = (yeni) => {
  if ( yeni == 1) Telefon.nftCevir();
  yeni == 2 ?
    Telefon.kutuGöster("App cüzdanınızın açık anahtarına ulaşmak istiyor. İzin veriyor musunuz?")
    : Telefon.kutuKapat();
  page.children[currentPageIndex].classList.remove("selected");
  navs.children[currentPageIndex].classList.remove("current");
  page.children[yeni].classList.add("selected");
  navs.children[yeni].classList.add("current");
  currentPageIndex = yeni;
}

nextBtn.onclick = () =>
  sayfaDeğiştir((currentPageIndex + 1) % 4);

prevBtn.onclick = () =>
  sayfaDeğiştir((currentPageIndex + 3) % 4);

for (let i = 0; i < navButtons.childElementCount; ++i) {
  navButtons.children[i].onclick = () => sayfaDeğiştir(i);
}

setInterval(() => sayfaDeğiştir((currentPageIndex + 1) % 4), 4000);
