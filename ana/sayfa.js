import "/ana/hero/sergi/birim";
import "/ana/kazan/birim";
import "/birim/altdizin/birim";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import dom from "/lib/util/dom";

Cüzdan.kpassDeğişince((_, dosyaSözü) => {
  /** @const {!HTMLAnchorElement} */
  const eylemDüğmesi = /** @type {!HTMLAnchorElement} */(dom.adla("bal"));
  /** @type {!Text} */(eylemDüğmesi.firstChild).data = dosyaSözü
    ? dom.TR ? "KPass’ini incele" : "View KPass"
    : dom.TR ? "Hemen KPass al" : "Mint KPass"
  eylemDüğmesi.href = dosyaSözü
    ? dom.TR ? "/kpassim" : "/kpass"
    : dom.TR ? "/al" : "/mint"
});
