import TCKT from '/lib/TCKT';
import dom from '/lib/dom';

/**
 * Ödeme adımını gösterir, ödeme onayını alıp evm provider'a yollar.
 *
 * @param {Promise<string>} cidSözü gelmekte olan ipfs CID'i.
 * @param {Object<string, number>} adresAğırlığı (adres, ağırlık) ikilileri.
 * @param {number} eşik imece iptal için gereken oy eşiği.
 */
export const öde = (cidSözü, adresAğırlığı, eşik) => {
  const paraDüğmesi = dom.adla("odb");
  dom.menüYarat(paraDüğmesi, paraDüğmesi.firstElementChild);
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
