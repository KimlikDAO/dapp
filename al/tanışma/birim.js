import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
import dom from '/lib/dom';
import { base64, uint8ArrayeBase64ten } from '/lib/çevir';

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
 * @param {TCKTTemelBilgileri} açıkTCKT
 * @param {!Uint8Array} rastgele
 */
const bilgiGir = (açıkTCKT) => {
  for (let hane of "ad soyad TCKN dt dyeri".split(" "))
    if (açıkTCKT.kişi[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.kişi[hane];
  dom.adla("tccinsiyet").innerText = açıkTCKT.kişi.c || "K";

  for (let hane of "annead babaad BSN cilt hane mhali".split(" "))
    if (açıkTCKT.aile[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.aile[hane];

  for (let hane of "il ilçe mahalle tescil".split(" "))
    if (açıkTCKT.kütük[hane]) dom.adla("tc" + hane).innerText = açıkTCKT.kütük[hane];

  Tckt.yüzGöster(true);
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
    .then((taahhütPow) => fetch(KIMLIKDAO_API_URL + "alfanum-al?" + taahhütPow))
    .then((res) => res.text())
    .catch(console.log);

  /** @const {Element} */
  const eDevletDüğmesi = dom.adla("taa");
  /** @const {Element} */
  const pdfDüğmesi = dom.adla("tab");
  /** @const {Element} */
  const kutu = dom.adla("ta");

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
    dom.gizle(eDevletDüğmesi);
    pdfDüğmesi.href = "javascript:";
    pdfDüğmesi.classList.remove("act");
    pdfDüğmesi.innerText = dom.TR ? "E-devlet’ten bilgileriniz alındı ✓" : "We got your info ✓";
    dom.butonDurdur(pdfDüğmesi);
    taahhütOluştur(/** @type {string} */(Cüzdan.adres()), eDevletRasgele)
      .then((taahhüt) =>
        fetch(KIMLIK_AS_URL + "?" + new URLSearchParams({ "oauth_code": code, "taahhut": base64(new Uint8Array(taahhüt)) })))
      .then(res => res.json())
      .then((açıkTCKT) => {
        bilgiGir(açıkTCKT);
        açıkTCKT.rastgele = base64(rastgele);
        kutu.classList.add("done");
        sonra(Promise.resolve(JSON.stringify(açıkTCKT, null, 2)));
      });
  } else {
    const hataBildirimi = dom.adla("tafb");
    pdfDüğmesi.onclick = () => {
      dom.gizle(eDevletDüğmesi);
      dom.gizle(pdfDüğmesi);
      /** @const {Element} */
      const dosyaBırakmaBölgesi = dom.adla("tadc");
      /** @const {Element} */
      const dosyaSeçici = dom.adla("tain");
      numaraSözü.then((numara) => {
        /** @const {Element} */
        const kopyala = dom.adla("tacopy");
        /** @const {string} */
        const kurumAdı = "KimlikDAO-" + numara;
        dom.adla("tano").innerText = kurumAdı;
        kopyala.style.display = "";
        kopyala.onclick = () => navigator.clipboard.writeText(kurumAdı);
      });
      dom.adla("tadsbtn").onclick = () => dosyaSeçici.click();
      dom.adla("tadc").style.display = "";

      /** @const {function(!File)} */
      const dosyaYükle = (dosya) => {
        hataKaldır();
        dom.adla("tafb").innerText = dom.TR ? "Belge yükleniyor" : "Uploading document";
        dom.adlaGizle("taimg");
        dom.adla("tal").style.display = "";
        const formData = new FormData();
        formData.set('f', dosya);
        taahhütPowSözü
          .then((taahhütPow) => fetch(KIMLIKDAO_API_URL + "pdften-tckt?" + taahhütPow, {
            method: 'POST',
            body: formData,
          }))
          .then(res => res.ok
            ? res.json().then((açıkTCKT) => {
              bilgiGir(açıkTCKT);
              window.localStorage.removeItem(Cüzdan.adres().toLowerCase + "r");
              dom.adlaGizle("tadc");
              ekBilgiAlVe(açıkTCKT, sonra);
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
        "Kurum adı KimlikDAO ile başlamalı",
        "Kişi sağ değil",
        "Belgeyi alırken \"Kurum adı\" KimlikDAO-{} olarak girilmeli. 6 harfi de doğru girdiniz mi? Farklı bir cüzdana mı geçtiniz?",
        "Belge e-devletten onaylanamadı.",
        "PoW hatalı.",
        "Geçerli bir PDF dosyası yükleyin."
      ] : [
        "The document is {} hours old. Please get a new document and upload here within 24 hours.",
        "The registry is invalid",
        "The institution name has to start with KimlikDAO.",
        "Person is not alive",
        "The  \"Institution name\" needs to be filled in as KimlikDAO-{}. Make sure you use the same wallet as before.",
        "Unable the authenticate the document with e-devlet.",
        "Incorrect PoW.",
        "Invalid PDF file"
      ];

      /** @param {HataBildirimi} hata */
      const hataGöster = (hata) => {
        let metin = HataMetinleri[hata.kod];
        hataBildirimi.innerText = hata.ek && hata.ek.length
          ? metin.replace("{}", hata.ek[0]) : metin;
        hataBildirimi.classList.add("inv");
        dom.gizle(dom.adla("tal"));
        dom.gizle(dom.adla("taimg"));
        dom.adla("tafail").style.display = "";
      }

      const hataKaldır = () => {
        hataBildirimi.classList.remove("inv");
        dom.adlaGizle("tafail");
      }

      dom.adla("taip").onclick = dom.adla("tabip").onclick = () => {
        dom.adlaGizle("tadc");
        eDevletDüğmesi.style.display = "";
        pdfDüğmesi.style.display = "";
      }
    }
  }
}

const ekBilgiAlVe = (açıkTCKT, sonra) => {
  dom.adlaGizle("taa");
  dom.adlaGizle("tab");
  /** @const {Element} */
  const ePostaGirdisi = dom.adla("taemi");
  /** @const {Element} */
  const telGirdisi = dom.adla("tateli");
  /** @const {Element} */
  const adresGirdisi = dom.adla("taadi");
  /** @const {Element} */
  const mailOnayGirdisi = dom.adla("tamo");
  /** @const {Element} */
  const telOnayGirdisi = dom.adla("tato");
  /** @const {Element} */
  const onaylaDüğmesi = dom.adla("taebo");
  /** @const {Element} */
  const atlaDüğmesi = dom.adla("taeba");
  /** @const {Element} */
  const mailKodGönderDüğmesi = dom.adla("taemo");
  /** @const {Element} */
  const telSmsGönderDüğmesi = dom.adla("tatelo");
  /** @const {Element} */
  const adresDosyaSeçici = dom.adla("taebfi");
  /** @const {Element} */
  const ekBilgiKutusu = dom.adla("taec");
  dom.göster(ekBilgiKutusu);

  ePostaGirdisi.onblur = () => { // Girilen e-posta'nın uygunluğunu kontrol ediyoruz
    let mailDüzgünMü = true;
    ePostaGirdisi.parentElement.classList.remove("invalid");
    if (!ePostaGirdisi.value.includes('@') && ep) {
      ePostaGirdisi.parentElement.classList.add("invalid");
      mailDüzgünMü = false;
    }
    return mailDüzgünMü;
  }

  mailKodGönderDüğmesi.onclick = () => {
    ePostaGirdisi.onblur()
      && console.log("Kullanıcının e-postasına kod gönderilecek");  // Mail adresine doğrulama kodu gönderilecek 
  }

  ePostaGirdisi.onkeydown = (e) => {
    ePostaGirdisi.parentElement.classList.remove("invalid");
    if (e.key == "Enter") mailKodGönderDüğmesi.onclick();
  }

  telGirdisi.onblur = () => {
    let telDüzgünMü = true
    telGirdisi.parentElement.classList.remove("invalid");
    if (telGirdisi.value.length < 11) {              // TODO(MuhammetCoskun): Tel validation daha kapsamlı hale getir.
      telGirdisi.parentElement.classList.add("invalid");
      telDüzgünMü = false;
    }
    return telDüzgünMü;
  }

  telSmsGönderDüğmesi.onclick = () => {
    telGirdisi.onblur()
      && console.log("Kullanıcının telefonuna kod gönderilecek"); // Sms gönderilecek
  }

  telGirdisi.onkeydown = (e) => {
    telGirdisi.parentElement.classList.remove("invalid");
    if (e.key == "Enter") telSmsGönderDüğmesi.onclick();
  }

  /**
   * @param {Element} element
   * @param {number} kod
   */
  const onayKoduKontrolEt = (element, kod) => {
    element.parentElement.classList.remove("invalid");
    if (element.value.length > 6) element.value = element.value.slice(0, 6);
    return element.value == kod;
  }

  mailOnayGirdisi.oninput = () => {
    dom.adlaGizle("taemat");
    mailOnayGirdisi.parentElement.classList.remove("invalid");
    if (mailOnayGirdisi.value.length < 6) return
    onayKoduKontrolEt(mailOnayGirdisi, 123456) // 123456 dummy kod, değişecek.
      ? dom.adla("taemat").style.display = ""
      : mailOnayGirdisi.parentElement.classList.add("invalid");
  }

  telOnayGirdisi.oninput = () => {
    dom.adlaGizle("tatelt");
    telOnayGirdisi.parentElement.classList.remove("invalid");
    if (telOnayGirdisi.value.length < 6) return
    onayKoduKontrolEt(telOnayGirdisi, 123456) // 123456 dummy kod, değişecek.
      ? dom.adla("tatelt").style.display = ""
      : telOnayGirdisi.parentElement.classList.add("invalid");
  }

  /** @const {function(!File)} */
  const adresİçinDosyaYükle = (dosya) => {
    const formData = new FormData();
    formData.set('f', dosya);
    fetch(KIMLIKDAO_API_URL + "pdften-adres?", {
      method: 'POST',
      body: formData,
    }).then(res => res.ok
      ? res.json().then((adres) => {
        adresGirdisi.value = adres;
        dom.adla("taadt").style.display = "";
      })
      : res.json().then(e => console.log(e)));
  }

  adresDosyaSeçici.onchange = () => {
    adresDosyaBırakmaBölgesi.classList.add("tasrk");
    if (adresDosyaSeçici.files.length > 0) {
      adresİçinDosyaYükle(adresDosyaSeçici.files[0]);
    }
  }

  adresDosyaBırakmaBölgesi.ondrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0].type.includes("pdf"))
      adresİçinDosyaYükle(e.dataTransfer.files[0]);
  };

  adresDosyaBırakmaBölgesi.ondragover = (e) => {
    e.preventDefault();
    adresDosyaBırakmaBölgesi.classList.add("tasrk");
  }

  adresDosyaBırakmaBölgesi.ondragleave = (e) => {
    e.preventDefault();
    adresDosyaBırakmaBölgesi.classList.remove("tasrk");
  }

  onaylaDüğmesi.onclick = () => {
    const ePostaAdresi = ePostaGirdisi.value;
    const telefonNumarası = telGirdisi.value;
    const adresBilgileri = adresGirdisi.value;
    console.log(ePostaAdresi, telefonNumarası, adresBilgileri);
  }

  dom.adla("taebds").onclick = () => {
    adresDosyaSeçici.click();
  }

  atlaDüğmesi.onclick = dom.adla("taebip").onclick = () => {
    dom.gizle(ekBilgiKutusu);
    /** @const {Element} */
    const düğme = dom.adla("tab");
    düğme.href = "javascript:";
    düğme.classList.remove("act");
    düğme.style.display = "";
    düğme.innerText = dom.TR ? "Bilgileriniz onaylandı ✓" : "We confirmed your info ✓";
    dom.butonDurdur(düğme);
    sonra(Promise.resolve(JSON.stringify(açıkTCKT, null, 2)));
  }
}

export default { açıkTcktAlVe };
