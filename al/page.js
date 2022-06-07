const KIMLIK_AS_URL = "https://mock-api.kimlikas.com";

const Adıyla = (id) => document.getElementById(id);

const nw = Adıyla("nw");
const s1a = Adıyla("s1a");
const s1b = Adıyla("s1b");
const s2a = Adıyla("s2a");
const s3a = Adıyla("s3a");
const s4a = Adıyla("s4a");

let Hesap = null;
let Rand = new Uint8Array(20);
let TCKT = null;

if (ethereum) {
  if (!Hesap) {
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

async function cüzdanBağla() {
  try {
    const hesaplar = await ethereum.request({
      "method": "eth_requestAccounts",
    });
    Hesap = hesaplar[0];
    const hesapAdı = Hesap.slice(0, 6) + "..." + Hesap.slice(-4);
    nw.innerText = hesapAdı;
    s1b.innerText += "ndı";
    s1b.onclick = null;
    s1b.disabled = true;
    s1a.style.display = "none";
    Adıyla("s1").classList.add("done");
    s1b.classList.add("disabled");
    console.log(Hesap);
  } catch (error) {
    console.error(error);
  }
}

async function taahhütAl(hesap, rand) {
  let hex = new Uint8Array(20);

  for (var i = 1; i <= 20; i++)
    hex[i - 1] = parseInt(hesap.substr(2 * i, 2), 16);

  let taahhüt = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array([hex, rand])
  );
  // Hash'in son 18 byte'ını base64 kodla
  taahhüt = new Uint8Array(taahhüt.slice(14));
  var len = taahhüt.byteLength;
  var binary = "";
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(taahhüt[i]);
  }
  return btoa(binary);
}

async function açıkTCKTÇek() {
  if (!location.search || !ethereum) return;

  console.log(ethereum.selectedAddress);
  if (ethereum.isConnected()) {
    await cüzdanBağla();
  } else console.log("Bağlı degil");

  crypto.getRandomValues(Rand);
  const taahhüt = await taahhütAl(Hesap, Rand);

  const params = new URLSearchParams(location.search);
  history.replaceState(null, "", location.pathname);

  const code = params.get("code");
  const imza_url =
    KIMLIK_AS_URL +
    "?" +
    new URLSearchParams({ oauth_code: code, taahhüt: taahhüt });
  TCKT = await fetch(imza_url).then((res) => res.json());

  for (let key of "TCKN ad soyad dt".split(" ")) {
    document.getElementById(key).innerHTML = TCKT[key];
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
  s3a.onclick = açikAnahtarAl;
}

async function açikAnahtarAl() {
  const publicKey = await ethereum.request({
    "method": "eth_getEncryptionPublicKey",
    "params": [Hesap],
  });
  s3a.onclick = null;
  s3a.classList.add("disabled");
  Adıyla("s3").classList.add("done");

  sonAdımHazırla();
}

async function sonAdımHazırla() {
  Adıyla("s4").classList.remove("disabled");
  s4a.onlick = öde();
  s4a.classList.remove("disabled");
}

async function öde() {}

açıkTCKTÇek();
// şifrelemeyeÇalış();

/* const s1b = document.getElementById('s1b')

s1b.onclick = function () { }

for (var i = 1; i < 4; ++i) {
  s[i] = document.getElementById('s' + i)
}

s2b = document.getElementById('s2b')
s2b.onclick = async () => {
  acc = await ethereum.request({ method: 'eth_requestAccounts' })
  console.log(acc[0])
}
*/
