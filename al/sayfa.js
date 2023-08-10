/**
 * @fileoverview Al sayfası giriş noktası
 */
import İmeceİptal from "/al/imeceİptal/birim";
import Tanışma from "/al/tanışma/birim";
import { öde } from "/al/ödeme/birim";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import Telefon from "/birim/telefon/birim";
import { toUnlockableNFT, verifyProofs } from "/lib/did/decryptedSections";
import { imzaMetni, metadataVeBölümler, OnaylamaAnahtarları } from "/lib/did/TCKTVerisi";
import ipfs from "/lib/node/ipfs";
import network from "/lib/node/network";
import dom from "/lib/util/dom";
import { hex } from "/lib/util/çevir";

/**
 * @param {string} adres
 * @param {!did.DecryptedSections} açıkTckt
 */
const tcktYarat = (adres, açıkTckt) => {
  /** @const {Element} */
  const s3a = dom.adla("s3a");
  dom.adla("te").style.opacity = 1;
  dom.adla("s3").classList.remove("disabled");
  s3a.classList.remove("disabled");

  /** @const {string} */
  const telefonMetni = imzaMetni(["personInfo"]);
  Telefon.kutuGöster(telefonMetni.slice(0, 25) +
    telefonMetni.slice(35, dom.TR ? 161 : 173), dom.TR ? "İmzala" : "Sign"
  );

  /** @const {!Promise<!did.DecryptedSections>} */
  const açıkTcktSözü = verifyProofs(açıkTckt, OnaylamaAnahtarları);

  s3a.onclick = () => {
    /** @const {!Promise<!eth.ERC721Unlockable>} */
    const unlockableNFTSözü = açıkTcktSözü.then((açıkTckt) => {
      const { metadata, bölümler } = metadataVeBölümler(Cüzdan.ağ());
      return toUnlockableNFT(
        metadata,
        açıkTckt,
        bölümler,
        ethereum,
        adres)
    }).then((/** @type {!eth.ERC721Unlockable} */ unlockableNFT) => {
      Telefon.kutuKapat();
      s3a.innerText = dom.TR ? "TCKT’nizi şifreledik ✓" : "We encrypted your TCKT ✓";
      s3a.classList.remove("act");
      dom.düğmeDurdur(s3a);
      dom.adla("s3").classList.add("done");
      İmeceİptal.göster();
      return unlockableNFT;
    });

    /** @const {!Promise<string>} */
    const cidSözü = Promise.all([network.getNodes(1), unlockableNFTSözü])
      .then(([
        /** @type {!Array<string>} */ nodelar,
        /** @type {!eth.ERC721Unlockable} */ unlockableNFT
      ]) => ipfs.yaz("//" + nodelar[0], JSON.stringify(unlockableNFT, null, 2)))
      .then(hex);

    İmeceİptal.kurVe(
      (adresAğırlığı, eşik) => öde(cidSözü, adresAğırlığı, eşik));
  }
}

Telefon.nftYukarıGönder();

const bağlaAdımı = () => {
  /** @const {Element} */
  const düğme = dom.adla("al1a");
  düğme.onclick = Cüzdan.aç;

  Cüzdan.adresDeğişince((adres) => {
    Telefon.adresGir(adres);
    if (adres) {
      düğme.innerText = dom.TR ? "Cüzdan bağlandı ✓" : "Wallet connected ✓";
      düğme.classList.remove("act");
      dom.düğmeDurdur(düğme);
      dom.adla("al1").classList.add("done");
      Tanışma.açıkTcktAlVe(adres.toLowerCase(), tcktYarat);
    }
  })
}

bağlaAdımı();
