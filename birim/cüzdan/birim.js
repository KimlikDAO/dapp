import dom from "/lib/util/dom";

/**
 * @typedef {{
 *   ad: string,
 *   izleyici: string,
 *   tokenKodu: string,
 *   token: string,
 *   tokenEki: !Array<string>,
 *   rpcUrl: string
 * }}
 */
let AğBilgisi;

/**
 * @type {!Object<string, !AğBilgisi>}
 * @const
 */
const AğBilgileri = {
  "0x1": {
    ad: "Ethereum",
    izleyici: "etherscan.io",
    tokenKodu: "ETH",
    token: "ether",
    tokenEki: dom.TR ? ["’den", "’e"] : [],
    rpcUrl: "cloudflare-eth.com",
  },
  "0xa86a": {
    ad: "Avalanche",
    izleyici: "snowtrace.io",
    tokenKodu: "AVAX",
    tokenEki: dom.TR ? ["’tan", "’a"] : [],
    rpcUrl: "api.avax.network/ext/bc/C/rpc",
  },
  "0x89": {
    ad: "Polygon",
    izleyici: "polygonscan.com",
    tokenKodu: "MATIC",
    tokenEki: dom.TR ? ["’ten", "’e"] : [],
    rpcUrl: "polygon-rpc.com"
  },
  "0xa4b1": {
    ad: "Arbitrum One",
    izleyici: "arbiscan.io",
    tokenKodu: "ETH",
    token: "ether",
    tokenEki: dom.TR ? ["’den", "’e"] : [],
    rpcUrl: "arb1.arbitrum.io/rpc",
  },
  "0x38": {
    ad: "BNB Chain",
    izleyici: "bscscan.com",
    tokenKodu: "BNB",
    tokenEki: dom.TR ? ["’den", "’ye"] : [],
    rpcUrl: "bsc-dataseed3.binance.org"
  },
  "0x406": {
    ad: "Conflux eSpace",
    izleyici: "confluxscan.io",
    tokenKodu: "CFX",
    tokenEki: dom.TR ? ["’ten", "’e"] : [],
    rpcUrl: "evm.confluxrpc.com"
  },
  "0xfa": {
    ad: "Fantom",
    izleyici: "ftmscan.com",
    tokenKodu: "FTM",
    tokenEki: dom.TR ? ["’dan", "’a"] : [],
    rpcUrl: "rpc.ankr.com/fantom"
  }
}

/** @type {?string} */
let Adres = null;
/** @type {string} */
let Ağ = "0xa86a";
/** @type {!Array<function(string)>} */
let Bağlanınca = [];
/** @type {?function()} */
let Kopunca = null;
/** @type {?function(string)} */
let AdresDeğişince = null;
/** @type {!Array<function(string)>} */
let AğDeğişince = [];
/** @type {?string} */
let BağlaMetni;

/** @const {Element} */
const AdresButonu = dom.adla("cua");
/** @const {Element} */
const AğButonu = dom.adla("cuc");

/** @const {function():string} */
const ağ = () => Ağ;
/** @const {function():?string} */
const adres = () => Adres;

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
  if (!(yeniAğ in AğBilgileri)) {
    // Kullanıcı desteklemediğimiz bir ağa geçerse (uzantı cüzdanı
    // arabiriminden), en son seçili ağa geri geçme isteği yolluyoruz.
    ethereum.request(/** @type {!eth.Request} */({
      method: "wallet_switchEthereumChain",
      params: [/** @type {!eth.SwitchChainParam} */({
        chainId: Ağ
      })],
    })).catch(console.log);
  } else if (yeniAğ != Ağ) {
    dom.adla("cud" + Ağ).classList.remove("sel");
    dom.adla("cud" + yeniAğ).classList.add("sel");
    AğButonu.replaceChild(
      dom.adla("cud" + yeniAğ).firstElementChild.cloneNode(true),
      AğButonu.firstElementChild);
    Ağ = yeniAğ;
    for (const f of AğDeğişince) f(yeniAğ);
  }
}

/**
 * @param {!Array<string>} adresler cüzdandan gelen adresler dizisi.
 */
const adresDeğişti = (adresler) => {
  if (!adresler.length) {
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
    dom.menüYarat(AdresButonu, dom.adla("cue"));

    nihaiArabirimAdı(Adres).then((ad) => {
      if (ad) AdresButonu.innerText = ad;
    });
    if (!eskiAdres) {
      for (const f of Bağlanınca) f(Adres);
    } else if (AdresDeğişince)
      AdresDeğişince(Adres);
  }
}

/**
 * @param {function(string)} f bağlanınca bir kez çalıştırılacak fonksiyon.
 */
const bağlanınca = (f) => {
  if (Adres) f(Adres);
  else Bağlanınca.push(f);
}

/**
 * @param {function()} f
 */
const kopunca = (f) => {
  Kopunca = f;
}

/**
 * @param {function(string)} f Ağ değişince yeni ağın adıyla çağırılacak
 *                             fonksiyon.
 */
const ağDeğişince = (f) => {
  AğDeğişince.push(f);
}

/**
 * @param {function(string)} f Adres değişince yeni adresle beraber çağırılacak
 *                             fonksiyon.
 */
const adresDeğişince = (f) => {
  AdresDeğişince = f;
}

const bağla = () => {
  ethereum
    .request(/** @type {!eth.Request} */({ method: "eth_requestAccounts" }))
    .then(adresDeğişti)
    .catch(console.log);

  ethereum
    .request(/** @type {!eth.Request} */({ method: "eth_chainId" }))
    .then(ağDeğişti)
    .catch(console.log);
}

const ağDüğmesiKur = () => {
  /** @const {Element} */
  const ağMenüsü = dom.adla("cud");
  /** @const {Element} */
  const avax = dom.adla("cud0xa86a");
  avax.replaceChild(AğButonu.firstElementChild.cloneNode(true),
    avax.firstElementChild);
  dom.menüYarat(AğButonu, ağMenüsü);
  ağMenüsü.onclick = (event) => {
    /** @type {Element} */
    let li = event.target;
    for (; li.nodeName != 'LI'; li = li.parentElement)
      if (li.nodeName == 'DIV') return;
    /** @const {string} */
    const ağ = li.id.slice(3);

    if (window["ethereum"])
      ethereum.request(/** @type {!eth.Request} */({
        method: "wallet_switchEthereumChain",
        params: [/** @type {!eth.SwitchChainParam} */({
          chainId: ağ
        })],
      })).catch((e) => {
        /** @const {AğBilgisi} */
        const ağBilgisi = AğBilgileri[ağ];
        if (e.code == 4902)
          ethereum.request(/** @type {!eth.Request} */({
            method: "wallet_addEthereumChain",
            params: [/** @type {!eth.AddChainParam} */({
              chainId: ağ,
              chainName: ağBilgisi.ad,
              nativeCurrency: {
                name: ağBilgisi.token || ağBilgisi.tokenKodu,
                symbol: ağBilgisi.tokenKodu,
                decimals: 18
              },
              rpcUrls: ["https://" + ağBilgisi.rpcUrl],
              blockExplorerUrls: ["https://" + ağBilgisi.izleyici]
            })]
          }));
      });
  }
}
ağDüğmesiKur();

const adresDüğmesiKur = () => {
  AdresButonu.onclick = bağla;
  dom.adla("cue0").onclick = () =>
    window.location.href = dom.TR ? "//kimlikdao.org/incele" : "//kimlikdao.org/view";

  dom.adla("cue1").onclick = () =>
    window.location.href = dom.TR ? "//kimlikdao.org/oyla" : "//kimlikdao.org/vote";

  dom.adla("cue2").onclick = () => {
    const url = "//debank.com/profile/" + Adres;
    window.open(url, "_blank");
  }

  dom.adla("cue3").onclick = () => {
    const url = `//${AğBilgileri[Ağ].izleyici}/address/${Adres}`;
    window.open(url, "_blank");
  }

  dom.adla("cue4").onclick = () =>
    window.location.href = dom.TR ? "//kimlikdao.org/iptal" : "//kimlikdao.org/revoke";

  ethereum.on("accountsChanged", adresDeğişti);
  ethereum.on("chainChanged", ağDeğişti);

  ethereum.request(
    /** @type {!eth.Request} */({ method: "eth_chainId" }))
    .then(ağDeğişti)
    .catch(console.log);

  ethereum.request(
    /** @type {!eth.Request} */({ method: "eth_accounts" }))
    .then((/** @type {!Array<string>} */ accounts) => {
      if (accounts.length > 0) adresDeğişti(accounts);
    });
}

if (window["ethereum"])
  adresDüğmesiKur();
else {
  setTimeout(() => {
    if (window["ethereum"]) adresDüğmesiKur();
  }, 200);
}

export default {
  adres,
  adresDeğişince,
  ağ,
  ağDeğişince,
  bağla,
  bağlanınca,
  hızlıArabirimAdı,
  kopunca,
};

export {
  AğBilgisi,
  AğBilgileri,
};
