import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import dom from '/lib/dom'

Cüzdan.bağlanınca((adres) =>
  Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres)));

  let currentPageIndex= 0;

  const getCurrentPage = (index) => {
    const currentPage = dom.adla("crspgs").children[index];
    return currentPage;
  }
  
  const getCurrentNav = (index) => {
    const currentNav = dom.adla("crsnavs").children[index];
    return currentNav;
  }
  
  const nextBtn = dom.adla("crsnb");
  const prevBtn = dom.adla("crspb");
  const navButtons = dom.adla("crsnavs");
  
  const sayfaDeğiştir = (eski, yeni) => {
    getCurrentPage(eski).classList.remove("selected");
    getCurrentNav(eski).classList.remove("current");
    getCurrentPage(yeni).classList.add("selected");
    getCurrentNav(yeni).classList.add("current");
  }
  
  nextBtn.onclick = () => {
    const eski = currentPageIndex;
    currentPageIndex = currentPageIndex == 3 
    ? 0 : currentPageIndex + 1; 
    sayfaDeğiştir(eski, currentPageIndex);
  }
  
  prevBtn.onclick = () => {
    const eski = currentPageIndex;
    currentPageIndex = currentPageIndex == 0 
    ? 3 : currentPageIndex - 1; 
    sayfaDeğiştir(eski, currentPageIndex);
  }
  
  for (let i = 0 ; i < navButtons.childElementCount; ++i) {
    navButtons.children[i].onclick = () => {
      const eski = currentPageIndex;
      currentPageIndex = i;
      sayfaDeğiştir(eski, currentPageIndex);
    }
  }
  