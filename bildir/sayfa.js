/**
 * @fileoverview Al sayfası giriş noktası
 */
import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/dom';

/** @const {Array<string>} */
const ADRESLER = [
  "0x6ec04644bd36cd36d3569093078aba4c78297ef1",
  "0x6ec04644bd36cd36d3569093078aba4c78297ef2",
  "0x6ec04644bd36cd36d3569093078aba4c78297ef3",
]

dom.adla("bibtnb").onclick = () => {
  dom.adlaGizle("bibtna");
  dom.adlaGizle("bibtnb");
  dom.adlaGöster("biiic");

  for (let i = 0; i < ADRESLER.length; ++i) {
    const adresInputu = dom.adla("bisi").cloneNode(true);
    dom.göster(adresInputu);
    adresInputu.id = "bisi" + i;
    adresInputu.firstElementChild.id = "biiia" + i;
    adresInputu.children[1].htmlFor = "biiia" + i;
    adresInputu.children[1].innerText = ADRESLER[i];
    dom.adla("biiic").insertBefore(adresInputu, dom.adla("biiio"));
  }

  dom.adla("biiio").onclick = () => {  //revoke oyu kullanılacak
    let seçilenAdres;
    for (let i = 0; i < ADRESLER.length; ++i) {
      if (dom.adla("biiia" + i).checked) seçilenAdres = dom.adla("biiia" + i).nextElementSibling.innerText;
    }
  }

  dom.adla("biiir").onclick = () => {
    dom.adlaGöster("bibtna");
    dom.adlaGöster("bibtnb");
    dom.adlaGizle("biiic");
  }
}
