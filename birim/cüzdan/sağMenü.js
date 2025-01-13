import Cüzdan from "./birim.js";
import dom from "/lib/util/dom";

const Düğmeler = Cüzdan.SağPanel.children;

Düğmeler[2].onclick = () =>
  window.location.href = "//join.kimlikdao.org/#sa-ambassador1";
Düğmeler[3].onclick = () =>
  window.location.href = "//kimlikdao.org/" + dom.i18n({ tr: "oyla", en: "vote" });
Düğmeler[4].onclick = () =>
  window.location.href = "//kimlikdao.org/" + dom.i18n({ tr: "iptal", en: "revoke" });
Düğmeler[5].onclick = () => Cüzdan.kopar();
