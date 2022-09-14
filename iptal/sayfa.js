/**
 * @fileoverview İptal sayfası giriş noktası
 */
import Cüzdan from '/birim/cüzdan/birim';
import TCKT from '/lib/TCKT';
import dom from '/lib/dom';

/** @type {?Array<string>} */
let ADRESLER = null;

dom.adla("ipbtnb").onclick = () => {
  /** @type {?Element} */
  let seçilmişAdres = null;
  dom.adla("ipssc").classList.add("done");
  dom.adla("ipbtna").classList.remove("act");
  dom.adla("ipbtnb").classList.remove("act");
  dom.adlaGöster("ipiic");
  dom.adlaGizle("iptac");

  if (!ADRESLER) {
    // Kullanıcın revoke edebileceği adresler cekilecek 
    ADRESLER = [
      "0x6ec04644bd36cd36d3569093078aba4c78297ef1",
      "0x6ec04644bd36cd36d3569093078aba4c78297ef2",
      "0x6ec04644bd36cd36d3569093078aba4c78297ef3",
    ];
    let innerHTML = "";
    const ul = dom.adla("ipiil");
    ul.onclick = (e) => {
      let li = e.target;
      if (seçilmişAdres) seçilmişAdres.classList.remove("sel");
      li.classList.add("sel");
      seçilmişAdres = li;
      dom.adla("ipiio").classList.remove("dis")
      dom.adla("ipiio").classList.add("act");
    }
    for (let i = 0; i < ADRESLER.length; ++i) {
      innerHTML += `<li id=ipiia${i} class="ipiia">${ADRESLER[i]}</li>`
    }
    ul.innerHTML = innerHTML;
  }

  dom.adla("ipiio").onclick = () => {
    if (seçilmişAdres) console.log(seçilmişAdres.innerText); //revoke onayı verilecek
  }

  dom.adla("ipiir").onclick = () => {
    dom.adla("ipssc").classList.remove("done");
    dom.adlaGizle("ipiic");
    dom.adla("ipbtna").classList.add("act");
    dom.adla("ipbtnb").classList.add("act");
  }
}

dom.adla("ipbtna").onclick = () => {
  dom.adla("ipssc").classList.add("done");
  dom.adla("ipbtna").classList.remove("act");
  dom.adla("ipbtnb").classList.remove("act");
  dom.adlaGizle("ipiic");
  dom.adlaGöster("iptac");
}

dom.adla("ip1a").onclick = () => {
  dom.adlaGizle("ip1b");
  dom.adlaGizle("ip1a");
  document.getElementById("ipb").innerHTML = "";
  document.getElementById("ipsp").innerHTML = `Sadece cüzdanınızın gizli anahtarını başkasına verdiğinizi düşünüyorsanız TCKT’nizi yok etmeniz gerekir.<br><br>Devam etmek için onay verin.`;
  dom.adlaGöster("ip1c");
}

dom.adla("ip1c").onclick = () => {
  const adres = /** @type {string} */(Cüzdan.adres());
  TCKT.revoke(adres)
    .catch(console.log);
}
