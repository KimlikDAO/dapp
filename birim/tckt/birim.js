import dom from '/lib/util/dom';

/** @const {!Set<string>} */
const Gösterme = new Set([
  "bls12_381",
  "commitment",
  "commitmentR",
  "secp256k1",
  "signatureTs",
]);
/** @const {!Element} */
const Kartlar = /** @const {!Element} */(dom.adla("tcc"));
/** @const {!Element} */
const Tckt = /** @const {!Element} */(dom.adla("tc"));
/** @const {!Element} */
const SolDüğme = /** @const {!Element} */(dom.adla("tcso"));
/** @const {!Element} */
const SağDüğme = /** @const {!Element} */(dom.adla("tcsa"));

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
const yüzGöster = (bilgiYüzü) => Tckt.classList.toggle("flp", bilgiYüzü);

/**
 * @return {boolean}
 */
const çevir = () => Tckt.classList.toggle("flp");

/**
 * @param {!did.PersonInfo} personInfo
 */
const personInfoGöster = (personInfo) => {
  for (const satır of Object.entries(/** @type {!Object<string, string>} */(personInfo)))
    if (satır[1] && !Gösterme.has(satır[0])) {
      const birim = dom.adla("tc" + satır[0]);
      if (birim) birim.innerText = satır[1];
    }

  dom.adla('tclocalIdNumber').innerText = personInfo.localIdNumber.slice(2);
  if (dom.TR)
    dom.adla("tcgender").innerText = dom.adla("tcgender").innerText == 'M'
      ? 'E'
      : 'K';
}

/**
 * @param {?did.ContactInfo} contactInfo
 */
const contactInfoGöster = (contactInfo) => {
  if (!contactInfo) return;
  KartSayısı += 1;
  dom.adlaGöster("tcibp");
  for (const satır of Object.entries(/** @type {!Object<string, string>} */(contactInfo)))
    if (satır[1] && !Gösterme.has(satır[0]))
      dom.adla("tc" + satır[0]).innerText = satır[0] == "phone"
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
  dom.adlaGöster("tcabp");
  /** @type {string} */
  let mahalle = adres.mahalle;
  if (mahalle.endsWith("ahallesi"))
    mahalle = mahalle.slice(0, -6) + ".";
  dom.adla("tcam").innerText = mahalle;
  dom.adla("tcasnd").innerText = adres.CSBM + " " + adres.dışKapı +
    (adres.içKapı && `/${adres.içKapı}`);
  dom.adla("tcaii").innerText = adres.ilçe + " / " + adres.il;
  dom.adla("tcau").innerText = adres.country;
}

/**
 * @param {?did.KütükBilgileri} kütükBilgileri
 */
const kütükBilgileriGöster = (kütükBilgileri) => {
  for (const satır of Object.entries(/** @type {!Object<string, string>} */(kütükBilgileri)))
    if (satır[1] && !Gösterme.has(satır[0]))
      dom.adla("tc" + satır[0]).innerText = satır[1];
}

/**
 * @param {!did.DecryptedSections} açıkTckt
 */
const açıkTcktGöster = (açıkTckt) => {
  personInfoGöster(/** @type {!did.PersonInfo} */(açıkTckt["personInfo"]));
  contactInfoGöster(/** @type {?did.ContactInfo} */(açıkTckt["contactInfo"]));
  addressInfoGöster(/** @type {?did.AddressInfo} */(açıkTckt["addressInfo"]));
  kütükBilgileriGöster(/** @type {?did.KütükBilgileri} */(açıkTckt["kütükBilgileri"]));
  Tckt.classList.add("flp");
}

export default {
  açıkTcktGöster,
  çevir,
  yüzGöster
};
