import "/ana/hero/sergi/birim";
import "/birim/altdizin/birim";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import dom from "/lib/util/dom";

Cüzdan.tcktDeğişince((_, dosyaSözü) => {
  /** @const {!Element} */
  const eylemDüğmesi = /** @type {!Element} */(dom.adla("bal"));
  eylemDüğmesi.firstChild.data = dosyaSözü
    ? dom.TR ? "TCKT’ni incele" : "View TCKT"
    : dom.TR ? "Hemen TCKT al" : "Mint TCKT"
  eylemDüğmesi.href = dosyaSözü
    ? dom.TR ? "/tcktm" : "/my-tckt"
    : dom.TR ? "/al" : "/mint"
});
