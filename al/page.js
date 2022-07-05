import ipfs from '/tools/ipfs';
import { hex, base64 } from '/tools/cevir';
import { encrypt } from '/tools/encrypt';
/**
 * @fileoverview Al sayfası giriş noktası
 */

/**
 * @type {string}
 * @const
 */
const KIMLIK_AS_URL = "https://mock-api.kimlikas.com";

/**
 * @noinline
 * @param {string} id of the DOM element.
 */
const Adıyla = (id) => document.getElementById(id);

const nw = Adıyla("nw");
const s1a = Adıyla("s1a");
const s1b = Adıyla("s1b");
const s2a = Adıyla("s2a");
const s3a = Adıyla("s3a");
const s4a = Adıyla("s4a");
const s5a = Adıyla("s5a");

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

/**
 * Kurtarma adresleri basamağında kullanılan girdiler için sayaç
 * @type {number}
 */
let InputIdSayaç = 3;

async function giriş() {
  if (ethereum) {
    ethereum.on('accountsChanged', hesapAdresiDeğişti);
    ethereum.on('chainChanged', chainIdDeğişti);

    if (!HesapAdresi) {
      s1b.innerText = "Tarayıcı Cüzdanı Bağla";
      s1b.target = "";
      s1b.href = "javascript:";
      s1b.onclick = cüzdanBağla;
    }
    await ethereum.request({ "method": "eth_accounts" }).then(
      (accounts) => { if (accounts.length > 0) return cüzdanBağla(); }
    );
  }

  await TCKTYarat();
}

giriş();

async function chainIdDeğişti(chainId) {
  if (chainId != ChainId) {
    console.log('Chain Id Değişti', chainId);
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
    const hesaplar = await ethereum.request({
      "method": "eth_requestAccounts",
    });
    ethereum.request({ "method": "eth_chainId" }).then(chainIdDeğişti);
    await hesapAdresiDeğişti(hesaplar);

    s1b.innerText += "ndı 👍";
    s1b.onclick = null;
    s1b.disabled = true;
    s1a.style.display = "none";
    Adıyla("s1").classList.add("done");
    s1b.classList.add("disabled");
    Adıyla("s2").classList.remove("disabled");
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
  let concat = new Uint8Array(20 + 32);
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
  const /** URLSearchParams */ params = new URLSearchParams(location.search);
  const /** string */ code = params.get("code");
  history.replaceState(null, "", location.pathname);

  Adıyla("s3").classList.remove("disabled");
  s3a.classList.remove("disabled");

  let açıkTCKTSözü = taahhütOluştur(HesapAdresi, Rasgele)
    .then((taahhüt) =>
      fetch(KIMLIK_AS_URL + "?" + new URLSearchParams({ oauth_code: code, taahhüt: taahhüt })))
    .then((res) => res.json())
    .then((açıkTCKT) => {
      for (let key of "TCKN ad soyad dt".split(" ")) {
        document.getElementById(key).innerHTML = açıkTCKT[key];
      }
      const TCKTElement = document.getElementById("TCKT");
      s2a.innerText = "E-devlet'ten bilgileriniz alındı 👍";
      s2a.onclick = null;
      s2a.classList.add("disabled");
      s2a.disabled = true;
      s2a.href = "javascript:";
      Adıyla("s2").classList.add("done");

      açıkTCKT.rasgele = window.btoa(Rasgele);
      return açıkTCKT;
    });

  s3a.onclick = async () => {
    const açıkAnahtarSözü = ethereum.request({
      "method": "eth_getEncryptionPublicKey",
      "params": [HesapAdresi],
    }).then((pubKey) => {
      s3a.onclick = null;
      s3a.innerText = "Açık anahtarınızı aldık 👍";
      s3a.classList.add("disabled");
      Adıyla("s3").classList.add("done");
      Adıyla("s4").classList.remove("disabled");
      return pubKey;
    });

    const açıkAnahtar = await açıkAnahtarSözü;
    const açıkTCKT = JSON.stringify(await açıkTCKTSözü);
    const doldur = new Uint8Array((512 - açıkTCKT.length) / 2);
    crypto.getRandomValues(doldur);
    const encrypted = encrypt(açıkAnahtar, açıkTCKT + hex(doldur));

    const TCKT = {
      name: "TCKT",
      description: "TC Kimlik Tokeni",
      image: "ipfs://",
      unlockable: {
        user_prompt: {
          "en-US": ["{1} wants to view your TCKT.", "OK", "Reject"],
          "tr-TR": ["{1} TCKT'nizi istiyor. İzin veriyor musunuz?", "Evet", "Hayır"]
        },
        algorithm: "x25519-xsalsa20-poly1305",
        nonce: encrypted.nonce,
        ephem_pub_key: encrypted.ephemPublicKey,
        ciphertext: encrypted.ciphertext
      }
    }

    const cidSözü = ipfs.add(JSON.stringify(TCKT));

    Adıyla("s4a").onclick = async () => {
      Adıyla("social-revoke-form").classList.remove("invisible");
      for (var i = 0; i < InputIdSayaç; ++i) {
        Adıyla("adres" + i).onblur = adresBlurOlunca;
        Adıyla("ağırlık" + i).onblur = ağırlıkHesapla;
      }
      Adıyla("s4c").onclick = girdiAlanıEkle;
      Adıyla("s4d").onclick = girdiAlanıÇıkar;
      Adıyla("eşik-değeri").onblur = eşikDeğeriBlurOlunca;
      Adıyla("s4e").onclick = async () => {
        let adresler = [];
        let ağırlıklar = [];
        for (var i = 0; i < InputIdSayaç; i++) {
          adresler.push(Adıyla("adres" + i).value);
          ağırlıklar.push(Adıyla("ağırlık" + i).value);
        }
        const eşikDeğeri = Adıyla("eşik-değeri").value;
        s4a.innerHTML = "İmece iptal kuruldu 👍";
        ödemeAdımınaGeç(cidSözü, adresler, ağırlıklar, eşikDeğeri);
        console.log("clicked s4e")
      };
      Adıyla("s4f").onclick = async () => {
        Adıyla("social-revoke-form").classList.add("invisible");
      };
    }

    Adıyla("s4b").onclick = async () => {
      s4a.innerHTML = "İmece iptal kurulmadı 🤌";
      ödemeAdımınaGeç(cidSözü);
    }
  };
}

/**
 * @param {!Promise<Object>} cidSözü
 * @param {!Array<string>=} adresler
 * @param {!Array<number>=} ağırlıklar
 * @param {number=} eşikDeğeri
 */
async function ödemeAdımınaGeç(cidSözü, adresler, agırlıklar, eşikDeğeri) {
  Adıyla("social-revoke-form").classList.add("invisible");
  Adıyla("s4").classList.add("done");
  Adıyla("s4b").style.display = "none";
  s4a.onclick = null;
  Adıyla("s5").classList.remove("disabled");
  s5a.onclick = async () => {
    const cid = (await cidSözü).bytes.slice(2);
    const tx = {
      to: '0xcCc0F938A2C94b0fFBa49F257902Be7F56E62cCc',
      from: HesapAdresi,
      value: '0x16345785D8A0000',
      data: '0x7f746573' + hex(cid),
      chainId: ChainId,
    };
    try {
      await ethereum.request({
        "method": "eth_sendTransaction",
        "params": [tx]
      });
    } catch (e) {
      console.log(e);
    }
  };
  console.log(adresler, agırlıklar, eşikDeğeri)
}

async function girdiAlanıEkle() {
  const div = document.createElement("div");
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  div.id = "container" + InputIdSayaç;
  div.classList.add("container");
  input1.id = "adres" + InputIdSayaç;
  input1.classList.add("address-input");
  input1.type = "text";
  input1.onblur = adresBlurOlunca;
  input2.id = "ağırlık" + InputIdSayaç;
  input2.classList.add("weight-input");
  input2.type = "number";
  input2.onblur = ağırlıkHesapla;
  input2.value = 1;
  div.appendChild(input1);
  div.appendChild(input2);
  Adıyla("input-fields").insertBefore(div, Adıyla("br"));
  InputIdSayaç += 1;
  ağırlıkHesapla();
  console.log("clicked +")
}

function girdiAlanıÇıkar() {
  InputIdSayaç -= 1;
  Adıyla("container" + InputIdSayaç).remove();
  ağırlıkHesapla();
  console.log("clicked -")
}

function adresGecerliMi(adres) {
  return adres.length == 42 && adres.startsWith("0x");
}

function eşikDeğeriGecerliMi(değer) {
  const toplamAğırlık = Adıyla("toplam-ağırlık").value;
  return toplamAğırlık >= değer;
}

function eşikDeğeriBlurOlunca(event) {
  eşikDeğeriGecerliMi(event.target.value);
}

function adresBlurOlunca(event) {
  adresGecerliMi(event.target.value);
}

function ağırlıkHesapla() {
  /** @type {number} */
  var total = 0;
  for (var /** number */ i = 0; i < InputIdSayaç; ++i) {
    total += Number(Adıyla("ağırlık" + i).value);
  }
  Adıyla("toplam-ağırlık").value = total;
}
