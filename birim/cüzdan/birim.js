import dom from "/lib/dom";

/** @type {?string} */
let Adres = null;
/** @type {string} */
let Ağ = "0xa86a";
/** @type {?function(string)} */
let Bağlanınca = null;
/** @type {?function()} */
let Kopunca = null;
/** @type {?function(string)} */
let AdresDeğişince = null;
/** @type {!Array<function(string)>} */
let AğDeğişince = [];
/** @type {?string} */
let BağlaMetni;

/** @const {Element} */
const AdresButonu = dom.adla("na");
/** @const {Element} */
const AğButonu = dom.adla("nc");
/** @const {Element} */
const DilButonu = dom.adla("nl");

/** @const {function():string} */
const ağ = () => Ağ;
/** @const {function():?string} */
const adres = () => Adres;

/** @const {Object<string, string>} */
const AdresLinki = {
  "0x1": "etherscan.io",
  "0xa86a": "snowtrace.io",
  "0x89": "polygonscan.com",
  "0xa4b1": "arbiscan.io",
  "0xfa": "ftmscan.com",
}

/**
 * Verilen bir EVM adresini UI'da hızlıca göstermeye uygun hale getirir.
 *
 * @param {string} hesap EVM adresi.
 * @return {string} Arabirimde gösterilecek isim. EVM adresinin kısaltılmış
 *                  hali.
 */
const hızlıArabirimAdı = (hesap) => hesap.slice(0, 6) + "..." + hesap.slice(-4);

/**
 * @param {string} hesap EVM adresi.
 * @return {Promise<string>} Arabirimde gösterilecek isim. EVM adresinin
 *                           kısaltılmış hali veya ENS / avvy domains adı.
 *
 * TODO(KimlikDAO-bot): ENS lookup, avvy domains lookup
 */
const nihaiArabirimAdı = (hesap) =>
  new Promise((_) => null);

/**
 * @param {string} yeniAğ harf dizisi olarak yeni ağ adı.
 */
const ağDeğişti = (yeniAğ) => {
  if (!(yeniAğ in AdresLinki)) {
    // Kullanıcı desteklemediğimiz bir ağa geçerse (uzantı cüzdanı
    // arabiriminden), en son seçili ağa geri geçme isteği yolluyoruz.
    ethereum.request(/** @type {RequestParams} */({
      method: "wallet_switchEthereumChain",
      params: [{ "chainId": Ağ }],
    })).catch(console.log);
  } else if (yeniAğ != Ağ) {
    dom.adla("nc" + Ağ).classList.remove("sel");
    dom.adla("nc" + yeniAğ).classList.add("sel");
    AğButonu.replaceChild(
      dom.adla("nc" + yeniAğ).firstElementChild.cloneNode(true),
      AğButonu.firstElementChild);
    Ağ = yeniAğ;
    for (const f of AğDeğişince) f(yeniAğ);
  }
}

/**
 * @param {!Array<string>} adresler cüzdandan gelen adresler dizisi.
 */
const adresDeğişti = (adresler) => {
  if (adresler.length === 0) {
    Adres = null;
    AdresButonu.innerText = BağlaMetni;
    AdresButonu.onclick = bağla;
    if (Kopunca) Kopunca();
  } else if (adresler[0] != Adres) {
    /** @const {?string} */
    const eskiAdres = Adres;
    Adres = adresler[0];
    BağlaMetni = AdresButonu.innerText;
    AdresButonu.innerText = hızlıArabirimAdı(Adres);
    dom.menüYarat(AdresButonu, dom.adla("nad"));

    nihaiArabirimAdı(Adres).then((ad) => {
      if (ad) AdresButonu.innerText = ad;
    });
    if (!eskiAdres) {
      if (Bağlanınca) Bağlanınca(Adres);
    } else if (AdresDeğişince) {
      AdresDeğişince(Adres);
    }
  }
}

/**
 * @param {function(string)} f bağlanınca bir kez çalıştırılacak fonksiyon.
 */
const bağlanınca = (f) => {
  if (Adres) f(Adres);
  else Bağlanınca = f;
}

const kopunca = (f) => {
  Kopunca = f;
}

const ağDeğişince = (f) => {
  AğDeğişince.push(f);
}

const adresDeğişince = (f) => {
  AdresDeğişince = f;
}

const bağla = () => {
  ethereum
    .request(
      /** @type {RequestParams} */({ method: "eth_requestAccounts" }))
    .then(adresDeğişti)
    .catch(console.log);

  ethereum
    .request(
      /** @type {RequestParams} */({ method: "eth_chainId" }))
    .then(ağDeğişti)
    .catch(console.log);
}

dom.menüYarat(DilButonu, dom.adla("nld"));
dom.adla("nld").onclick = (event) => {
  /** @const {Element} */
  const li = event.target.nodeName == "LI"
    ? event.target : event.target.parentElement;
  /** @const {string} */
  const dil = li.id.slice(2);
  if (dom.TR) {
    if (dil == "en") {
      const sayfalar = {
        "/": "/?en",
        "/al": "/get",
        "/incele": "/view",
      };
      document.cookie = "l=en; path=/; max-age=" + 1e6;
      window.location.href = sayfalar[window.location.pathname];
    }
  } else {
    if (dil == "tr") {
      const sayfalar = {
        "/": "/?tr",
        "/get": "/al",
        "/view": "/incele",
      };
      document.cookie = "l=tr; path=/; max-age=" + 1e6;
      window.location.href = sayfalar[window.location.pathname];
    }
  }
};

{ // Ağ menüsünü oluştur.
  const ağMenüsü = dom.adla("ncd");
  const avax = dom.adla("nc0xa86a");
  avax.replaceChild(AğButonu.firstElementChild.cloneNode(true),
    avax.firstElementChild);
  dom.menüYarat(AğButonu, ağMenüsü);
  ağMenüsü.onclick = (event) => {
    /** @type {Element} */
    let li = event.target;
    for (; li.nodeName != 'LI'; li = li.parentElement)
      if (li.nodeName == 'DIV') return;
    /** @const {string} */
    const ağ = li.id.slice(2);
    if (window["ethereum"])
      ethereum.request(/** @type {RequestParams} */({
        method: "wallet_switchEthereumChain",
        params: [{ "chainId": ağ }],
      })).catch(console.log);
  }
}

if (window["ethereum"]) {
  AdresButonu.onclick = bağla;
  dom.adla("nad0").onclick = () =>
    window.location.href = dom.TR ? "/incele" : "/view";

  dom.adla("nad1").onclick = () =>
    navigator.clipboard.writeText(/** @type {string} */(Adres));

  dom.adla("nad2").onclick = () => {
    const url = "//debank.com/profile/" + Adres;
    window.open(url, "_blank");
  }

  dom.adla("nad3").onclick = () => {
    const url = `//${AdresLinki[Ağ]}/address/${Adres}`;
    window.open(url, "_blank");
  }

  dom.adla("nad4").onclick = () =>
    window.location.href = dom.TR ? "/iptal" : "/revoke";

  ethereum.on("accountsChanged", adresDeğişti);
  ethereum.on("chainChanged", ağDeğişti);

  ethereum
    .request(/** @type {RequestParams} */({ method: "eth_chainId" }))
    .then(ağDeğişti)
    .catch(console.log);

  ethereum.request(/** @type {RequestParams} */({ method: "eth_accounts" }))
    .then((accounts) => {
      if (accounts.length > 0) adresDeğişti(/** Array<string> */(accounts));
    });
}

/** @const {Object<string, !Array<string>>} */
const Paralar = dom.TR ? {
  "0x1": ["ether", "’den", "’e"],
  "0xa86a": ["AVAX", "’tan", "’a"],
  "0x89": ["MATIC", "’ten", "’e"],
  "0xa4b1": ["ether", "'den", "’e"],
  "0xfa": ["FTM", "’dan", "’a"]
} : {
  "0x1": ["ether"],
  "0xa86a": ["AVAX"],
  "0x89": ["MATIC"],
  "0xa4b1": ["ether"],
  "0xfa": ["FTM"],
};

export default {
  ağ,
  ağDeğişince,
  adres,
  adresDeğişince,
  bağla,
  bağlanınca,
  hızlıArabirimAdı,
  kopunca,
  Paralar
};
