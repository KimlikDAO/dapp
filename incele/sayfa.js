/**
 * @fileoverview İncele sayfası giriş noktası
 *
  */
import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
import dom from '/lib/dom';
import evm from "/lib/evm";
import TCKT from '/lib/TCKT';
import { keccak256 } from '/lib/sha3';

console.log(keccak256("addRevoker(uint256)").slice(0, 8));

/** @const {Element} */
const CüzdanaEkleDüğmesi = dom.adla("inbtn0");
/** @const {Element} */
const İmeceİptalDüğmesi = dom.adla("inbtn1");
/** @const {Element} */
const EşikAzaltmaDüğmesi = dom.adla("inbtn2");
/** @const {Element} */
const SilDüğmesi = dom.adla("inbtn3");
/** @const {Element} */
const ÇevirDüğmesi = dom.adla("intcktb");
/** @const {Element} */
const Mask = dom.adla("inbd");
/** @const {Element} */
const İmeceİptalModal = dom.adla("inmii");
/** @const {Element} */
const EşikModal = dom.adla("inmes");
/** @const {Element} */
const SilModal = dom.adla("inmsy");

dom.adla("tc").style.opacity = "";
ÇevirDüğmesi.onclick = Tckt.çevir;

const modalKapat = () => {
  Mask.style.display = "none";
  İmeceİptalModal.style.display = "none";
  EşikModal.style.display = "none";
  SilModal.style.display = "none";
}

Mask.onmousedown = (e) => {
  if (e.target != Mask) return;
  modalKapat();
};

dom.adla("inx").onclick = modalKapat;

const cüzdanaEkle = () => {
  ethereum.request(/** @type {RequestParams} */({
    method: 'wallet_watchAsset',
    params: /** @type {WatchAssetParams} */({
      type: 'ERC721',
      options: {
        address: TCKT.TCKT_ADDR,
        symbol: 'TCKT',
        decimals: "0",
      }
    }),
  })).then((resolved) => {
    if (!resolved) return;
    CüzdanaEkleDüğmesi.innerText = dom.TR ? "Eklendi ✓" : "Added to wallet ✓";
    dom.butonDurdur(CüzdanaEkleDüğmesi);
  }).catch(console.log);
}

const imeceİptalModalGöster = () => {
  Mask.style.display = "";
  İmeceİptalModal.style.display = "";
  /** @type {Element} */
  const adresGirdisi = dom.adla("iniii");
  /** @type {Element} */
  const ağırlıkGirdisi = dom.adla("iniiw");
  adresGirdisi.classList.remove("inin");
  /** @param {Event} e*/
  adresGirdisi.onblur = (e) => girdiDüzelt(e.target);
  adresGirdisi.value = "";
  dom.adla("iniiy").onclick = yapıştır;
  dom.adla("iniim").onclick = birAzalt;
  ağırlıkGirdisi.onblur = ağırlıkBlurOlunca;
  /** @param {Event} e*/
  ağırlıkGirdisi.onclick = (e) => e.target.value = "";
  ağırlıkGirdisi.value = "1";
  /** @param {Event} e*/
  dom.adla("iniip").onclick = (e) => birArttır(e, 9);
  dom.adla("iniir").onclick = modalKapat;
  dom.adla("iniio").onclick = () => {
    /** @type {string} */
    const adres = adresGirdisi.value;
    if(!evm.adresGeçerli(adres) || adres.toLowerCase() === Cüzdan.adres()) {
      adresGirdisi.classList.add("inin");
      return
    }
    /** @type {number} */
    const ağırlık = parseInt(ağırlıkGirdisi.value);
    TCKT.addRevoker(ağırlık, adres);
  }
}

const EşikModalGöster = () => {
  Mask.style.display = "";
  EşikModal.style.display = "";
  dom.adla("inesm").onclick = birAzalt;
  dom.adla("inesp").onclick = (e) => birArttır(e, 99); //99 yerine mevcut threshold gelecek
  dom.adla("inesw").value = "1"; //mevcut threshold gelecek
  dom.adla("inesw").onclick = (e) => e.target.value = "";
  dom.adla("ineso").onclick = () => console.log(dom.adla("inesw").value); //TCKT.changeThreshold methodu gelecek
  dom.adla("inesr").onclick = modalKapat;
}

const SilModalGöster = () => {
  Mask.style.display = "";
  SilModal.style.display = "";
  dom.adla("insyr").onclick = modalKapat;
  dom.adla("insyo").onclick = () => console.log("DELETED"); //TCKT.destroyTCKT methodu
}

Cüzdan.bağlanınca(() => {
  CüzdanaEkleDüğmesi.onclick = cüzdanaEkle;
  İmeceİptalDüğmesi.onclick = imeceİptalModalGöster;
  EşikAzaltmaDüğmesi.onclick = EşikModalGöster;
  SilDüğmesi.onclick = SilModalGöster;
});

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
  if (düz) girdi.value = düz;
  /** @const {boolean} */
  const hataVar = değer != "" &&
    (!düz || değer.toLowerCase() === Cüzdan.adres().toLowerCase());
  girdi.classList.toggle("inin", hataVar);
}

const birAzalt = (event) => {
  const node = event.target.nextElementSibling;
  if (node.value == 1) return;
  node.value = parseInt(node.value) - 1;
}

const birArttır = (event, max) => {
  const node = event.target.previousElementSibling;
  node.value = Math.min(parseInt(node.value) + 1, max);
}

const ağırlıkBlurOlunca = (event) => {
  let val = event.target.value;
  if (val > 9) event.target.value = 9;
  if (val < 1 || val === "") event.target.value = 1;
}
