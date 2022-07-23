/**
 * @fileoverview İmece iptal parçası. DOM'da `im` öneki bu parçaya ayrılmıştır.
 */

import dom from "/lib/dom";
import evm from "/lib/evm";

/** @const {Element} */
const GösterButonu = dom.adla("imbe");
/** @const {Element} */
const İptalButonu = dom.adla("imbh");
/** @const {Element} */
const İptalciler = dom.adla("imf");

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
  dom.adla("im").classList.remove("done");
  dom.adla("imc").style.display = "block";
  dom.adla("imbe").style.display = "none";
  dom.adla("imbh").style.display = "none";

  dom.adla("imbi").onclick = () => atla(sonra);

  /** @const {HTMLCollection} */
  const satır = İptalciler.children;
  for (let i = 0; i < satır.length; ++i) {
    işlevEkle(satır[i]);
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

    const satır = İptalciler.children;
    for (let i = 0; i < satır.length; ++i) {
      const adres = satır[i].firstElementChild.value;
      if (!evm.adresGeçerli(adres) || adres in adresAğırlığı) {
        geçerli = false;
        console.log("hatalı girdi", i);
        // TODO(KimlikDAO-bot): hata bildir kırmızi vs.
      }
      /** @type {number} */
      const ağırlık = parseInt(satır[i].children[3].value);
      adresAğırlığı[adres] = ağırlık;
      toplamAğırlık += ağırlık;
    }
    /** @type {number} */
    const eşikDeğeri = parseInt(dom.adla("imt").value);
    if (toplamAğırlık < eşikDeğeri) {
      geçerli = false;
      dom.adla("imt").classList.add("invalid");
    }
    if (geçerli) {
      dom.adla("imbh").innerText = "İmece iptal kuruldu 👍";
      dom.adla("imc").classList.add("invisible");
      dom.adla("im").classList.add("done");
      dom.adla("imbe").onclick = null;
      adresAğırlığı["length"] = İptalciler.childElementCount;
      sonra(adresAğırlığı, eşikDeğeri);
    }
  };
}

function işlevEkle(satır) {
  const elemanlar = satır.children;
  elemanlar[0].value = "";
  elemanlar[0].onblur = adresBlurOlunca;
  elemanlar[0].classList.remove("invalid");
  elemanlar[1].onclick = yapıştır;
  elemanlar[2].onclick = birAzalt;
  elemanlar[3].onblur = ağırlıkBlurOlunca;
  elemanlar[3].onclick = (e) => e.target.value = "";
  elemanlar[3].value = 1;
  elemanlar[4].onclick = birArttır;
  elemanlar[5].onclick = satırSil;
}

function girdiAlanıEkle() {
  let yeniSatır = İptalciler.firstElementChild.cloneNode(true);
  işlevEkle(yeniSatır);
  İptalciler.appendChild(yeniSatır);
  ağırlıkHesapla();
}

function eşikDeğeriBlurOlunca(event) {
  dom.adla("imt").classList.remove("invalid");
  const geçerli =
      parseInt(event.target.value) <= parseInt(dom.adla("ims").value);
  if (!geçerli) dom.adla("imt").classList.add("invalid");
}

function adresBlurOlunca(event) {
  const düz = evm.adresDüzelt(event.target.value);
  if (düz || !event.target.value) {
    event.target.value = düz;
    event.target.classList.remove("invalid");
  } else {
    event.target.classList.add("invalid");
  };
}

function yapıştır(event) {
  let a = event.target;
  if (event.target.nodeName != "A") a = event.target.parentElement;
  const node = a.previousElementSibling;
  navigator.clipboard.readText().then((value) => {
    const düz = evm.adresDüzelt(value);
    if (düz) {
      node.value = düz;
      node.classList.remove("invalid");
    } else {
      node.classList.add("invalid");
      node.value = value;
    }
  })
}

function satırSil(event) {
  let a = event.target;
  if (event.target.nodeName != "A") a = event.target.parentElement;
  a.parentElement.remove();
  ağırlıkHesapla();
}

function birAzalt(event) {
  const node = event.target.nextElementSibling;
  if (node.value == 1) return;
  node.value = parseInt(node.value) - 1;
  ağırlıkHesapla();
}

function birArttır(event) {
  const node = event.target.previousElementSibling;
  if (node.value == 9) return;
  node.value = parseInt(node.value) + 1;
  ağırlıkHesapla();
}

function ağırlıkBlurOlunca(event) {
  ağırlıkDüzenle(event);
  ağırlıkHesapla();
}

function ağırlıkDüzenle(event) {
  let n = event.target.value;
  if (n > 9) event.target.value = 9;
  if (n < 1 || n == "") event.target.value = 1;
}

function ağırlıkHesapla() {
  /** @type {number} */
  let total = 0;
  /** @const {HTMLCollection} */
  const satır = İptalciler.children;

  for (let /** number */ i = 0; i < satır.length; ++i) {
    total += parseInt(satır[i].children[3].value);
  }
  dom.adla("ims").value = total;
}

export { imeceİptalKurVe };
