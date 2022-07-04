import { create } from 'ipfs-http-client';

/**
 * @fileoverview Al sayfası giriş noktası
 */


/**
 * @param {ArrayBuffer} buffer Base64'e dönüştürülecek buffer.
 * @return {string} Base64 temsil eden dizi.
 */
function ArrayBufferBase64(buffer) {
  /** @type {string} */
  var binary = "";
  var bytes = new Uint8Array(buffer);
  /** @type {number} */
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

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

/**
 * Bağlı cüzdan adresi veya `null`.
 * @type {?string}
 */
let HesapAdresi = null;

/**
 * Pedersen taahhüdü için rasgele bitdizisi.
 * @type {!Uint8Array}
 */
let Rasgele = new Uint8Array(32);

/**
 * Dijital imzalı ama daha şifrelenmemiş TCKT. Kullanıcı tarafında oluşturulmuş
 * rasgele bitdizisi `Rasgele`yi içermiyor olabilir.
 * @type {Object}
 */
let AçıkTCKT = null;

if (ethereum) {
  if (!HesapAdresi) {
    s1b.innerText = "Tarayıcı Cüzdanı Bağla";
    s1b.target = "";
    s1b.href = "javascript:";
    s1b.onclick = cüzdanBağla;
  }
}

TCKTYarat();

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
    console.log("Dondu");
    HesapAdresi = hesaplar[0];
    nw.innerText = hızlıArabirimAdı(HesapAdresi);
    nihaiArabirimAdı(HesapAdresi).then((ad) => nw.innerText = ad);
    s1b.innerText += "ndı";
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

  return ArrayBufferBase64(taahhüt);
}

async function TCKTYarat() {
  if (!location.search || !ethereum) return;
  await cüzdanBağla();

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
      s2a.innerText = "E-devlet'ten bilgileriniz alındı";
      s2a.onclick = null;
      s2a.classList.add("disabled");
      s2a.disabled = true;
      s2a.href = "javascript:";
      Adıyla("s2").classList.add("done");

      açıkTCKT.rasgele = window.btoa(Rasgele);
      return açıkTCKT;
    });

  const ipfs = create("https://ipfs.infura.io:5001/");

  s3a.onclick = async () => {
    const açıkAnahtarSözü = ethereum.request({
      "method": "eth_getEncryptionPublicKey",
      "params": [HesapAdresi],
    }).then((pubKey) => {
      s3a.onclick = null;
      s3a.classList.add("disabled");
      Adıyla("s3").classList.add("done");
      Adıyla("s4").classList.remove("disabled");
      return pubKey;
    });

    const açıkAnahtar = await açıkAnahtarSözü;
    const açıkTCKT = await açıkTCKTSözü;
    console.log("Ready to encrypt");
    const encrypted = "TEST";

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
        nonce: "",
        ephem_pub_key: "",
        ciphertext: encrypted
      }
    }
    const cidSözü = ipfs.add(JSON.stringify(TCKT));
    s4a.classList.remove("disabled");
    s4a.onclick = async () => {
      const cid = (await cidSözü).cid.bytes.slice(2);
      console.log(cid);

      const tx = {
        to: '0xcCc0F938A2C94b0fFBa49F257902Be7F56E62cCc',
        from: HesapAdresi,
        value: '0x01',
        data:
          '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
        chainId: '0xa86a',
      };
      try {
        await ethereum.request({
          "method": "eth_sendTransaction",
          "params": [tx]
        });
      } catch(e) {
        console.log(e);
      }
    };
  };
}
