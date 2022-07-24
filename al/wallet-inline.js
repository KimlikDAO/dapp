/**
 * @fileoverview HTML ile beraber eşzamanlı olarak yüklenen ve UI çiziminden
 * önce çalıştırılması gereken kodu içerir. Bu kodu kısa tutmaya çalışıyoruz.
 */

if (window["ethereum"]) {
  const s1b = document.getElementById("s1b");
  s1b.innerText = "Tarayıcı cüzdanı bağla";
  s1b.target = "";
  s1b.href = "javascript:";
}
