import dom from "/lib/dom";

/** @type {?string} */
let Adres = null;
/** @type {string} */
let Ağ = "0xa86a";
/** @type {?function()} */
let Bağlanınca = null;
/** @type {?function()} */
let Kopunca = null;

/** @type {Element} */
const AdresButonu = dom.adla("na");
/** @type {Element} */
const AğButonu = dom.adla("nc");

/** @type {function():string} */
const ağ = () => Ağ;
/** @type {function():?string} */
const adres = () => Adres;

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
 * @param {Array<string>} adresler cüzdandan gelen adresler dizisi.
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
    const content = dom.adla("ncw");
    content.classList.remove("invisible");
    const backdrop = dom.adla("ncbd");
    backdrop.onclick = () => content.classList.add("invisible")
  };

  dom.adla("ncd").onclick = (event) => {
    const content = dom.adla("ncw");
    content.classList.add("invisible");
    let li = event.target;
    if (event.target.nodeName != "LI") li = event.target.parentElement;
    const newChainId = li.id.slice(2);
    ethereum.request(/** @type {RequestParams} */({
      method: "wallet_switchEthereumChain",
      params: [{ "chainId": newChainId }],
    })).catch((e) => console.log(e))
  }

  ethereum
    .request(/** @type {RequestParams} */({ method: "eth_chainId" }))
    .then(ağDeğişti)
    .catch((e) => console.log("Ağ alınamadı" + e));

  ethereum.request(/** @type {RequestParams} */({ method: "eth_accounts" }))
    .then((accounts) => {
      if (accounts.length > 0) adresDeğişti(accounts);
    });
}

export default {
  ağ,
  adres,
  bağla,
  bağlanınca,
  kopunca
};
