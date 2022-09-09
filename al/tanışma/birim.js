import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
import dom from '/lib/dom';
import { base64, uint8ArrayeBase64ten } from '/lib/çevir';

/** @const {string} */
const KIMLIK_AS_URL = "https://mock-api.kimlikas.com";

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
 * @param {function(Promise<string>)} sonra
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
    .then((taahhütPow) => fetch("https://api.kimlikdao.org/numara-al?" + taahhütPow))
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
   * @param {!Uint8Array} rastgele
   */
  const kapat = (açıkTCKT, rastgele) => {
    for (let hane of "ad soyad TCKN dt dyeri".split(" "))
      if (açıkTCKT.kişi[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.kişi[hane];
    dom.adla("tccinsiyet").innerText = açıkTCKT.kişi.c;

    for (let hane of "annead babaad BSN cilt hane mhali".split(" "))
      if (açıkTCKT.aile[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.aile[hane];

    for (let hane of "il ilçe mahalle tescil".split(" "))
      if (açıkTCKT.kütük[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.kütük[hane];

    Tckt.yüzGöster(true);
    kutu.classList.add("done");
    açıkTCKT.rastgele = base64(rastgele);
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
    const hataBildirimi = dom.adla("tafb");
    pdfDüğmesi.onclick = () => {
      eDevletDüğmesi.style.display = "none";
      pdfDüğmesi.style.display = "none";
      /** @const {Element} */
      const dosyaBırakmaBölgesi = dom.adla("tada");
      /** @const {Element} */
      const dosyaSeçici = dom.adla("tain");
      numaraSözü.then((numara) => {
        /** @const {Element} */
        const kopyala = dom.adla("tacopy");
        dom.adla("tano").innerText = numara
        kopyala.style.display = "";
        kopyala.onclick = () => navigator.clipboard.writeText(numara);
      });
      dom.adla("tadsbtn").onclick = () => dosyaSeçici.click();
      dom.adla("tadc").style.display = "";

      /** @const {function(!File)} */
      const dosyaYükle = (dosya) => {
        hataKaldır();
        dom.adla("tafb").innerText = dom.TR ? "Belge yükleniyor" : "Uploading document";
        dom.adla("taimg").style.display = "none";
        dom.adla("tal").style.display = "";
        const formData = new FormData();
        formData.set('f', dosya);
        taahhütPowSözü
          .then((taahhütPow) => fetch('https://api.kimlikdao.org/pdften-tckt?' + taahhütPow, {
            method: 'POST',
            body: formData,
          }))
          .then(res => res.ok
            ? res.json().then((açıkTckt) => {
              dom.adla("tadc").style.display = "none";
              pdfDüğmesi.href = "javascript:";
              pdfDüğmesi.classList.remove("act");
              pdfDüğmesi.style.display = "";
              pdfDüğmesi.innerText = dom.TR ? "Bilgileriniz onaylandı ✓" : "We confirmed your info ✓";
              dom.butonDurdur(pdfDüğmesi);
              window.localStorage.removeItem(Cüzdan.adres().toLowerCase + "r");
              kapat(açıkTckt, pdfRasgele);
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
        dom.adla("tal").style.display = "none";
        dom.adla("taimg").style.display = "none";
        dom.adla("tafail").style.display = "";
      }

      const hataKaldır = () => {
        hataBildirimi.classList.remove("inv");
        dom.adla("tafail").style.display = "none";
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
