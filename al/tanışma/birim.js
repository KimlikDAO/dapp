import Cüzdan from '/birim/cüzdan/birim';
import Telefon from '/birim/telefon/birim';
import dom from '/lib/dom';
import { base64 } from '/lib/çevir';

/** @const {string} */
const KIMLIK_AS_URL = "https://mock-api.kimlikas.com";

/**
 * Verilen bir `hesap` için `rasgele` bitdizisi ile kriptografik taahhüt
 * oluşturur.
 *
 * @param {string} hesap EVM adresi.
 * @param {!Uint8Array} rasgele bitdizisi.
 * @return {Promise<string>} Kriptografik taahhüt.
 */
const taahhütOluştur = (hesap, rasgele) => {
  /** @type {!Uint8Array} */
  let concat = new Uint8Array(32 + 20);
  concat.set(rasgele, 0);

  for (let /** number */ i = 1; i <= 20; ++i)
    concat[i + 31] = parseInt(hesap.substring(2 * i, 2 * i + 2), 16);

  return crypto.subtle.digest("SHA-256", concat).then(base64);
}

/** @return {Promise<string>} */
const tanı = () => {
  /**
   * Pedersen taahhüdü için rasgele bitdizisi.
   * @type {!Uint8Array}
   */
  let Rasgele = new Uint8Array(32);
  crypto.getRandomValues(Rasgele);

  /** @type {URLSearchParams} */
  const params = new URLSearchParams(location.search);
  /** @type {?string} */
  const code = params.get("code");
  history.replaceState(null, "", location.pathname);

  return taahhütOluştur(/** @type {string} */(Cüzdan.adres()), Rasgele)
    .then((taahhüt) =>
      fetch(KIMLIK_AS_URL + "?" + new URLSearchParams({ "oauth_code": code, "taahhüt": taahhüt })))
    .then((res) => res.json())
    .then((AçıkTCKT) => {
      for (let ad of "TCKN ad soyad dt annead babaad".split(" ")) {
        dom.adla("tc" + ad).innerText = AçıkTCKT[ad];
      }
      Telefon.nftÇevir();
      /** @const {Element} */
      const OAuthDüğmesi = dom.adla("taa");
      OAuthDüğmesi.innerText = dom.TR ? "E-devlet'ten bilgileriniz alındı ✓" : "We got your info ✓";
      OAuthDüğmesi.classList.remove("act");
      OAuthDüğmesi.href = "javascript:";
      dom.butonDurdur(OAuthDüğmesi);
      dom.adla("ta").classList.add("done");
      AçıkTCKT.rasgele = base64(Rasgele);
      // TODO(KimlikDAO-bot): Kullanıcı tarafında gelen TCKT'nin fazladan veri
      // içermediğini denetle. Fazla verileri işaretleme riski yüzünden sil.
      return JSON.stringify(AçıkTCKT);
    });
}

const göster = () => {
  const EDevletDüğmesi = dom.adla("taa");
  const PDFDüğmesi = dom.adla("tab");

  dom.adla("ta").classList.remove("disabled");

  if (!location.search) {
    EDevletDüğmesi.classList.add("act");
    PDFDüğmesi.style.display = "";
  }
}

export default {
  göster,
  tanı,
};
