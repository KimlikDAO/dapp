const KIMLIK_AS_URL = "https://mock-api.kimlikas.com"

const s2a = document.getElementById('s2a');

async function makeImzaCall() {
  if (location.search) {
    // URL'de auth_code var, bunu kullanarak imza sunucudan TCKT alalım.

    params = new URLSearchParams(location.search);
    const code = params.get('code');
    const imza_url = KIMLIK_AS_URL + '?' + new URLSearchParams({ oauth_code: code, taahhüt: 'AVC' })
    let res = fetch(imza_url).then(res => res.json());

    const tckt = document.getElementById('tckt');

    res = await res;
    s2a.style.display = "none";
    tckt.style.display = "block";
    document.getElementById('ad').innerText = res.ad;
    document.getElementById('soyad').innerText = res.soyad;
  }
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