import Cüzdan from "/birim/cüzdan/birim";
import dom from '/lib/dom';
import TCKT from '/lib/TCKT';

const imgeEkle = (imge, satır) => {
  imge = imge.cloneNode(true);
  imge.width = 16;
  imge.height = 16;
  satır.replaceChild(imge, satır.children[1]);
}

const kesirGir = (sayı, hane) => {
  hane = hane.children[2];
  const kesir = sayı % 1000000;
  hane.innerText = (sayı - kesir) / 1000000;
  hane.nextElementSibling.innerText =
    ("" + (kesir / 1000000)).slice(2).padEnd(2, "0");
}

/**
 * Ödeme adımını gösterir, ödeme onayını alıp evm provider'a yollar.
 *
 * @param {Promise<string>} cidSözü gelmekte olan ipfs CID'i.
 * @param {Object<string, number>} adresAğırlığı (adres, ağırlık) ikilileri.
 * @param {number} eşik imece iptal için gereken oy eşiği.
 */
export const öde = (cidSözü, adresAğırlığı, eşik) => {
  /** @const {Element} */
  const paraDüğmesi = dom.adla("odb");
  /** @const {Element} */
  const döküm = dom.adla("odi");
  /** @const {Element} */
  const toplamSatırı = döküm.lastElementChild;
  /** @const {boolean} */
  const iptalli = !!eşik;
  /** @type {string} */
  let para = "0";

  const ağDeğişti = (yeniAğ) => {
    /** @const {Element} */
    const li = dom.adla("odd" + yeniAğ);

    // Menü 'native token'i ayarla.
    for (const diğerAğ of ["0x1", "0xa86a", "0x89", "0xa4b1", "0xfa"]) {
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
        TCKT.priceIn(i).then((fiyat) => {
          tokenLi.firstElementChild.innerText = fiyat[+iptalli] / 1000000;
        });
    }

    // yeniAğ'da mevcut token yoksa 'native token'e geç
    if (!TCKT.isTokenAvailable(yeniAğ, para)) para = 0;

    // Ağ ücreti imgesini ekle
    imgeEkle(li.lastElementChild, döküm.children[2]);
    imgeEkle(li.lastElementChild, toplamSatırı.lastElementChild);
    paraDeğişti(para, para == 0 ? li.lastElementChild : null);
  }

  const paraDeğişti = (yeniPara, imgeAslı) => {
    para = yeniPara;

    if (imgeAslı) {
      paraDüğmesi.replaceChild(imgeAslı.cloneNode(true), paraDüğmesi.firstElementChild);
      imgeEkle(imgeAslı, döküm.children[0]);
      if (!iptalli)
        imgeEkle(imgeAslı, döküm.children[1]);
      imgeEkle(imgeAslı, toplamSatırı);
    }

    // Eğer 'native token'da ödemiyorsak, ağ ücretini ayrıca göster
    toplamSatırı.lastElementChild.style.display = para == 0 ? "none" : "inline-block";

    const ağÜcretiSözü = TCKT.estimateNetworkFee();
    const fiyatSözü = TCKT.priceIn(para).then((fiyat) => {
      kesirGir(fiyat[1], döküm.children[0]);
      if (!iptalli)
        kesirGir(fiyat[0] - fiyat[1], döküm.children[1]);
      if (para != 0)
        kesirGir(fiyat[+iptalli], toplamSatırı);
      let paraMetni = ("" + (fiyat[+iptalli] / 1000000)).replace(".", ",");
      dom.adla("odf").innerText = para == 0
        ? paraMetni + " " + Cüzdan.ParaEkleri[Cüzdan.ağ()][0]
        : (para == 3 ? "₺" : "$") + paraMetni;
      return fiyat;
    });

    Promise.all([fiyatSözü, ağÜcretiSözü]).then(([fiyat, ağÜcreti]) => {
      kesirGir(ağÜcreti, döküm.children[2]);
      if (para == 0) {
        kesirGir(fiyat[+iptalli] + ağÜcreti, toplamSatırı);
      } else {
        kesirGir(ağÜcreti, toplamSatırı.lastElementChild);
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
    paraDeğişti(li.id[3], li.lastElementChild);
  };

  ağDeğişti(Cüzdan.ağ());
  Cüzdan.ağDeğişince(ağDeğişti);

  dom.adla("od").classList.remove("disabled");
  dom.adla("oda").onclick = () => {
    let sonuç = para == 0
      ? cidSözü.then((cid) =>
        TCKT.createWithRevokers(cid, eşik, adresAğırlığı))
      : Promise.all([cidSözü, TCKT.getPermissionFor(para, iptalli)]).then(([cid, imza]) => {
        console.log(cid, imza);
        return TCKT.createWithRevokersWithTokenPermit(cid, eşik, adresAğırlığı, imza);
      })

    sonuç
      .then(() => dom.adla("nft").classList.add("scaleandmove"))
      .catch(console.log);
  };
}
