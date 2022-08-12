// FIXME(KimlikDAO-bot): https://github.com/google/closure-compiler/issues/1601
if (typeof goog === 'undefined' && typeof globalThis !== 'undefined') {
  globalThis.goog = {
    define: (n, v) => v,
  };
}
/**
 * @define {boolean}
 */
const TR = goog.define('TR', true);

/**
 * @noinline
 * @param {string} ad DOM biriminin adı.
 * @return {Element}
 */
const adla = (ad) => document.getElementById(ad);

const butonDurdur = (buton) => {
  buton.onclick = null;
  buton.disabled = true;
  buton.classList.add("dis");
}

/**
 * @param {Element} düğme
 * @param {Element} menü
 */
const menüYarat = (düğme, menü) => {
  const kapat = (event) => {
    düğme.classList.remove("sel");
    menü.style.display = "none";
    window.onclick = null;
  }
  düğme.onclick = (event) => {
    düğme.classList.add("sel");
    menü.style.display = "";
    let f = window.onclick;
    if (f) f(event);
    if (f !== kapat) window.onclick = kapat;
    event.stopPropagation();
  }
}

/**
 * @param {number} para
 * @return {string} metin olarak yazılmış para miktarı
 */
const paradanMetne = (para) => TR
  ? ("" + (para / 1_000_000)).replace(".", ",")
  : ("" + (para / 1_000_000))


export default { adla, butonDurdur, menüYarat, paradanMetne, TR };
