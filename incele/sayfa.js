/**
 * @fileoverview İncele sayfası giriş noktası
 *
  */
import Cüzdan from '/birim/cüzdan/birim';
import '/birim/TCKT/birim';
import dom from '/lib/dom';
import evm from "/lib/evm";
import TCKT from '/lib/TCKT';

/** @const {Element} */
const cüzdanaEkleDüğmesi = dom.adla("inbtn0");
/** @const {Element} */
const imeceİptalDüğmesi = dom.adla("inbtn1");
/** @const {Element} */
const esikAzaltmaDüğmesi = dom.adla("inbtn2");
/** @const {Element} */
const silDüğmesi = dom.adla("inbtn3");
/** @const {Element} */
const nftCevirDüğmesi = dom.adla("intcktb");
/** @const {Element} */
const mask = dom.adla("inbd");
/** @const {Element} */
const imeceİptalModal = dom.adla("inmii");
/** @const {Element} */
const esikModal = dom.adla("inmes");
/** @const {Element} */
const silModal = dom.adla("inmsy");

dom.adla("tc").style.display = "";
nftCevirDüğmesi.onclick = () => dom.adla("tc").classList.toggle("flipped");

const modalKapat = () => {
  mask.style.display = "none";
  imeceİptalModal.style.display = "none";
  esikModal.style.display = "none";
  silModal.style.display = "none";
}

mask.onclick = (e) => {
  if (e.target != mask) return;
  modalKapat();
};

const cüzdanaEkle = () => {
  ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC721',
      options: {
        address: TCKT.TCKT_ADDR,
        symbol: 'TCKT',
        decimals: 0,
      },
    },
  })
    .then((resolved) => {
      if (!resolved) return;
      cüzdanaEkleDüğmesi.innerText = "Eklendi 👍";
      dom.butonDurdur(cüzdanaEkleDüğmesi);
    })
    .catch(console.error);
}

const imeceİptalModalGöster = () => {
  mask.style.display = "flex";
  imeceİptalModal.style.display = "";
  const adresGirdisi = dom.adla("iniii");
  const agirlikGirdisi = dom.adla("iniiw");
  adresGirdisi.classList.remove("inin");
  adresGirdisi.onblur = (e) => girdiDüzelt(e.target);
  adresGirdisi.value = "";
  dom.adla("iniiy").onclick = yapıştır;
  dom.adla("iniim").onclick = birAzalt;
  agirlikGirdisi.onblur = ağırlıkBlurOlunca;
  agirlikGirdisi.onclick = (e) => e.target.value = "";
  agirlikGirdisi.value = "1";
  dom.adla("iniip").onclick = birArttır;
  dom.adla("iniir").onclick = modalKapat;
  //TODO MuhammetCoskun tamam düğmesi adres geçersiz oldugu zaman disabled olsun
  dom.adla("iniio").onclick = () => {
    const weight = parseInt(agirlikGirdisi.value);
    let address = evm.adresDüzelt(adresGirdisi.value).slice(2).toLowerCase();
    TCKT.addRevoker(weight, address);
  }
}

const esikModalGöster = () => {
  mask.style.display = "flex";
  esikModal.style.display = "";
  dom.adla("inesm").onclick = birAzalt;
  dom.adla("inesp").onclick = birArttır;
  dom.adla("inesw").value = "1"; //mevcut threshold gelcek
  dom.adla("inesw").onclick = (e) => e.target.value = "";
  dom.adla("ineso").onclick = () => console.log(dom.adla("inesw").value); //TCKT.changeThreshold methodu gelecek
  dom.adla("inesr").onclick = modalKapat;
}

const silModalGöster = () => {
  mask.style.display = "flex";
  silModal.style.display = "";
  dom.adla("insyr").onclick = modalKapat;
  dom.adla("insyo").onclick = () => console.log("DELETED"); //TCKT.destroyTCKT methodu
}

Cüzdan.bağlanınca(() => {
  cüzdanaEkleDüğmesi.onclick = cüzdanaEkle;
  imeceİptalDüğmesi.onclick = imeceİptalModalGöster;
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
  navigator.clipboard.readText().then(
    (değer) => {
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
  if (düz) girdi.value = düz
  /** @const {boolean} */
  const hataVar = değer &&
    (!düz || değer.toLowerCase() === Cüzdan.adres().toLowerCase());
  hataVar ? girdi.classList.add("inin") : girdi.classList.remove("inin");
}

const birAzalt = (event) => {
  const node = event.target.nextElementSibling;
  if (node.value == 1) return;
  node.value = parseInt(node.value) - 1;
}

const birArttır = (event) => {
  const node = event.target.previousElementSibling;
  if (node.value == 9) return;
  node.value = parseInt(node.value) + 1;
}

const ağırlıkBlurOlunca = (event) => {
  let val = event.target.value;
  if (val > 9) event.target.value = 9;
  if (val < 1 || val === "") event.target.value = 1;
}
