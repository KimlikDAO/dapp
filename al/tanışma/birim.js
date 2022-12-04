import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
import dom from '/lib/util/dom';
import { base64, uint8ArrayeBase64ten } from '/lib/util/çevir';

/** @const {string} */
const KIMLIK_AS_URL = "https://mock-api.kimlikas.com";

/**
 * @const {string}
 * @noinline
 */
const KIMLIKDAO_API_URL = "https://api.kimlikdao.org/";

/**
 * Verilen bir `hesap` için `rastgele` bitdizisi ile kriptografik taahhüt
 * oluşturur.
 *
 * @param {string} adres EVM adresi.
 * @param {!Uint8Array} rastgele bitdizisi.
 * @return {Promise<ArrayBuffer>} Kriptografik taahhüt.
 */
const taahhütOluştur = (adres, rastgele) => {
  /** @type {!Uint8Array} */
  const concat = new Uint8Array(64 + 20);
  concat.set(rastgele, 0);

  for (let /** number */ i = 1; i <= 20; ++i)
    concat[i + 63] = parseInt(adres.substring(2 * i, 2 * i + 2), 16);

  return crypto.subtle.digest("SHA-256", concat);
}

/**
 * @param {function(Promise<did.DecryptedDID>)} sonra
 */
const açıkTcktAlVe = (sonra) => {
  /** @const {Worker} */
  const powWorker = new Worker("/al/tanışma/pow-worker.js");

  /**
   * Pedersen taahhüdü için rastgele bitdizisi.
   *
   * TCKT'nin kişi bilgilerinden tahmin edilememesini de bu şekilde sağlıyoruz.
   * Bu sebeple, 32 byte yetmesine karşın, bitdizisini 64 byte uzunluğunda
   * seçiyoruz.
   * @type {!Uint8Array}
   */
  const pdfRastgele = new Uint8Array(64);
  {
    const b64 = window.localStorage[Cüzdan.adres().toLowerCase() + "r"];
    if (b64) {
      uint8ArrayeBase64ten(pdfRastgele, b64)
    } else {
      crypto.getRandomValues(pdfRastgele);
      window.localStorage[Cüzdan.adres().toLowerCase() + "r"] = base64(pdfRastgele);
    }
  }
  /** @const {Promise<!Uint8Array>} */
  const taahhütPowSözü = taahhütOluştur(/** @type {string} */(Cüzdan.adres()), pdfRastgele)
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
    .then((taahhütPow) => fetch(KIMLIKDAO_API_URL + "alfanum-al?" + taahhütPow))
    .then((res) => res.text())
    .catch(console.log);

  /** @const {Element} */
  const eDevletDüğmesi = dom.adla("taa");
  /** @const {Element} */
  const pdfDüğmesi = dom.adla("tab");
  /** @const {Element} */
  const kutu = dom.adla("ta");
  /**
   * @param {did.DecryptedDID} açıkTckt
   * @param {!Uint8Array} rastgele
   */
  const kapat = (açıkTckt, rastgele) => {
    Tckt.açıkTcktGöster(açıkTckt);
    kutu.classList.add("done");
    açıkTckt.rastgele = base64(rastgele);
    // İleride devam eden bir hesaplama döndürebiliriz. Bu yüzden arabirimi
    // promise olarak sabitliyoruz.
    sonra(Promise.resolve(açıkTckt));
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
    const eDevletRastgele = new Uint8Array(64);
    crypto.getRandomValues(eDevletRastgele);
    dom.gizle(eDevletDüğmesi);
    pdfDüğmesi.href = "javascript:";
    pdfDüğmesi.classList.remove("act");
    pdfDüğmesi.innerText = dom.TR ? "E-devlet’ten bilgileriniz alındı ✓" : "We got your info ✓";
    dom.butonDurdur(pdfDüğmesi);
    taahhütOluştur(/** @type {string} */(Cüzdan.adres()), eDevletRastgele)
      .then((taahhüt) =>
        fetch(KIMLIK_AS_URL + "?" + new URLSearchParams({
          "oauth_code": code,
          "taahhut": base64(new Uint8Array(taahhüt))
        })))
      .then(res => /** @type {did.DecryptedDID} */(res.json()))
      .then((açıkTckt) => kapat(açıkTckt, eDevletRastgele));
  } else {
    const hataBildirimi = dom.adla("tafb");
    pdfDüğmesi.onclick = () => {
      dom.gizle(eDevletDüğmesi);
      dom.gizle(pdfDüğmesi);
      /** @const {Element} */
      const dosyaBırakmaBölgesi = dom.adla("tada");
      /** @const {Element} */
      const dosyaSeçici = dom.adla("tain");
      numaraSözü.then((numara) => {
        /** @const {Element} */
        const kopyala = dom.adla("tacopy");
        /** @const {string} */
        const kurumAdı = "KimlikDAO-" + numara;
        dom.adla("tano").innerText = kurumAdı;
        dom.göster(kopyala);
        kopyala.onclick = () => navigator.clipboard.writeText(kurumAdı);
      });
      dom.adla("tadsbtn").onclick = () => dosyaSeçici.click();
      dom.göster(dom.adla("tadc"));

      /** @const {function(!File)} */
      const dosyaYükle = (dosya) => {
        hataKaldır();
        dom.adla("tafb").innerText = dom.TR ? "Belge yükleniyor" : "Uploading document";
        dom.gizle(dom.adla("taimg"));
        dom.göster(dom.adla("tal"));
        const formData = new FormData();
        formData.set('f', dosya);
        taahhütPowSözü
          .then((taahhütPow) => fetch(KIMLIKDAO_API_URL + "pdften-tckt?" + taahhütPow, {
            method: 'POST',
            body: formData,
          }))
          .then(res => res.ok
            ? res.json().then((/** @type {did.DecryptedDID} */ açıkTckt) => {
              dom.gizle(dom.adla("tadc"));
              pdfDüğmesi.href = "javascript:";
              pdfDüğmesi.classList.remove("act");
              dom.göster(pdfDüğmesi);
              pdfDüğmesi.innerText = dom.TR ? "Bilgileriniz onaylandı ✓" : "We confirmed your info ✓";
              dom.butonDurdur(pdfDüğmesi);
              window.localStorage.removeItem(Cüzdan.adres().toLowerCase + "r");
              kapat(açıkTckt, pdfRastgele);
            })
            : res.json().then(hataGöster)
          )
      }

      dosyaSeçici.onchange = () => {
        dosyaBırakmaBölgesi.classList.add("tasrk");
        if (dosyaSeçici.files.length > 0) {
          dosyaYükle(dosyaSeçici.files[0]);
        }
      }

      dosyaBırakmaBölgesi.ondrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0].type.includes("pdf"))
          dosyaYükle(e.dataTransfer.files[0]);
      };

      dosyaBırakmaBölgesi.ondragover = (e) => {
        e.preventDefault();
        dosyaBırakmaBölgesi.classList.add("tasrk");
      }

      dosyaBırakmaBölgesi.ondragleave = (e) => {
        e.preventDefault();
        dosyaBırakmaBölgesi.classList.remove("tasrk");
      }

      const HataMetinleri = dom.TR ? [
        "Belgenin son 24 saat içinde alınmış olması gerekli. Yüklediğiniz belge {} saat önce alınmış.",
        "Yüklediğiniz belgedeki nüfus kaydı geçersiz.",
        "Kurum adı KimlikDAO olmalı",
        "Kişi sağ değil",
        "Belgeyi alırken \"Sayı\" {} olarak girilmeli. 9 basamağı da doğru girdiniz mi? Farklı bir cüzdana mı geçtiniz?",
        "Belge e-devletten onaylanamadı.",
        "PoW hatalı.",
        "Geçerli bir PDF dosyası yükleyin."
      ] : [
        "The document is {} hours old. Please get a new document and upload here within 24 hours.",
        "The registry is invalid",
        "The institution name has to be filled in as exactly KimlikDAO.",
        "Person is not alive",
        "The  \"Request Number\" needs to be filled in as {}. Make sure you use the same wallet address.",
        "Unable the authenticate the document with e-devlet.",
        "Incorrect PoW.",
        "Invalid PDF file"
      ];

      /** @param {HataBildirimi} hata */
      const hataGöster = (/** HataBildirimi */ hata) => {
        let metin = HataMetinleri[hata.kod];
        hataBildirimi.innerText = hata.ek && hata.ek.length
          ? metin.replace("{}", hata.ek[0]) : metin;
        hataBildirimi.classList.add("inv");
        dom.gizle(dom.adla("tal"));
        dom.gizle(dom.adla("taimg"));
        dom.göster(dom.adla("tafail"));
      }

      const hataKaldır = () => {
        hataBildirimi.classList.remove("inv");
        dom.gizle(dom.adla("tafail"));
      }

      dom.adla("tabip").onclick = dom.adla("taip").onclick = () => {
        dom.gizle(dom.adla("tadc"));
        dom.göster(eDevletDüğmesi);
        dom.göster(pdfDüğmesi);
      }
    }
  }
}

export default { açıkTcktAlVe };
