import { AğBilgileri } from "./ağlar.js";
import { CoreBağlantısı, MetaMaskBağlantısı, RabbyBağlantısı } from "./evmBağlantısı";
import { Provider } from "/lib/crosschain/provider";
import TCKT from "/lib/ethereum/TCKTLite";
import ipfs from "/lib/node/ipfs";
import dom from "/lib/util/dom";
import { hexten } from "/lib/util/çevir";

/** @const {string} */
const KIMLIKDAO_IPFS_URL = "//ipfs.kimlikdao.org";

/**
 * @type {!Provider}
 * @const
 */
const BoşBağlantı = {
  /**
   * @override
   *
   * @return {boolean}
   */
  initIfAvailable: () => true,

  /**
   * @return {string}
   */
  downloadURL: () => "",

  /**
   * @override
   *
   * @param {string} chain
   * @param {function(string)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @return {!Promise<void>}
   */
  connect: (chain, chainChanged, addressChanged) => Promise.resolve(),

  /**
   * @override
   */
  disconnect() { },

  /**
   * @override
   *
   * @param {string} ağ
   * @return {!Promise<void>}
   */
  switchChain(ağ) {
    ağDeğişti(ağ)
    return Promise.resolve();
  },

  /**
   * @override
   *
   * @param {string} message
   * @param {string} address
   * @return {!Promise<string>}
   */
  signMessage: (message, address) => Promise.reject(),
}

/**
 * @const {!Object<string, !Provider>}
 * @dict
 */
const Bağlantılar = {
  "core": CoreBağlantısı,
  "rabby": RabbyBağlantısı,
  "mm": MetaMaskBağlantısı,
};

/** @type {!Provider} */
let Bağlı = BoşBağlantı;
/** @type {?string} */
let Adres = null;
/** @type {string} */
let Ağ = "0xa86a";
/** @type {!Array<function(?string)>} */
let AdresDeğişince = [];
/** @type {!Array<function()>} */
let Kopunca = [];
/** @type {!Array<function(string)>} */
let AğDeğişince = [];
/** @type {!Array<function(Promise<!eth.ERC721Unlockable>)>} */
let TcktDeğişince = [];
/** @type {!Array<function(!Bağlantı)>} */
let BağlantıDeğişince = [];
/** @type {?string} */
let BağlaMetni;

/** @const {Element} */
const AdresButonu = dom.adla("cua");
/** @const {Element} */
const AğButonu = dom.adla("cuc");
/** @const {Element} */
const Menü = dom.adla("cub");

/**
 * @return {string} Seçili ağ
 */
const ağ = () => Ağ;

/**
 * @return {?string} Seçili adres veya adres seçili değilse null.
 */
const adres = () => Adres;

/**
 * @return {!Provider}
 */
const bağlantı = () => Bağlı;

/**
 * Verilen bir EVM adresini UI'da hızlıca göstermeye uygun hale getirir.
 *
 * @param {string} adres EVM adresi.
 * @return {string} Arabirimde gösterilecek isim. EVM adresinin kısaltılmış
 *                  hali.
 */
const hızlıArabirimAdı = (adres) => adres.slice(0, 6) + "..." + adres.slice(-4);

/**
 * @param {string} hesap EVM adresi.
 * @return {Promise<string>} Arabirimde gösterilecek isim. EVM adresinin
 *                           kısaltılmış hali veya ENS / avvy domains adı.
 *
 * TODO(KimlikDAO-bot): ENS lookup, avvy domains lookup
 */
const nihaiArabirimAdı = (hesap) => new Promise((_) => null);

/**
 * @param {string} yeniAğ harf dizisi olarak yeni ağ adı.
 */
const ağDeğişti = (yeniAğ) => {
  console.log(`ağDeğişti(${yeniAğ})`);
  if (!(yeniAğ in AğBilgileri)) {
    // Kullanıcı desteklemediğimiz bir ağa geçerse (uzantı cüzdanı
    // arabiriminden), en son seçili ağa geri geçme isteği yolluyoruz.
    ağSeçildi(Ağ);
  } else if (yeniAğ != Ağ) {
    dom.adla("cud" + Ağ).classList.remove("sel");
    dom.adla("cud" + yeniAğ).classList.add("sel");
    AğButonu.replaceChild(
      dom.adla("cud" + yeniAğ).firstElementChild.cloneNode(true),
      AğButonu.firstElementChild);
    Ağ = yeniAğ;
    tcktDeğişti();
    for (const f of AğDeğişince) f(yeniAğ);
  }
}

const tcktDeğişti = () => {
  if (!Adres) return;
  /** @const {Element} */
  const tcktDüğmesi = dom.adla("cuin");
  /** @const {Element} */
  const tcktResmi = dom.adla("cutc");

  /** @const {string} */
  const ağ = Ağ;
  /** @const {!eth.Provider} */
  const provider = /** @type {!eth.Provider} */(Bağlı.provider);
  /** @const {string} */
  const adres = Adres;

  TCKT.handleOf(provider, Adres).then((cidHex) => {
    console.log(`hex geldi ${cidHex}`);
    if (ağ != Ağ || adres != Adres) return;
    /** @const {boolean} */
    const varMı = cidHex.replaceAll("0", "") != "x";
    tcktDüğmesi.innerText = varMı
      ? dom.TR ? "TCKT’Nİ İNCELE" : "VIEW TCKT"
      : dom.TR ? "TCKT AL" : "GET TCKT";
    tcktDüğmesi.onclick = tcktResmi.onclick = () =>
      window.location.href = "//kimlikdao.org" + (varMı
        ? dom.TR ? "/incele" : "/view"
        : dom.TR ? "/al" : "/mint");
    if (!varMı) tcktResmi.src = null;
    /** @const {Promise<!eth.ERC721Unlockable>} */
    const dosyaSözü = varMı
      ? ipfs.cidBytetanOku(KIMLIKDAO_IPFS_URL, hexten(cidHex.slice(2)))
        .then((/** @type {string} */ dosya) => {
          if (ağ != Ağ || adres != Adres) return Promise.reject();
          const tcktDosyası = /** @type {!eth.ERC721Unlockable} */(JSON.parse(dosya))
          tcktResmi.src = tcktDosyası.image;
          return tcktDosyası;
        })
      : null;
    for (const f of TcktDeğişince) f(dosyaSözü);
  })
}

/**
 * @param {!Array<string>} adresler cüzdandan gelen adresler dizisi.
 */
const adresDeğişti = (adresler) => {
  if (!adresler || !adresler.length) {
    Adres = null;
    AdresButonu.innerText = BağlaMetni;
    if (Bağlı != BoşBağlantı) {
      const bağlı = Bağlı;
      Bağlı = BoşBağlantı;
      bağlı.disconnect();
    }
    dom.adlaGizle("cue");
    bağlantıSeçiciGöster();
    console.log("Koptu");
    for (const f of Kopunca) f();
  } else if (adresler[0] != Adres) {
    /** @const {?string} */
    const eskiAdres = Adres;
    Adres = adresler[0];
    BağlaMetni = AdresButonu.innerText;
    dom.adla("cuad").firstElementChild.innerText =
      AdresButonu.innerText = hızlıArabirimAdı(Adres);

    nihaiArabirimAdı(Adres).then((ad) => {
      if (ad) AdresButonu.innerText = ad;
    });
    tcktDeğişti();
    if (!eskiAdres) {
      dom.adlaGizle("cuf");
      dom.adlaGöster("cue");
    }
  }
  console.log(`adresDeğişince(${Adres})`);
  for (const f of AdresDeğişince) f(Adres);
}

/**
 * @param {function(string)} f Ağ değişince yeni ağın adıyla çağırılacak
 *                             fonksiyon.
 */
const ağDeğişince = (f) => AğDeğişince.push(f);

/**
 * @param {function(?string)} f Adres değişince yeni adresle beraber çağırılacak
 *                              fonksiyon.
 */
const adresDeğişince = (f) => AdresDeğişince.push(f);

/** @param {function()} */
const kopunca = (f) => Kopunca.push(f);

/**
 * @param {function(Promise<!eth.ERC721Unlockable>)} f
 */
const tcktDeğişince = (f) => {
  TcktDeğişince.push(f);
  Kopunca.push(() => f(null));
}

/**
 * @param {function(!Provider)}
 */
const bağlantıDeğişince = (f) => bağlantıDeğişince.push(f);

/**
 * @param {string} ağ
 */
const ağSeçildi = (ağ) => Bağlı.switchChain(ağ)

/**
 * @param {!Provider} bağlantı
 */
const bağlantıSeçildi = (bağlantı) => {
  /** @const {!Provider} */
  const eskiBağlantı = Bağlı;
  Bağlı = bağlantı;
  bağlantı.connect(Ağ, ağDeğişti, adresDeğişti)
    .then(() => {
      eskiBağlantı.disconnect();
      for (const f of BağlantıDeğişince) f(bağlantı);
    })
    .catch((e) => {
      console.log(e);
      Bağlı = eskiBağlantı
    });
}

const bağlantıSeçiciGöster = () => {
  /** @const {Element} */
  const seçici = dom.adla("cuf");
  dom.göster(seçici);
  /** @const {!NodeList<!Element>} */
  const satırlar = dom.adla("cuf").children;
  for (const satır of satırlar) {
    /** @const {!Provider} */
    const bağlantı = Bağlantılar[satır.id.slice(2)];
    /** @const {boolean} */
    const varMı = bağlantı.initIfAvailable();
    satır.classList.toggle("on", varMı);
    satır.onclick = varMı ? () => bağlantıSeçildi(bağlantı) : null;
    /** @const {Element} */
    const düğmeMi = satır.lastElementChild;
    /** @const {string} */
    const indirURLi = varMı ? "" : bağlantı.downloadURL();
    /** @const {boolean} */
    const düğmeGöster = indirURLi && düğmeMi.classList.contains("cui");
    dom.gösterGizle(düğmeMi, düğmeGöster);
    düğmeMi.onclick = düğmeGöster
      ? () => window.open(indirURLi, "_blank").focus()
      : null;
  }
}

const aç = () => {
  dom.göster(Menü);
  AğButonu.onclick = null;
  AdresButonu.onclick = null;
  Menü.focus();
}

const kur = () => {
  /** @const {Element} */
  const avax = dom.adla("cud0xa86a");
  avax.replaceChild(AğButonu.firstElementChild.cloneNode(true),
    avax.firstElementChild);
  AdresButonu.onclick = AğButonu.onclick = aç;
  Menü.onblur = () => {
    dom.gizle(Menü);
    setTimeout(() => AdresButonu.onclick = AğButonu.onclick = aç, 300);
  };

  dom.adla("cud").onclick = (event) => {
    /** @type {Element} */
    let li = event.target;
    for (; li.nodeName != 'LI'; li = li.parentElement)
      if (li.nodeName == 'BODY') return;
    /** @const {string} */
    const ağ = li.id.slice(3);
    ağSeçildi(ağ);
  }

  const düğmeler = dom.adla("cue").children;
  düğmeler[2].onclick = () =>
    window.location.href = "//join.kimlikdao.org/#sa-ambassador1";
  düğmeler[3].onclick = () =>
    window.location.href = dom.TR ? "//kimlikdao.org/oyla" : "//kimlikdao.org/vote";
  düğmeler[4].onclick = () =>
    window.location.href = "//kimlikdao.org" + (dom.TR ? "/iptal" : "/revoke");
  düğmeler[5].onclick = () => adresDeğişti([]);

  dom.adla("cuad").onclick = () => navigator.clipboard.writeText(/** @type {string} */(Adres));
  dom.adla("cuex").onclick = () => {
    const url = `//${AğBilgileri[Ağ].izleyici}/address/${Adres}`;
    window.open(url, "_blank");
  }
  dom.adla("cude").onclick = () => {
    const url = "//debank.com/profile/" + Adres;
    window.open(url, "_blank");
  }
  setTimeout(bağlantıSeçiciGöster, 200);
}
kur();

export default {
  aç,
  adres,
  adresDeğişince,
  ağ,
  ağDeğişince,
  bağlantı,
  bağlantıDeğişince,
  kopunca,
  hızlıArabirimAdı,
  tcktDeğişince,
};
