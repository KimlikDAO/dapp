/**
 * @fileoverview Al sayfası giriş noktası
 */
import "/birim/dil/birim";
import { hex } from "/lib/util/çevir";
import { imzaMetni, metadataVeBölümler, OnaylamaAnahtarları } from "/lib/did/TCKTVerisi";
import { öde } from "/al/ödeme/birim";
import { toUnlockableNFT, verifyProofs } from "/lib/did/decryptedSections";
import Cüzdan from "/birim/cüzdan/birim";
import dom from "/lib/util/dom";
import İmeceİptal from "/al/imeceİptal/birim";
import ipfs from "/lib/node/ipfs";
import network from "/lib/node/network";
import Tanışma from "/al/tanışma/birim";
import Telefon from "/birim/telefon/birim";

/**
 * @param {!did.DecryptedSections} açıkTckt
 */
const tcktYarat = (açıkTckt) => {
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
        /** @type {string} */(Cüzdan.adres())
      )
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
      ]) => ipfs.yaz(
        `https://${nodelar[0]}/`, JSON.stringify(unlockableNFT, null, 2)))
      .then(hex);

    İmeceİptal.kurVe(
      (adresAğırlığı, eşik) => öde(cidSözü, adresAğırlığı, eşik));
  }
}

Telefon.nftYukarıGönder();
if (window["ethereum"]) {
  /** @const {Element} */
  const s1b = dom.adla("s1b");
  s1b.onclick = Cüzdan.bağla;
  s1b.innerText = dom.TR ? "Tarayıcı cüzdanı bağla" : "Connect wallet";
  s1b.target = "";
  s1b.href = "javascript:"

  Cüzdan.bağlanınca((adres) => {
    s1b.innerText = dom.TR ? "Cüzdan bağlandı ✓" : "Wallet connected ✓";
    s1b.href = "javascript:";
    s1b.target = "";
    s1b.classList.remove("act");
    dom.düğmeDurdur(s1b);
    dom.adla("s1").classList.add("done");
    Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres));
    Tanışma.açıkTcktAlVe(tcktYarat);
  });
  Cüzdan.adresDeğişince(() => location.reload());
  Cüzdan.kopunca(() => location.reload());
}
