import dom from "/lib/util/dom";

/**
 * @param {string} id
 */
const bind = (id) => {
  /** @type {?string} */
  let KaydolMetni;
  /** @const {!Element} */
  const kök = dom.adla(id);
  /** @const {!HTMLInputElement} */
  const girdi = /** @type {!HTMLInputElement} */(kök.firstElementChild);
  /** @const {!Element} */
  const düğme = /** @type {!Element} */(girdi.nextElementSibling);

  /**
   * @param {boolean} başarılı
   */
  const güncelle = (başarılı) => {
    düğme.innerText = başarılı
      ? KaydolMetni + dom.i18n({ tr: "dunuz 👍", en: "d 👍" })
      : dom.i18n({ tr: "Hata 🫨", en: "Error 🫨" });
    setTimeout(() => düğme.innerText = KaydolMetni, 3000);
    if (başarılı)
      girdi.value = "";
  }

  /**
   * @param {Event=} event
   */
  const yolla = (event) => {
    if (event) event.preventDefault();
    KaydolMetni ||= düğme.innerText;
    düğme.innerText = KaydolMetni + " ⏳";
    fetch("//bulten.kimlikdao.org/ekle", {
      method: "POST",
      body: JSON.stringify({
        "email": girdi.value,
        "dil": dom.Lang
      })
    }).then(
      (res) => güncelle(res && res.ok),
      () => güncelle(false)
    );
  };
  kök.onsubmit = yolla;
}

export default { bind };
