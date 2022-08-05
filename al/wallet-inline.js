/**
 * @fileoverview HTML ile beraber eşzamanlı olarak yüklenen ve UI çiziminden
 * önce çalıştırılması gereken kodu içerir. Bu kodu kısa tutmaya çalışıyoruz.
 */
/** @const {Element} */
const s1b = document.getElementById("s1b");
/** @const {string} */
const userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/iPad|iPhone|iPod/.test(userAgent)) {
  /** @const {Element} */
  const s1a = s1b.previousElementSibling;
  s1a.style.display = "none";
  if (window["ethereum"] && ethereum.isBraveWallet) {
    s1b.innerText = "Tarayıcı cüzdanı bağla";
    s1b.target = "";
    s1b.href = "javascript:";
  } else {
    s1b.classList.add('act');
    s1b.innerText = "Brave Browser kur";
    s1b.href = "//apps.apple.com/us/app/brave-private-browser-adblock/id1052879175";
  }
} else {
  if (window["ethereum"]) {
    s1b.innerText = "Tarayıcı cüzdanı bağla";
    s1b.target = "";
    s1b.href = "javascript:";
  } else {
    s1b.classList.add('act');
  }
}
