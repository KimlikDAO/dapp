import dom from '/lib/util/dom';

/** @const {Element} */
const Kartlar = dom.adla("tck");
/** @const {Element} */
const Tckt = dom.adla("tc");
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

dom.adla("tcso").onclick = () => kartDeğiştir((Kart + (KartSayısı - 1)) % KartSayısı);
dom.adla("tcsa").onclick = () => kartDeğiştir((Kart + 1) % KartSayısı);

/**
 * @param {boolean} bilgiYüzü
 */
const yüzGöster = (bilgiYüzü) => Tckt.classList.toggle("flipped", bilgiYüzü);

const çevir = () => Tckt.classList.toggle("flipped");

/**
 * @param {ContactInfo} contactInfo
 */
const contactInfoEkle = (contactInfo) => {
  if (!contactInfo) return;
  KartSayısı += 1;
  for (let satır of Object.entries(/** @type {!Object<string, string>} */(contactInfo)))
    if (satır[1]) dom.adla("tc" + satır[0]).innerText = satır[1];
}

/**
 * @param {AddressInfo} addressInfo
 */
const addressInfoEkle = (addressInfo) => {
  // Şimdilik sadece `TürkiyeAdresi` gösterebiliyoruz.
  if (!addressInfo || addressInfo.country != "Türkiye") return;
  const adres = /** @type {TürkiyeAdresi} */(addressInfo);

  KartSayısı += 1;
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
 * @param {AçıkTCKT} açıkTckt
 */
const açıkTcktGöster = (açıkTckt) => {
  /** @const {PersonInfo} */
  const personInfo = /** @type {PersonInfo} */(açıkTckt["personInfo"]);
  for (let satır of Object.entries(/** @type {!Object<string, string>} */(personInfo)))
    if (satır[1]) dom.adla("tc" + satır[0]).innerText = satır[1];

  dom.adla('tclocalIdNumber').innerText = personInfo.localIdNumber.slice(2);

  if (dom.TR)
    dom.adla("tcgender").innerText = dom.adla("tcgender").innerText == 'M' ? 'E' : 'K';

  contactInfoEkle(/** @type {ContactInfo} */(açıkTckt["contactInfo"]));
  addressInfoEkle(/** @type {AddressInfo} */(açıkTckt["addressInfo"]));

  const kütükBilgileri = /** @type {KütükBilgileri} */(açıkTckt["kütükBilgileri"]);
  for (let satır of Object.entries(/** @type {!Object<string, string>} */(kütükBilgileri)))
    if (satır[1]) dom.adla("tc" + satır[0]).innerText = satır[1];

  Tckt.classList.add("flipped");
}

export default { açıkTcktGöster, çevir, yüzGöster };
