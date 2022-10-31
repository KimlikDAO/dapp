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
 * @param {AçıkTCKT} açıkTckt
 */
const açıkTcktGöster = (açıkTckt) => {
  const kişiBilgileri = Object.entries(
    /** @type {!Object<string, string>} */(açıkTckt["personInfo"]));
  for (let satır of kişiBilgileri)
    if (satır[1]) dom.adla("tc" + satır[0]).innerText = satır[1];

  dom.adla('tclocalIdNumber').innerText = açıkTckt["personInfo"].localIdNumber.slice(2);

  if (dom.TR)
    dom.adla("tcgender").innerText = dom.adla("tcgender").innerText == 'M' ? 'E' : 'K';

  if (açıkTckt["contactInfo"]) {
    KartSayısı += 1;
    const iletişimBilgileri = Object.entries(
      /** @type {!Object<string, string} */(açıkTckt["contactInfo"])
    );
    for (let satır of iletişimBilgileri)
      if (satır[1]) dom.adla("tc" + satır[0]).innerText = satır[1];
  }

  const kütükBilgileri = Object.entries(
    /** @type {!Object<string, string>} */(açıkTckt["kütükBilgileri"]));
  for (let satır of kütükBilgileri)
    if (satır[1]) dom.adla("tc" + satır[0]).innerText = satır[1];

  Tckt.classList.add("flipped");
}

export default { açıkTcktGöster, çevir, yüzGöster };
