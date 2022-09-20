/**
 * @fileoverview Oyla sayfası giriş noktası
 *
 */
import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/dom';
import TCKT from '/lib/TCKT';

Cüzdan.bağlanınca(() => {
  let ağ = Cüzdan.ağ();
  fiyatDeğişikliğiFormuHazırla(ağ)
  Cüzdan.ağDeğişince(() => {
    fiyatDeğişikliğiFormuHazırla(Cüzdan.ağ())
  })
})

dom.adla("oyy").onclick = () => {
  dom.adla("oyy").classList.add("open_form");
}

/** @param {string} yeniAğ  Ağ değişince UI'da gösterir*/
const fiyatDeğişikliğiFormuHazırla = (yeniAğ) => {
  let seçilmişToken;
  for (let i = 0; i < dom.adla("oyytul").childElementCount; ++i) {
    dom.adla("oyytul").children[i].classList.remove("sel")
  }
  dom.göster(dom.adla("oyy" + yeniAğ));
  // Diğer Ağ tokenlarını UI'dan cıkar
  for (const diğerAğ in Cüzdan.Paralar) {
    if (diğerAğ != yeniAğ) dom.gizle(dom.adla("oyy" + diğerAğ));
  }
  // Seçilen ağa göre USDC USDT TRYB ayarla
  for (let i = 1; i <= 3; ++i) {
    dom.adla("oyy" + i).style.display = TCKT.isTokenAvailable(yeniAğ, i)
      ? ""
      : "none";
  }
  // Ağ değişince seçilmiş token'ı kaldır
  for (let i = 0; i < dom.adla("oyystoc").childElementCount; ++i) {
    dom.gizle(dom.adla("oyystoc").children[i]);
  }
  // Li'lere click Handler ekle
  dom.adla("oyytul").onclick = (e) => {
    if (e.target.nodeName == "UL") return;
    if (seçilmişToken) dom.adla("oyy" + seçilmişToken).classList.remove("sel");
    const id = e.target.nodeName == "LI"
      ? e.target.id.slice(3)
      : e.target.parentElement.id.slice(3);
    for (let i = 0; i < dom.adla("oyystoc").childElementCount; ++i) {
      dom.gizle(dom.adla("oyystoc").children[i])
    }
    dom.adlaGöster("oyys" + id);
    dom.adla("oyy" + id).classList.add("sel");
    seçilmişToken = id;
  }
  // Onayla iptal click handler ekle
  dom.adla("oyyo").onclick = () => {
    const fiyat = dom.adla("oyyyf").value;
    if (fiyat == null || fiyat == undefined || fiyat == "") return;
    if (seçilmişToken == null || seçilmişToken == undefined || seçilmişToken == "") return;
    console.log(fiyat, seçilmişToken);
  }

  dom.adla("oyyr").onclick = (e) => {
    e.stopPropagation();
    dom.adla("oyy").classList.remove("open_form");
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