const KIMLIK_AS_URL = "https://mock-api.kimlikas.com"

const nw = document.getElementById('nw');
const s1a = document.getElementById('s1a');
const s1b = document.getElementById('s1b');
const s2a = document.getElementById('s2a');

let Hesap = null;
let Rand = new Uint8Array(20);
let TCKT = null;

if (ethereum) {

  if (!Hesap) {
    s1b.innerText = 'Tarayıcı Cüzdanı Bağla';
    s1b.onclick = cüzdanBağla;
  }
}

async function cüzdanBağla() {
  try {
    const hesaplar = await ethereum.request({
      'method': 'eth_requestAccounts',
    });
    Hesap = hesaplar[0];
    const hesapAdı = Hesap.slice(0, 6) + '...' + Hesap.slice(-4);
    nw.innerText = hesapAdı;
    s1a.innerText = hesapAdı;
    s1a.disabled = true;
    s1b.style.display = "none";
  } catch (error) {
    console.error(error)
  }
}

async function taahhütAl(hesap, rand) {
  let hex = new Uint8Array(20);

  for (var i = 1; i <= 20; i++)
    hex[i - 1] = parseInt(hesap.substr(2 * i, 2), 16);
  
  let taahhüt = await crypto.subtle.digest('SHA-256', new Uint8Array([hex, rand]));
  // Hash'in son 18 byte'ını base64 kodla
  taahhüt = new Uint8Array(taahhüt.slice(14));
  var len = taahhüt.byteLength;
  var binary = '';
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(taahhüt[i]);
  }
  return btoa(binary);
}

async function makeImzaCall() {
  if (!location.search || !ethereum)
    return;

  await cüzdanBağla();
  crypto.getRandomValues(Rand);
  const taahhüt = await taahhütAl(Hesap, Rand);

  const params = new URLSearchParams(location.search);
  history.replaceState(null, "", location.pathname);

  const code = params.get('code');
  const imza_url = KIMLIK_AS_URL + '?' + new URLSearchParams({ 'oauth_code': code, 'taahhüt': taahhüt });
  TCKT = await fetch(imza_url).then(res => res.json());

  for (let key of "TCKN ad soyad dt".split(" ")) {
    document.getElementById(key).innerText = TCKT[key];
  }
  const TCKTElement = document.getElementById('TCKT');
  s2a.style.display = "none";
  document.getElementById('bss').classList.add('show');
  TCKTElement.style.display = "block";
  TCKTElement.classList.add('show');

  const publicKey = await ethereum.request({
    'method': 'eth_getEncryptionPublicKey',
    'params': [Hesap]
  })
}

makeImzaCall();
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