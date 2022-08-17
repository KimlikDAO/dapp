/**
 * @fileoverview Oyla sayfası giriş noktası
 *
 */
import '/birim/cüzdan/birim';
import dom from '/lib/dom';

dom.adla("oya0").onclick = () => {
  dom.adla("oya0").classList.add("expand");
  dom.adla("oya0tb").style.display = "";
}

dom.adla("oya0tb").onclick = (e) => {
  dom.adla("oya0").classList.remove("expand");
  dom.adla("oya0tb").style.display = "none";
  e.stopPropagation();
}
