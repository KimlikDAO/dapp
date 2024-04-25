import "/ana/hero/sergi/birim";
import "/birim/altdizin/birim";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import dom from "/lib/util/dom";

Cüzdan.kpassDeğişince((_, dosyaSözü) => {
  /** @const {!Element} */
  const eylemDüğmesi = /** @type {!Element} */(dom.adla("bal"));
  eylemDüğmesi.firstChild.data = dosyaSözü
    ? dom.TR ? "KPass’ini incele" : "View KPass"
    : dom.TR ? "Hemen KPass al" : "Mint KPass"
  eylemDüğmesi.href = dosyaSözü
    ? dom.TR ? "/kpassim" : "/kpass"
    : dom.TR ? "/al" : "/mint"
});
