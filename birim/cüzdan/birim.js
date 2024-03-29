import { CoreBağlantısı, MetaMaskBağlantısı, RabbyBağlantısı } from "./evmBağlantısı";
import { AuroConnection as AuroBağlantısı } from "./minaBağlantısı";
import { AğBilgileri } from "/birim/ağlar/birim";
import { ChainGroup, ChainGroups, ChainId } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";
import TCKT from "/lib/ethereum/TCKTLite";
import ipfs from "/lib/node/ipfs";
import dom from "/lib/util/dom";
import { hexten } from "/lib/util/çevir";

/** @define {string} */
const VARSAYILAN_AĞ = "0xa4b1";

/** @const {string} */
const KIMLIKDAO_IPFS_URL = "//ipfs.kimlikdao.org";

/**
 * @type {!Provider}
 * @const
 */
const BoşBağlantı = /** @type {!Provider} */({
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
   * @param {ChainId} chain
   * @param {function(ChainId)} chainChanged
   * @param {function(!Array<string>)} addressChanged
   * @param {boolean=} onlyIfApproved
   * @return {!Promise<void>}
   */
  connect: (chain, chainChanged, addressChanged, onlyIfApproved) =>
    Promise.resolve(),

  /**
   * @override
   */
  disconnect() { },

  /**
   * @override
   *
   * @param {ChainId} ağ
   * @return {!Promise<void>}
   */
  switchChain(ağ) {
    ağDeğişti(ağ);
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
});

/**
 * @const {!Object<string, !Provider>}
 */
const Bağlantılar = {
  "co": CoreBağlantısı,
  "ra": RabbyBağlantısı,
  "mm": MetaMaskBağlantısı,
  "au": AuroBağlantısı,
};

/** @const {!Element} */
const AdresButonu = /** @type {!Element} */(dom.adla("cua"));
/** @const {!Element} */
const AğButonu = /** @type {!Element} */(dom.adla("cuc"));
/** @const {!Element} */
const Menü = /** @type {!Element} */(dom.adla("cub"));
/** @const {!Element} */
const DebankLinki = /** @type {!Element} */(dom.adla("cude"));
/** @const {string} */
const BağlaMetni = AdresButonu.innerText;
/** @type {!Array<function(?string)>} */
const AdresDeğişince = [];
/** @const {!Array<function()>} */
const Kopunca = [];
/** @const {!Array<function(ChainId)>} */
const AğDeğişince = [];
/** @const {!Array<function(?string, Promise<!eth.ERC721Unlockable>)>} */
const TcktDeğişince = [];
/** @const {!Array<function(!Provider)>} */
const BağlantıDeğişince = [];
/** @type {!Provider} */
let Bağlı = BoşBağlantı;
/** @type {?string} */
let Adres = null;
/** @type {ChainId} */
let Ağ = /** @type {ChainId} */(VARSAYILAN_AĞ);
/** @type {?string} */
let TcktYokResmi;

/**
 * @return {ChainId} Seçili ağ
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
 * @param {ChainId} yeniAğ harf dizisi olarak yeni ağ adı.
 */
const ağDeğişti = (yeniAğ) => {
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
    /** @const {boolean} */
    const ağGrubuDeğişti = !Ağ.startsWith(yeniAğ.slice(0, 2));
    Ağ = yeniAğ;
    if (ağGrubuDeğişti)
      bağlantıSeçiciGöster();
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

  /** @const {ChainId} */
  const ağ = Ağ;
  /** @const {!eth.Provider} */
  const provider = /** @type {!eth.Provider} */(Bağlı.provider);
  /** @const {string} */
  const adres = Adres;

  TCKT.handleOf(provider, ağ, Adres).then((cidHex) => {
    if (ağ != Ağ || adres != Adres) return;
    /** @const {boolean} */
    const varMı = cidHex.replaceAll("0", "") != "x";
    tcktDüğmesi.innerText = varMı
      ? dom.TR ? "TCKT’Nİ İNCELE" : "VIEW TCKT"
      : dom.TR ? "TCKT AL" : "MINT TCKT";
    tcktDüğmesi.onclick = tcktResmi.onclick = () =>
      window.location.href = "//kimlikdao.org" + (varMı
        ? dom.TR ? "/tcktm" : "/my-tckt"
        : dom.TR ? "/al" : "/mint");
    if (!varMı && TcktYokResmi) tcktResmi.src = TcktYokResmi;
    /** @const {Promise<!eth.ERC721Unlockable>} */
    const dosyaSözü = varMı
      ? ipfs.cidBytetanOku(KIMLIKDAO_IPFS_URL, hexten(cidHex.slice(2)))
        .then((/** @type {string} */ dosya) => {
          if (ağ != Ağ || adres != Adres) return Promise.reject();
          const tcktDosyası = /** @type {!eth.ERC721Unlockable} */(JSON.parse(dosya))
          TcktYokResmi ||= tcktResmi.src;
          tcktResmi.src = tcktDosyası.image;
          return tcktDosyası;
        })
      : null;
    for (const f of TcktDeğişince) f(cidHex, dosyaSözü);
  })
}

const koptu = () => {
  Adres = null;
  AdresButonu.innerText = BağlaMetni;
  bağlantıSeçildi("", BoşBağlantı);
  dom.adlaGizle("cue");
  bağlantıSeçiciGöster();
  for (const f of Kopunca) f();
}

/**
 * @param {!Array<string>} adresler cüzdandan gelen adresler dizisi.
 */
const adresDeğişti = (adresler) => {
  if (!adresler || !adresler.length)
    koptu();
  else if (adresler[0] != Adres) {
    /** @const {?string} */
    const eskiAdres = Adres;
    Adres = adresler[0];
    dom.adla("cuad").firstElementChild.innerText =
      AdresButonu.innerText = hızlıArabirimAdı(Adres);

    nihaiArabirimAdı(Adres).then((ad) => {
      if (ad) AdresButonu.innerText = ad;
    });
    tcktDeğişti();
    if (!eskiAdres) {
      dom.gösterGizle(DebankLinki, Ağ.startsWith(ChainGroup.EVM));
      bağlantıSeçiciGizle();
      dom.adlaGöster("cue");
    }
    for (const f of AdresDeğişince) f(Adres);
  }
}

/**
 * @param {function(ChainId)} f Ağ değişince yeni ağın adıyla çağırılacak
 *                             fonksiyon.
 */
const ağDeğişince = (f) => AğDeğişince.push(f);

/**
 * @param {function(?string)} f Adres değişince yeni adresle beraber çağırılacak
 *                              fonksiyon.
 */
const adresDeğişince = (f) => AdresDeğişince.push(f);

/**
 * @param {function()} f Bağlantı kopunca çağırılacak yordam.
 */
const kopunca = (f) => Kopunca.push(f);

/**
 * @param {function(?string, Promise<!eth.ERC721Unlockable>)} f
 */
const tcktDeğişince = (f) => {
  TcktDeğişince.push(f);
  Kopunca.push(() => f(null, null));
}

/**
 * @param {function(!Provider)} f Bağlantı değişince yeni bağlantıyla çağırılacak
 *                                yordam.
 */
const bağlantıDeğişince = (f) => BağlantıDeğişince.push(f);

/**
 * @param {ChainId} ağ
 */
const ağSeçildi = (ağ) => {
  if (ağ.slice(0, 2) != Ağ.slice(0, 2))
    koptu();

  Bağlı.switchChain(ağ);
}

/**
 * @param {string} bağlantıAdı
 * @param {!Provider} bağlantı
 */
const bağlantıSeçildi = (bağlantıAdı, bağlantı) => {
  /** @const {!Provider} */
  const eskiBağlantı = Bağlı;
  if (eskiBağlantı == bağlantı) return;
  Bağlı = bağlantı;
  bağlantı.connect(Ağ, ağDeğişti, adresDeğişti)
    .then(() => {
      document.cookie = `cu=${bağlantıAdı};domain=.kimlikdao.org;SameSite=Strict;max-age=` + 1e6;
      eskiBağlantı.disconnect();
      for (const f of BağlantıDeğişince) f(bağlantı);
    })
    .catch((e) => {
      console.log(e);
      Bağlı = eskiBağlantı;
    });
}

const bağlantıSeçiciGizle = () => {
  for (const grup of ChainGroups)
    dom.adlaGizle("cuf" + grup);
}

const bağlantıSeçiciGöster = () => {
  /** @const {ChainGroup} */
  const ağGrubu = /** @type {ChainGroup} */(Ağ.slice(0, 2));
  for (const grup of ChainGroups)
    dom.adlaGösterGizle("cuf" + grup, grup == ağGrubu)

  /** @const {!Element} */
  const seçici = /** @type {!Element} */(dom.adla("cuf" + ağGrubu));

  /** @const {!NodeList<!Element>} */
  const satırlar = seçici.children;
  for (const satır of satırlar) {
    /** @const {string} */
    const bağlantıAdı = satır.id.slice(2)
    /** @const {!Provider} */
    const bağlantı = Bağlantılar[bağlantıAdı];
    /** @const {boolean} */
    const varMı = bağlantı.initIfAvailable();
    satır.classList.toggle("on", varMı);
    satır.onclick = varMı ? () => bağlantıSeçildi(bağlantıAdı, bağlantı) : null;
    /** @const {Element} */
    const düğmeMi = satır.lastElementChild;
    /** @const {string} */
    const indirURLi = varMı ? "" : bağlantı.downloadURL();
    /** @const {boolean} */
    const düğmeGöster = indirURLi != "" && düğmeMi.classList.contains("cui");
    dom.gösterGizle(düğmeMi, düğmeGöster);
    düğmeMi.onclick = düğmeGöster
      ? () => window.open(indirURLi, "_blank").focus()
      : null;
  }
}

const izinliyseBağla = () => {
  /** @const {string} */
  const cookie = document.cookie;
  /** @const {number} */
  const idx = cookie.indexOf("cu=");
  /** @const {Provider} */
  const bağlantı = Bağlantılar[cookie.slice(idx + 3, idx + 5)];
  if (bağlantı && bağlantı.initIfAvailable()) {
    Bağlı = bağlantı;
    bağlantı.connect(Ağ, ağDeğişti, adresDeğişti, true)
      .then(() => BağlantıDeğişince.forEach((f) => f(Bağlı)))
      .catch(() => {
        Bağlı = BoşBağlantı;
        bağlantıSeçiciGöster()
      });
  } else
    bağlantıSeçiciGöster();
}

const aç = () => {
  dom.göster(Menü);
  AğButonu.onclick = null;
  AdresButonu.onclick = null;
  Menü.focus();
}

const kur = () => {
  /** @const {Element} */
  const seçiliAğ = dom.adla("cud" + VARSAYILAN_AĞ);
  seçiliAğ.replaceChild(AğButonu.firstElementChild.cloneNode(true),
    seçiliAğ.firstElementChild);
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
    /** @const {ChainId} */
    const ağ = /** @type {ChainId} */(li.id.slice(3));
    ağSeçildi(ağ);
  }

  const düğmeler = dom.adla("cue").children;
  düğmeler[2].onclick = () =>
    window.location.href = "//join.kimlikdao.org/#sa-ambassador1";
  düğmeler[3].onclick = () =>
    window.location.href = dom.TR ? "//kimlikdao.org/oyla" : "//kimlikdao.org/vote";
  düğmeler[4].onclick = () =>
    window.location.href = "//kimlikdao.org" + (dom.TR ? "/iptal" : "/revoke");
  düğmeler[5].onclick = () => koptu();

  dom.adla("cuad").onclick = () => navigator.clipboard.writeText(/** @type {string} */(Adres));
  dom.adla("cuex").onclick = () => {
    const adresEki = Ağ.startsWith("m:") ? "wallet" : "address";
    const url = `//${AğBilgileri[Ağ].izleyici}/${adresEki}/${Adres}`;
    window.open(url, "_blank");
  }
  DebankLinki.onclick = () => {
    const url = "//debank.com/profile/" + Adres;
    window.open(url, "_blank");
  }
  setTimeout(izinliyseBağla, 200);
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
