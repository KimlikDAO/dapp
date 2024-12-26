import "./hero/sergi/birim";
import "./kazan/birim";
import "/birim/altdizin/birim";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import { Page } from "/crate";
import dom from "/lib/util/dom";

Cüzdan.kpassDeğişince((_, dosyaSözü) => {
  /** @const {!HTMLAnchorElement} */
  const eylemDüğmesi = dom.a("bal");
  /** @type {!Text} */(eylemDüğmesi.firstChild).data = dosyaSözü
    ? dom.i18n({ tr: "KPass’ini incele", en: "View KPass" })
    : dom.i18n({ tr: "Hemen KPass al", en: "Mint KPass" })
  eylemDüğmesi.href = dosyaSözü
    ? dom.i18n(Page.KPassim)
    : dom.i18n(Page.Al);
});
