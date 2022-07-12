/**
 * @fileoverview HTML ile beraber eşzamanlı olarak yüklenen ve UI çiziminden
 * önce çalıştırılması gereken kodu içerir. Bu kodu kısa tutmaya çalışıyoruz.
 */

if (ethereum) {
  const s1b = document.getElementById("s1b");
  s1b.innerText = "Tarayıcı Cüzdanı Bağla";
  s1b.target = "";
  s1b.href = "javascript:";
}
