/**
 * @fileoverview İmece iptal parçası. DOM'da `im` öneki bu parçaya ayrılmıştır.
 */

import { AğBilgileri, AğBilgisi } from "/birim/ağlar/birim";
import Cüzdan from "/birim/cüzdan/birim";
import { ChainId } from "/lib/crosschain/chainId";
import TCKT from "/lib/ethereum/TCKT";
import evm from "/lib/ethereum/evm";
import dom from "/lib/util/dom";

/** @const {!Element} */
const Kök = /** @type {!Element} */(dom.adla("im"));
/** @const {!Element} */
const EşikGirdisi = /** @type {!Element} */(dom.adla("imt"));
/** @const {!Element} */
const GösterButonu = /** @type {!Element} */(dom.adla("imbe"));
/** @const {!Element} */
const İptalButonu = /** @type {!Element} */(dom.adla("imbh"));
/** @const {!Element} */
const İptalciler = /** @type {!Element} */(dom.adla("imf"));
/** @const {!Element} */
const Kutu = /** @type {!Element} */(dom.adla("imc"));
/** @const {!Element} */
const ToplamAğırlık = /** @type {!Element} */(dom.adla("ims"));

/**
 * @param {ChainId} ağ Native tokeninde TCKT fiyatının gösterileceği ağ.
 */
const fiyatGöster = (ağ) => {
  /** @const {!Element} */
  const indirimsizFiyat = /** @type {!Element} */(dom.adla("imft"));
  /** @const {!Element} */
  const indirimliFiyat = /** @type {!Element} */(dom.adla("imfs"));
  /** @const {!Element} */
  const indirimYüzdesi = /** @type {!Element} */(dom.adla("imfu"));

  /**
   * @type {!AğBilgisi}
   * @const
   */
  const ağBilgisi = AğBilgileri[ağ];
  /** @const {string} */
  const token = ağBilgisi.token || ağBilgisi.tokenKodu;
  /** @const {!Array<string>} */
  const ek = ağBilgisi.tokenEki;
  TCKT.priceIn(ağ, 0).then(([çok, az]) => {
    indirimsizFiyat.innerText = dom.paradanMetne(çok) + " " + token + (dom.TR ? ek[0] : "");
    indirimliFiyat.innerText = dom.paradanMetne(az) + " " + token + (dom.TR ? ek[1] : "");
    indirimYüzdesi.innerText = Math.round(100 * (çok - az) / çok);
  });
}

const göster = () => {
  fiyatGöster(Cüzdan.ağ());
  Cüzdan.ağDeğişince(fiyatGöster);
  Kök.classList.remove("disabled");
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
  dom.düğmeDurdur(İptalButonu);
  Kök.classList.add("done");
  dom.gizle(Kutu);
  sonra({}, 0);
}

/**
 * @param {function(!Object<string, number>, number)} sonra
 */
const kutularıAç = (sonra) => {
  /** @const {!Element} */
  const iptalciGirdisiEkleDüğmesi = /** @type {!Element} */(dom.adla("imba"));
  /** @const {!Element} */
  const eşikDüşürDüğmesi = /** @type {!Element} */(dom.adla("imtm"));
  /** @const {!Element} */
  const eşikArtırDüğmesi = /** @type {!Element} */(dom.adla("imtp"));
  /** @const {!Element} */
  const tamamDüğmesi = /** @type {!Element} */(dom.adla("imbt"));
  /** @const {!Element} */
  const atlaDüğmesi = /** @type {!Element} */(dom.adla("imbi"));

  Kök.classList.remove("done");
  dom.göster(Kutu);
  dom.gizle(GösterButonu);
  dom.gizle(İptalButonu);
  atlaDüğmesi.onclick = () => atla(sonra);

  /** @const {NodeList<!Element>} */
  const satır = İptalciler.children;
  for (let i = 0; i < satır.length; ++i)
    işlevEkle(satır[i]);

  iptalciGirdisiEkleDüğmesi.onclick = iptalciGirdisiEkle;
  EşikGirdisi.onblur = eşikDeğeriBlurOlunca;
  eşikDüşürDüğmesi.onclick = () => eşikBirDeğiştir(false);
  eşikArtırDüğmesi.onclick = () => eşikBirDeğiştir(true);
  tamamDüğmesi.onclick = () => {
    /** @type {!Object<string, number>} */
    let adresAğırlığı = {};
    /** @type {boolean} */
    let geçerli = true;
    /** @type {number} */
    let toplamAğırlık = 0;

    /** @const {NodeList<!Element>} */
    const satır = İptalciler.children;
    for (let /** number */ i = 0; i < satır.length; ++i) {
      /** @const {!Element} */
      const girdi = /** @type {!Element} */(satır[i].firstElementChild);
      /** @const {string} */
      const adres = girdi.value;
      if (!evm.adresGeçerli(adres) || adres in adresAğırlığı ||
        adres.toLowerCase() == Cüzdan.adres().toLowerCase()) {
        geçerli = false;
        satır[i].firstElementChild.classList.add("imin");
      } else {
        /** @type {number} */
        const ağırlık = +satır[i].children[3].value;
        adresAğırlığı[adres] = ağırlık;
        toplamAğırlık += ağırlık;
      }
    }
    /** @type {number} */
    const eşikDeğeri = +EşikGirdisi.value;
    if (toplamAğırlık < eşikDeğeri) {
      geçerli = false;
      EşikGirdisi.classList.add("imin");
    }
    if (Object.keys(adresAğırlığı).length < 3) {
      geçerli = false;
    }
    if (geçerli) {
      dom.göster(İptalButonu);
      İptalButonu.innerText = dom.TR ? "İmece iptal kuruldu ✓" : "Social revoke setup is complete ✓";
      İptalButonu.onclick = null;
      dom.gizle(Kutu);
      Kök.classList.add("done");
      sonra(adresAğırlığı, eşikDeğeri);
    }
  };
}

/**
 * @param {!Element} satır
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
  elemanlar[5].onclick = iptalciGirdisiSil;
}

const iptalciGirdisiEkle = () => {
  /** @const {number} */
  const tane = İptalciler.childElementCount;
  if (tane >= 5) return;
  /** @const {!Element} */
  const yeniSatır = İptalciler.firstElementChild.cloneNode(true);
  işlevEkle(yeniSatır);
  if (tane >= 3)
    İptalciler.classList.add("im4");
  İptalciler.appendChild(yeniSatır);
  ağırlıkHesapla();
}

const iptalciGirdisiSil = (event) => {
  /** @type {Element} */
  const a = event.target.nodeName == "A"
    ? event.target : event.target.parentElement
  const satırSayısı = İptalciler.childElementCount;
  // Silmeden önceki sayı 4 ise, x'leri kaldır.
  if (satırSayısı <= 4)
    İptalciler.classList.remove("im4");
  if (satırSayısı > 3)
    a.parentElement.remove();
  ağırlıkHesapla();
}

/**
 * @param {Event} event
 */
const eşikDeğeriBlurOlunca = (event) => {
  /** @const {boolean} */
  const geçerli = +event.target.value <= +ToplamAğırlık.value;
  EşikGirdisi.classList.toggle("imin", geçerli);
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
    (!düz || değer.toLowerCase() == Cüzdan.adres().toLowerCase())
  girdi.classList.toggle("imin", hataVar);
}

/**
 * @param {Event} event
 */
const yapıştır = (event) => {
  /** @type {Element} */
  let a = /** @type {Element} */(event.target);
  for (; a.nodeName !== 'A'; a = a.parentElement)
    if (a.nodeName == 'DIV') return;
  const girdi = a.previousElementSibling;
  navigator.clipboard.readText().then(
    (değer) => {
      girdi.value = değer;
      girdiDüzelt(girdi);
    })
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
  if (val < 1 || val == "") event.target.value = 1;
  ağırlıkHesapla();
}

const eşikBirDeğiştir = (artır) => {
  /** @const {number} */
  const değer = +EşikGirdisi.value;
  /** @const {number} */
  const toplam = +ToplamAğırlık.value;
  EşikGirdisi.value = artır
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
  ToplamAğırlık.value = total;
  if (EşikGirdisi.value > total)
    EşikGirdisi.value = total;
}

export default { kurVe, göster };
