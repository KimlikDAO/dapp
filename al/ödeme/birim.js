import dom from '/lib/dom';
import TCKT from '/lib/TCKT';

const imgeEkle = (imge, satır) => {
  imge = imge.cloneNode(true);
  imge.width = 16;
  imge.height = 16;
  satır.replaceChild(imge, satır.children[1]);
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
  /** @type {string} */
  let ParaBirimi = "0";

  dom.menüYarat(paraDüğmesi, paraDüğmesi.nextElementSibling);

  imgeEkle(paraDüğmesi.nextElementSibling.lastElementChild.lastElementChild,
    döküm.children[2]);

  paraDüğmesi.nextElementSibling.onclick = (event) => {
    /** @const {Element} */
    const li = event.target.nodeName == "LI"
      ? event.target : event.target.parentElement;
    if (!li.id.startsWith("odd")) return;

    paraDüğmesi.replaceChild(li.lastElementChild.cloneNode(true),
      paraDüğmesi.firstElementChild);

    imgeEkle(li.lastElementChild, döküm.children[0]);
    imgeEkle(li.lastElementChild, döküm.children[1]);
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
