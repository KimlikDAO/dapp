/**
 * @fileoverview İncele sayfası giriş noktası
 *
 */
import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
import evm from "/lib/ethereum/evm";
import TCKT from '/lib/ethereum/TCKT';
import ipfs from '/lib/ipfs';
import { unlockableSeç } from '/lib/tckt/TCKTVerisi';
import dom from '/lib/util/dom';
import { hex, hexten } from '/lib/util/çevir';

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

/** @const {Object<string, AçıkTCKT>} */
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
    const weight = parseInt(agirlikGirdisi.value);
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
        .then(() => kutuKapat())
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
        kapalıYüz(adres);
      })
      .catch(console.log);
  }
}

/**
 * @param {AçıkTCKT} açıkTCKT
 */
const açıkYüz = (açıkTCKT) => {
  Tckt.açıkTcktGöster(açıkTCKT);
  AçDüğmesi.innerText = dom.TR ? "Gizle" : "Hide";
  AçDüğmesi.onclick = () => kapalıYüz(/** @type {string} */(Cüzdan.adres()));
}

/**
 * @param {string} adres
 */
const kapalıYüz = (adres) => {
  Tckt.yüzGöster(false);
  AçDüğmesi.onclick = null;

  const bellektenAçıkTckt = Bellek[Cüzdan.ağ() + adres];
  if (bellektenAçıkTckt) {
    AçDüğmesi.innerText = dom.TR ? "Aç" : "Unlock";
    AçDüğmesi.onclick = () => açıkYüz(bellektenAçıkTckt);
  } else {
    TCKT.handleOf(adres).then((cidHex) => {
      if (cidHex.startsWith("0x")) cidHex = cidHex.slice(2);
      if (cidHex == "0".repeat(64)) {
        AçDüğmesi.innerText = dom.TR ? "TCKT al" : "Get TCKT";
        AçDüğmesi.onclick = () => window.location.href = dom.TR ? "/al" : "/get";
      } else {
        AçDüğmesi.innerText = dom.TR ? "Aç" : "Unlock";
        AçDüğmesi.onclick = () => {
          ipfs.cidBytetanOku(hexten(cidHex))
            .then((dosya) => {
              /** @const {!ERC721Unlockable} */
              const tcktVerisi = /** @const {!ERC721Unlockable} */(JSON.parse(dosya));
              /** @const {Unlockable} */
              const unlockable = unlockableSeç(tcktVerisi, ["personInfo"]);
              delete unlockable.userPrompt;
              console.log(unlockable);
              const asciiEncoder = new TextEncoder();
              /** @const {string} */
              const hexEncoded = "0x" + hex(asciiEncoder.encode(JSON.stringify(unlockable)));
              return ethereum.request(/** @type {RequestParams} */({
                method: "eth_decrypt",
                params: [hexEncoded, Cüzdan.adres()]
              }));
            })
            .then((açıkTckt) => {
              açıkTckt = açıkTckt.slice(43, açıkTckt.indexOf("\0"));
              açıkTckt = /** @type {AçıkTCKT} */(JSON.parse(açıkTckt));
              Bellek[Cüzdan.ağ() + adres] = açıkTckt;
              açıkYüz(açıkTckt);
            })
            .catch(console.log);
        }
      }
    });
  }
}

AçDüğmesi.onclick = Cüzdan.bağla;
Cüzdan.bağlanınca((adres) => {
  İmeceİptalDüğmesi.onclick = imeceİptalKutusuGöster;
  EşikAzaltmaDüğmesi.onclick = eşikKutusuGöster;
  SilDüğmesi.onclick = silKutusuGöster;
  kapalıYüz(adres);
});
Cüzdan.ağDeğişince(() => kapalıYüz(/** @type {string} */(Cüzdan.adres())));
Cüzdan.adresDeğişince(() => kapalıYüz(/** @type {string} */(Cüzdan.adres())));

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
