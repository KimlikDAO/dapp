/**
 * @fileoverview Al sayfası giriş noktası
 *
 */

import { imeceİptalKur } from '/al/imeceİptal';
import { base64, hex } from '/lib/cevir';
import dom from '/lib/dom';
import { encrypt } from '/lib/encrypt';
import evm from '/lib/evm';
import ipfs from '/lib/ipfs';

/**
 * @type {string}
 * @const
 */
const KIMLIK_AS_URL = "https://mock-api.kimlikas.com";

const nw = dom.adla("nw");
const s1a = dom.adla("s1a");
const s1b = dom.adla("s1b");
const s2a = dom.adla("s2a");
const s3a = dom.adla("s3a");
const s5a = dom.adla("s5a");

/**
 * Bağlı cüzdan adresi veya `null`.
 * @type {?string}
 */
let HesapAdresi = null;

/**
 * Bağlı cüzdan chainId'si.
 * @type {?string}
 */
let ChainId = null;

/**
 * Pedersen taahhüdü için rasgele bitdizisi.
 * @type {!Uint8Array}
 */
let Rasgele = new Uint8Array(32);

async function giriş() {
  if (ethereum) {
    ethereum.on('accountsChanged', hesapAdresiDeğişti);
    ethereum.on('chainChanged', chainIdDeğişti);

    s1b.onclick = cüzdanBağla;

    await ethereum.request(/** @type {RequestParams} */({
      method: "eth_accounts"
    })).then(
      (accounts) => { if (accounts.length > 0) return cüzdanBağla(); }
    );
  }

  await TCKTYarat();
}

giriş();

async function chainIdDeğişti(chainId) {
  if (chainId != ChainId) {
    if(ChainId) dom.adla("nc:"+ ChainId).style.display = "flex";
    dom.adla("nc:"+ chainId).style.display = "none";
    dom.adla("nc:i").src = dom.adla("ci:"+ chainId).src;
    ChainId = chainId;
  }
}

async function hesapAdresiDeğişti(adresler) {
  if (adresler.length == 0) {
    HesapAdresi = null;
  } else if (adresler[0] != HesapAdresi) {
    HesapAdresi = adresler[0];
    nw.innerText = hızlıArabirimAdı(HesapAdresi);
    nihaiArabirimAdı(HesapAdresi).then((ad) => nw.innerText = ad);
  }
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
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "hot.kimlikdao.eth";
}

async function cüzdanBağla() {
  try {
    const hesaplar = await ethereum.request(/** @type {RequestParams} */({
      method: "eth_requestAccounts",
    }));
    ethereum.request(/** @type {RequestParams} */({
      method: "eth_chainId"
    })).then(chainIdDeğişti);
    await hesapAdresiDeğişti(hesaplar);
    const button = dom.adla("nc");
    button.onclick = () => {
      const content = dom.adla("nc:w");
      content.classList.add("show");
      const backdrop = dom.adla("nc:bd");
      backdrop.onclick = () => content.classList.remove("show")
    };
    const ul = dom.adla("nc:d");
    ul.onclick = (event) => {
      const content = dom.adla("nc:w");
      content.classList.remove("show");
      try {
          ethereum.request(/** @type {RequestParams} */({
          method: "wallet_switchEthereumChain",
          params: [{ "chainId": event.target.id.slice(3) }],
        }));
      } catch (e) { console.log(e) }
    }
    s1b.innerText += "ndı 👍";
    s1b.onclick = null;
    s1b.disabled = true;
    s1a.style.display = "none";
    dom.adla("s1").classList.add("done");
    s1b.classList.add("disabled");
    dom.adla("s2").classList.remove("disabled");
    s2a.classList.remove("disabled");
  } catch (e) {
    console.log("kalbini kirarim");
  }
}

/**
 * Verilen bir `hesap` için `rasgele` bitdizisi ile kriptografik taahhüt
 * oluşturur.
 * 
 * @param {string} hesap EVM adresi.
 * @param {!Uint8Array} rasgele bitdizisi.
 * @return {Promise<string>} Kriptografik taahhüt.
 */
async function taahhütOluştur(hesap, rasgele) {
  /** @type {!Uint8Array} */
  let concat = new Uint8Array(32 + 20);
  concat.set(rasgele, 0);

  for (let /** number */ i = 1; i <= 20; ++i)
    concat[i + 31] = parseInt(hesap.substring(2 * i, 2 * i + 2), 16);

  /** @type {ArrayBuffer} */
  let taahhüt = await crypto.subtle.digest("SHA-256", concat);

  return base64(taahhüt);
}

async function TCKTYarat() {
  if (!location.search || !ethereum) return;

  crypto.getRandomValues(Rasgele);
  /** @type {URLSearchParams} */
  const params = new URLSearchParams(location.search);
  /** @type {?string} */
  const code = params.get("code");
  history.replaceState(null, "", location.pathname);

  dom.adla("s3").classList.remove("disabled");
  s3a.classList.remove("disabled");

  const açıkTCKTSözü = taahhütOluştur(/** @type {string} */(HesapAdresi), Rasgele)
    .then((taahhüt) =>
      fetch(KIMLIK_AS_URL + "?" + new URLSearchParams({ "oauth_code": code, "taahhüt": taahhüt })))
    .then((res) => res.json())
    .then((TCKT) => {
      for (let ad of "TCKN ad soyad dt".split(" ")) {
        dom.adla(ad).innerHTML = TCKT[ad];
      }
      const TCKTElement = dom.adla("TCKT");
      s2a.innerText = "E-devlet'ten bilgileriniz alındı 👍";
      s2a.onclick = null;
      s2a.classList.add("disabled");
      s2a.disabled = true;
      s2a.href = "javascript:";
      dom.adla("s2").classList.add("done");
      TCKT.rasgele = base64(Rasgele);
      // TODO(KimlikDAO-bot): Kullanıcı tarafında gelen TCKT'nin fazladan veri
      // içermediğini denetle. Fazla verileri işaretleme riski yüzünden sil.
      return JSON.stringify(TCKT);
    });

  s3a.onclick = async () => {
    const açıkAnahtarSözü = ethereum.request(/** @type {RequestParams} */({
      method: "eth_getEncryptionPublicKey",
      params: [HesapAdresi],
    })).then((pubKey) => {
      s3a.onclick = null;
      s3a.innerText = "Açık anahtarınızı aldık 👍";
      s3a.classList.add("disabled");
      dom.adla("s3").classList.add("done");
      dom.adla("s4").classList.remove("disabled");
      return pubKey;
    });

    /** @type {Promise<Uint8Array>} */
    const cidSözü = Promise.all([açıkTCKTSözü, açıkAnahtarSözü])
      .then(([açıkTCKT, açıkAnahtar]) => {
        let gizle = new Uint8Array(1000);
        let { written } = new TextEncoder().encodeInto(açıkTCKT, gizle);
        let dolgu = new Uint8Array(1000 - written);
        crypto.getRandomValues(dolgu);
        gizle.set(dolgu, written);

        const [nonce, ephemPubKey, ciphertext] = encrypt(açıkAnahtar, gizle);

        /**
         * @type {string}
         * @const
         * @noinline
         */
        const KimlikDAOUrl = "https://kimlikdao.org";
        const TCKT = {
          name: "TCKT",
          description: "KimlikDAO TC Kimlik Tokeni",
          image: KimlikDAOUrl + "/TCKT.svg",
          external_url: KimlikDAOUrl,
          animation_url: KimlikDAOUrl + "/TCKT.mp4",
          unlockable: {
            user_prompt: {
              "en-US": ["{1} wants to view your TCKT.", "OK", "Reject"],
              "tr-TR": ["{1} TCKT'nizi istiyor. İzin veriyor musunuz?", "Evet", "Hayır"]
            },
            algorithm: "x25519-xsalsa20-poly1305",
            nonce: nonce,
            ephem_pub_key: ephemPubKey,
            ciphertext: ciphertext
          }
        }
        console.log(JSON.stringify(TCKT));
        return ipfs.yaz(JSON.stringify(TCKT));
      })
      .catch((e) => console.log(e + "TCKT oluşturamadık: Kullanıcı reddetti veya IPFS hatası"));

    imeceİptalKur()
      .then(([adresAğırlığı, eşik]) => öde(cidSözü, adresAğırlığı, eşik));
  };
}

/**
 * Ödeme adımını gösterir, ödeme onayını alıp evm provider'a yollar.
 *
 * @param {Promise<Uint8Array>} cidSözü gelmekte olan ipfs CID'i.
 * @param {Object<string, number>} adresAğırlığı (adres, ağırlık) ikilileri.
 * @param {number} eşik imece iptal için gereken oy eşiği.
 */
async function öde(cidSözü, adresAğırlığı, eşik) {
  dom.adla("s5").classList.remove("disabled");

  /** @type {?string} */
  let iptalData = null;
  const len = adresAğırlığı.length;
  if (len) {
    delete adresAğırlığı.length;
    iptalData = evm.uint256(/** @type {number} */(eşik)) + evm.uint256(len);
    for (let adres in adresAğırlığı) {
      iptalData += evm.uint160(adresAğırlığı[adres]) + adres.slice(2).toLowerCase();
    }
  }

  s5a.onclick = async () => {
    /** @type {string} */
    const cid = hex(await cidSözü);
    /** @type {Transaction} */
    const tx = /** @type {Transaction} */({
      to: "0xcCc0F938A2C94b0fFBa49F257902Be7F56E62cCc",
      from: /** @type {string} */(HesapAdresi),
      value: "0x16345785D8A0000",
      data: iptalData ? "0x964cefc3" + cid + iptalData : "0x780900dc" + cid,
      chainId: /** @type {string} */(ChainId),
    });
    try {
      await ethereum.request(/** @type {RequestParams} */({
        method: "eth_sendTransaction",
        params: [tx]
      }));
    } catch (e) {
      console.log(e);
    }
  };
}
