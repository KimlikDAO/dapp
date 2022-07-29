import dom from "/lib/dom";

/** @type {?string} */
let Adres = null;
/** @type {string} */
let Ağ = "0xa86a";
/** @type {?function(string)} */
let Bağlanınca = null;
/** @type {?function()} */
let Kopunca = null;
/** @type {?function()} */
let AdresDeğişince = null;
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
  new Promise((resolve) => setTimeout(resolve("hot.kimlikdao.eth"), 1000));

/**
 * @param {string} yeniAğ harf dizisi olarak yeni ağ adı.
 */
const ağDeğişti = (yeniAğ) => {
  if (yeniAğ != Ağ) {
    dom.adla("nc" + Ağ).classList.remove("sel");
    dom.adla("nc" + yeniAğ).classList.add("sel");
    const nc = dom.adla("nc");
    nc.replaceChild(
      dom.adla("nc" + yeniAğ).firstElementChild.cloneNode(true),
      nc.firstElementChild);
    Ağ = yeniAğ;
  }
}

/**
 * @param {!Array<string>} adresler cüzdandan gelen adresler dizisi.
 */
const adresDeğişti = (adresler) => {
  if (adresler.length == 0) {
    Adres = null;
    AdresButonu.innerText = BağlaMetni;
    AdresButonu.onclick = bağla;
    if (Kopunca) Kopunca();
  } else if (adresler[0] != Adres) {
    Adres = adresler[0];
    BağlaMetni = AdresButonu.innerText;
    AdresButonu.innerText = hızlıArabirimAdı(Adres);
    dom.menüYarat(AdresButonu, dom.adla("nad"));

    nihaiArabirimAdı(Adres).then((ad) => {
      if (ad) AdresButonu.innerText = ad;
    });
    if (Bağlanınca) {
      Bağlanınca(Adres);
      Bağlanınca = null;
    } else if (AdresDeğişince) {
      AdresDeğişince();
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

const adresDeğişince = (f) => {
  AdresDeğişince = f;
}

const bağla = () => {
  ethereum
    .request(
      /** @type {RequestParams} */({ method: "eth_requestAccounts" }))
    .then(adresDeğişti)
    .catch((e) => console.log(e));

  ethereum
    .request(
      /** @type {RequestParams} */({ method: "eth_chainId" }))
    .then(ağDeğişti)
    .catch((e) => console.log("Ağ alınamadı" + e));
}

if (window["ethereum"]) {
  ethereum.on("accountsChanged", adresDeğişti);
  ethereum.on("chainChanged", ağDeğişti);

  const ağMenüsü = dom.adla("ncd");
  dom.menüYarat(AğButonu, ağMenüsü);
  dom.menüYarat(DilButonu, dom.adla("nld"));

  AdresButonu.onclick = bağla;

  ağMenüsü.onclick = (event) => {
    ağMenüsü.style.display = "none";
    let li = event.target;
    if (event.target.nodeName != "LI") li = event.target.parentElement;
    if (!li.id.startsWith("nc0x")) return;
    const ağ = li.id.slice(2);
    ethereum.request(/** @type {RequestParams} */({
      method: "wallet_switchEthereumChain",
      params: [{ "chainId": ağ }],
    })).catch((e) => console.log(e))
  }

  dom.adla("nad1").onclick = () => {
    navigator.clipboard.writeText(/** @type {string} */(Adres));
  }

  dom.adla("nad2").onclick = () => {
    const url = "https://debank.com/profile/" + Adres;
    window.open(url, "_blank");
  }

  dom.adla("nad3").onclick = () => {
    const url = "https://" + AdresLinki[Ağ] + "/address/" + Adres;
    window.open(url, "_blank");
  }

  ethereum
    .request(/** @type {RequestParams} */({ method: "eth_chainId" }))
    .then(ağDeğişti)
    .catch((e) => console.log("Ağ alınamadı" + e));

  ethereum.request(/** @type {RequestParams} */({ method: "eth_accounts" }))
    .then((accounts) => {
      if (accounts.length > 0) adresDeğişti(/** Array<string> */(accounts));
    });
}

export default {
  ağ,
  adres,
  adresDeğişince,
  bağla,
  bağlanınca,
  hızlıArabirimAdı,
  kopunca
};
