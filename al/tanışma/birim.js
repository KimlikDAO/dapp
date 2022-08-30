import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
import dom from '/lib/dom';
import { base64, uint8ArrayeBase64ten } from '/lib/çevir';

/** @const {string} */
const KIMLIK_AS_URL = "https://mock-api.kimlikas.com";

/**
 * Verilen bir `hesap` için `rasgele` bitdizisi ile kriptografik taahhüt
 * oluşturur.
 *
 * @param {string} adres EVM adresi.
 * @param {!Uint8Array} rasgele bitdizisi.
 * @return {Promise<ArrayBuffer>} Kriptografik taahhüt.
 */
const taahhütOluştur = (adres, rasgele) => {
  /** @type {!Uint8Array} */
  const concat = new Uint8Array(64 + 20);
  concat.set(rasgele, 0);

  for (let /** number */ i = 1; i <= 20; ++i)
    concat[i + 63] = parseInt(adres.substring(2 * i, 2 * i + 2), 16);

  return crypto.subtle.digest("SHA-256", concat);
}

/**
 * @param {function(Promise<string>)} sonra
 */
const açıkTcktAlVe = (sonra) => {
  /** @const {Worker} */
  const powWorker = new Worker("/al/tanışma/pow-worker.js");

  /**
   * Pedersen taahhüdü için rasgele bitdizisi.
   *
   * TCKT'nin kişi bilgilerinden tahmin edilememesini de bu şekilde sağlıyoruz.
   * Bu sebeple, 32 byte yetmesine karşın, bitdizisini 64 byte uzunluğunda
   * seçiyoruz.
   * @type {!Uint8Array}
   */
  const pdfRasgele = new Uint8Array(64);
  {
    const b64 = window.localStorage[Cüzdan.adres().toLowerCase() + "r"];
    if (b64) {
      uint8ArrayeBase64ten(pdfRasgele, b64)
    } else {
      crypto.getRandomValues(pdfRasgele);
      window.localStorage[Cüzdan.adres().toLowerCase() + "r"] = base64(pdfRasgele);
    }
  }
  /** @const {Promise<!Uint8Array>} */
  const taahhütPowSözü = taahhütOluştur(/** @type {string} */(Cüzdan.adres()), pdfRasgele)
    .then((taahhüt) => new Promise((resolve) => {
      const taahhütB64 = base64(new Uint8Array(taahhüt));
      const yazılıTaahhütPow = window.localStorage[taahhütB64];
      if (yazılıTaahhütPow) {
        powWorker.terminate();
        resolve(yazılıTaahhütPow)
      } else {
        powWorker.postMessage(taahhüt, [taahhüt]);
        powWorker.onmessage = (msg) => {
          const taahhütPow = base64(new Uint8Array(msg.data))
          window.localStorage[taahhütB64] = taahhütPow;
          resolve(taahhütPow);
        }
      }
    }));
  /** @const {Promise<string>} */
  const numaraSözü = taahhütPowSözü
    .then((taahhütPow) => fetch("//api.kimlikdao.org/numara-al?" + taahhütPow))
    .then((res) => res.text())
    .catch(console.log);

  /** @const {Element} */
  const eDevletDüğmesi = dom.adla("taa");
  /** @const {Element} */
  const pdfDüğmesi = dom.adla("tab");
  /** @const {Element} */
  const kutu = dom.adla("ta");
  /**
   * @param {TCKTTemelBilgileri} açıkTCKT
   * @param {!Uint8Array} rasgele
   */
  const kapat = (açıkTCKT, rasgele) => {
    for (let hane of "ad soyad TCKN dt dyeri".split(" "))
      if (açıkTCKT.kişi[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.kişi[hane];
    dom.adla("tccinsiyet").innerText = açıkTCKT.kişi.c;

    for (let hane of "annead babaad BSN cilt hane mhali".split(" "))
      if (açıkTCKT.aile[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.aile[hane];

    for (let hane of "il ilçe mahalle tescil".split(" "))
      if (açıkTCKT.kütük[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.kütük[hane];

    Tckt.yüzGöster(true);
    kutu.classList.add("done");
    açıkTCKT.rasgele = base64(rasgele);
    sonra(Promise.resolve(JSON.stringify(açıkTCKT, null, 2)));
  }
  kutu.classList.remove("disabled");

  /** @type {URLSearchParams} */
  const params = new URLSearchParams(location.search);
  /** @type {?string} */
  const code = params.get("code");
  history.replaceState(null, "", location.pathname);
  if (code) {
    powWorker.terminate();
    /** @const {!Uint8Array} */
    const eDevletRasgele = new Uint8Array(64);
    crypto.getRandomValues(eDevletRasgele);
    eDevletDüğmesi.style.display = "none";
    pdfDüğmesi.href = "javascript:";
    pdfDüğmesi.classList.remove("act");
    pdfDüğmesi.innerText = dom.TR ? "E-devlet’ten bilgileriniz alındı ✓" : "We got your info ✓";
    dom.butonDurdur(pdfDüğmesi);
    taahhütOluştur(/** @type {string} */(Cüzdan.adres()), eDevletRasgele)
      .then((taahhüt) =>
        fetch(KIMLIK_AS_URL + "?" + new URLSearchParams({ "oauth_code": code, "taahhut": base64(new Uint8Array(taahhüt)) })))
      .then(res => res.json())
      .then((açıkTckt) => kapat(açıkTckt, eDevletRasgele));
  } else {
    pdfDüğmesi.onclick = () => {
      eDevletDüğmesi.style.display = "none";
      pdfDüğmesi.style.display = "none";
      /** @const {Element} */
      const dosyaBırakmaBölgesi = dom.adla("tada");
      /** @const {Element} */
      const dosyaSeçici = dom.adla("tain");
      numaraSözü.then((numara) => dom.adla("tano").innerText = numara);
      dom.adla("tadsbtn").onclick = () => dosyaSeçici.click();
      dom.adla("tadc").style.display = "";

      /** @const {function(!File)} */
      const dosyaYükle = (dosya) => {
        const formData = new FormData();
        formData.set('f', dosya);
        taahhütPowSözü.then((taahhütPow) =>
          fetch('//api.kimlikdao.org/pdften-tckt?' + taahhütPow, {
            method: 'POST',
            body: formData,
          }))
          .then(res => res.json())
          .then((açıkTckt) => {
            dom.adla("tadc").style.display = "none";
            pdfDüğmesi.href = "javascript:";
            pdfDüğmesi.classList.remove("act");
            pdfDüğmesi.style.display = "";
            pdfDüğmesi.innerText = dom.TR ? "Bilgileriniz onaylandı ✓" : "We confirmed your info ✓";
            dom.butonDurdur(pdfDüğmesi);
            window.localStorage.removeItem(Cüzdan.adres().toLowerCase + "r");
            kapat(açıkTckt, pdfRasgele);
          })
          .catch(console.log)
      }

      dosyaSeçici.onchange = () => {
        console.log("onchange", dosyaSeçici.files.length);
        dosyaBırakmaBölgesi.classList.add("dragison");
        if (dosyaSeçici.files.length > 0)
          dosyaYükle(dosyaSeçici.files[0]);
      }

      dosyaBırakmaBölgesi.ondrop = (e) => {
        e.preventDefault();
        dosyaYükle(e.dataTransfer.files[0]);
      };

      dosyaBırakmaBölgesi.ondragover = (e) => {
        e.preventDefault();
        dosyaBırakmaBölgesi.classList.add("dragison");
      }

      dosyaBırakmaBölgesi.ondragleave = (e) => {
        e.preventDefault();
        dosyaBırakmaBölgesi.classList.remove("dragison");
      }

      dom.adla("tabip").onclick = dom.adla("taip").onclick = () => {
        dom.adla("tadc").style.display = "none";
        eDevletDüğmesi.style.display = "";
        pdfDüğmesi.style.display = "";
      }
    }
  }
}

export default { açıkTcktAlVe };
