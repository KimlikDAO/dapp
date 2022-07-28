/**
 * @noinline
 * @param {string} ad DOM biriminin adı.
 * @return {Element}
 */
const adla = (ad) => document.getElementById(ad);

const butonDurdur = (buton) => {
  buton.onclick = null;
  buton.disabled = true;
  buton.classList.add("disabled");
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
    if (f != kapat) window.onclick = kapat;
    event.stopPropagation();
  }
}

export default { adla, butonDurdur, menüYarat };
