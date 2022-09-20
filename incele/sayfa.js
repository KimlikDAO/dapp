/**
 * @fileoverview İncele sayfası giriş noktası
 *
 */
import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
import dom from '/lib/dom';
import evm from "/lib/evm";
import ipfs from '/lib/ipfs';
import TCKT from '/lib/TCKT';
import { hex, hexten } from '/lib/çevir';

/** @const {Element} */
const CüzdanaEkleDüğmesi = dom.adla("inbtn0");
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

/** @const {Object<string, TCKTTemelBilgileri>} */
const Hatırla = {};

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

const cüzdanaEkle = () => {
  TCKT.addToWallet().then((eklendi) => {
    if (!eklendi) return;
    CüzdanaEkleDüğmesi.innerText = dom.TR ? "Eklendi ✓" : "Added to wallet ✓";
    dom.butonDurdur(CüzdanaEkleDüğmesi);
  }).catch(console.log);
}

const imeceİptalKutusuGöster = () => {
  Mask.style.display = "";
  İmeceİptalKutusu.style.display = "";
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

  Mask.style.display = "";
  EşikKutusu.style.display = "";
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
  Mask.style.display = "";
  SilKutusu.style.display = "";
  dom.adla("insyr").onclick = kutuKapat;
  dom.adla("insyo").onclick = () => {
    /** @const {string} */
    const ağ = Cüzdan.ağ();
    /** @const {string} */
    const adres = /** @type {string} */(Cüzdan.adres());
    kutuKapat();
    TCKT.revoke(adres)
      .then(() => {
        Hatırla[ağ + adres] = null;
        kapalıYüz(adres);
      })
      .catch(console.log);
  }
}

/**
 * @param {TCKTTemelBilgileri} açıkTCKT
 */
const açıkYüz = (açıkTCKT) => {
  for (let hane of "ad soyad TCKN dt dyeri".split(" "))
    if (açıkTCKT.kişi[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.kişi[hane];
  dom.adla("tccinsiyet").innerText = açıkTCKT.kişi.c;

  for (let hane of "annead babaad BSN cilt hane mhali".split(" "))
    if (açıkTCKT.aile[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.aile[hane];

  for (let hane of "il ilçe mahalle tescil".split(" "))
    if (açıkTCKT.kütük[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.kütük[hane];

  Tckt.yüzGöster(true);
  AçDüğmesi.innerText = dom.TR ? "Gizle" : "Hide";
  AçDüğmesi.onclick = () => kapalıYüz(Cüzdan.adres());
}

const kapalıYüz = (adres) => {
  Tckt.yüzGöster(false);
  AçDüğmesi.onclick = null;

  const açıkTCKTMi = Hatırla[Cüzdan.ağ() + adres];
  if (açıkTCKTMi) {
    AçDüğmesi.innerText = dom.TR ? "Aç" : "Unlock";
    AçDüğmesi.onclick = () => açıkYüz(açıkTCKTMi);
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
              /** @const {TCKTData} */
              const tcktData = /** @const {TCKTData} */(JSON.parse(dosya));
              /** @const {EthEncryptedData} */
              const encryptedData = /** @type {EthEncryptedData} */({
                version: tcktData.unlockable.algorithm,
                nonce: tcktData.unlockable.nonce,
                ephemPublicKey: tcktData.unlockable.ephem_pub_key,
                ciphertext: tcktData.unlockable.ciphertext
              });
              const asciiEncoder = new TextEncoder();
              /** @const {string} */
              const hexEncoded = "0x" + hex(asciiEncoder.encode(JSON.stringify(encryptedData)));
              return ethereum.request(/** @type {RequestParams} */({
                method: "eth_decrypt",
                params: [hexEncoded, Cüzdan.adres()]
              }));
            })
            .then((açıkTCKT) => {
              açıkTCKT = açıkTCKT.slice(43, açıkTCKT.indexOf("\0"));
              açıkTCKT = /** @type {TCKTTemelBilgileri} */(JSON.parse(açıkTCKT));
              Hatırla[Cüzdan.ağ() + adres] = açıkTCKT;
              açıkYüz(açıkTCKT);
            })
            .catch(console.log);
        }
      }
    });
  }
}

AçDüğmesi.onclick = Cüzdan.bağla;
Cüzdan.bağlanınca((adres) => {
  CüzdanaEkleDüğmesi.onclick = cüzdanaEkle;
  İmeceİptalDüğmesi.onclick = imeceİptalKutusuGöster;
  EşikAzaltmaDüğmesi.onclick = eşikKutusuGöster;
  SilDüğmesi.onclick = silKutusuGöster;
  kapalıYüz(adres);
});
Cüzdan.ağDeğişince(() => kapalıYüz(Cüzdan.adres()));
Cüzdan.adresDeğişince(() => kapalıYüz(Cüzdan.adres()));

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
