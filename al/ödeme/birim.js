import dom from '/lib/dom';
import TCKT from '/lib/TCKT';

const imgeEkle = (imge, satır) => {
  imge = imge.cloneNode(true);
  imge.width = 16;
  imge.height = 16;
  satır.replaceChild(imge, satır.children[1]);
}

const kesirGir = (sayı, hane) => {
  const kesir = sayı % 10000;
  hane.innerText = (sayı - kesir) / 10000;
  hane.nextElementSibling.innerText = kesir;
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
  /** @const {boolean} */
  const iptalli = !!eşik;
  /** @type {string} */
  let para = "0";

  dom.menüYarat(paraDüğmesi, paraDüğmesi.nextElementSibling);

  if (iptalli) {
    döküm.children[1].remove();
  }
  // Ağ ücreti imgesini ekle
  imgeEkle(paraDüğmesi.nextElementSibling.lastElementChild.lastElementChild,
    döküm.lastElementChild.previousElementSibling);

  const ağDeğişince = (ağ) => {}

  const paraDeğişince = (yeniPara, imgeAslı) => {
    paraDüğmesi.replaceChild(imgeAslı.cloneNode(true), paraDüğmesi.firstElementChild);
    imgeEkle(imgeAslı, döküm.children[0]);
    if (!iptalli)
      imgeEkle(imgeAslı, döküm.children[1]);
    TCKT.priceIn(yeniPara).then((fiyat) => {
      kesirGir(fiyat[1], döküm.children[0].children[2]);
      if (!iptalli)
        kesirGir(fiyat[0] - fiyat[1], döküm.children[1].children[2]);
      döküm.lastElementChild.lastElementChild.style.display = yeniPara == 0
        ? "none" : "";
      if (yeniPara == 0) {
        const satır = döküm.lastElementChild;
        console.log(fiyat[iptalli], iptalli);
        const [tam, kesir] = tamVeKesir(2 + fiyat[+iptalli]);
        satır.children[2].innerText = tam;
        satır.children[3].innerText = kesir;
        imgeEkle(imgeAslı, satır);
      }
    })
  }

  paraDüğmesi.nextElementSibling.onclick = (event) => {
    /** @const {Element} */
    const li = event.target.nodeName == "LI"
      ? event.target : event.target.parentElement;
    if (!li.id.startsWith("odd")) return;
    paraDeğişince(li.id[3], li.lastElementChild);
  };

  dom.adla("od").classList.remove("disabled");
  dom.adla("oda").onclick = () => {
    cidSözü.then((cid) => {
      let döndü = adresAğırlığı.length
        ? TCKT.createWithRevokers(cid, eşik, adresAğırlığı)
        : TCKT.create(cid);
      döndü
        .then(() => dom.adla("nft").classList.add("scaleandmove"))
        .catch(() => dom.adla("nft").classList.add("scaleandmove"));
    });
  };
}