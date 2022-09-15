/**
 * @fileoverview Oyla sayfası giriş noktası
 *
 */
import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/dom';

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

/**@param {string} yeniAğ  Ağ değişince UI'da gösterir*/
const fiyatDeğişikliğiFormuHazırla = (yeniAğ) => {
  dom.göster(dom.adla("oyy" + yeniAğ).nextElementSibling);
  //Diğer Ağ tokenlarını UI'dan cıkar
  for (const diğerAğ in Cüzdan.Paralar) {
    if (diğerAğ != yeniAğ) dom.gizle(dom.adla("oyy" + diğerAğ).nextElementSibling);
  }
  //Ağ değişince sağ containerda gösterilen token'ı kaldır
  for (let i = 0; i < dom.adla("oyytcsag").childElementCount; ++i) {
    dom.gizle(dom.adla("oyytcsag").children[i]);
  }
  //Labellara click Handler ekle
  for (let/** number */ i = 1; i < dom.adla("oyytcsol").childElementCount; i += 2) {
    const element = dom.adla("oyytcsol").children[i];
    element.onclick = () => {
      seçilmişTokenGöster(element)
    }
  }

  const seçilmişTokenGöster = (element) => {
    for (let i = 0; i < dom.adla("oyytcsag").childElementCount; ++i) {
      dom.gizle(dom.adla("oyytcsag").children[i]);
    }
    const id = element.previousElementSibling.id.slice(3);
    dom.göster(dom.adla("oyys" + id));
  }
}

const aktifOyKartıOluştur = (data, dummyVeri) => {
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

  const yes = bottomDiv.children[0]
  const no = bottomDiv.children[1]
  const abstain = bottomDiv.children[2]

  birazBekle().then(() => {
    remainingTime.innerText = dummyVeri.remainingTime + " REMAINING";
    yes.innerText = "YES: " + dummyVeri.countYes;
    no.innerText = "NO: " + dummyVeri.countNo;
    abstain.innerText = "ABSTAIN: " + dummyVeri.countAbstain;
  })

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
  remainingTime: "13D 42H "
}

const data1 = {
  title: "Title1",
  description: "Description1",
  address: "Address1",
  callData: "Calldata1",
  remainingTime: "12D 42H"
}

const dummyVeri = {
  remainingTime: "90D 12H",
  countYes: "9000",
  countNo: "1000",
  countAbstain: "3"
}

const birazBekle = (cevap) => new Promise((resolve) => setTimeout(() => resolve(cevap), 1000))

const yeniOy = aktifOyKartıOluştur(data, dummyVeri);
const yeniOy1 = aktifOyKartıOluştur(data1, dummyVeri);
dom.adla("oyac").appendChild(yeniOy);
dom.adla("oyac").appendChild(yeniOy1);
