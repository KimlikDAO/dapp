/**
 * @fileoverview İmece iptal parçası. DOM'da `im` öneki bu parçaya ayrılmıştır.
 */

import Cüzdan from "/birim/cüzdan/birim";
import evm from "/lib/ethereum/evm";
import TCKT from "/lib/ethereum/TCKT";
import dom from "/lib/util/dom";

/** @const {Element} */
const GösterButonu = dom.adla("imbe");
/** @const {Element} */
const İptalButonu = dom.adla("imbh");
/** @const {Element} */
const İptalciler = dom.adla("imf");

/**
 * @param {string} ağ Native tokeninde TCKT fiyatının gösterileceği ağ.
 */
const fiyatGöster = (ağ) => {
  /** @const {!Array<string>} */
  const ekler = Cüzdan.Paralar[ağ];
  TCKT.priceIn(ağ, 0).then(([çok, az]) => {
    dom.adla("imft").innerText = dom.paradanMetne(çok) + " " + ekler[0] + (dom.TR ? ekler[1] : "");
    dom.adla("imfs").innerText = dom.paradanMetne(az) + " " + ekler[0] + (dom.TR ? ekler[2] : "");
    dom.adla("imfu").innerText = Math.round(100 * (çok - az) / çok);
  });
}

const göster = () => {
  fiyatGöster(Cüzdan.ağ());
  Cüzdan.ağDeğişince(fiyatGöster);
  dom.adla("im").classList.remove("disabled");
}

/**
 * İmece iptal kurulumunu yapar ve verilmiş callback fonksiyonunu çağırır.
 * 
 * @param {function(!Object<string, number>, number)} sonra
 */
const kurVe = (sonra) => {
  GösterButonu.onclick = () => kutularıAç(sonra);
  İptalButonu.onclick = () => atla(sonra);
}

/**
 * @param {function(!Object<string, number>, number)} sonra
 */
const atla = (sonra) => {
  dom.göster(GösterButonu);
  GösterButonu.innerText = dom.TR ? "Yine de kur" : "Setup social revoke";
  dom.göster(İptalButonu);
  İptalButonu.innerText = dom.TR ? "İmece iptal kurulmadı 🤌" : "Skipped 🤌";
  İptalButonu.classList.add("done");
  dom.butonDurdur(İptalButonu);
  dom.adla("im").classList.add("done");
  dom.gizle(dom.adla("imc"));
  sonra({}, 0);
}

/**
 * @param {function(!Object<string, number>, number)} sonra
 */
const kutularıAç = (sonra) => {
  dom.adla("im").classList.remove("done");
  dom.göster(dom.adla("imc"));
  dom.gizle(GösterButonu);
  dom.gizle(İptalButonu);
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

    /** @const {NodeList<!Element>} */
    const satır = İptalciler.children;
    for (let /** number */ i = 0; i < satır.length; ++i) {
      /** @const {Element} */
      const girdi = satır[i].firstElementChild;
      /** @const {string} */
      const adres = girdi.value;
      if (!evm.adresGeçerli(adres) || adres in adresAğırlığı ||
        adres.toLowerCase() === Cüzdan.adres()) {
        geçerli = false;
        satır[i].firstElementChild.classList.add("imin");
      }
      /** @type {number} */
      const ağırlık = +satır[i].children[3].value;
      adresAğırlığı[adres] = ağırlık;
      toplamAğırlık += ağırlık;
    }
    /** @type {number} */
    const eşikDeğeri = +dom.adla("imt").value;
    if (toplamAğırlık < eşikDeğeri) {
      geçerli = false;
      dom.adla("imt").classList.add("imin");
    }
    if (geçerli) {
      dom.göster(İptalButonu);
      İptalButonu.innerText = dom.TR ? "İmece iptal kuruldu ✓" : "Social revoke setup is complete ✓";
      İptalButonu.onclick = null;
      dom.gizle(dom.adla("imc"));
      dom.adla("im").classList.add("done");
      sonra(adresAğırlığı, eşikDeğeri);
    }
  };
}

/**
 * @param {Element} satır
 */
const işlevEkle = (satır) => {
  /** @const {NodeList<!Element>} */
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
  /** @const {number} */
  const tane = İptalciler.childElementCount;
  if (tane >= 5) return;
  /** @type {Element} */
  let yeniSatır = İptalciler.firstElementChild.cloneNode(true);
  işlevEkle(yeniSatır);
  if (tane >= 2)
    İptalciler.classList.add("im3");
  İptalciler.appendChild(yeniSatır);
  ağırlıkHesapla();
}

const eşikDeğeriBlurOlunca = (event) => {
  /** @const {boolean} */
  const geçerli = +event.target.value <= +dom.adla("ims").value;
  dom.adla("imt").classList.toggle("imin", geçerli);
}

/**
 * @param {Element} girdi
 */
const girdiDüzelt = (girdi) => {
  /** @const {string} */
  const değer = girdi.value;
  /** @const {?string} */
  const düz = evm.adresDüzelt(değer);
  if (düz) girdi.value = düz
  /** @const {boolean} */
  const hataVar = değer != "" &&
    (!düz || değer.toLowerCase() === Cüzdan.adres().toLowerCase())
  girdi.classList.toggle("imin", hataVar);
}

/**
 * @param {Event} event
 */
const yapıştır = (event) => {
  /** @type {Element} */
  let a = /** @type {Element} */(event.target);
  for (; a.nodeName !== 'A'; a = a.parentElement)
    if (a.nodeName === 'DIV') return;
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
  const satırSayısı = İptalciler.childElementCount;
  if (satırSayısı <= 3)
    İptalciler.classList.remove("im3");
  if (satırSayısı >= 3)
    a.parentElement.remove();
  ağırlıkHesapla();
}

const birAzalt = (event) => {
  const node = event.target.nextElementSibling;
  if (node.value == 1) return;
  node.value = +node.value - 1;
  ağırlıkHesapla();
}

const birArttır = (event) => {
  const node = event.target.previousElementSibling;
  if (node.value == 9) return;
  node.value = +node.value + 1;
  ağırlıkHesapla();
}

const ağırlıkBlurOlunca = (event) => {
  let val = event.target.value;
  if (val > 9) event.target.value = 9;
  if (val < 1 || val === "") event.target.value = 1;
  ağırlıkHesapla();
}

const eşikBirDeğiştir = (artır) => {
  /** @const {Element} */
  const eşik = dom.adla("imt");
  const değer = +eşik.value;
  const toplam = +dom.adla("ims").value;
  eşik.value = artır
    ? Math.min(değer + 1, 99, toplam) : Math.max(değer - 1, 1);
}

const ağırlıkHesapla = () => {
  /** @type {number} */
  let total = 0;
  /** @const {NodeList<!Element>} */
  const satır = İptalciler.children;
  for (let /** number */ i = 0; i < satır.length; ++i) {
    total += +satır[i].children[3].value;
  }
  dom.adla("ims").value = total;
  const eşik = dom.adla("imt");
  if (eşik.value > total)
    eşik.value = total;
}

export default { kurVe, göster };
