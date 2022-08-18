/**
 * @fileoverview Oyla sayfası giriş noktası
 *
 */
import '/birim/cüzdan/birim';
import dom from '/lib/dom';

dom.adla("oyy").onclick = () => {
  dom.adla("oyy").classList.add("open_form");
}

dom.adla("oyyfr").onclick = (event) => {
  dom.adla("oyy").classList.remove("open_form");
  event.stopPropagation();
}

dom.adla("oyydb").onclick = (event) => {
  const kapat = (event) => {
    dom.adla("oyydd").style.display = "none";
    dom.adla("oytri").classList.remove("up");
    if (event.target.parentElement == dom.adla("oyydd")) 
      dom.adla("oyydb").firstElementChild.innerText = event.target.innerText;
    window.onclick = null;
  }
  dom.adla("oyydd").style.display = "";
  dom.adla("oytri").classList.add("up");
  let f = window.onclick;
  if (f) f(event);
  if (f !== kapat) window.onclick = kapat;
  event.stopPropagation();
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
  for (let i = 0; i < 3 ; ++i) {
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