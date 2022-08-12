/**
 * @fileoverview HTML ile beraber eşzamanlı olarak yüklenen ve UI çiziminden
 * önce çalıştırılması gereken kodu içerir. Bu kodu kısa tutmaya çalışıyoruz.
 */
/** @define {boolean} */
const TR = true;
/** @const {Element} */
const s1b = document.getElementById("s1b");
/** @const {string} */
const userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
/** @const {boolean} */
const isIOS = /ipad|iphone|ipod/.test(userAgent);
/** @const {boolean} */
const isAndroid = userAgent.indexOf("android") != -1;
/** @const {string} */
const bağlaMetni = TR ? "Tarayıcı cüzdanı bağla" : "Connect wallet";

if (isIOS || isAndroid) {
  /** @const {Element} */
  const s1a = s1b.previousElementSibling;
  s1a.style.display = "none";
  if (window["ethereum"] && navigator["brave"]) {
    s1b.innerText = bağlaMetni;
    s1b.target = "";
    s1b.href = "javascript:";
  } else {
    s1b.classList.add('act');
    s1b.innerText = TR ? "Brave Browser kur" : "Install Brave";
    s1b.href = isIOS
      ? "//apps.apple.com/us/app/brave-private-browser-adblock/id1052879175"
      : "//play.google.com/store/apps/details?id=com.brave.browser";
  }
} else {
  if (window["ethereum"]) {
    s1b.innerText = bağlaMetni;
    s1b.target = "";
    s1b.href = "javascript:";
  } else {
    s1b.classList.add('act');
  }
}
