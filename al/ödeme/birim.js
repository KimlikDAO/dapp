import Cüzdan from "/birim/cüzdan/birim";
import Telefon from '/birim/telefon/birim';
import TCKT from '/lib/ethereum/TCKT';
import dom from '/lib/util/dom';

/**
 * @param {Element} imge
 * @param {Element} satır
 */
const imgeEkle = (imge, satır) => {
  satır = satır.lastElementChild;
  imge = imge.cloneNode(true);
  imge.width = 16;
  imge.height = 16;
  satır.replaceChild(imge, satır.firstElementChild);
}

/**
 * Verilen para miktarının tam sayı ve ondalık kısmını hane'ye ayrı ayrı yazar.
 * @param {number} sayı
 * @param {Element} satır
 */
const kesirGir = (sayı, satır) => {
  /** @const {Element} */
  const hane = satır.lastElementChild.children[1];
  /** @const {number} */
  const kesir = sayı % 1000000;
  hane.innerText = (sayı - kesir) / 1000000;
  hane.nextElementSibling.innerText =
    ("" + (kesir / 1000000)).slice(2).padEnd(2, "0");
}

/**
 * Ödeme adımını gösterir, ödeme onayını alıp evm provider'a yollar.
 *
 * @param {Promise<string>} cidSözü gelmekte olan ipfs CID'i.
 * @param {!Object<string, number>} adresAğırlığı (adres, ağırlık) ikilileri.
 * @param {number} eşik imece iptal için gereken oy eşiği.
 */
const öde = (cidSözü, adresAğırlığı, eşik) => {
  /** @const {Element} */
  const paraDüğmesi = dom.adla("odb");
  /** @const {Element} */
  const döküm = dom.adla("odi").firstElementChild;
  /** @const {Element} */
  const toplamKutusu = döküm.children[3].lastElementChild;
  /** @const {boolean} */
  const iptalli = !!eşik;
  /** @type {number} */
  let para = 0;

  /** @const {function(string)} */
  const ağDeğişti = (yeniAğ) => {
    /** @const {Element} */
    const li = dom.adla("odd" + yeniAğ);

    // Menü 'native token'i ayarla.
    for (const diğerAğ in Cüzdan.Paralar) {
      if (diğerAğ != yeniAğ) dom.adla("odd" + diğerAğ).style.display = "none";
    }

    // Yeni ağdaki fiyatları çek ve göster.
    for (let i = 0; i <= 3; ++i) {
      /** @const {Element} */
      const tokenLi = dom.adla("odd" + (i == 0 ? yeniAğ : i));
      /** @const {boolean} */
      const tokenYok = (i > 0) && !TCKT.isTokenAvailable(yeniAğ, i);
      tokenLi.style.display = tokenYok ? "none" : "";
      if (!tokenYok)
        TCKT.priceIn(yeniAğ, i).then((fiyat) => {
          tokenLi.firstElementChild.innerText = dom.paradanMetne(fiyat[+iptalli]);
        });
    }

    // yeniAğ'da mevcut token yoksa 'native token'e geç
    if (!TCKT.isTokenAvailable(yeniAğ, para)) para = 0;

    // Ağ ücreti imgesini ekle
    imgeEkle(li.lastElementChild, döküm.children[2]);
    imgeEkle(li.lastElementChild, toplamKutusu);
    paraDeğişti(para, para == 0 ? li.lastElementChild : null);
  }

  /**
   * @param {number} yeniPara
   * @param {?Element} imgeAslı
   */
  const paraDeğişti = (yeniPara, imgeAslı) => {
    para = yeniPara;

    if (imgeAslı) {
      paraDüğmesi.replaceChild(imgeAslı.cloneNode(true), paraDüğmesi.firstElementChild);
      imgeEkle(imgeAslı, döküm.children[0]);
      if (!iptalli)
        imgeEkle(imgeAslı, döküm.children[1]);
      imgeEkle(imgeAslı, döküm.children[3]);
    }

    // Eğer 'native token'da ödemiyorsak, ağ ücretini ayrıca göster
    toplamKutusu.lastElementChild.style.display = para == 0 ? "none" : "inline-block";

    /** @const {string} */
    const ağ = Cüzdan.ağ();
    /** @const {string} */
    const adres = /** @type {string} */(Cüzdan.adres());
    // Nonce'ın cachelenmesi için şimdiden çağır
    if (para) TCKT.getNonce(ağ, adres, para);
    /** @const {Promise<number>} */
    const ağÜcretiSözü = TCKT.estimateNetworkFee(ağ);
    /** @const {Promise<Array<number>>} */
    const fiyatSözü = TCKT.priceIn(ağ, para).then((fiyat) => {
      kesirGir(fiyat[1], döküm.children[0]);
      if (!iptalli)
        kesirGir(fiyat[0] - fiyat[1], döküm.children[1]);
      if (para != 0)
        kesirGir(fiyat[+iptalli], döküm.children[3]);
      /** @const {string} */
      const paraMetni = dom.paradanMetne(fiyat[+iptalli]);
      dom.adla("odf").innerText = para == 0
        ? paraMetni + " " + Cüzdan.Paralar[Cüzdan.ağ()][0]
        : (para == 3 ? "₺" : "$") + paraMetni;
      return fiyat;
    });

    Promise.all([fiyatSözü, ağÜcretiSözü]).then(([fiyat, ağÜcreti]) => {
      kesirGir(ağÜcreti, döküm.children[2]);
      if (para == 0) {
        kesirGir(fiyat[+iptalli] + ağÜcreti, döküm.children[3]);
      } else {
        kesirGir(ağÜcreti, toplamKutusu);
      }
    });
  }
  // Ek ücreti göster / gizle.
  döküm.children[1].style.display = iptalli ? "none" : "";
  // Para menüsünü yarat.
  dom.menüYarat(paraDüğmesi, paraDüğmesi.nextElementSibling);
  paraDüğmesi.nextElementSibling.onclick = (event) => {
    /** @const {Element} */
    const li = event.target.nodeName == "LI"
      ? event.target : event.target.parentElement;
    if (!li.id.startsWith("odd")) return;
    paraDeğişti(+li.id[3], li.lastElementChild);
  };

  ağDeğişti(Cüzdan.ağ());
  Cüzdan.ağDeğişince(ağDeğişti);

  const birazBekle = (cevap) => new Promise((resolve) => setTimeout(() => resolve(cevap), 100))

  dom.adla("od").classList.remove("disabled");
  dom.adla("oda").onclick = () => {
    const ağ = Cüzdan.ağ();
    const adres = /** @type {string} */(Cüzdan.adres());
    let sonuç = para == 0
      ? cidSözü.then((cid) =>
        TCKT.createWithRevokers(ağ, adres, cid, eşik, adresAğırlığı))
      : TCKT.isTokenERC20Permit(ağ, para)
        ? Promise.all([cidSözü, TCKT.getPermitFor(ağ, adres, para, iptalli)])
          .then(birazBekle)
          .then(([cid, imza]) =>
            TCKT.createWithRevokersWithTokenPermit(adres, cid, eşik, adresAğırlığı, imza)
          )
        : Promise.all([cidSözü, TCKT.getApprovalFor(ağ, adres, para)])
          .then(birazBekle)
          .then(([cid, _]) =>
            TCKT.createWithRevokersWithTokenPayment(ağ, adres, cid, eşik, adresAğırlığı, para));
    sonuç
      .then(() => {
        Telefon.nftGeriAl();
        setTimeout(() => window.location.href = dom.TR ? "/incele" : "/view", 1000);
      })
      .catch(console.log);
  };
}

export { öde };
