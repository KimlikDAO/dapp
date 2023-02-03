/**
 * @fileoverview İncele sayfası giriş noktası
 *
 */
import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
import { fromUnlockableNFT } from '/lib/did/decryptedSections';
import evm from "/lib/ethereum/evm";
import TCKT from '/lib/ethereum/TCKT';
import ipfs from '/lib/node/ipfs';
import dom from '/lib/util/dom';
import { hexten } from '/lib/util/çevir';

/** @const {string} */
const KIMLIKDAO_IPFS_URL = "https://ipfs.kimlikdao.org/";

/** @const {Element} */
const İmeceİptalDüğmesi = dom.adla("inbtn1");
/** @const {Element} */
const EşikAzaltmaDüğmesi = dom.adla("inbtn2");
/** @const {Element} */
const SilDüğmesi = dom.adla("inbtn3");
/** @const {Element} */
const AçDüğmesi = dom.adla("intcktb");
/** @const {Element} */
const Mask = dom.adla("inbd");
/** @const {Element} */
const İmeceİptalKutusu = dom.adla("inmii");
/** @const {Element} */
const EşikKutusu = dom.adla("inmes");
/** @const {Element} */
const SilKutusu = dom.adla("inmsy");

/** @const {!Object<string, !did.DecryptedSections>} */
const Bellek = {};

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
    TCKT.addRevoker(/** @type {string} */(Cüzdan.adres()), weight, address);
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

  TCKT.revokesRemaining(adres).then((eşik) => {
    dom.adla("inesm").onclick = birAzalt;
    dom.adla("inesp").onclick = (e) => birArttır(e, eşik);
    girdi.value = eşik;
    girdi.onclick = (e) => e.target.value = "";
    dom.adla("ineso").onclick = () => {
      /** @const {number} */
      const delta = eşik - Number(girdi.value);
      delta ? TCKT
        .reduceRevokeThreshold(adres, delta)
        .then(kutuKapat)
        .catch(console.log) : kutuKapat();
    }
  });
}

const silKutusuGöster = () => {
  dom.göster(Mask);
  dom.göster(SilKutusu);
  dom.adla("insyr").onclick = kutuKapat;
  dom.adla("insyo").onclick = () => {
    /** @const {string} */
    const ağ = Cüzdan.ağ();
    /** @const {string} */
    const adres = /** @type {string} */(Cüzdan.adres());
    kutuKapat();
    TCKT.revoke(adres)
      .then(() => {
        delete Bellek[ağ + adres];
        kapalıYüzGöster(adres);
      })
      .catch(console.log);
  }
}

/** @type {string} */
let CidHex = "";

/**
 * @param {!did.DecryptedSections} açıkTckt
 */
const açıkYüzGöster = (açıkTckt) => {
  Tckt.açıkTcktGöster(açıkTckt);
  AçDüğmesi.innerText = dom.TR ? "Gizle" : "Hide";
  AçDüğmesi.onclick = () => kapalıYüzGöster(/** @type {string} */(Cüzdan.adres()));
}

/**
 * @param {string} adres
 */
const kapalıYüzGöster = (adres) => {
  Tckt.yüzGöster(false);
  AçDüğmesi.onclick = null;
  AçDüğmesi.innerText = dom.TR ? "Aç" : "Unlock";
  const bellektenTckt = Bellek[Cüzdan.ağ() + adres];
  if (bellektenTckt)
    AçDüğmesi.onclick = () => açıkYüzGöster(bellektenTckt);
  else {
    /** @const {!Promise<string>} */
    const dosyaSözü = ipfs.cidBytetanOku(KIMLIKDAO_IPFS_URL, hexten(CidHex));
    AçDüğmesi.onclick = () => dosyaSözü
      .then((dosya) => fromUnlockableNFT(
        /** @const {!eth.ERC721Unlockable} */(JSON.parse(dosya)),
        ["personInfo", "contactInfo", "addressInfo", "kütükBilgileri"],
        ethereum,
        adres
      ))
      .then((açıkTckt) => {
        Bellek[Cüzdan.ağ() + adres] = açıkTckt;
        açıkYüzGöster(açıkTckt);
      })
      .catch(console.log);
  }
}

/**
 * @param {string} adres Bağlı cüzdan adresi
 */
const tcktGöster = (adres) => {
  if (!adres) return;
  /** @const {Element} */
  const tckt = dom.adla("tc");
  /** @const {Element} */
  const tcktYok = dom.adla("innotckt");

  dom.gizle(tckt);
  dom.gizle(AçDüğmesi);
  dom.göster(tcktYok);

  TCKT.handleOf(adres).then((cidHex) => {
    cidHex = cidHex.slice(2);
    if (!cidHex || !cidHex.replaceAll("0", "")) {
      dom.göster(tcktYok.firstElementChild);
    } else {
      dom.gizle(tcktYok);
      dom.göster(AçDüğmesi);
      dom.göster(tckt);
      İmeceİptalDüğmesi.onclick = imeceİptalKutusuGöster;
      EşikAzaltmaDüğmesi.onclick = eşikKutusuGöster;
      SilDüğmesi.onclick = silKutusuGöster;
      CidHex = cidHex;
      kapalıYüzGöster(adres);
    }
  });
}

AçDüğmesi.onclick = Cüzdan.bağla;
Cüzdan.bağlanınca(() => tcktGöster(/** @type {string} */(Cüzdan.adres())));
Cüzdan.ağDeğişince(() => tcktGöster(/** @type {string} */(Cüzdan.adres())));
Cüzdan.adresDeğişince(tcktGöster);

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
  node.value = Math.min(+node.value - 1, 1);
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
