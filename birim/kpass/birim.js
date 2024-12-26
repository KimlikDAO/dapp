import { Kartlar, Kök, SağDüğme, SolDüğme } from "./birim.jsx";
import "/lib/did/section.d";
import dom from '/lib/util/dom';

/** @const {!Set<string>} */
const Gösterme = new Set([
  "bls12_381",
  "commitment",
  "commitmentR",
  "secp256k1",
  "signatureTs",
  "localIdNumber",
  "gender"
]);

/** @type {number} */
let Kart = 0;
/** @type {number} */
let KartSayısı = 3;

/**
 * @param {number} yeniKart
 */
const kartDeğiştir = (yeniKart) => {
  /** @const {number} */
  const width = Kartlar.children[0].getBoundingClientRect().width;
  Kartlar.style.transform = `translate3d(-${yeniKart * width}px,0,0)`;
  Kart = yeniKart;
}

SolDüğme.onclick = () => kartDeğiştir((Kart + (KartSayısı - 1)) % KartSayısı);
SağDüğme.onclick = () => kartDeğiştir((Kart + 1) % KartSayısı);

/**
 * @param {boolean} bilgiYüzü
 */
const yüzGöster = (bilgiYüzü) => Kök.classList.toggle("flp", bilgiYüzü);

/**
 * @return {boolean}
 */
const çevir = () => Kök.classList.toggle("flp");

/**
 * @param {!did.PersonInfo} personInfo
 */
const personInfoGöster = (personInfo) => {
  for (const satır of Object.entries(/** @type {!Object<string, string>} */(personInfo)))
    if (satır[1] && !Gösterme.has(satır[0])) {
      const birim = dom.adla("kp" + satır[0]);
      if (birim) birim.innerText = satır[1];
    }

  dom.adla('kplocalIdNumber').innerText = personInfo.localIdNumber.slice(2);
  // TODO(KimlikDAO-bot): fix
  dom.adla("kpgender").innerText = personInfo.gender;
}

/**
 * @param {?did.ContactInfo} contactInfo
 */
const contactInfoGöster = (contactInfo) => {
  if (!contactInfo) return;
  KartSayısı += 1;
  dom.adlaGöster("kpibp");
  for (const satır of Object.entries(/** @type {!Object<string, string>} */(contactInfo)))
    if (satır[1] && !Gösterme.has(satır[0]))
      dom.adla("kp" + satır[0]).innerText = satır[0] == "phone"
        ? dom.telefondanMetne(satır[1])
        : satır[1];
}

/**
 * @param {?did.AddressInfo} addressInfo
 */
const addressInfoGöster = (addressInfo) => {
  // Şimdilik sadece `TürkiyeAdresi` gösterebiliyoruz.
  if (!addressInfo || addressInfo.country != "Türkiye") return;
  /** @const {!did.TürkiyeAdresi} */
  const adres = /** @type {!did.TürkiyeAdresi} */(addressInfo);

  KartSayısı += 1;
  dom.adlaGöster("kpabp");
  /** @type {string} */
  let mahalle = adres.mahalle;
  if (mahalle.endsWith("ahallesi"))
    mahalle = mahalle.slice(0, -6) + ".";
  dom.adla("kpam").innerText = mahalle;
  dom.adla("kpasnd").innerText = adres.CSBM + " " + adres.dışKapı +
    (adres.içKapı && `/${adres.içKapı}`);
  dom.adla("kpaii").innerText = adres.ilçe + " / " + adres.il;
  dom.adla("kpau").innerText = adres.country;
}

/**
 * @param {?did.KütükBilgileri} kütükBilgileri
 */
const kütükBilgileriGöster = (kütükBilgileri) => {
  for (const satır of Object.entries(/** @type {!Object<string, string>} */(kütükBilgileri)))
    if (satır[1] && !Gösterme.has(satır[0]))
      dom.adla("kp" + satır[0]).innerText = satır[1];
}

/**
 * @param {!did.DecryptedSections} açıkKPass
 */
const açıkKPassGöster = (açıkKPass) => {
  personInfoGöster(/** @type {!did.PersonInfo} */(açıkKPass["personInfo"]));
  contactInfoGöster(/** @type {?did.ContactInfo} */(açıkKPass["contactInfo"]));
  addressInfoGöster(/** @type {?did.AddressInfo} */(açıkKPass["addressInfo"]));
  kütükBilgileriGöster(/** @type {?did.KütükBilgileri} */(açıkKPass["kütükBilgileri"]));
  Kök.classList.add("flp");
}

export default {
  Kök,
  açıkKPassGöster,
  çevir,
  yüzGöster
};
