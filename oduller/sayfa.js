/**
 * @fileoverview Al sayfası giriş noktası
 */

import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/util/dom';

/** @type {Object<string, string>} */
let data = {};
/** @type {string} */
let humanId = "";
/** @type {string} */
let eposta = "";
/** @type {string} */
let telefon = "";

dom.adla("ods0o").onclick = () => dom.adla("na").click();
Cüzdan.bağlanınca(() => {
  idAdımınıGöster();
})

const idAdımınıGöster = () => {
  dom.adlaGizle("ods0c");
  dom.adlaGöster("ods1c");
  dom.adla("odhidi").onfocus = () => dom.adla("odhidi").classList.remove("odin");
  dom.adla("ods1o").onclick = () => {
    humanId = dom.adla("odhidi").value;
    if (humanId.length !== 8) {
      dom.adla("odhidi").classList.add("odin");
      return
    }
    data["humanId"] = humanId;
    console.log(data);
    contactInfoAdımınıGöster();
  }
}

const contactInfoAdımınıGöster = () => {
  dom.adla("ods1c").classList.add("done");
  dom.butonDurdur(dom.adla("ods1o"));
  dom.adla("odhidi").disabled = true;
  dom.adla("ods1o").innerText = dom.TR ? "ID'nizi aldık ✓" : "We got your ID ✓";
  dom.adlaGöster("ods2c");
  dom.adla("odemi").onfocus = () => dom.adla("odemi").classList.remove("odin");
  dom.adla("odti").onfocus = () => dom.adla("odti").classList.remove("odin");
  dom.adla("odti").onkeydown = () => {
    if (dom.adla("odti").value.length == 3 || dom.adla("odti").value.length == 7) {
      dom.adla("odti").value += " ";
    }
  }
  dom.adla("ods2o").onclick = () => {
    eposta = dom.adla("odemi").value;
    telefon = dom.adla("odti").value;
    if (!eposta.includes("@")) {
      dom.adla("odemi").classList.add("odin");
      return
    }
    if (telefon.length != 12) {
      dom.adla("odti").classList.add("odin");
      return
    }
    console.log(eposta);
    console.log(telefon);
    data["eposta"] = eposta;
    data["telefon"] = telefon;
    console.log(data);
  }
}