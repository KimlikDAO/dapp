/**
 * @fileoverview Bildir sayfası giriş noktası
 */
import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/dom';

/** @type {?Array<string>} */
let ADRESLER = null;

dom.adla("bibtnb").onclick = () => {
  /** @type {?Element} */
  let seçilmişAdres = null;
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
    let innerHTML = "";
    const ul = dom.adla("biiil");
    ul.onclick = (e) => {
      let li = e.target;
      if (seçilmişAdres) seçilmişAdres.classList.remove("sel");
      li.classList.add("sel");
      seçilmişAdres = li;
      dom.adla("biiio").classList.remove("dis")
      dom.adla("biiio").classList.add("act");
    }
    for (let i = 0; i < ADRESLER.length; ++i) {
      innerHTML += `<li id=biiia${i} class="biiia">${ADRESLER[i]}</li>`
    }
    ul.innerHTML = innerHTML;
  }

  dom.adla("biiio").onclick = () => {
    if (seçilmişAdres) console.log(seçilmişAdres.innerText); //revoke onayı verilecek
  }

  dom.adla("biiir").onclick = () => {
    dom.adlaGöster("bibtna");
    dom.adlaGöster("bibtnb");
    dom.adlaGizle("biiic");
  }
}
