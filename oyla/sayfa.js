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
     const id = e.target.nodeName == "LI"
       ? e.target.id.slice(3)
       : e.target.parentElement.id.slice(3);
     for (let i = 0; i < dom.adla("oyystoc").childElementCount; ++i) {
       dom.gizle(dom.adla("oyystoc").children[i])
     }
     dom.adlaGöster("oyys" + id);
     seçilmişToken = id;
   }
   // Onayla iptal click handler
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
   
   birazBekle().then(() => {
     var totalVotings = Number(mockDataInput.countYes) + Number(mockDataInput.countNo) + Number(mockDataInput.countAbstain); 
     const yesAsPercentage = percentage(mockDataInput.countYes, totalVotings);
     const noAsPercentage = percentage(mockDataInput.countNo, totalVotings);
     const abstainAsPercentage = percentage(mockDataInput.countAbstain, totalVotings);
 
     const remainingTime = middleDiv.children[0].children[2].children[1];
     remainingTime.innerText = mockData.remainingTime + " REMAINING";
     
     const columnYes = middleDiv.children[1].children[0].children[0];
     columnYes.innerText = yesAsPercentage+"%";
     const columnYesHeight = yesAsPercentage+"px";
     columnYes.style.height = columnYesHeight;
 
     const columnNo = middleDiv.children[1].children[0].children[1];
     columnNo.innerText = noAsPercentage+"%";
     const columnNoHeight = noAsPercentage+"px";
     columnNo.style.height = columnNoHeight;
 
     const columnAbstain = middleDiv.children[1].children[0].children[2];
     columnAbstain.innerText = abstainAsPercentage+"%";
     const columnAbstainHeight = abstainAsPercentage+"px";
     columnAbstain.style.height = columnAbstainHeight;
   
   });
   const oyKullanmaDüğmeleri = middleDiv.children[1].children[1];
   getChainId().then(data => {
     console.log(data);
   })
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
 
 const mockData = {
   network: "0x43114", // Avalanche == 43114
   countYes: 300,
   countNo: 100,
   countAbstain:250,
   remainingTime: "9D",
 
 }
 
 // const mockData1 = {
 //   network: "Ethereum", // Ethereum == ?, which eth network does kimlikdao contract deployed?
 //   countYes: 10,
 //   countNo: 40,
 //   countAbstain:50,
 //   remainingTime: "13H",
 
 // }
 
 
 const getChainId= async () => {
   const chainId =  Cüzdan.ağ();
   if (!chainId) {
     throw new Error(
       "chain id mevcut degil"
     );
   }
   return NETWORKS[chainId];
 };
 
 
 const NETWORKS = {
   1: "Ethereum Main Network",
   43114: "Avalanche Network"
 };
 
 
 function percentage(partialValue, totalValue) {
   return (100 * partialValue) / totalValue | 0;
 } 
 
 const birazBekle = (cevap) => new Promise((resolve) => setTimeout(() => resolve(cevap), 1000))
 
 const yeniOy = aktifOyKartıOluştur(data, mockData);
 //const yeniOy1 = aktifOyKartıOluştur(data1, mockData1);
 dom.adla("oyac").appendChild(yeniOy);
 //dom.adla("oyac").appendChild(yeniOy1);