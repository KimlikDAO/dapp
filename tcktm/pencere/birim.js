import Cüzdan from "/birim/cüzdan/birim";
import TCKT from "/lib/ethereum/TCKT";
import evm from "/lib/ethereum/evm";
import dom from "/lib/util/dom";

/** @const {!Element} */
const Mask = /** @const {!Element} */(dom.adla("inbd"));
/** @const {!Element} */
const İmeceİptalKutusu = /** @const {!Element} */(dom.adla("inmii"));
/** @const {!Element} */
const EşikKutusu = /** @const {!Element} */(dom.adla("inmes"));
/** @const {!Element} */
const SilKutusu = /** @const {!Element} */(dom.adla("inmsy"));

const kutuKapat = () => {
  dom.gizle(Mask);
  dom.gizle(İmeceİptalKutusu);
  dom.gizle(EşikKutusu);
  dom.gizle(SilKutusu);
};

Mask.onmousedown = (e) => {
  if (e.target == Mask) kutuKapat();
};

dom.adla("inx").onclick = kutuKapat;

const imeceİptalKutusuGöster = () => {
  dom.göster(Mask);
  dom.göster(İmeceİptalKutusu);
  const adresGirdisi = dom.adla("iniii");
  let address = adresGirdisi.value;
  const agirlikGirdisi = dom.adla("iniiw");
  adresGirdisi.classList.remove("inin");
  adresGirdisi.onblur = (e) => girdiDüzelt(e.target);
  adresGirdisi.value = "";
  dom.adla("iniiy").onclick = yapıştır;
  dom.adla("iniim").onclick = birAzalt;
  agirlikGirdisi.onblur = ağırlıkBlurOlunca;
  agirlikGirdisi.onclick = (e) => e.target.value = "";
  agirlikGirdisi.value = "1";
  dom.adla("iniip").onclick = (e) => birArttır(e, 9);;
  dom.adla("iniir").onclick = kutuKapat;
  dom.adla("iniio").onclick = () => {
    const weight = +agirlikGirdisi.value;
    address = evm.adresDüzelt(adresGirdisi.value).slice(2).toLowerCase();
    TCKT.addRevoker(
      Cüzdan.ağ(),
      /** @type {string} */(Cüzdan.adres()), weight, address);
  }
}

const eşikKutusuGöster = () => {
  /** @const {string} */
  const ağ = Cüzdan.ağ();
  /** @const {string} */
  const adres = /** @type {string} */(Cüzdan.adres());
  /** @const {Element} */
  const girdi = dom.adla("inesw");

  dom.göster(Mask);
  dom.göster(EşikKutusu);
  dom.adla("inesr").onclick = kutuKapat;

  TCKT.revokesRemaining(ağ, adres).then((eşik) => {
    dom.adla("inesm").onclick = birAzalt;
    dom.adla("inesp").onclick = (e) => birArttır(e, eşik);
    girdi.value = eşik;
    girdi.onclick = (e) => e.target.value = "";
    dom.adla("ineso").onclick = () => {
      /** @const {number} */
      const delta = eşik - Number(girdi.value);
      delta ? TCKT
        .reduceRevokeThreshold(ağ, adres, delta)
        .then(kutuKapat)
        .catch(console.log) : kutuKapat();
    }
  });
}

/**
 * @param {function(string)} iptelEdince
 */
const silKutusuGöster = (iptelEdince) => {
  dom.göster(Mask);
  dom.göster(SilKutusu);
  dom.adla("insyr").onclick = kutuKapat;
  dom.adla("insyo").onclick = () => {
    /** @const {string} */
    const ağ = Cüzdan.ağ();
    /** @const {string} */
    const adres = /** @type {string} */(Cüzdan.adres());
    kutuKapat();
    TCKT.revoke(ağ, adres)
      .then(() => iptelEdince(ağ + adres))
      .catch(console.log);
  }
}

/**
 * @param {Event} event
 */
const yapıştır = (event) => {
  let a = event.target.nodeName === 'A'
    ? event.target : event.target.parentElement;
  const girdi = a.previousElementSibling;
  navigator.clipboard.readText().then((değer) => {
    girdi.value = değer;
    girdiDüzelt(girdi);
  })
}

/**
 * @param {Element} girdi
 */
const girdiDüzelt = (girdi) => {
  /** @const {string} */
  const değer = girdi.value;
  /** @const {?string} */
  const düz = evm.adresDüzelt(değer);
  if (düz) {
    girdi.value = düz;
    dom.adla("iniio").classList.remove("dis");
  }
  /** @const {boolean} */
  const hataVar = değer != "" &&
    (!düz || değer.toLowerCase() === Cüzdan.adres().toLowerCase());
  girdi.classList.toggle("inin", hataVar);
  dom.adla("iniio").classList.toggle("dis", hataVar);
}

const birAzalt = (event) => {
  const node = event.target.nextElementSibling;
  node.value = Math.max(+node.value - 1, 0);
}

const birArttır = (event, max) => {
  const node = event.target.previousElementSibling;
  node.value = Math.min(+node.value + 1, max);
}

const ağırlıkBlurOlunca = (event) => {
  const val = event.target.value;
  if (val > 9) event.target.value = 9;
  if (val < 1 || val === "") event.target.value = 1;
}

export {
  eşikKutusuGöster,
  imeceİptalKutusuGöster,
  silKutusuGöster
};
