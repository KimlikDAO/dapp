/**
 * @fileoverview İmece iptal parçası. DOM'da `im` öneki bu parçaya ayrılmıştır.
 */

import dom from "/lib/dom";
import evm from "/lib/evm";

/** @const {Element} */
const GösterButonu = dom.adla("imbe");
/** @const {Element} */
const İptalButonu = dom.adla("imbh");

/**
 * İmece iptal kurulumunu yapar ve verilmiş callback fonksiyonunu çağırır.
 * 
 * @param {function(Object<string,number>,number)} sonra
 */
function imeceİptalKurVe(sonra) {
  GösterButonu.onclick = () => göster(sonra);
  İptalButonu.onclick = () => atla(sonra);
}

function atla(sonra) {
  GösterButonu.style.display = "inline";
  GösterButonu.innerText = "Yine de kur";
  İptalButonu.style.display = "inline";
  İptalButonu.innerText = "İmece iptal kurulmadı 🤌";
  İptalButonu.classList.add("done");
  dom.adla("im").classList.add("done");
  dom.adla("imc").style.display = "none";
  sonra({}, 0);
}

function göster(sonra) {
  dom.adla("imc").style.display = "block";
  dom.adla("imbe").style.display = "none";
  dom.adla("imbh").style.display = "none";

  dom.adla("imbi").onclick = () => atla(sonra);

  /** @const {HTMLCollection} */
  const rows = dom.adla("imf").children;
  for (let i = 0; i < rows.length; ++i) {
    rows[i].firstElementChild.onblur = adresBlurOlunca;
    rows[i].lastElementChild.onblur = ağırlıkHesapla;
  }
  dom.adla("imba").onclick = girdiAlanıEkle;
  dom.adla("imt").onblur = eşikDeğeriBlurOlunca;
  dom.adla("imbt").onclick = () => {
    /** @type {!Object<string, number>} */
    let adresAğırlığı = {};
    /** @type {boolean} */
    let geçerli = true;
    /** @type {number} */
    let toplamAğırlık = 0;

    const satır = dom.adla("imf").children;
    for (let i = 0; i < satır.length; ++i) {
      const adres = satır[i].firstElementChild.value;
      if (!evm.adresGeçerli(adres) || adres in adresAğırlığı) {
        geçerli = false;
        console.log("hatalı girdi", i);
        // TODO(KimlikDAO-bot): hata bildir kırmızi vs.
      }
      /** @type {number} */
      const ağırlık = parseInt(satır[i].lastElementChild.value);
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
      dom.adla("imbh").innerText = "İmece iptal kuruldu 👍";
      dom.adla("imc").classList.add("invisible");
      dom.adla("im").classList.add("done");
      dom.adla("imbe").onclick = null;
      adresAğırlığı["length"] = dom.adla("imf").childElementCount;
      sonra(adresAğırlığı, eşikDeğeri);
    }
  };
}

function girdiAlanıEkle() {
  const div = document.createElement("div");
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  div.classList.add("imcont");
  input1.classList.add("imai");
  input1.type = "text";
  input1.onblur = adresBlurOlunca;
  input2.classList.add("imwi");
  input2.type = "number";
  input2.onblur = ağırlıkHesapla;
  input2.value = 1;
  div.appendChild(input1);
  div.appendChild(input2);
  dom.adla("imf").appendChild(div);
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
  const düz = evm.adresDüzelt(event.target.value);
  if (düz) event.target.value = düz;
  else console.log("oha"); // TODO(MuhammetCoskun): Arabirimde hata göster
}

function ağırlıkHesapla() {
  /** @type {number} */
  let total = 0;
  /** @const {HTMLCollection} */
  const satır = dom.adla("imf").children;

  for (let /** number */ i = 0; i < satır.length; ++i) {
    total += parseInt(satır[i].lastElementChild.value);
  }
  dom.adla("ims").value = total;
}

export { imeceİptalKurVe };
