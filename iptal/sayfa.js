/**
 * @fileoverview İptal sayfası giriş noktası
 */
import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/dom';
import TCKT from '/lib/TCKT';

dom.adla("ipbtnb").onclick = () => {
  /** @type {?Element} */
  let seçilmişAdres = null;
  dom.adla("ipssc").classList.add("done");
  dom.adla("ipbtna").classList.remove("act");
  dom.adla("ipbtnb").classList.remove("act");
  dom.adlaGizle("iptac");
  dom.adlaGöster("ipiic");

  let innerHTML = "";
  const ul = dom.adla("ipiil");
  dom.adlaGöster("iplc"); // Yükleniyor animasyonu
  TCKT.getRevokeAddresses().then((data) => {
    const filtered = data.map((element) => "0x" + element.topics[1].slice(26));
    if (filtered.length == 0) {
      innerHTML = dom.TR
        ? "İptal edebileceğiniz bir adres yok."
        : "There is no revoke address."
    }
    ul.onclick = (e) => {
      let li = e.target;
      if (seçilmişAdres) seçilmişAdres.classList.remove("sel");
      li.classList.add("sel");
      seçilmişAdres = li;
    }
    for (let i = 0; i < filtered.length; ++i) {
      innerHTML += `<li id=ipiia${i} class="ipiia">${filtered[i]}</li>`
    }
    ul.innerHTML = innerHTML;
    dom.adlaGöster("ipiilc");
    dom.adlaGizle("iplc");
  })

  dom.adla("ipiio").onclick = () => {
    if (seçilmişAdres) console.log(seçilmişAdres.innerText); // revoke onayı verilecek
  }

  dom.adla("ipiir").onclick = () => {
    dom.adla("ipssc").classList.remove("done");
    dom.adlaGizle("ipiic");
    dom.adla("ipbtna").classList.add("act");
    dom.adla("ipbtnb").classList.add("act");
  }
  TCKT.getRevokeAddresses().then(console.log)
}

dom.adla("ipbtna").onclick = () => {
  dom.adla("ipssc").classList.add("done");
  dom.adla("ipbtna").classList.remove("act");
  dom.adla("ipbtnb").classList.remove("act");
  dom.adlaGizle("ipiic");
  dom.adlaGöster("iptac");

  dom.adla("ip1a").onclick = () => {
    dom.adlaGizle("iptac");
    dom.adlaGöster("iptaic");

    dom.adla("ip1c").onclick = () => {
      const adres = /** @type {string} */(Cüzdan.adres());
      TCKT.revoke(adres).catch(console.log);
    }

    dom.adla("ip1d").onclick = () => {
      dom.adlaGizle("iptaic");
      dom.adlaGöster("iptac");
    }
  }
}
