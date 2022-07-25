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

export default { adla, butonDurdur };
