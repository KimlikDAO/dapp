/**
 * @fileoverview Al sayfası giriş noktası
 */
import İmeceİptal from "/al/imeceİptal/birim";
import Tanışma from "/al/tanışma/birim";
import { öde } from "/al/ödeme/birim";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import Tckt from "/birim/tckt/birim";
import Telefon from "/birim/telefon/birim";
import { OnaylamaAnahtarları, imzaMetni, metadataVeBölümler } from "/lib/did/TCKTVerisi";
import { toUnlockableNFT } from "/lib/did/decryptedSections";
import { verifyProofs } from "/lib/did/decryptedSectionsVerifier";
import TCKT from "/lib/ethereum/TCKT";
import ipfs from "/lib/node/ipfs";
import network from "/lib/node/network";
import dom from "/lib/util/dom";
import { hex } from "/lib/util/çevir";

/**
 * @param {string} adres
 * @param {!did.DecryptedSections} açıkTckt
 */
const tcktYarat = (adres, açıkTckt) => {
  /** @const {!Element} */
  const şifrele = /** @const {!Element} */(dom.adla("al3"));
  /** @const {!Element} */
  const şifreleDüğmesi = /** @const {!Element} */(dom.adla("al3a"));

  dom.adla("te").style.opacity = 1;
  şifrele.classList.remove("disabled");
  şifreleDüğmesi.classList.remove("disabled");

  /** @const {string} */
  const telefonMetni = imzaMetni(["personInfo"]);
  Telefon.kutuGöster(telefonMetni.slice(0, 25) +
    telefonMetni.slice(35, dom.TR ? 161 : 173), dom.TR ? "İmzala" : "Sign"
  );

  /** @const {!Promise<!did.DecryptedSections>} */
  const açıkTcktSözü = verifyProofs(açıkTckt, OnaylamaAnahtarları);

  şifreleDüğmesi.onclick = () => {
    /** @const {!Promise<!eth.ERC721Unlockable>} */
    const unlockableNFTSözü = açıkTcktSözü.then((açıkTckt) => {
      const { metadata, bölümler } = metadataVeBölümler(Cüzdan.ağ());
      return toUnlockableNFT(
        metadata,
        açıkTckt,
        bölümler,
        Cüzdan.bağlantı(),
        adres)
    }).then((/** @type {!eth.ERC721Unlockable} */ unlockableNFT) => {
      Telefon.kutuKapat();
      şifreleDüğmesi.innerText = dom.TR ? "TCKT’nizi şifreledik ✓" : "We encrypted your TCKT ✓";
      şifreleDüğmesi.classList.remove("act");
      Tckt.yüzGöster(false);
      dom.düğmeDurdur(şifreleDüğmesi);
      şifrele.classList.add("done");
      İmeceİptal.göster();
      return unlockableNFT;
    });

    /** @const {!Promise<string>} */
    const cidSözü = Promise.all([network.getNodes(1), unlockableNFTSözü])
      .then(([
        /** @type {!Array<string>} */ nodelar,
        /** @type {!eth.ERC721Unlockable} */ unlockableNFT
      ]) => ipfs.yaz("//" + nodelar[0], JSON.stringify(unlockableNFT, null, 2), "application/json"))
      .then(hex);

    İmeceİptal.kurVe(
      (adresAğırlığı, eşik) => öde(cidSözü, adresAğırlığı, eşik));
  }
}

const bağlaAdımı = () => {
  /** @const {!Element} */
  const kök = /** @type {!Element} */(dom.adla("al1"));
  /** @const {!Element} */
  const düğme = /** @type {!Element} */(dom.adla("al1a"));
  düğme.onclick = Cüzdan.aç;

  Cüzdan.adresDeğişince((adres) => {
    Telefon.adresGir(adres);
    if (adres) {
      düğme.innerText = dom.TR ? "Cüzdan bağlandı ✓" : "Wallet connected ✓";
      düğme.classList.remove("act");
      dom.düğmeDurdur(düğme);
      kök.classList.add("done");
      Tanışma.açıkTcktAlVe(adres.toLowerCase(), tcktYarat);
    }
  });
}

Cüzdan.bağlantıDeğişince((bağlantı) =>
  TCKT.setProvider(/** @type {!eth.Provider} */(bağlantı.provider)));

bağlaAdımı();
