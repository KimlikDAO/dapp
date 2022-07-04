const KIMLIK_AS_URL = "https://mock-api.kimlikas.com";

const Adıyla = (id) => document.getElementById(id);

const nw = Adıyla("nw");
const s1a = Adıyla("s1a");
const s1b = Adıyla("s1b");
const s2a = Adıyla("s2a");
const s3a = Adıyla("s3a");
const s4a = Adıyla("s4a");
const s5a = Adıyla("s5a");

let Hesap = null;
let Rand = new Uint8Array(20);
let TCKT = null;
let inputIdSayac = 3;

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
  dördüncüAdımHazırla()
}

async function dördüncüAdımHazırla() {
  Adıyla("s4").classList.remove("disabled")
  s4a.onclick = socialRevokeEkle;
  Adıyla("s4b").onclick = socialRevokeEkleme;
  console.log("4.adım")
}

async function socialRevokeEkle() {
  Adıyla("social-revoke-form").classList.remove("invisible")
  Adıyla("s4c").onclick = inputFieldEkle;
  Adıyla("s4d").onclick = socialEkleOnayla;
  Adıyla("s4e").onclick = socialEkleIptalEt;
  Adıyla("s4f").onclick = inputFieldCıkar;
  for (var i = 0; i < inputIdSayac; i++) {
    Adıyla("address" + i).onblur = blurOlunca;
    Adıyla("weight" + i).onblur = agırlıkHesapla;
  }
  console.log("clicked evet");
}

async function socialRevokeEkleme() {
  Adıyla("s4").classList.add("done");
  s4a.onclick = null;
  s4a.innerHTML = "Social Revoke Eklenmedi"
  Adıyla("s4b").style.display = "none";
  sonAdımHazırla();
}

async function inputFieldEkle() {
  const div = document.createElement("div");
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  div.id = "container" + inputIdSayac;
  div.classList.add("container");
  input1.id = "address" + inputIdSayac;
  input1.classList.add("address-input");
  input1.type = "text";
  input1.onblur = blurOlunca;
  input2.id = "weight" + inputIdSayac;
  input2.classList.add("weight-input");
  input2.type = "number";
  input2.onblur = agırlıkHesapla;
  input2.value = 1;
  div.appendChild(input1);
  div.appendChild(input2);
  Adıyla("input-fields").insertBefore(div, Adıyla("br"));
  inputIdSayac += 1;
  agırlıkHesapla();
  console.log("clicked +")
}

async function inputFieldCıkar() {
  Adıyla("container" + (inputIdSayac-1)).remove();
  inputIdSayac -= 1;
  agırlıkHesapla();
  console.log("clicked -")
}

async function socialEkleOnayla() {
  let addressList = [];
  let weightList = []
  for (var i = 0; i < inputIdSayac; i++) {
    addressList.push(Adıyla("address" + i).value);
    weightList.push(Adıyla("weight" + i).value);
  }
  const threshold = Adıyla("threshold").value;
  const totalWeight = Adıyla("total").value;
  console.log(addressList, weightList);
  console.log(threshold, totalWeight);
  Adıyla("s4").classList.add("done");
  Adıyla("social-revoke-form").classList.add("invisible");
  s4a.onclick = null;
  s4a.innerHTML = "Social Revoke Eklendi";
  Adıyla("s4b").style.display = "none";
  sonAdımHazırla()
}

/**
 * Fake address validator.
 */
async function adresGecerliMi(address) {
  console.log(address)
  return address.length == 42 && address.startsWith("0x");
}

async function blurOlunca(event) {
  adresGecerliMi(event.target.value);
}

async function agırlıkHesapla() {
  var total = 0;
  for (var i = 0; i < inputIdSayac; i++) {
    total += Number(Adıyla("weight" + i).value);
  }
  Adıyla("total").value = total;
}

async function socialEkleIptalEt() {
  Adıyla("social-revoke-form").classList.add("invisible")
  console.log('clicked İptal')
}

async function sonAdımHazırla() {
  Adıyla("s5").classList.remove("disabled");
  s5a.onlick = öde();
  s5a.classList.remove("disabled");
}

async function öde() { }

açıkTCKTÇek();
