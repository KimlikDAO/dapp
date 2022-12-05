/**
 * @fileoverview Oyla sayfası giriş noktası
 *
 */
import Cüzdan from '/birim/cüzdan/birim';
import TCKT from '/lib/ethereum/TCKT';
import dom from '/lib/util/dom';

let SeçilmişÖneriId;

Cüzdan.bağlanınca(() => {
  let ağ = Cüzdan.ağ();
  fiyatDeğişikliğiFormuHazırla(ağ);
  komuniteÖnergesiHazırla();
  Cüzdan.ağDeğişince(() => {
    fiyatDeğişikliğiFormuHazırla(Cüzdan.ağ());
  })
})

dom.adla("oyyb").onclick = () => {
  dom.adlaGizle("oyyb");
  dom.adlaGöster("oyy");
  if (!SeçilmişÖneriId) SeçilmişÖneriId = "2";
  /** @const {Element} */
  const önergeDüğmesi = dom.adla("oyyddb");
  /** @const {Element} */
  const önergeMenusu = dom.adla("oyyul");
  dom.menüYarat(önergeDüğmesi, önergeMenusu);
  önergeMenusu.onclick = (e) => {
    const li = e.target;
    if (li.nodeName != "LI") return;
    dom.adlaGizle("oyy" + SeçilmişÖneriId);
    dom.adlaGizle("oyyso" + SeçilmişÖneriId);
    SeçilmişÖneriId = li.id.slice(4);
    dom.adlaGöster("oyy" + SeçilmişÖneriId);
    dom.adlaGöster("oyyso" + SeçilmişÖneriId);
  }
}

/** @param {string} yeniAğ Ağ değişince UI'da gösterir*/
const fiyatDeğişikliğiFormuHazırla = (yeniAğ) => {
  /** @const {Element} */
  const tokenMenusu = dom.adla("oyddul");
  // Dropdown'dan yeniAğ token'ı hariç diğer native tokenları kaldır 
  // Seçilen ağ native tokenına sel class'ınnı ekle
  for (let i = 0; i < tokenMenusu.childElementCount; ++i) {
    const token = tokenMenusu.children[i];
    token.classList.remove("sel");
    dom.gizle(token);
    if (token.id.slice(4) == yeniAğ) {
      dom.göster(token);
      token.classList.add("sel");
    }
  }
  /** @type {string} */
  let seçilmişTokenId = yeniAğ;
  // Seçilen ağa göre USDC USDT TRYB ayarla
  for (let i = 1; i <= 3; ++i) {
    dom.adla("oyyt" + i).style.display = TCKT.isTokenAvailable(yeniAğ, i)
      ? ""
      : "none";
  }
  // Ağ değişince seçilmiş token'ı native olarak ayarla
  for (let i = 0; i < dom.adla("oyytb").childElementCount; ++i) {
    dom.gizle(dom.adla("oyytb").children[i]);
  }
  dom.adlaGöster("oyyst" + seçilmişTokenId);
  // Dropdown menüsü yarat ve clickhandler ekle
  /** @const {Element} */
  const tokenDüğmesi = dom.adla("oyytb");
  dom.menüYarat(tokenDüğmesi, tokenMenusu);
  tokenMenusu.onclick = (e) => {
    /** @type {Element} */
    let li = e.target;
    for (; li.nodeName != 'LI'; li = li.parentElement)
      if (li.nodeName == 'DIV') return;
    dom.adlaGizle("oyyst" + seçilmişTokenId);
    dom.adla("oyyt" + seçilmişTokenId).classList.remove("sel");
    seçilmişTokenId = li.id.slice(4);
    dom.adla("oyyt" + seçilmişTokenId).classList.add("sel");
    dom.adlaGöster("oyyst" + seçilmişTokenId);
  }

  // Onayla iptal click handler ekle
  dom.adla("oyyfo").onclick = () => {
    const fiyat = dom.adla("oyyfi").value;
    if (!fiyat) return;
    if (!seçilmişTokenId) return;
    console.log(fiyat, seçilmişTokenId);
  }

  dom.adla("oyyfr").onclick = (e) => {
    dom.adlaGizle("oyy");
    dom.adlaGöster("oyyb");
  }
}

const komuniteÖnergesiHazırla = () => {
  /** @const {Element} */
  const metinGirdisi = dom.adla("oyycva");
  /** @const {Element} */
  const secenekEkleDüğmesi = dom.adla("oyycvse");
  /** @const {Element} */
  const secenekler = dom.adla("oyycvscc");
  /** @const {Element} */
  const onaylaDüğmesi = dom.adla("oyycvo");
  /** @const {Element} */
  const iptalDüğmesi = dom.adla("oyycvr");
  /** @const {Element} */
  const tarihGirdisi = dom.adla("oyycvti");
  /**
  * Verilen text ile secenek oluşturur
  *
  * @param {string} text
  */
  const secenekEkle = (text) => {
    const secenek = secenekler.children[0].cloneNode(true);
    dom.göster(secenek);
    secenek.firstElementChild.value = text;
    secenek.children[1].onclick = () => secenek.remove();
    secenekler.insertBefore(secenek, secenekEkleDüğmesi);
  }
  secenekEkle(dom.TR ? "Evet" : "Yes");
  secenekEkle(dom.TR ? "Hayır" : "No");
  secenekEkleDüğmesi.onclick = () => {
    secenekEkle(dom.TR ? "Yeni Seçenek" : "New Response");
  }
  onaylaDüğmesi.onclick = () => {
    /** @type {Array<string>} */
    let secenekListesi = [];
    /** @const {string} */
    const metin = metinGirdisi.value;
    /** @const {string} */
    const tarih = tarihGirdisi.value;
    for (let i = 1; i < secenekler.children.length; ++i) {
      const secenek = secenekler.children[i].firstElementChild.value;
      if (!secenek) return;
      secenekListesi.push(secenek);
    }
    if (!tarih) return;
    if (!metin) return;
    const öneriBilgileri = {
      "metin": { [dom.TR ? "tr_TR" : "en_EN"]: metin.trim() },
      "secenekler": secenekListesi.map(secenek => {
        return { [dom.TR ? "tr_TR" : "en_EN"]: secenek };
      }),
      "tarih": tarih,
    }
    console.log(öneriBilgileri);
  }
  iptalDüğmesi.onclick = () => {
    dom.adlaGizle("oyy");
    dom.adlaGöster("oyyb");
  }
}

const aktifOyKartıOluştur = (data) => {
  const element = dom.adla("oyac").children[1].cloneNode(true);
  const topDiv = element.children[0];
  const middleDiv = element.children[1];
  const bottomDiv = element.children[2];
  const title = topDiv.children[0];
  title.innerText = data.title;
  const oyKartıKüçültmeDüğmesi = topDiv.children[1];
  element.onclick = () => {
    element.classList.add("expand");
    dom.göster(oyKartıKüçültmeDüğmesi);
  }
  oyKartıKüçültmeDüğmesi.onclick = (e) => {
    element.classList.remove("expand");
    dom.gizle(oyKartıKüçültmeDüğmesi);
    e.stopPropagation();
  }
  birazBekle().then(() => {
    const description = middleDiv.children[0].children[0];
    description.innerText = data.description;
    const address = middleDiv.children[0].children[1].children[0];
    address.innerText = data.address;
    const callData = middleDiv.children[0].children[1].children[1];
    callData.innerText = data.callData;
    const remainingTime = middleDiv.children[0].children[2].children[1];
    remainingTime.innerText = data.remainingTime + " REMAINING";
    /** @type {number} */
    let totalVotes = data.votes.reduce((a, b) => a + b, 0);
    for (let i = 0; i < data.votes.length; ++i) {  //FIXME CloneNode oy çeşitliliğine göre
      const chartElements = middleDiv.children[1].children[i];
      chartElements.children[0].onclick = (e) => {
        if (data.chain != Cüzdan.ağ()) {
          ethereum.request(/** @type {eth.Request} */({
            method: "wallet_switchEthereumChain",
            params: [{ "chainId": data.chain }],
          })).catch(console.log);
        }
        e.stopPropagation();
      }
      const percentage = orandanMetne(data.votes[i], totalVotes);
      chartElements.children[1].style.height = `${percentage}px`;
      chartElements.children[2].innerText = `%${percentage}`;
    }
  })

  dom.göster(element);
  return element
}

const data = {
  title: "Fiyat Değişikliği",
  description: "TCKT fiyati $4 olarak belirlensin.",
  address: "0xc9039C5A5311bFeA959CFe744df8A010fe36EA36",
  callData: "0xb5b831e2",
  remainingTime: "13D 2H ",
  chain: "0xa86a",
  votes: [2, 9, 11],
};

const data1 = {
  title: "Topluluk Önerisi",
  description: "Solana ağı desteği gelsin.",
  address: "0x75B4f62728c499087838E705989EC5F7eB479E4b",
  callData: "0xp9c586d4",
  remainingTime: "27D 3H",
  chain: "0x1",
  votes: [24, 3, 7],
};

const birazBekle = (cevap) => new Promise((resolve) => setTimeout(() => resolve(cevap), 100));

const orandanMetne = (partialValue, totalValue) => (100 * partialValue / totalValue).toFixed(1);

const yeniOy = aktifOyKartıOluştur(data);
const yeniOy1 = aktifOyKartıOluştur(data1);
dom.adla("oyac").appendChild(yeniOy);
dom.adla("oyac").appendChild(yeniOy1);
