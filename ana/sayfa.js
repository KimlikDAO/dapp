import "/ana/sergi/birim";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import TCKT from "/lib/ethereum/TCKTLite.js";
import dom from "/lib/util/dom";

/**
 * @param {boolean} incele Eylem linki incele'ye mi gitsin
 */
const düğmeGüncelle = (incele) => {
  /** @const {Element} */
  const düğme = dom.adla("nd");
  düğme.childNodes[0].data = incele
    ? dom.TR ? "TCKT’ni incele" : "View TCKT"
    : dom.TR ? "TCKT al" : "Mint TCKT"
  düğme.href = incele
    ? dom.TR ? "/incele" : "/view"
    : dom.TR ? "/al" : "/mint"
}

/**
 * @param {string} adres Bağlı cüzdanın adresi
 */
const adresleGüncelle = (adres) => TCKT.hasDID(adres).then(düğmeGüncelle);

Cüzdan.bağlanınca(adresleGüncelle);
Cüzdan.adresDeğişince(adresleGüncelle);
Cüzdan.ağDeğişince(() => adresleGüncelle(/** @type {string} */(Cüzdan.adres())));
Cüzdan.kopunca(() => düğmeGüncelle(false));
