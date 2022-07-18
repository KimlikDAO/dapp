import dom from "/lib/dom";

/** @type {?string} */
let Adres = null;
/** @type {string} */
let Ağ = "0xa86a";
/** @type {?function()} */
let Bağlanınca = null;
/** @type {?function()} */
let Kopunca = null;

/** @const {Element} */
const AdresButonu = dom.adla("na");
/** @const {Element} */
const AğButonu = dom.adla("nc");

/** @const {function():string} */
const ağ = () => Ağ;
/** @const {function():?string} */
const adres = () => Adres;

/** @const {Object<string,string>} */
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
function hızlıArabirimAdı(hesap) {
  return hesap.slice(0, 6) + "..." + hesap.slice(-4);
}

/**
 * @param {string} hesap EVM adresi.
 * @return {Promise<string>} Arabirimde gösterilecek isim. EVM adresinin
 *                           kısaltılmış hali veya ENS / avvy domains adı.
 */
async function nihaiArabirimAdı(hesap) {
  // TODO(KimlikDAO-bot): ENS lookup, avvy domains lookup
  return new Promise((resolve) => setTimeout(resolve("hot.kimlikdao.eth"), 1000));
}

/**
 * @param {string} yeniAğ harf dizisi olarak yeni ağ adı.
 */
function ağDeğişti(yeniAğ) {
  console.log("Ağ değişti: " + yeniAğ);

  if (yeniAğ != Ağ) {
    dom.adla("nc" + Ağ).classList.remove("sel");
    dom.adla("nc" + yeniAğ).classList.add("sel");
    dom.adla("nci").src = dom.adla("nc" + yeniAğ).firstElementChild.src;
    Ağ = yeniAğ;
  }
}

/**
 * @param {!Array<string>} adresler cüzdandan gelen adresler dizisi.
 */
function adresDeğişti(adresler) {
  console.log("Adres değişti: " + adresler);

  if (adresler.length == 0) {
    Adres = null;
    Kopunca();
  } else if (adresler[0] != Adres) {
    Adres = adresler[0];
    AdresButonu.innerText = hızlıArabirimAdı(Adres);
    nihaiArabirimAdı(Adres).then((ad) => {
      if (ad) AdresButonu.innerText = ad;
    });
    if (Bağlanınca) {
      Bağlanınca();
      Bağlanınca = null;
    }
  }
}

function bağlanınca(f) {
  if (Adres) f();
  else Bağlanınca = f;
}

function kopunca(f) {
  Kopunca = f;
}

function bağla() {
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

  dom.adla("nc").onclick = () => {
    const menu = dom.adla("ncw");
    menu.style.display = "block";
    const backdrop = dom.adla("ncbd");
    backdrop.onclick = () => menu.style.display = "none";
  };

  dom.adla("na").onclick = () => {
    const menu = dom.adla("naw");
    menu.style.display = "block";
    const backdrop = dom.adla("nabd");
    backdrop.onclick = () => menu.style.display = "none";
  };

  dom.adla("ncd").onclick = (event) => {
    dom.adla("ncw").style.display = "none";
    let li = event.target;
    if (event.target.nodeName != "LI") li = event.target.parentElement;
    if (!li.id.startsWith("nc0x")) return;
    const ağ = li.id.slice(2);
    console.log(ağ);
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

  dom.adla("nad").onclick = () => {
    dom.adla("naw").style.display = "none";
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
  bağla,
  bağlanınca,
  kopunca
};
