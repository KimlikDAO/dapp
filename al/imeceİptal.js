/**
 * @fileoverview İmece iptal parçası. DOM'da `im` öneki bu parçaya ayrılmıştır.
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
  dom.adla("imbg").onclick = () => göster(sonra);
  dom.adla("imbi").onclick = () => {
    dom.adla("imbi").innerText = "İmece iptal kurulmadı 🤌";
    dom.adla("im").classList.add("invisible");
    sonra({}, 0);
  }
}

function göster(sonra) {
  dom.adla("im").style.display = "block";
  dom.adla("imbg").style.display = "none";
  dom.adla("imbi").style.display = "none";

  const rows = dom.adla("imf").children;
  for (let i = 0; i < rows.length; ++i) {
    rows[i].firstElementChild.onblur = adresBlurOlunca;
    rows[i].lastElementChild.onblur = ağırlıkHesapla;
  }
  dom.adla("imbe").onclick = girdiAlanıEkle;
  dom.adla("imt").onblur = eşikDeğeriBlurOlunca;
  dom.adla("s4e").onclick = () => {
    /** @type {!Object<string, number>} */
    let adresAğırlığı = {};
    /** @type {boolean} */
    let geçerli = true;
    /** @type {number} */
    let toplamAğırlık = 0;

    const arklar = dom.adla("imf").children;
    for (let i = 0; i < arklar.length; ++i) {
      const adres = arklar[i].firstElementChild.value;
      if (!evm.adresGeçerli(adres) || adres in adresAğırlığı) {
        geçerli = false;
        console.log("hatalı girdi", i);
        // TODO(KimlikDAO-bot): hata bildir kırmızi vs.
      }
      /** @type {number} */
      const ağırlık = parseInt(arklar[i].lastElementChild.value);
      adresAğırlığı[adres] = ağırlık;
      toplamAğırlık += ağırlık;
    }
    /** @type {number} */
    const eşikDeğeri = parseInt(dom.adla("imt").value);
    if (toplamAğırlık < eşikDeğeri) {
      geçerli = false;
      // TODO(MuhammetCoskun): hata bildir
    }
    if (geçerli) {
      dom.adla("imbi").innerHTML = "İmece iptal kuruldu 👍";
      dom.adla("im").classList.add("invisible");
      dom.adla("s4").classList.add("done");
      dom.adla("imbi").style.display = "none";
      dom.adla("imbg").onclick = null;
      sonra(adresAğırlığı, eşikDeğeri);
    }
  };
  dom.adla("s4f").onclick = () => {
    dom.adla("im").classList.add("invisible");
  };
}

function girdiAlanıEkle() {
  const div = document.createElement("div");
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  div.id = "imc" + InputIdSayaç;
  div.classList.add("container");
  input1.id = "ima" + InputIdSayaç;
  input1.classList.add("address-input");
  input1.type = "text";
  input1.onblur = adresBlurOlunca;
  input2.id = "imw" + InputIdSayaç;
  input2.classList.add("weight-input");
  input2.type = "number";
  input2.onblur = ağırlıkHesapla;
  input2.value = 1;
  div.appendChild(input1);
  div.appendChild(input2);
  dom.adla("imf").insertBefore(div, dom.adla("br"));
  InputIdSayaç += 1;
  ağırlıkHesapla();
  console.log("clicked +")
}

function eşikDeğeriGecerliMi(değer) {
  const toplamAğırlık = dom.adla("ims").value;
  return toplamAğırlık >= değer;
}

function eşikDeğeriBlurOlunca(event) {
  eşikDeğeriGecerliMi(event.target.value);
}

function adresBlurOlunca(event) {
  console.log(event.target.value);
  const yeni = evm.adresDüzelt(event.target.value);
  if (yeni) event.target.value = yeni;
  else console.log("oha"); // TODO(MuhammetCoskun): Arabirimde hata göster
}

function ağırlıkHesapla() {
  /** @type {number} */
  let total = 0;
  for (let /** number */ i = 0; i < InputIdSayaç; ++i) {
    total += parseInt(dom.adla("imw" + i).value);
  }
  dom.adla("ims").value = total;
}

export { imeceİptalKurVe };
