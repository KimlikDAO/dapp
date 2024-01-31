import { AğBilgileri, AğBilgisi } from "/birim/ağlar/birim";
import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import { ChainGroup, ChainId } from "/lib/crosschain/chains";
import TCKT from "/lib/ethereum/TCKT";
import { whenMined } from "/lib/ethereum/transaction";
import dom from "/lib/util/dom";

/** @const {!Element} */
const Kök = /** @const {!Element} */(dom.adla("od"));

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
 * @param {number} para
 * @param {number} miktar
 * @return {string}
 */
const paraVeMiktar = (para, miktar) => {
  /** @const {string} */
  const miktarMetni = dom.paradanMetne(miktar);
  if (para != 0)
    return (para == 3 ? "₺" : "$") + miktarMetni;

  /**
   * @type {!AğBilgisi}
   * @const
   */
  const ağBilgisi = AğBilgileri[Cüzdan.ağ()];
  return miktarMetni + " " + (ağBilgisi.token || ağBilgisi.tokenKodu);
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

  /**
   * @param {ChainId} yeniAğ
   */
  const ağDeğişti = (yeniAğ) => {
    /** @const {Element} */
    const li = dom.adla("odd" + yeniAğ);

    // Menü 'native token'i ayarla.
    for (const diğerAğ in AğBilgileri) {
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

    /** @const {ChainId} */
    const ağ = Cüzdan.ağ();
    /** @const {string} */
    const adres = /** @type {string} */(Cüzdan.adres());
    // Nonce'ın cachelenmesi için şimdiden çağır
    if (para) TCKT.getNonce(ağ, adres, para);
    /** @const {!Promise<number>} */
    const ağÜcretiSözü = TCKT.estimateNetworkFee(ağ);
    /** @const {!Promise<!Array<number>>} */
    const fiyatSözü = TCKT.priceIn(ağ, para)
      .then((/** @type {!Array<number>} */ fiyat) => {
        kesirGir(fiyat[1], döküm.children[0]);
        if (!iptalli)
          kesirGir(fiyat[0] - fiyat[1], döküm.children[1]);
        if (para != 0)
          kesirGir(fiyat[+iptalli], döküm.children[3]);
        dom.adla("odf").innerText = paraVeMiktar(para, fiyat[+iptalli]);
        return fiyat;
      });

    Promise.all([fiyatSözü, ağÜcretiSözü]).then(([
      /** @type {!Array<number>} */ fiyat,
      /** @type {number} */ ağÜcreti
    ]) => {
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

  /**
   * @template T
   * @param {T} cevap
   * @return {!Promise<T>}
   */
  const birazBekle = (cevap) => new Promise(
    (/** @type {function(T):void} */ resolve) => setTimeout(() => resolve(cevap), 100))

  Kök.classList.remove("disabled");
  dom.adla("oda").onclick = () => {
    /** @const {ChainId} */
    const ağ = Cüzdan.ağ();
    /** @const {string} */
    const adres = /** @type {string} */(Cüzdan.adres()).toLowerCase();

    const zincireYazılınca = () => {
      /** @const {string} */
      const hash = window.location.hash;
      /** @const {string} */
      const sonra = dom.TR
        ? hash.length >= 7
          ? decodeURIComponent(hash.slice("#sonra=".length)) : "/tcktm"
        : hash.length >= 6
          ? decodeURIComponent(hash.slice("#then=".length)) : "/my-tckt";
      window.localStorage.removeItem(adres + "nko_r");
      window.location.href = sonra;
    }

    if (ağ.startsWith(ChainGroup.MINA))
      return cidSözü.then((cid) => inscribeOnMina(
        /** @type {!mina.Provider} */(Cüzdan.bağlantı().provider), adres, cid, eşik, adresAğırlığı))
        .then(zincireYazılınca);
    else {
      (para == 0
        ? cidSözü.then((cid) =>
          TCKT.createWithRevokers(ağ, adres, cid, eşik, adresAğırlığı))
        : TCKT.isTokenERC20Permit(ağ, para)
          ? Promise.all([cidSözü, TCKT.getPermitFor(ağ, adres, para, iptalli)])
            .then(birazBekle)
            .then((/** @type {!Array<string>} */[cid, imza]) =>
              TCKT.createWithRevokersWithTokenPermit(ağ, adres, cid, eşik, adresAğırlığı, imza)
            )
          : Promise.all([cidSözü, TCKT.getApprovalFor(ağ, adres, para)])
            .then(birazBekle)
            .then(([/** @type {string} */ cid, _]) =>
              TCKT.createWithRevokersWithTokenPayment(ağ, adres, cid, eşik, adresAğırlığı, para)))
        .then((txHash) => {
          Telefon.nftGeriAl();
          const provider = /** @type {!eth.Provider} */(Cüzdan.bağlantı().provider);
          whenMined(provider, txHash, zincireYazılınca);
        });
    }
  };
}

/**
 * @param {!mina.Provider} provider
 * @param {string} address
 * @param {string} cid
 * @param {number} threshold
 * @param {!Object<string, number>} weightByRevoker
 * @return {!Promise<void>}
 */
const inscribeOnMina = (provider, address, cid, threshold, weightByRevoker) =>
  provider.signJsonMessage({
    message: [{
      label: "Address",
      value: address
    }, {
      label: "IPFS hash",
      value: cid
    }]
  }).then((/** @type {!mina.SignedData} */ signedData) => fetch("//demo-mapping.kimlikdao.org", {
    method: "PUT",
    body: JSON.stringify({
      "address": address,
      "cid": cid,
      "sig-s": signedData.signature.scalar,
      "sig-f": signedData.signature.field
    })
  }));

export { Kök, öde };
