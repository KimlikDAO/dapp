/**
 * @fileoverview İncele sayfası giriş noktası
 *
  */
import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
import dom from '/lib/dom';
import evm from "/lib/evm";
import TCKT from '/lib/TCKT';

/** @const {Element} */
const CüzdanaEkleDüğmesi = dom.adla("inbtn0");
/** @const {Element} */
const İmeceİptalDüğmesi = dom.adla("inbtn1");
/** @const {Element} */
const esikAzaltmaDüğmesi = dom.adla("inbtn2");
/** @const {Element} */
const silDüğmesi = dom.adla("inbtn3");
/** @const {Element} */
const ÇevirDüğmesi = dom.adla("intcktb");
/** @const {Element} */
const mask = dom.adla("inbd");
/** @const {Element} */
const imeceİptalModal = dom.adla("inmii");
/** @const {Element} */
const esikModal = dom.adla("inmes");
/** @const {Element} */
const silModal = dom.adla("inmsy");

dom.adla("tc").style.display = "";
ÇevirDüğmesi.onclick = Tckt.çevir;

const modalKapat = () => {
  mask.style.display = "none";
  imeceİptalModal.style.display = "none";
  esikModal.style.display = "none";
  silModal.style.display = "none";
}

mask.onmousedown = (e) => {
  if (e.target != mask) return;
  modalKapat();
};

dom.adla("inx").onclick = modalKapat;

const cüzdanaEkle = () => {
  ethereum.request({
    method: 'wallet_watchAsset',
    params: /** @type {WatchAssetParams} */({
      type: 'ERC721',
      options: {
        address: TCKT.TCKT_ADDR,
        symbol: 'TCKT',
        decimals: "0",
      }
    }),
  }).then((resolved) => {
    if (!resolved) return;
    CüzdanaEkleDüğmesi.innerText = dom.TR ? "Eklendi ✓" : "Added to wallet ✓";
    dom.butonDurdur(CüzdanaEkleDüğmesi);
  }).catch(console.log);
}

const imeceİptalModalGöster = () => {
  mask.style.display = "";
  imeceİptalModal.style.display = "";
  dom.adla("iniio").classList.add("disabled");
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
  dom.adla("iniir").onclick = modalKapat;
  dom.adla("iniio").onclick = () => {
    const weight = parseInt(agirlikGirdisi.value);
    address = evm.adresDüzelt(adresGirdisi.value).slice(2).toLowerCase();
    TCKT.addRevoker(weight, address);
  }
}

const esikModalGöster = () => {
  mask.style.display = "";
  esikModal.style.display = "";
  dom.adla("inesm").onclick = birAzalt;
  dom.adla("inesp").onclick = (e) => birArttır(e, 99); //99 yerine mevcut threshold gelecek
  dom.adla("inesw").value = "1"; //mevcut threshold gelecek
  dom.adla("inesw").onclick = (e) => e.target.value = "";
  dom.adla("ineso").onclick = () => console.log(dom.adla("inesw").value); //TCKT.changeThreshold methodu gelecek
  dom.adla("inesr").onclick = modalKapat;
}

const silModalGöster = () => {
  mask.style.display = "";
  silModal.style.display = "";
  dom.adla("insyr").onclick = modalKapat;
  dom.adla("insyo").onclick = () => console.log("DELETED"); //TCKT.destroyTCKT methodu
}

Cüzdan.bağlanınca(() => {
  CüzdanaEkleDüğmesi.onclick = cüzdanaEkle;
  İmeceİptalDüğmesi.onclick = imeceİptalModalGöster;
  esikAzaltmaDüğmesi.onclick = esikModalGöster;
  silDüğmesi.onclick = silModalGöster;
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
  const değer = girdi.value;
  const düz = evm.adresDüzelt(değer);
  if (düz) {
    girdi.value = düz;
    dom.adla("iniio").classList.remove("disabled");
  }
  /** @const {boolean} */
  const hataVar = değer &&
    (!düz || değer.toLowerCase() === Cüzdan.adres().toLowerCase());
  girdi.classList.toggle("inin", hataVar);
  dom.adla("iniio").classList.toggle("disabled", hataVar);
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
