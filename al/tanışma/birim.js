import Cüzdan from "/birim/cüzdan/birim";
import Tckt from "/birim/tckt/birim";
import { ChainId } from "/lib/crosschain/chains";
import { keccak256Uint8 } from "/lib/crypto/sha3";
import { combineMultiple } from "/lib/did/decryptedSections";
import network from "/lib/node/network";
import dom from "/lib/util/dom";
import { base64, uint8ArrayeBase64ten } from "/lib/util/çevir";

/**
 * Verilen bir `hesap` için `rastgele` bitdizisi ile kriptografik taahhüt
 * oluşturur.
 *
 * @param {string} adres 0x ile başlayan EVM adresi.
 * @param {!Uint8Array} rastgele bitdizisi, 64 byte uzunluğunda.
 * @return {!Uint8Array} Kriptografik taahhüt, 64 byte uzunluğunda.
 */
const taahhütOluştur = (adres, rastgele) => {
  /** @type {!Uint8Array} */
  const eskiz = new Uint8Array(32 + 20);
  for (let /** number */ i = 1; i <= 20; ++i)
    eskiz[i + 31] = parseInt(adres.substring(2 * i, 2 * i + 2), 16);

  eskiz.set(rastgele.subarray(0, 32));
  /** @const {!Uint8Array} */
  const taahhüt = new Uint8Array(keccak256Uint8(eskiz).buffer, 0, 64);
  eskiz.set(rastgele.subarray(32, 64));
  taahhüt.set(keccak256Uint8(eskiz), 32);
  return taahhüt;
}

/**
 * AçıkTCKT alır ve `sonra`'ya aktarır.
 *
 * @param {string} adres
 * @param {function(string, !did.DecryptedSections)} sonra AçıkTCKT'yi
 * vereceğimiz yordam.
 */
const açıkTcktAlVe = (adres, sonra) => {
  /** @const {!Worker} */
  const powWorker = new Worker("/al/tanışma/powWorker.js", { type: "module" });

  /**
   * Kriptografik taahhüt için rastgele bitdizisi.
   *
   * @const {!Uint8Array}
   */
  const nkoRastgele = new Uint8Array(64);
  {
    /** @const {string} */
    const b64 = window.localStorage[adres + "nko_r"];
    if (b64) {
      uint8ArrayeBase64ten(nkoRastgele, b64)
    } else {
      crypto.getRandomValues(nkoRastgele);
      window.localStorage[adres + "nko_r"] = base64(nkoRastgele);
    }
  }
  /** @const {!Promise<string>} */
  const taahhütPowSözü = new Promise((resolve) => {
    /** @const {!Uint8Array} */
    const taahhüt = taahhütOluştur(adres, nkoRastgele);
    /** @const {string} */
    const taahhütB64 = base64(taahhüt);
    /** @const {?string} */
    const bellektenTaahhütPow = window.localStorage[taahhütB64];
    if (bellektenTaahhütPow) {
      powWorker.terminate();
      resolve(bellektenTaahhütPow);
    } else {
      powWorker.postMessage(taahhüt.buffer, [taahhüt.buffer]);
      powWorker.onmessage = (/** @type {!MessageEvent} */ msg) => {
        /** @const {string} */
        const taahhütPow = base64(new Uint8Array(msg.data, 0, 72));
        window.localStorage[taahhütB64] = taahhütPow;
        resolve(taahhütPow);
      }
    }
  });

  /** @const {!Promise<string>} */
  const numaraSözü = Promise.all([
    taahhütPowSözü,
    network.getNodes(1)
  ]).then(([
    /** @type {string} */ taahhütPow,
    /** @type {!Array<string>} */ nodelar
  ]) => fetch(`//${nodelar[0]}/edevlet/nko/commit?${taahhütPow}`))
    .then((/** @type {!Response} */ res) => res.text())
    .catch(console.log);

  /** @const {Element} */
  const eDevletDüğmesi = dom.adla("taa");
  /** @const {Element} */
  const nkoDüğmesi = dom.adla("tab");
  /** @const {Element} */
  const kutu = dom.adla("ta");
  /** @const {string} */
  const eDevletDüğmesiMetni = eDevletDüğmesi.innerText;

  /**
   * @param {string} yeniAğ
   */
  const testVeriDüğmesiGüncelle = (yeniAğ) => {
    const testVeri = yeniAğ == ChainId.MinaBerkeley;
    eDevletDüğmesi.innerText = testVeri
      ? dom.TR ? "Deneme veri ile ilerle" : "Proceed with test data (Berkeley)"
      : eDevletDüğmesiMetni;
    eDevletDüğmesi.onclick = testVeri
      ? () =>
        window.location.href = "//mock-edevlet-kapisi.kimlikdao.net/auth?" +
        "response_type=code&client_id=F5CAA82F-E2CF-4F21-A745-471ABE3CE7F8&" +
        `redirect_uri=https://kimlikdao.org/${dom.TR ? "al" : "mint"}`
      : null;
  }
  Cüzdan.ağDeğişince(testVeriDüğmesiGüncelle);
  testVeriDüğmesiGüncelle(Cüzdan.ağ());

  kutu.classList.remove("disabled");

  /** @type {!URLSearchParams} */
  const params = new URLSearchParams(location.search);
  /** @type {?string} */
  const code = params.get("code");
  if (code) {
    history.replaceState(null, "", location.pathname);
    powWorker.terminate();
    /** @const {!Uint8Array} */
    const eDevletRastgele = /** @type {!Uint8Array} */(
      crypto.getRandomValues(new Uint8Array(64)));
    dom.gizle(eDevletDüğmesi);
    nkoDüğmesi.href = "javascript:";
    nkoDüğmesi.classList.remove("act");
    nkoDüğmesi.innerText = dom.TR ? "VerifiableID’leriniz heaplanıyor ⏳" : "Computing your VerifiableIDs ⏳";
    dom.düğmeDurdur(nkoDüğmesi);
    /** @const {number} */
    const istemciAn = Date.now() / 1000 | 0;
    /** @const {!Uint8Array} */
    const taahhüt = new Uint8Array(
      taahhütOluştur(adres, eDevletRastgele).buffer, 0, 72);

    // Şimdilik `edevlet/oauth2` için PoW gerektirmiyoruz.
    // Son 8 byte'ının kullanıcı EVM adresi bilgisi sızmaması için sıfırlayalım.
    taahhüt.fill(0, 64);

    network.getNodes(1)
      .then((nodelar) => fetch(
        `//${nodelar[0]}/edevlet/oauth2?` +
        `${base64(new Uint8Array(taahhüt))}&ts=${istemciAn}&oauth_code=${code}`))
      .then((/** @type {!Response} */ res) => res.json())
      .then((/** @type {!did.DecryptedSections} */ açıkTckt) => {
        nkoDüğmesi.innerText = dom.TR ? "Bilgileriniz alındı ✓" : "We got your info ✓";
        Tckt.açıkTcktGöster(açıkTckt);
        kutu.classList.add("done");
        sonra(adres, açıkTckt);
      });
  } else {
    /** @const {Element} */
    const hataBildirimi = dom.adla("tafb");
    /** @type {boolean} */
    let hataOluştu = false;

    numaraSözü.then((numara) => {
      /** @const {Element} */
      const kopyala = dom.adla("tacopy");
      /** @const {string} */
      const kurumAdı = "KimlikDAO-" + numara;
      dom.adla("tano").innerText = kurumAdı;
      dom.göster(kopyala);
      kopyala.onclick = () => navigator.clipboard.writeText(kurumAdı);
    });

    nkoDüğmesi.onclick = () => {
      dom.gizle(eDevletDüğmesi);
      dom.gizle(nkoDüğmesi);
      /** @const {Element} */
      const dosyaBırakmaBölgesi = dom.adla("tada");
      /** @const {Element} */
      const dosyaSeçici = dom.adla("tain");
      dom.adla("tadsbtn").onclick = () => dosyaSeçici.click();
      /** @const {Element} */
      const dosyaYüklemeBölümü = dom.adla("tadc");
      dom.göster(dosyaYüklemeBölümü);

      /** @const {function(!File)} */
      const dosyaYükle = (dosya) => {
        /** @const {number} */
        const istemciAnı = Date.now() / 1000 | 0;

        hataKaldır();
        hataBildirimi.innerText = dom.TR ? "Belge yükleniyor" : "Uploading document";
        setTimeout(() => {
          if (!hataOluştu)
            hataBildirimi.innerText = dom.TR
              ? "TCKT’niz oluşturuluyor"
              : "Minting your TCKT"
        }, 1500);
        setTimeout(() => {
          if (!hataOluştu)
            hataBildirimi.innerText = dom.TR
              ? "VerifiableID hesaplanıyor"
              : "Computing VerifiableID"
        }, 2500);
        dom.adlaGizle("taimg");
        dom.adlaGöster("tal");
        /** @const {!FormData} */
        const formData = new FormData();
        formData.set('f', dosya);

        Promise.all([
          network.getNodes(7),
          taahhütPowSözü
        ]).then(([
          /** @type {!Array<string>} */ nodelar,
          /** @type {string} */ taahhütPow
        ]) => Promise.allSettled(nodelar.map((node) =>
          fetch(`//${node}/edevlet/nko?${taahhütPow}&ts=${istemciAnı}`, {
            method: "POST",
            body: formData
          }).then((/** @type {!Response} */ res) => res.json()
            .then((data) => res.ok && data ? data : Promise.reject(data))
          ))
        )).then((/** @type {!Array<!Promise.AllSettledResultElement<!did.DecryptedSections>>} */
          results) => {
          /** @const {!did.DecryptedSections} */
          const açıkTckt = combineMultiple(
            results
              .filter((result) => result.status == "fulfilled")
              .map((result) => result.value),
            base64(nkoRastgele.subarray(0, 32)),
            base64(nkoRastgele.subarray(32)),
            3
          );
          if ("personInfo" in açıkTckt) {
            dom.gizle(dosyaYüklemeBölümü);
            nkoDüğmesi.href = "javascript:";
            nkoDüğmesi.classList.remove("act");
            nkoDüğmesi.innerText = dom.TR ? "Bilgileriniz onaylandı ✓" : "We confirmed your info ✓";
            dom.göster(nkoDüğmesi);
            dom.düğmeDurdur(nkoDüğmesi);
            Tckt.açıkTcktGöster(açıkTckt);
            kutu.classList.add("done");
            sonra(adres, açıkTckt);
          } else {
            /** @const {!node.HataBildirimi} */
            const hata = /** @type {node.HataBildirimi} */(results.find(
              (result) => result.status == 'rejected' &&
                Object.keys(/** @type {!Object} */(result.reason)).length != 0).reason)
              || /** @type {!node.HataBildirimi} */({ kod: 7 });
            hataGöster(hata);
          }
        })
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
        "Belgeyi alırken \"Kurum adı\" KimlikDAO-{} olarak girilmeli. Son 6 basamağı da doğru girdiniz mi? Farklı bir cüzdana mı geçtiniz?",
        "Belge e-devletten onaylanamadı. Belgeyi yeni aldıysanız 30sn sonra tekrar deneyin.",
        "PoW hatalı.",
        "Geçerli bir PDF dosyası yükleyin."
      ] : [
        "The document is {} hours old. Please get a new document and upload here within 24 hours.",
        "The registry is invalid",
        "The institution name has to be filled in as exactly KimlikDAO.",
        "Person is not alive",
        "The  \"Institution name\" needs to be filled in as KimlikDAO-{}. Make sure you use the same wallet address.",
        "Unable the authenticate the document with e-devlet. If you just got the document, wait for 30 seconds and try again.",
        "Incorrect PoW.",
        "Invalid PDF file"
      ];

      /**
       * @param {!node.HataBildirimi} hata
       */
      const hataGöster = (hata) => {
        hataOluştu = true;
        /** @const {string} */
        const metin = HataMetinleri[hata.kod];
        hataBildirimi.innerText = hata.ek && hata.ek.length
          ? metin.replace("{}", hata.ek[0]) : metin;
        hataBildirimi.classList.add("inv");
        dom.gizle(dom.adla("tal"));
        dom.gizle(dom.adla("taimg"));
        dom.göster(dom.adla("tafail"));
      }

      const hataKaldır = () => {
        hataOluştu = false;
        hataBildirimi.classList.remove("inv");
        dom.gizle(dom.adla("tafail"));
      }

      dom.adla("tabip").onclick = dom.adla("taip").onclick = () => {
        dom.gizle(dom.adla("tadc"));
        dom.göster(eDevletDüğmesi);
        dom.göster(nkoDüğmesi);
      }
    }
  }
}

export default { açıkTcktAlVe };
