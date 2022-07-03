"use strict";

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
    s1b.onclick = bağlayaBasıldı;
  }
}

async function bağlayaBasıldı() {
  await cüzdanBağla();

  Adıyla("s2").classList.remove("disabled");
  s2a.classList.remove("disabled");
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
function nihaiArabirimAdı(hesap) {

}

async function cüzdanBağla() {
  try {
    const hesaplar = await ethereum.request({
      "method": "eth_requestAccounts",
    });
    HesapAdresi = hesaplar[0];
    nw.innerText = hızlıArabirimAdı(HesapAdresi);
    s1b.innerText += "ndı";
    s1b.onclick = null;
    s1b.disabled = true;
    s1a.style.display = "none";
    Adıyla("s1").classList.add("done");
    s1b.classList.add("disabled");
  } catch (error) {
    console.error(error);
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
async function taahhütAl(hesap, rasgele) {
  /** @type {!Uint8Array} */
  let concat = new Uint8Array(20 + 32);
  concat.set(rasgele, 0);

  for (let /** number */ i = 1; i <= 20; ++i)
    concat[i + 31] = parseInt(hesap.substring(2 * i, 2 * i + 2), 16);

  /** @type {ArrayBuffer} */
  let taahhüt = await crypto.subtle.digest("SHA-256", concat);

  return ArrayBufferBase64(taahhüt);
}

async function açıkTCKTÇek() {
  if (!location.search || !ethereum) return;

  if (ethereum.isConnected()) {
    await cüzdanBağla();
  } else console.log("Bağlı degil");

  crypto.getRandomValues(Rasgele);

  /**
   * @type {string}
   * @const
   */
  const taahhüt = await taahhütAl(HesapAdresi, Rasgele);

  /**
   * @type {URLSearchParams}
   * @const
   */
  const params = new URLSearchParams(location.search);
  history.replaceState(null, "", location.pathname);

  const code = params.get("code");
  const imza_url =
    KIMLIK_AS_URL +
    "?" +
    new URLSearchParams({ oauth_code: code, taahhüt: taahhüt });
  AçıkTCKT = await fetch(imza_url).then((res) => res.json());

  for (let key of "TCKN ad soyad dt".split(" ")) {
    document.getElementById(key).innerHTML = AçıkTCKT[key];
  }
  const TCKTElement = document.getElementById("TCKT");
  s2a.innerText = "E-devlet'ten bilgileriniz alındı";
  s2a.onclick = null;
  s2a.classList.add("disabled");
  s2a.disabled = true;
  s2a.href = "javascript:";
  Adıyla("s2").classList.add("done");

  üçüncüAdımHazırla();
}

async function üçüncüAdımHazırla() {
  Adıyla("s3").classList.remove("disabled");
  s3a.classList.remove("disabled");
  s3a.onclick = açıkAnahtarAl;
}

async function açıkAnahtarAl() {
  const publicKey = await ethereum.request({
    "method": "eth_getEncryptionPublicKey",
    "params": [HesapAdresi],
  });
  s3a.onclick = null;
  s3a.classList.add("disabled");
  Adıyla("s3").classList.add("done");

  AçıkTCKT.rand = window.btoa(Rasgele);
  console.log(JSON.stringify(AçıkTCKT));

  sonAdımHazırla();
}

async function sonAdımHazırla() {
  Adıyla("s4").classList.remove("disabled");
  s4a.onlick = öde();
  s4a.classList.remove("disabled");
}

async function öde() { }

açıkTCKTÇek();
