import dom from "/lib/dom";

/** @type {?string} */
let Adres = null;
/** @type {string} */
let Ağ = "0xa86a";
/** @type {?function()} */
let F = null;

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
    dom.adla("nc:" + Ağ).style.display = "flex";
    dom.adla("nc:" + yeniAğ).style.display = "none";
    dom.adla("nc:i").src = dom.adla("nc:" + yeniAğ).firstElementChild.src;
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
  } else if (adresler[0] != Adres) {
    Adres = adresler[0];
    AdresButonu.innerText = hızlıArabirimAdı(Adres);
    nihaiArabirimAdı(Adres).then((ad) => {
      if (ad) AdresButonu.innerText = ad;
    });
    if (F) {
      F();
      F = null;
    }
  }
}

function bağlanınca(f) {
  if (Adres) f();
  else F = f;
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

if (ethereum) {
  ethereum.on("accountsChanged", adresDeğişti);
  ethereum.on("chainChanged", ağDeğişti);

  dom.adla("nc").onclick = () => {
    const content = dom.adla("nc:w");
    content.classList.remove("invisible");
    const backdrop = dom.adla("nc:bd");
    backdrop.onclick = () => content.classList.add("invisible")
  };

  dom.adla("nc:d").onclick = (event) => {
    const content = dom.adla("nc:w");
    content.classList.add("invisible");
    let li = event.target;
    if (event.target.nodeName != "LI") li = event.target.parentElement;
    const newChainId = li.id.slice(3);
    ethereum.request(/** @type {RequestParams} */({
      method: "wallet_switchEthereumChain",
      params: [{ "chainId": newChainId }],
    })).catch((e) => console.log(e))
  }

  ethereum.request(/** @type {RequestParams} */({ method: "eth_accounts" }))
    .then((accounts) => {
      if (accounts.length > 0)
        adresDeğişti(accounts);
    });
}

export default {
  ağ,
  adres,
  bağla,
  bağlanınca
};
