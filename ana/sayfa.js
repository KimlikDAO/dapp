import "/ana/hero/sergi/birim";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import dom from "/lib/util/dom";

Cüzdan.tcktDeğişince((_, dosyaSözü) => {
  /** @const {!Element} */
  const düğme = /** @type {!Element} */(dom.adla("bal"));
  düğme.firstChild.data = dosyaSözü
    ? dom.TR ? "TCKT’ni incele" : "View TCKT"
    : dom.TR ? "Hemen TCKT al" : "Mint TCKT"
  düğme.href = dosyaSözü
    ? dom.TR ? "/incele" : "/view"
    : dom.TR ? "/al" : "/mint"
})
