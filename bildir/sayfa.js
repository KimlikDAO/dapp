/**
 * @fileoverview Bildir sayfası giriş noktası
 */
import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/dom';

/** @type {?Array<string>} */
let ADRESLER = null;

dom.adla("bibtnb").onclick = () => {
  let seçilenAdres;
  dom.adlaGizle("bibtna");
  dom.adlaGizle("bibtnb");
  dom.adlaGöster("biiic");

  if (!ADRESLER) {
    // Kullanıcın revoke edebileceği adresler cekilecek 
    ADRESLER = [
      "0x6ec04644bd36cd36d3569093078aba4c78297ef1",
      "0x6ec04644bd36cd36d3569093078aba4c78297ef2",
      "0x6ec04644bd36cd36d3569093078aba4c78297ef3",
    ];
    for (let i = 0; i < ADRESLER.length; ++i) {
      const adresInputu = dom.adla("bisi").cloneNode(true);
      dom.göster(adresInputu);
      adresInputu.id = "bisi" + i;
      adresInputu.firstElementChild.id = "biiia" + i;
      adresInputu.children[1].htmlFor = "biiia" + i;
      adresInputu.children[1].innerText = ADRESLER[i];
      dom.adla("biiic").insertBefore(adresInputu, dom.adla("biiio"));
    }
  }

  dom.adla("biiio").onclick = () => {  //revoke oyu kullanılacak
    for (let i = 0; i < ADRESLER.length; ++i) {
      if (dom.adla("biiia" + i).checked) seçilenAdres = dom.adla("biiia" + i).nextElementSibling.innerText;
    }
    console.log(seçilenAdres);
  }

  dom.adla("biiir").onclick = () => {
    dom.adlaGöster("bibtna");
    dom.adlaGöster("bibtnb");
    dom.adlaGizle("biiic");
  }
}
