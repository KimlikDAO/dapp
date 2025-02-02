import {
  EşikGirdisi,
  GösterDüğmesi,
  Kutu,
  Kök,
  ToplamAğırlık,
  İptalDüğmesi,
  İptalciler
} from "./birim.jsx";
import { AğBilgileri, AğBilgisi } from "../../components/chains/chains.js";
import Cüzdan from "/components/cüzdan/birim";
import { ChainId } from "/lib/crosschain/chains";
import KPass from "/lib/ethereum/KPass";
import evm from "/lib/ethereum/evm";
import dom from "/lib/util/dom";

/**
 * @param {ChainId} ağ Native tokeninde KPass fiyatının gösterileceği ağ.
 */
const fiyatGöster = (ağ) => {
  /** @const {!Element} */
  const indirimsizFiyat = dom.adla("imft");
  /** @const {!Element} */
  const indirimliFiyat = dom.adla("imfs");
  /** @const {!Element} */
  const indirimYüzdesi = dom.adla("imfu");

  /**
   * @type {!AğBilgisi}
   * @const
   */
  const ağBilgisi = AğBilgileri[ağ];
  /** @const {string} */
  const token = ağBilgisi.token || ağBilgisi.tokenKodu;
  /** @const {!Array<string>} */
  const ek = ağBilgisi.tokenEki;
  KPass.priceIn(ağ, 0).then(([çok, az]) => {
    indirimsizFiyat.innerText = dom.paradanMetne(çok) + " " + token + (dom.i18n({ tr: ek[0], en: "" }));
    indirimliFiyat.innerText = dom.paradanMetne(az) + " " + token + (dom.i18n({ tr: ek[1], en: "" }));
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
  GösterDüğmesi.onclick = () => kutularıAç(sonra);
  İptalDüğmesi.onclick = () => atla(sonra);
}

/**
 * @param {function(!Object<string, number>, number)} sonra
 */
const atla = (sonra) => {
  dom.göster(GösterDüğmesi);
  GösterDüğmesi.innerText = dom.i18n({ tr: "Yine de kur", en: "Setup social revoke" });
  dom.göster(İptalDüğmesi);
  İptalDüğmesi.innerText = dom.i18n({ tr: "İmece iptal kurulmadı 🤌", en: "Skipped 🤌" });
  İptalDüğmesi.classList.add("done");
  dom.düğmeDurdur(İptalDüğmesi);
  Kök.classList.add("done");
  dom.gizle(Kutu);
  sonra({}, 0);
}

/**
 * @param {function(!Object<string, number>, number)} sonra
 */
const kutularıAç = (sonra) => {
  /** @const {!Element} */
  const iptalciGirdisiEkleDüğmesi = dom.adla("imba");
  /** @const {!Element} */
  const eşikDüşürDüğmesi = dom.adla("imtm");
  /** @const {!Element} */
  const eşikArtırDüğmesi = dom.adla("imtp");
  /** @const {!Element} */
  const tamamDüğmesi = dom.adla("imbt");
  /** @const {!Element} */
  const atlaDüğmesi = dom.adla("imbi");

  Kök.classList.remove("done");
  dom.göster(Kutu);
  dom.gizle(GösterDüğmesi);
  dom.gizle(İptalDüğmesi);
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
      /** @const {!HTMLInputElement} */
      const girdi = /** @type {!HTMLInputElement} */(satır[i].firstElementChild);
      /** @const {string} */
      const adres = girdi.value;
      if (!evm.adresGeçerli(adres) || adres in adresAğırlığı ||
        adres.toLowerCase() == Cüzdan.adres().toLowerCase()) {
        geçerli = false;
        satır[i].firstElementChild.classList.add("imin");
      } else {
        /** @type {number} */
        const ağırlık = +/** @type {!HTMLInputElement} */(satır[i].children[3]).value;
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
      dom.göster(İptalDüğmesi);
      İptalDüğmesi.innerText = dom.i18n({ tr: "İmece iptal kuruldu ✓", en: "Social revoke setup is complete ✓" });
      İptalDüğmesi.onclick = null;
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
  /** @type {!HTMLInputElement} */(elemanlar[0]).value = "";
  elemanlar[0].onblur = (e) => girdiDüzelt(e.target);
  elemanlar[0].classList.remove("imin");
  elemanlar[1].onclick = yapıştır;
  elemanlar[2].onclick = birAzalt;
  elemanlar[3].onblur = ağırlıkBlurOlunca;
  elemanlar[3].onclick = (e) => e.target.value = "";
  /** @type {!HTMLInputElement} */(elemanlar[3]).value = 1;
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
  const geçerli = +/** @type {!HTMLInputElement} */(event.target).value <= +ToplamAğırlık.value;
  EşikGirdisi.classList.toggle("imin", geçerli);
}

/**
 * @param {!HTMLInputElement} girdi
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
  /** @const {HTMLInputElement} */
  const girdi = /** @type {HTMLInputElement} */(a.previousElementSibling);
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
    total += +/** @type {HTMLInputElement} */(satır[i].children[3]).value;
  }
  ToplamAğırlık.value = total;
  if (+EşikGirdisi.value > total)
    EşikGirdisi.value = total;
}

export default { kurVe, göster };
