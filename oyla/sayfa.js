/**
 * @fileoverview Oyla sayfası giriş noktası
 *
 */
import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/dom';



Cüzdan.bağlanınca(() => {
  let ağ = Cüzdan.ağ();
  console.log(ağ);
})
Cüzdan.ağDeğişince(() => console.log(Cüzdan.ağ()))
dom.adla("oyy").onclick = () => {
  dom.adla("oyy").classList.add("open_form");
}

for ( let i = 1; i < dom.adla("oyytcsol").childElementCount; i += 2) {  //Cüzdan Bağlanınca
  const element = dom.adla("oyytcsol").children[i];
  element.onclick = () => {
    seçilmişTokenGöster(element)
  }
}

let id = 2;

const seçilmişTokenGöster = (element) => {
  const newId = element.previousElementSibling.id.slice(3);
  dom.adla("oyys" + id).style.display = "none";
  dom.adla("oyys" + newId).style.display = "";
  id = newId;
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
    oyKartıKüçültmeDüğmesi.style.display = "";
  }
  oyKartıKüçültmeDüğmesi.onclick = (e) => {
    element.classList.remove("expand");
    oyKartıKüçültmeDüğmesi.style.display = "none";
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
  element.style.display = "";
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

const yeniOy = aktifOyKartıOluştur(data);
const yeniOy1 = aktifOyKartıOluştur(data1);
dom.adla("oyac").appendChild(yeniOy);
dom.adla("oyac").appendChild(yeniOy1);