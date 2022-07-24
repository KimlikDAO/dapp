/**
 * @fileoverview İmece iptal parçası. DOM'da `im` öneki bu parçaya ayrılmıştır.
 */

import Cüzdan from "/al/cüzdan";
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

  /** @const {NodeList<!Element>} */
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
      /** @const {Element} */
      const girdi = satır[i].firstElementChild;
      /** @const {string} */
      const adres = girdi.value;
      if (!evm.adresGeçerli(adres) || adres in adresAğırlığı ||
        adres.toLowerCase() == Cüzdan.adres()) {
        geçerli = false;
        satır[i].firstElementChild.classList.add("imin");
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
      dom.adla("imt").classList.add("imin");
    }
    if (geçerli) {
      İptalButonu.style.display = "inline";
      İptalButonu.innerText = "İmece iptal kuruldu 👍";
      İptalButonu.onclick = null;
      dom.adla("imc").style.display = "none";
      dom.adla("im").classList.add("done");
      adresAğırlığı["length"] = İptalciler.childElementCount;
      sonra(adresAğırlığı, eşikDeğeri);
    }
  };
}

function işlevEkle(satır) {
  const elemanlar = satır.children;
  elemanlar[0].value = "";
  elemanlar[0].onblur = (e) => girdiDüzelt(e.target);
  elemanlar[0].classList.remove("imin");
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
  if (İptalciler.childElementCount >= 3)
    İptalciler.classList.add("im3");
  ağırlıkHesapla();
}

function eşikDeğeriBlurOlunca(event) {
  const geçerli =
    parseInt(event.target.value) <= parseInt(dom.adla("ims").value);
  dom.adla("imt").classList.toggle("imin", geçerli);
}

function girdiDüzelt(girdi) {
  const değer = girdi.value;
  const düz = evm.adresDüzelt(değer);
  if (düz) girdi.value = düz
  /** @const {boolean} */
  const hataVar = değer &&
    (!düz || değer.toLowerCase() == Cüzdan.adres().toLowerCase())
  girdi.classList.toggle("imin", hataVar);
}

function yapıştır(event) {
  let a = event.target.nodeName == 'A'
    ? event.target : event.target.parentElement;
  const girdi = a.previousElementSibling;
  navigator.clipboard.readText().then(
    (değer) => {
      girdi.value = değer;
      girdiDüzelt(girdi);
    })
}

function satırSil(event) {
  let a = event.target.nodeName == "A"
    ? event.target : event.target.parentElement
  a.parentElement.remove();
  if (İptalciler.childElementCount < 3) İptalciler.classList.remove("im3");
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
  let val = event.target.value;
  if (val > 9) event.target.value = 9;
  if (val < 1 || val == "") event.target.value = 1;
  ağırlıkHesapla();
}

function ağırlıkHesapla() {
  /** @type {number} */
  let total = 0;
  /** @const {NodeList<!Element>} */
  const satır = İptalciler.children;
  for (let /** number */ i = 0; i < satır.length; ++i) {
    total += parseInt(satır[i].children[3].value);
  }
  dom.adla("ims").value = total;
}

export { imeceİptalKurVe };
