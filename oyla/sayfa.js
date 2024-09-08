/**
 * @fileoverview Oyla sayfası giriş noktası
 * @author KimlikDAO
 */
import "/birim/cüzdan/birim";
import "/birim/dil/birim";
import dom from "/lib/util/dom";

let SeçilmişÖneriId;

/** @const {!Element} */
const ProposeButton = dom.adla("oyyb");

ProposeButton.onclick = () => {
  dom.adlaGizle("oyyb");
  dom.adlaGöster("oyy");
  if (!SeçilmişÖneriId) SeçilmişÖneriId = "2";
  /** @const {Element} */
  const önergeDüğmesi = dom.adla("oyyddb");
  /** @const {Element} */
  const önergeMenusu = dom.adla("oyyul");
  dom.menüYarat(önergeDüğmesi, önergeMenusu);
  önergeMenusu.onclick = (e) => {
    const li = e.target;
    if (li.nodeName != "LI") return;
    dom.adlaGizle("oyy" + SeçilmişÖneriId);
    dom.adlaGizle("oyyso" + SeçilmişÖneriId);
    SeçilmişÖneriId = li.id.slice(4);
    dom.adlaGöster("oyy" + SeçilmişÖneriId);
    dom.adlaGöster("oyyso" + SeçilmişÖneriId);
  }
}
