/**
 * @fileoverview İmece iptal parçası. DOM'da `im` öneki bu parçaya ayrılmıştır.
 */

import Cüzdan from "/birim/cüzdan/birim";
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
const imeceİptalKurVe = (sonra) => {
  GösterButonu.onclick = () => göster(sonra);
  İptalButonu.onclick = () => atla(sonra);
}

const atla = (sonra) => {
  GösterButonu.style.display = "";
  GösterButonu.innerText = "Yine de kur";
  İptalButonu.style.display = "";
  İptalButonu.innerText = "İmece iptal kurulmadı 🤌";
  İptalButonu.classList.add("done");
  dom.adla("im").classList.add("done");
  dom.adla("imc").style.display = "none";
  sonra({}, 0);
}

const göster = (sonra) => {
  dom.adla("im").classList.remove("done");
  dom.adla("imc").style.display = "";
  GösterButonu.style.display = "none";
  İptalButonu.style.display = "none";
  dom.adla("imbi").onclick = () => atla(sonra);

  /** @const {NodeList<!Element>} */
  const satır = İptalciler.children;
  for (let i = 0; i < satır.length; ++i) {
    işlevEkle(satır[i]);
  }
  dom.adla("imba").onclick = girdiAlanıEkle;
  dom.adla("imt").onblur = eşikDeğeriBlurOlunca;
  dom.adla("imtm").onclick = () => eşikBirDeğiştir(false);
  dom.adla("imtp").onclick = () => eşikBirDeğiştir(true);
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
      İptalButonu.style.display = "";
      İptalButonu.innerText = "İmece iptal kuruldu ✓";
      İptalButonu.onclick = null;
      dom.adla("imc").style.display = "none";
      dom.adla("im").classList.add("done");
      adresAğırlığı["length"] = İptalciler.childElementCount;
      sonra(adresAğırlığı, eşikDeğeri);
    }
  };
}

const işlevEkle = (satır) => {
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

const girdiAlanıEkle = () => {
  let yeniSatır = İptalciler.firstElementChild.cloneNode(true);
  işlevEkle(yeniSatır);
  İptalciler.appendChild(yeniSatır);
  if (İptalciler.childElementCount >= 3)
    İptalciler.classList.add("im3");
  ağırlıkHesapla();
}

const eşikDeğeriBlurOlunca = (event) => {
  /** @const {boolean} */
  const geçerli =
    parseInt(event.target.value) <= parseInt(dom.adla("ims").value);
  dom.adla("imt").classList.toggle("imin", geçerli);
}

const girdiDüzelt = (girdi) => {
  const değer = girdi.value;
  const düz = evm.adresDüzelt(değer);
  if (düz) girdi.value = düz
  /** @const {boolean} */
  const hataVar = değer &&
    (!düz || değer.toLowerCase() == Cüzdan.adres().toLowerCase())
  girdi.classList.toggle("imin", hataVar);
}

const yapıştır = (event) => {
  let a = event.target.nodeName == 'A'
    ? event.target : event.target.parentElement;
  const girdi = a.previousElementSibling;
  navigator.clipboard.readText().then(
    (değer) => {
      girdi.value = değer;
      girdiDüzelt(girdi);
    })
}

const satırSil = (event) => {
  let a = event.target.nodeName == "A"
    ? event.target : event.target.parentElement
  a.parentElement.remove();
  if (İptalciler.childElementCount < 3) İptalciler.classList.remove("im3");
  ağırlıkHesapla();
}

const birAzalt = (event) => {
  const node = event.target.nextElementSibling;
  if (node.value == 1) return;
  node.value = parseInt(node.value) - 1;
  ağırlıkHesapla();
}

const birArttır = (event) => {
  const node = event.target.previousElementSibling;
  if (node.value == 9) return;
  node.value = parseInt(node.value) + 1;
  ağırlıkHesapla();
}

const ağırlıkBlurOlunca = (event) => {
  let val = event.target.value;
  if (val > 9) event.target.value = 9;
  if (val < 1 || val == "") event.target.value = 1;
  ağırlıkHesapla();
}

const eşikBirDeğiştir = (artır) => {
  const eşik = dom.adla("imt");
  const değer = parseInt(eşik.value);
  const toplam = parseInt(dom.adla("ims").value);
  eşik.value = artır
    ? Math.min(değer + 1, 99, toplam) : Math.max(değer - 1, 1);
}

const ağırlıkHesapla = () => {
  /** @type {number} */
  let total = 0;
  /** @const {NodeList<!Element>} */
  const satır = İptalciler.children;
  for (let /** number */ i = 0; i < satır.length; ++i) {
    total += parseInt(satır[i].children[3].value);
  }
  dom.adla("ims").value = total;
  const eşik = dom.adla("imt");
  if (eşik.value > total)
    eşik.value = total;
}

export { imeceİptalKurVe };
