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
  dom.adlaGizle("iptac");
  dom.adlaGöster("ipiic");

  if (!ADRESLER) {
    let innerHTML = "";
    const ul = dom.adla("ipiil");
    dom.adlaGöster("iplc"); //Yükleniyor animasyonu
    // Kullanıcın revoke edebileceği adresler cekilecek 
    ADRESLER = [
      "0x6ec04644bd36cd36d3569093078aba4c78297ef1",
      "0x6ec04644bd36cd36d3569093078aba4c78297ef2",
      "0x6ec04644bd36cd36d3569093078aba4c78297ef3",
    ];
    if (ADRESLER.length == 0) {
      innerHTML = dom.TR
        ? "İptal edebileceğiniz bir adres bulunmamaktadır."
        : "There is no revoke address."
    }
    ul.onclick = (e) => {
      let li = e.target;
      if (seçilmişAdres) seçilmişAdres.classList.remove("sel");
      li.classList.add("sel");
      seçilmişAdres = li;
    }
    for (let i = 0; i < ADRESLER.length; ++i) {
      innerHTML += `<li id=ipiia${i} class="ipiia">${ADRESLER[i]}</li>`
    }
    ul.innerHTML = innerHTML;
    setTimeout(() => {
      dom.adlaGöster("ipiilc");
      dom.adlaGizle("iplc");
    }, 1000);
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

  dom.adla("ip1a").onclick = () => {
    dom.adlaGizle("ip1b");
    dom.adlaGizle("ip1a");
    dom.adla("ipb").innerHTML = "";
    dom.adla("ipsp").innerHTML = dom.TR
      ? `Sadece cüzdanınızın gizli anahtarını başkasına verdiğinizi düşünüyorsanız TCKT’nizi yok etmeniz gerekir.<br><br>Devam etmek için onay veriniz.`
      : "Only revoke your TCKT if you think your private key was exposed.<br><br>Confirm below to proceed.";
    dom.adlaGöster("ip1c");
    dom.adlaGöster("ip1d");

    dom.adla("ip1c").onclick = () => {
      const adres = /** @type {string} */(Cüzdan.adres());
      TCKT.revoke(adres)
        .catch(console.log);
    }

    dom.adla("ip1d").onclick = () => {
      dom.adla("ipb").innerHTML = dom.TR
        ? "2. TCKT adresi seçin."
        : "2. Select TCKT address";
      dom.adla("ipsp").innerHTML = dom.TR
        ? "Bağlı cüzdanınızdaki TCKT'yi mi iptal etmek istiyorsunuz?"
        : "Do you want to revoke the TCKT in your connected wallet?";
      dom.adlaGöster("ip1b");
      dom.adlaGöster("ip1a");
      dom.adlaGizle("ip1c");
      dom.adlaGizle("ip1d");
    }
  }
}



