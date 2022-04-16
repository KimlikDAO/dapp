const KIMLIK_AS_URL = "https://mock-api.kimlikas.com"

async function makeImzaCall() {
  if (location.search) {
    // URL'de auth_code var, bunu kullanarak imza sunucudan TCKT alalım.

    params = new URLSearchParams(location.search);
    const code = params.get('code');
    const imza_url = KIMLIK_AS_URL + '?' + new URLSearchParams({ oauth_code: code, taahhüt: 'AVC' })
    let res = await fetch(imza_url).then(res => res.json());
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