import Cüzdan from "/birim/cüzdan/birim";
import Kpass from "/birim/kpass/birim";
import { ChainGroup, ChainId } from "/lib/crosschain/chains";
import { commitDouble } from "/lib/did/commitment";
import { combineMultiple } from "/lib/did/KPass";
import "/lib/node/error.d";
import network from "/lib/node/network";
import dom from "/lib/util/dom";
import { LangCode } from "/lib/util/i18n";
import { base64, uint8ArrayeBase64ten } from "/lib/util/çevir";

/** @define {string} */
const POW_WORKER_PATH = "/al/tanışma/powWorker.js";

/**
 * AçıkKPass alır ve `sonra`'ya aktarır.
 *
 * @param {ChainGroup} ağÇeşidi
 * @param {string} adres
 * @param {function(string, !did.DecryptedSections)} sonra AçıkKpass'i
 * vereceğimiz yordam.
 */
const açıkKPassAlVe = (ağÇeşidi, adres, sonra) => {
  /** @const {!Worker} */
  const powWorker = new Worker(POW_WORKER_PATH, { type: "module" });

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
    const taahhüt = commitDouble(ağÇeşidi, adres, nkoRastgele);
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
  /** @const {HTMLAnchorElement} */
  const nkoDüğmesi = /** @type {!HTMLAnchorElement} */(dom.adla("tab"));
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
      ? dom.i18n({ tr: "Deneme veri ile ilerle", en: "Proceed with test data (Berkeley)" })
      : eDevletDüğmesiMetni;
    eDevletDüğmesi.onclick = testVeri
      ? () =>
        window.location.href = "//mock-edevlet-kapisi.kimlikdao.net/auth?" +
        "response_type=code&client_id=F5CAA82F-E2CF-4F21-A745-471ABE3CE7F8&" +
        `redirect_uri=https://kimlikdao.org/${dom.i18n({ tr: "al", en: "mint" })}`
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
    nkoDüğmesi.innerText = dom.i18n({ tr: "VerifiableID’leriniz hesaplanıyor ⏳", en: "Computing your VerifiableIDs ⏳" });
    dom.düğmeDurdur(nkoDüğmesi);
    /** @const {number} */
    const istemciAn = Date.now() / 1000 | 0;
    /** @const {!Uint8Array} */
    const taahhüt = new Uint8Array(
      commitDouble(ağÇeşidi, adres, eDevletRastgele).buffer, 0, 72);

    // Şimdilik `edevlet/oauth2` için PoW gerektirmiyoruz.
    // Son 8 byte'ının kullanıcı EVM adresi bilgisi sızmaması için sıfırlayalım.
    taahhüt.fill(0, 64);

    network.getNodes(1)
      .then((nodelar) => fetch(
        `//${nodelar[0]}/edevlet/oauth2?` +
        `${base64(new Uint8Array(taahhüt))}&ts=${istemciAn}&oauth_code=${code}`))
      .then((/** @type {!Response} */ res) => res.json())
      .then((/** @type {!did.DecryptedSections} */ açıkKPass) => {
        nkoDüğmesi.innerText = dom.i18n({ tr: "Bilgileriniz alındı ✓", en: "We got your info ✓" });
        Kpass.açıkKPassGöster(açıkKPass);
        kutu.classList.add("done");
        sonra(adres, açıkKPass);
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
      /** @const {!Element} */
      const dosyaBırakmaBölgesi = dom.adla("tada");
      /** @const {!HTMLInputElement} */
      const dosyaSeçici = /** @type {!HTMLInputElement} */(dom.adla("tain"));
      dom.adla("tadsbtn").onclick = () => dosyaSeçici.click();
      /** @const {!Element} */
      const dosyaYüklemeBölümü = dom.adla("tadc");
      dom.göster(dosyaYüklemeBölümü);

      /** @const {function(!File)} */
      const dosyaYükle = (dosya) => {
        /** @const {number} */
        const istemciAnı = Date.now() / 1000 | 0;

        hataKaldır();
        hataBildirimi.innerText = dom.i18n({ tr: "Belge yükleniyor", en: "Uploading document" });
        setTimeout(() => {
          if (!hataOluştu)
            hataBildirimi.innerText = dom.i18n({ tr: "KPass’iniz oluşturuluyor", en: "Minting your KPass" });
        }, 1500);
        setTimeout(() => {
          if (!hataOluştu)
            hataBildirimi.innerText = dom.i18n({ tr: "VerifiableID hesaplanıyor", en: "Computing VerifiableID" });
        }, 2500);
        dom.adlaGizle("taimg");
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
          const açıkKPass = combineMultiple(
            results
              .filter((result) => result.status == "fulfilled")
              .map((result) => result.value),
            base64(nkoRastgele.subarray(0, 32)),
            base64(nkoRastgele.subarray(32)),
            3
          );
          if ("personInfo" in açıkKPass) {
            dom.gizle(dosyaYüklemeBölümü);
            nkoDüğmesi.href = "javascript:";
            nkoDüğmesi.classList.remove("act");
            nkoDüğmesi.innerText = dom.i18n({ tr: "Bilgileriniz onaylandı ✓", en: "We confirmed your info ✓" });
            dom.göster(nkoDüğmesi);
            dom.düğmeDurdur(nkoDüğmesi);
            Kpass.açıkKPassGöster(açıkKPass);
            kutu.classList.add("done");
            sonra(adres, açıkKPass);
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

      dosyaBırakmaBölgesi["ondrop"] = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0].type.includes("pdf"))
          dosyaYükle(e.dataTransfer.files[0]);
      };

      dosyaBırakmaBölgesi["ondragover"] = (e) => {
        e.preventDefault();
        dosyaBırakmaBölgesi.classList.add("tasrk");
      }

      dosyaBırakmaBölgesi["ondragleave"] = (e) => {
        e.preventDefault();
        dosyaBırakmaBölgesi.classList.remove("tasrk");
      }

      const HataMetinleri = dom.Lang == LangCode.TR ? [
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

export default { açıkKPassAlVe };
