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

const aktifOyKartıOluştur = (data, mockDataInput) => {
  const element = dom.adla("oyac").children[1].cloneNode(true);
  const topDiv = element.children[0];
  const middleDiv = element.children[1];
  const bottomDiv = element.children[2];
  const title = topDiv.children[0];
  title.innerText = data.title;

  const oyKartıKüçültmeDüğmesi = topDiv.children[1];
  element.onclick = () => {
    dom.göster(bottomDiv);
    element.classList.add("sel");
    dom.göster(oyKartıKüçültmeDüğmesi);
  }
  oyKartıKüçültmeDüğmesi.onclick = (e) => {
    dom.gizle(bottomDiv);
    element.classList.remove("sel");
    dom.gizle(oyKartıKüçültmeDüğmesi);
    e.stopPropagation();
  }
  const description = middleDiv.children[0].children[0];
  description.innerText = data.description;
  const address = middleDiv.children[0].children[1].children[0];
  address.innerText = data.address;
  const callData = middleDiv.children[0].children[1].children[1];
  callData.innerText = data.callData;

  birazBekle().then(() => {
    var totalVotings = mockDataInput.countYes + mockDataInput.countNo + mockDataInput.countAbstain;
    const yesAsPercentage = percentage(mockDataInput.countYes, totalVotings);
    const noAsPercentage = percentage(mockDataInput.countNo, totalVotings);
    const abstainAsPercentage = percentage(mockDataInput.countAbstain, totalVotings);

    const remainingTime = middleDiv.children[0].children[1].children[2].children[1];
    remainingTime.innerText = dom.TR
      ? `KALAN SÜRE ${mockData.remainingTime}`
      : `${mockData.remainingTime} REMAINING`;

    const evetYüzdesi = middleDiv.children[1].children[0].children[2];
    evetYüzdesi.innerText = yesAsPercentage + "%";
    const evetKolonu = middleDiv.children[1].children[0].children[1];
    evetKolonu.style.height = yesAsPercentage + "px";
    const evetDüğmesi = middleDiv.children[1].children[0].children[0];
    evetDüğmesi.onclick = (e) => {
      console.log("clicked Evet");
      e.stopPropagation();
    }

    const hayırYüzdesi = middleDiv.children[1].children[1].children[2];
    hayırYüzdesi.innerText = noAsPercentage + "%";
    const hayırKolonu = middleDiv.children[1].children[1].children[1];
    hayırKolonu.style.height = noAsPercentage + "px";
    const hayırDüğmesi = middleDiv.children[1].children[1].children[0];
    hayırDüğmesi.onclick = (e) => {
      console.log("clicked Hayır");
      e.stopPropagation();
    }

    const çekimserYüzdesi = middleDiv.children[1].children[2].children[2];
    çekimserYüzdesi.innerText = abstainAsPercentage + "%";
    const çekimserKolonu = middleDiv.children[1].children[2].children[1];
    çekimserKolonu.style.height = abstainAsPercentage + "px";
    const çekimserDüğmesi = middleDiv.children[1].children[2].children[0];
    çekimserDüğmesi.onclick = (e) => {
      console.log("clicked Çekimser");
      e.stopPropagation();
    }
  })

  getChainId().then(data => {
    console.log(data);
  })

  dom.göster(element);
  return element
}

const data = {
  title: "Title",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the",
  address: "0x85ccdB8F444F08D678E5317cA0510FC29Fd3969A",
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

const mockData = {
  network: "0x43114", // Avalanche == 43114
  countYes: 700,
  countNo: 100,
  countAbstain: 250,
  remainingTime: "9D",
}

// const mockData1 = {
//   network: "Ethereum", // Ethereum == ?, which eth network does kimlikdao contract deployed?
//   countYes: 10,
//   countNo: 40,
//   countAbstain:50,
//   remainingTime: "13H",

// }


const getChainId = async () => {
  const chainId = Cüzdan.ağ();
  if (!chainId) {
    throw new Error(
      "chain id mevcut degil"
    );
  }
  return NETWORKS[chainId];
};


const NETWORKS = {
  1: "Ethereum Main Network",
  43114: "Avalanche Network",
};


function percentage(partialValue, totalValue) {
  return (100 * partialValue / totalValue).toFixed(1)
}

const birazBekle = (cevap) => new Promise((resolve) => setTimeout(() => resolve(cevap), 1000))

const yeniOy = aktifOyKartıOluştur(data, mockData);
//const yeniOy1 = aktifOyKartıOluştur(data1, mockData1);
dom.adla("oyac").appendChild(yeniOy);
 //dom.adla("oyac").appendChild(yeniOy1);