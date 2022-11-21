/**
 * @fileoverview Al sayfası giriş noktası
 */

import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/util/dom';
import TCKT from '/lib/ethereum/TCKT';
// import SDK from '/sdk/src'; 

/** @const {Element} */
const cüzdanBağlaDüğmesi = dom.adla("ods0b");

cüzdanBağlaDüğmesi.onclick = Cüzdan.bağla();
Cüzdan.bağlanınca((adres) => {
  dom.adla("ods0c").classList.add("done");
  dom.butonDurdur(cüzdanBağlaDüğmesi);
  cüzdanBağlaDüğmesi.classList.remove("act");
  cüzdanBağlaDüğmesi.innerText = dom.TR ? "Cüzdan bağlandı ✓" : "Wallet connected ✓";
  tcktKontrolEt(adres, Cüzdan.ağ());
});

/**
 * @param {string} adres
 * @param {string} adres
 */
const tcktKontrolEt = (adres, chainId) => {
  if (true) { // if (SDK.doesOwnTCKT(adres, chainId)) 
    dom.adlaGöster("ods1ac");
    dom.adla("ods1ab").onclick = () => { // TCKT humanId ve contactInfo 
      bilgileriKontrolEt();
    }
  } else { 
    dom.adlaGöster("ods1bc");
  }
}

const bilgileriKontrolEt = () => {
  dom.adla("ods1ac").classList.add("done");
  dom.butonDurdur(dom.adla("ods1ab"));
  dom.adla("ods1ab").classList.remove("act");
  dom.adla("ods1ab").innerText = dom.TR ? "Bilgileriniz alındı ✓" : "We got your info ✓";
  if (true) {   // Kampanyaya kaydı kontrol edilecek
    dom.adlaGöster("ods2ac");
    dom.adla("odtx").innerText = "Transaction"; //tx gelecek
  } else {
    dom.adlaGöster("ods2bc");
  }
}
