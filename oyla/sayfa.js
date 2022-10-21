/**
 * @fileoverview Oyla sayfası giriş noktası
 *
 */
import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/dom';
import TCKT from '/lib/TCKT';

let seçilmişÖneriId;

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
  if (!seçilmişÖneriId) seçilmişÖneriId = "0";
  /** @const {Element} */
  const önergeDüğmesi = dom.adla("oyyddb");
  /** @const {Element} */
  const önergeMenusu = dom.adla("oyyul");
  dom.menüYarat(önergeDüğmesi, önergeMenusu);
  önergeMenusu.onclick = (e) => {
    const li = e.target;
    if (li.nodeName != "LI") return;
    dom.adlaGizle("oyy" + seçilmişÖneriId);
    dom.adlaGizle("oyyso" + seçilmişÖneriId);
    seçilmişÖneriId = li.id.slice(4);
    dom.adlaGöster("oyy" + seçilmişÖneriId);
    dom.adlaGöster("oyyso" + seçilmişÖneriId);
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
    if (fiyat == null || fiyat == undefined || fiyat == "") return;
    if (seçilmişTokenId == null || seçilmişTokenId == undefined || seçilmişTokenId == "") return;
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
    secenekler.appendChild(secenek);
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
      "metin": {[dom.TR ? "tr_TR": "en_EN"]: metin.trim()},
      "secenekler": secenekListesi.map(secenek => {
        return {[dom.TR ? "tr_TR": "en_EN"]: secenek};
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
  const description = middleDiv.children[0].children[0];
  description.innerText = data.description;
  const address = middleDiv.children[0].children[1].children[0];
  address.innerText = data.address;
  const callData = middleDiv.children[0].children[1].children[1];
  callData.innerText = data.callData;
  const remainingTime = middleDiv.children[0].children[2].children[1];
  remainingTime.innerText = data.remainingTime + " REMAINING";
  const oyKullanmaDüğmeleri = middleDiv.children[1].children[1];
  for (let i = 0; i < 3; ++i) {
    oyKullanmaDüğmeleri.children[i].onclick = (e) => {
      console.log(`Clicked ${i} oy tuşu`);
      e.stopPropagation();
    }
  }
  dom.göster(element);
  return element
}

const data = {
  title: "Title",
  description: "Description",
  address: "Address",
  callData: "Calldata",
  remainingTime: "13D 2H "
}

const data1 = {
  title: "Title1",
  description: "Description1",
  address: "Address1",
  callData: "Calldata1",
  remainingTime: "12D 11H"
}

const yeniOy = aktifOyKartıOluştur(data);
const yeniOy1 = aktifOyKartıOluştur(data1);
dom.adla("oyac").appendChild(yeniOy);
dom.adla("oyac").appendChild(yeniOy1);