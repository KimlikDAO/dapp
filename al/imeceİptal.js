/**
 * @fileoverview İmece iptal parçası. DOM'da `ii` öneki bu parçaya ayrılmıştır.
 */

import dom from "/lib/dom";
import evm from "/lib/evm";

/**
 * Kurtarma adresleri basamağında kullanılan girdiler için sayaç
 * @type {number}
 */
let InputIdSayaç = 3;

/**
 * İmece iptal kurulumunu yapar ve verilmiş callback fonksiyonunu çağırır.
 * 
 * @param {function(Object<string,number>,number)} sonra
 */
function imeceİptalKurVe(sonra) {
  dom.adla("iibg").onclick = () => göster(sonra);
  dom.adla("iibi").onclick = () => {
    dom.adla("iibi").innerText = "İmece iptal kurulmadı 🤌";
    dom.adla("ii").classList.add("invisible");
    sonra({}, 0);
  }
}

function göster(sonra) {
  dom.adla("ii").classList.remove("invisible");
  for (let /** number */ i = 0; i < InputIdSayaç; ++i) {
    dom.adla("iia" + i).onblur = adresBlurOlunca;
    dom.adla("iiw" + i).onblur = ağırlıkHesapla;
  }
  dom.adla("iibe").onclick = girdiAlanıEkle;
  dom.adla("iibc").onclick = girdiAlanıÇıkar;
  dom.adla("iit").onblur = eşikDeğeriBlurOlunca;
  dom.adla("s4e").onclick = async () => {
    /** @type {!Object<string, number>} */
    let adresAğırlığı = {};
    /** @type {boolean} */
    let geçerli = true;
    /** @type {number} */
    let toplamAğırlık = 0;

    for (let /** number */ i = 0; i < InputIdSayaç; ++i) {
      const adres = dom.adla("iia" + i).value;
      if (!evm.adresGeçerli(adres) || adres in adresAğırlığı) {
        geçerli = false;
        console.log("hatalı girdi", i);
        // TODO(MuhammetCoskun): hata bildir kırmızi vs.
      }
      /** @type {number} */
      const ağırlık = parseInt(dom.adla("iiw" + i).value);
      adresAğırlığı[adres] = ağırlık;
      toplamAğırlık += ağırlık;
    }
    /** @type {number} */
    const eşikDeğeri = parseInt(dom.adla("iit").value);
    if (toplamAğırlık < eşikDeğeri) {
      geçerli = false;
      // TODO(MuhammetCoskun): hata bildir
    }
    if (geçerli) {
      dom.adla("iibi").innerHTML = "İmece iptal kuruldu 👍";
      dom.adla("ii").classList.add("invisible");
      dom.adla("s4").classList.add("done");
      dom.adla("iibi").style.display = "none";
      dom.adla("iibg").onclick = null;
      sonra(adresAğırlığı, eşikDeğeri);
    }
  };
  dom.adla("s4f").onclick = () => {
    dom.adla("ii").classList.add("invisible");
  };
}

async function girdiAlanıEkle() {
  const div = document.createElement("div");
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  div.id = "iic" + InputIdSayaç;
  div.classList.add("container");
  input1.id = "iia" + InputIdSayaç;
  input1.classList.add("address-input");
  input1.type = "text";
  input1.onblur = adresBlurOlunca;
  input2.id = "iiw" + InputIdSayaç;
  input2.classList.add("weight-input");
  input2.type = "number";
  input2.onblur = ağırlıkHesapla;
  input2.value = 1;
  div.appendChild(input1);
  div.appendChild(input2);
  dom.adla("iif").insertBefore(div, dom.adla("br"));
  InputIdSayaç += 1;
  ağırlıkHesapla();
  console.log("clicked +")
}

function girdiAlanıÇıkar() {
  InputIdSayaç -= 1;
  dom.adla("iic" + InputIdSayaç).remove();
  ağırlıkHesapla();
  console.log("clicked -")
}

function eşikDeğeriGecerliMi(değer) {
  const toplamAğırlık = dom.adla("iis").value;
  return toplamAğırlık >= değer;
}

function eşikDeğeriBlurOlunca(event) {
  eşikDeğeriGecerliMi(event.target.value);
}

function adresBlurOlunca(event) {
  const yeni = evm.adresDüzelt(event.target.value);
  if (yeni) event.target.value = yeni;
  else console.log("oha"); // TODO(MuhammetCoskun): Arabirimde hata göster
}

function ağırlıkHesapla() {
  /** @type {number} */
  let total = 0;
  for (let /** number */ i = 0; i < InputIdSayaç; ++i) {
    total += parseInt(dom.adla("iiw" + i).value);
  }
  dom.adla("iis").value = total;
}

export { imeceİptalKurVe };
