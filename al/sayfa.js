/**
 * @fileoverview Al sayfası giriş noktası
 */
import { BağlaDüğmesi } from "./sayfa.jsx";
import İmeceİptal from "/al/imeceİptal/birim";
import Tanışma from "/al/tanışma/birim";
import { öde } from "/al/ödeme/birim";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import Kpass from "/birim/kpass/birim";
import Telefon from "/birim/telefon/birim";
import { ChainGroup } from "/lib/crosschain/chains";
import { checkVerifiableIDs, toUnlockableNFT } from "/lib/did/KPass";
import { VerificationKeys, metadataAndSections, signPrompt } from "/lib/did/KPassMetadata";
import KPass from "/lib/ethereum/KPass";
import ipfs from "/lib/node/ipfs";
import network from "/lib/node/network";
import dom from "/lib/util/dom";
import { hex } from "/lib/util/çevir";

/**
 * @param {string} adres
 * @param {!did.DecryptedSections} açıkKPass
 */
const kpassYarat = (adres, açıkKPass) => {
  /** @const {!Element} */
  const şifrele = dom.adla("al3");
  /** @const {!HTMLAnchorElement} */
  const şifreleDüğmesi = /** @type {!HTMLAnchorElement} */(dom.adla("al3a"));

  dom.adla("te").style.opacity = 1;
  şifrele.classList.remove("disabled");
  şifreleDüğmesi.classList.remove("disabled");

  /** @const {string} */
  const telefonMetni = signPrompt(["personInfo"]);
  Telefon.kutuGöster(telefonMetni.slice(0, dom.Lang == LangCode.TR ? 25 : 35) +
    telefonMetni.slice(35, dom.Lang == LangCode.TR ? 161 : 193), dom.i18n({ tr: "İmzala", en: "Sign" }));

  /** @const {!Promise<!did.DecryptedSections>} */
  const açıkKPassSözü = checkVerifiableIDs(açıkKPass, VerificationKeys);

  şifreleDüğmesi.onclick = () => {
    /** @const {!Promise<!eth.ERC721Unlockable>} */
    const unlockableNFTSözü = açıkKPassSözü.then((açıkKPass) => {
      const { metadata, sections } = metadataAndSections(Cüzdan.ağ());
      return toUnlockableNFT(
        metadata,
        açıkKPass,
        sections,
        Cüzdan.bağlantı(),
        adres)
    }).then((/** @type {!eth.ERC721Unlockable} */ unlockableNFT) => {
      Telefon.kutuKapat();
      şifreleDüğmesi.innerText = dom.i18n({ tr: "KPass’inizi şifreledik ✓", en: "We encrypted your KPass ✓" });
      şifreleDüğmesi.classList.remove("act");
      Kpass.yüzGöster(false);
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
  const kök = dom.adla("al1");
  BağlaDüğmesi.onclick = Cüzdan.aç;

  Cüzdan.adresDeğişince((adres) => {
    Telefon.adresGir(adres);
    if (!adres) return;
    BağlaDüğmesi.innerText = dom.i18n({ tr: "Cüzdan bağlandı ✓", en: "Wallet connected ✓" });
    BağlaDüğmesi.classList.remove("act");
    dom.düğmeDurdur(BağlaDüğmesi);
    kök.classList.add("done");
    Tanışma.açıkKPassAlVe(
      /** @type {ChainGroup} */(Cüzdan.ağ().slice(0, 2)), adres.toLowerCase(), kpassYarat);
  });
}

Cüzdan.bağlantıDeğişince((bağlantı) =>
  KPass.setProvider(/** @type {!eth.Provider} */(bağlantı.provider)));

bağlaAdımı();
