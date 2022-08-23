import Cüzdan from '/birim/cüzdan/birim';
import Tckt from '/birim/tckt/birim';
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
  let concat = new Uint8Array(64 + 20);
  concat.set(rasgele, 0);

  for (let /** number */ i = 1; i <= 20; ++i)
    concat[i + 63] = parseInt(hesap.substring(2 * i, 2 * i + 2), 16);

  return crypto.subtle.digest("SHA-256", concat).then(base64);
}

/** @return {Promise<string>} */
const tanı = () => {
  /**
   * Pedersen taahhüdü için rasgele bitdizisi.
   * @type {!Uint8Array}
   */
  let rasgele = new Uint8Array(64);
  crypto.getRandomValues(rasgele);

  /** @type {URLSearchParams} */
  const params = new URLSearchParams(location.search);
  /** @type {?string} */
  const code = params.get("code");
  history.replaceState(null, "", location.pathname);

  return taahhütOluştur(/** @type {string} */(Cüzdan.adres()), rasgele)
    .then((taahhüt) =>
      fetch(KIMLIK_AS_URL + "?" + new URLSearchParams({ "oauth_code": code, "taahhüt": taahhüt })))
    .then((res) => res.json())
    .then((açıkTCKT) => {
      /** @const {TCKTTemelBilgileri} */
      const temizTCKT = {};
      for (let ad of "TCKN ad soyad dt annead babaad".split(" ")) {
        dom.adla("tc" + ad).innerText = açıkTCKT[ad];
        temizTCKT[ad] = açıkTCKT[ad];
      }
      Tckt.yüzGöster(true);
      /** @const {Element} */
      const OAuthDüğmesi = dom.adla("taa");
      OAuthDüğmesi.innerText = dom.TR ? "E-devlet’ten bilgileriniz alındı ✓" : "We got your info ✓";
      OAuthDüğmesi.classList.remove("act");
      OAuthDüğmesi.href = "javascript:";
      dom.butonDurdur(OAuthDüğmesi);
      dom.adla("ta").classList.add("done");
      temizTCKT.taahhüt = açıkTCKT["taahhüt"];
      temizTCKT.rasgele = base64(rasgele);
      // TODO(KimlikDAO-bot): Kullanıcı tarafında gelen TCKT'nin fazladan veri
      // içermediğini denetle. Fazla verileri işaretleme riski yüzünden sil.
      return JSON.stringify(temizTCKT, null, 2);
    });
}

const göster = () => {
  const EDevletDüğmesi = dom.adla("taa");
  const PDFDüğmesi = dom.adla("tab");

  dom.adla("ta").classList.remove("disabled");

  PDFDüğmesi.onclick = () => {
    dom.adla("tadc").style.display = "";
    EDevletDüğmesi.style.display = "none";
    PDFDüğmesi.style.display = "none";
    let IbrazNumarası = 0;

    const powWorker = new Worker("/al/tanışma/pow-worker.js");
    let rasgele = new Uint8Array(64);
    crypto.getRandomValues(rasgele);

    taahhütOluştur(Cüzdan.adres(), rasgele)
      .then((taahhüt) => {
        let pow = "";
        powWorker.postMessage(taahhüt);
        powWorker.onmessage = (e) => {
          pow = base64(e.data);
        }
        taahhüt = base64(taahhüt);
      })
      .then((taahhüt, pow) => {
        fetch(`https://api.kimlikdao.org/numara-al?tht=${taahhüt}&pow=${pow}`)
      })
      .then(res => IbrazNumarası = res);

    /**@const {Element} */
    const dosyaBırakmaBölgesi = dom.adla("tada");
    dom.adla("taibrazno").innerText = IbrazNumarası;
    dom.adla("tadsbtn").onclick = () => {
      dom.adla("tain").click();
    }

    const dosyaYükle = (dosya) => {
      fetch('https://api.kimlikdao.org/pdf-yukle?tht=base64(taahhut)&pow=base(pow)', {
        method: 'POST',
        body: dosya,
      })
      .then(res => res.json())
      .then(ok => console.log(ok))
      .catch(e => console.log(e))
    }

    dom.adla("tain").onchange = () => {
      dom.adla("tadat").innerText = dom.adla("tain").files[0].name;
      dosyaBırakmaBölgesi.classList.add("dragison");
      dosyaYükle(dom.adla("tain").files[0]);
    }

    dosyaBırakmaBölgesi.ondrop = (e) => {
      e.preventDefault();
      const bırakılanDosya = e.dataTransfer.files[0];
      dom.adla("tadat").innerText = bırakılanDosya.name;
      dosyaYükle(dom.adla("tain").files[0]);
    };

    dosyaBırakmaBölgesi.ondragover = (e) => {
      e.preventDefault();
      dosyaBırakmaBölgesi.classList.add("dragison");
    }

    dosyaBırakmaBölgesi.ondragleave = (e) => {
      e.preventDefault();
      dosyaBırakmaBölgesi.classList.remove("dragison");
    }

    dom.adla("taip").onclick = () => {
      dom.adla("tadc").style.display = "none";
      EDevletDüğmesi.style.display = "";
      PDFDüğmesi.style.display = "";
      powWorker.terminate();
    }
  }



  if (!location.search) {
    EDevletDüğmesi.classList.add("act");
    PDFDüğmesi.style.display = "";
  }
}

export default {
  göster,
  tanı,
};
