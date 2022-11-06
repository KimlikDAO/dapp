/**
 * @fileoverview Al sayfası giriş noktası
 */

import Cüzdan from '/birim/cüzdan/birim';
import dom from '/lib/util/dom';
import TCKT from '/lib/ethereum/TCKT';
// import SDK from '/sdk/SDK'; 

dom.adla("ods0o").onclick = Cüzdan.bağla();
Cüzdan.bağlanınca((adres) => {
  dom.adlaGizle("ods0c");
  dom.adlaGöster("ods1c");
  tcktKontrolEt(adres);
});

/**
 * @param {string} adres
 */
const tcktKontrolEt = (adres) => {
  // const handle = SDK.getTCKTHandle(adres);
  // if (!handle) {

  // }
}


