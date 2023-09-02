/**
 * @fileoverview İncele sayfası giriş noktası
 *
 */
import Cüzdan from '/birim/cüzdan/birim';
import "/birim/dil/birim";
import Tckt from '/birim/tckt/birim';
import { Provider } from "/lib/crosschain/provider";
import { fromUnlockableNFT } from '/lib/did/decryptedSections';
import TCKT from '/lib/ethereum/TCKT';
import evm from "/lib/ethereum/evm";
import dom from '/lib/util/dom';

/** @const {!Element} */
const İmeceİptalDüğmesi = /** @const {!Element} */(dom.adla("inbtn1"));
/** @const {!Element} */
const EşikAzaltmaDüğmesi = /** @const {!Element} */(dom.adla("inbtn2"));
/** @const {!Element} */
const SilDüğmesi = /** @const {!Element} */(dom.adla("inbtn3"));
/** @const {!Element} */
const AçDüğmesi = /** @const {!Element} */(dom.adla("intcktb"));
/** @const {!Element} */
const Mask = /** @const {!Element} */(dom.adla("inbd"));
/** @const {!Element} */
const İmeceİptalKutusu = /** @const {!Element} */(dom.adla("inmii"));
/** @const {!Element} */
const EşikKutusu = /** @const {!Element} */(dom.adla("inmes"));
/** @const {!Element} */
const SilKutusu = /** @const {!Element} */(dom.adla("inmsy"));
/** @const {!Element} */
const TcktVar = /** @const {!Element} */(dom.adla("tc"));
/** @const {!Element} */
const TcktYok = /** @const {!Element} */(dom.adla("innotckt"));

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
        kapalıYüzGöster();
      })
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

dom.adlaGizle("tc");

/**
 * @param {!did.DecryptedSections} açıkTckt
 */
const açıkYüzGöster = (açıkTckt) => {
  Tckt.açıkTcktGöster(açıkTckt);
  AçDüğmesi.innerText = dom.TR ? "Gizle" : "Hide";
  AçDüğmesi.onclick = kapalıYüzGöster;
}

/** @type {Promise<!eth.ERC721Unlockable>} */
let DosyaSözü;

const kapalıYüzGöster = () => {
  /** @const {string} */
  const ağ = Cüzdan.ağ();
  /**
   * @type {!Provider}
   * @const
   */
  const bağlantı = Cüzdan.bağlantı();
  /** @const {string} */
  const adres = /** @type {string} */(Cüzdan.adres());
  Tckt.yüzGöster(false);
  AçDüğmesi.innerText = dom.TR ? "Aç" : "Unlock";

  /** @const {!did.DecryptedSections} */
  const bellektenTckt = Bellek[ağ + adres];
  AçDüğmesi.onclick = bellektenTckt
    ? () => açıkYüzGöster(bellektenTckt)
    : () => DosyaSözü
      .then((dosya) => fromUnlockableNFT(dosya,
        ["personInfo", "contactInfo", "addressInfo", "kütükBilgileri"],
        bağlantı,
        adres
      ))
      .then((açıkTckt) => {
        Bellek[ağ + adres] = açıkTckt;
        açıkYüzGöster(açıkTckt);
      })
      .catch(console.log);
}

Cüzdan.tcktDeğişince((_, dosyaSözü) => {
  /** @const {boolean} */
  const tcktVar = dosyaSözü != null;
  DosyaSözü = dosyaSözü;

  İmeceİptalDüğmesi.onclick = tcktVar ? imeceİptalKutusuGöster : null;
  EşikAzaltmaDüğmesi.onclick = tcktVar ? eşikKutusuGöster : null;
  SilDüğmesi.onclick = tcktVar ? silKutusuGöster : null;
  dom.gösterGizle(AçDüğmesi, tcktVar);
  dom.gösterGizle(TcktVar, tcktVar);
  dom.gösterGizle(TcktYok, !tcktVar);

  if (tcktVar)
    kapalıYüzGöster();
  else
    dom.gösterGizle(TcktYok.firstElementChild, Cüzdan.adres() != null);
});

Cüzdan.bağlantıDeğişince((bağlantı) =>
  TCKT.setProvider(/** @type {!eth.Provider} */(bağlantı.provider)));
