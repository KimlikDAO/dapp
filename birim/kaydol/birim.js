import dom from "/lib/util/dom";

/**
 * @param {string} domAdı
 */
const kur = (domAdı) => {
  /** @type {?string} */
  let KaydolMetni;
  /** @const {!Element} */
  const kök = /** @type {!Element} */(dom.adla(domAdı));
  /** @const {!Element} */
  const girdi = /** @type {!Element} */(kök.firstElementChild);
  /** @const {!Element} */
  const düğme = /** @type {!Element} */(girdi.nextElementSibling);

  /**
   * @param {boolean} başarılı
   */
  const güncelle = (başarılı) => {
    düğme.innerText = başarılı
      ? KaydolMetni + (dom.TR ? "dunuz 👍" : "d 👍")
      : dom.TR ? "Hata 🫨" : "Error 🫨";
    setTimeout(() => düğme.innerText = KaydolMetni, 3000);
    if (başarılı)
      girdi.value = "";
  }

  düğme.onclick = () => {
    KaydolMetni ||= düğme.innerText;
    düğme.innerText = KaydolMetni + " ⏳";
    fetch("//bulten.kimlikdao.org/ekle", {
      method: "POST",
      body: JSON.stringify({
        "email": girdi.value,
        "dil": dom.TR ? "tr" : "en"
      })
    }).then(
      (res) => güncelle(res && res.ok),
      () => güncelle(false)
    );
  }
}

export { kur };
