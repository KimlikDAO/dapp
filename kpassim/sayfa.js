/**
 * @fileoverview İncele sayfası giriş noktası
 *
 */
import "./discord.d";
import { roleRequestChallenge } from "./discord.js";
import {
  AçDüğmesi,
  DiscordDüğmesi,
  EşikAzaltmaDüğmesi,
  İmeceİptalDüğmesi,
  KPassYok,
  SilDüğmesi
} from "./sayfa.jsx";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import Kpass from "/birim/kpass/birim";
import {
  eşikKutusuGöster,
  imeceİptalKutusuGöster,
  silKutusuGöster
} from "/kpassim/pencere/birim";
import { ChainId } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";
import { Signature } from "/lib/crosschain/signer";
import { fromUnlockableNFT } from "/lib/did/KPass";
import KPass from "/lib/ethereum/KPass";
import dom from "/lib/util/dom";


/** @const {!Object<string, !did.DecryptedSections>} */
const Bellek = {};

/**
 * @param {!did.DecryptedSections} açıkKPass
 */
const açıkYüzGöster = (açıkKPass) => {
  Kpass.açıkKPassGöster(açıkKPass);
  AçDüğmesi.innerText = dom.i18n({ tr: "Gizle", en: "Hide" });
  AçDüğmesi.onclick = kapalıYüzGöster;
}

/** @type {Promise<!eth.ERC721Unlockable>} */
let DosyaSözü;

const kapalıYüzGöster = () => {
  /**
   * @const
   * @type {ChainId}
   */
  const ağ = Cüzdan.ağ();
  /**
   * @type {!Provider}
   * @const
   */
  const bağlantı = Cüzdan.bağlantı();
  /** @const {string} */
  const adres = /** @type {string} */(Cüzdan.adres());
  Kpass.yüzGöster(false);
  AçDüğmesi.innerText = dom.i18n({ tr: "Aç", en: "Unlock" });

  /** @const {!did.DecryptedSections} */
  const bellektenKPass = Bellek[ağ + adres];
  AçDüğmesi.onclick = bellektenKPass
    ? () => açıkYüzGöster(bellektenKPass)
    : () => DosyaSözü
      .then((dosya) => fromUnlockableNFT(dosya,
        ["personInfo", "contactInfo", "addressInfo", "kütükBilgileri"],
        bağlantı,
        adres
      ))
      .then((açıkKPass) => {
        console.log("here=", açıkKPass);
        Bellek[ağ + adres] = açıkKPass;
        açıkYüzGöster(açıkKPass);
      })
      .catch(console.log);
}

/** @type {?string} */
let DiscordDüğmesiMetni;

const discordRolüAl = () => {
  window["onmessage"] = (event) => {
    if (event.origin != "https://discord.kimlikdao.org") return;
    DiscordDüğmesiMetni ||= DiscordDüğmesi.innerText;
    DiscordDüğmesi.innerText = DiscordDüğmesiMetni + " ⏳";
    /** @const {!Signer} */
    const imzacı = Cüzdan.bağlantı();
    /** @const {ChainId} */
    const ağ = Cüzdan.ağ();
    /** @const {string} */
    const adres = /** @type {string} */(Cüzdan.adres());
    /** @const {discord.SignedID} */
    const discordID = /** @type {discord.SignedID} */(event.data);
    /** @const {string} */
    const role = "KPASS HOLDER";
    imzacı.signMessage(roleRequestChallenge(discordID, role, dom.Lang), adres)
      .then((/** @type {Signature} */ signerSignature) => fetch("//discord.kimlikdao.org", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(/** @type {!discord.RoleRequest} */({
          discordID,
          role,
          chainID: ağ,
          signerSignature,
          lang: dom.Lang
        }))
      }))
      .then((res) => {
        DiscordDüğmesi.innerText = DiscordDüğmesiMetni + (res.ok ? " 👍" : " 🙀");
        if (!res.ok)
          setTimeout(() => DiscordDüğmesi.innerText = DiscordDüğmesiMetni, 2000);
        else
          dom.düğmeDurdur(DiscordDüğmesi);
      });
  };
  dom.pencere("//discord.com/api/oauth2/authorize?client_id=1068629633970487428"
    + "&redirect_uri=https://discord.kimlikdao.org"
    + "&response_type=code"
    + "&scope=identify", 500, 750);
}

/**
 * @param {?string} _
 * @param {Promise<!eth.ERC721Unlockable>} dosyaSözü
 */
const kpassDeğişti = (_, dosyaSözü) => {
  /** @const {boolean} */
  const kpassVar = dosyaSözü != null;
  DosyaSözü = dosyaSözü;

  DiscordDüğmesi.onclick = kpassVar ? discordRolüAl : Cüzdan.aç;
  İmeceİptalDüğmesi.onclick = kpassVar ? imeceİptalKutusuGöster : Cüzdan.aç;
  EşikAzaltmaDüğmesi.onclick = kpassVar ? eşikKutusuGöster : Cüzdan.aç;
  SilDüğmesi.onclick = kpassVar ? () => silKutusuGöster((ağAdres) => {
    delete Bellek[ağAdres];
    kapalıYüzGöster();
  }) : Cüzdan.aç;
  dom.gösterGizle(AçDüğmesi, kpassVar);
  dom.gösterGizle(Kpass.Kök, kpassVar);
  dom.gösterGizle(KPassYok, !kpassVar);

  if (kpassVar)
    kapalıYüzGöster();
  else
    dom.gösterGizle(KPassYok.firstElementChild, Cüzdan.adres() != null);
}

kpassDeğişti("", null);

Cüzdan.kpassDeğişince(kpassDeğişti);
Cüzdan.bağlantıDeğişince((bağlantı) =>
  KPass.setProvider(/** @type {!eth.Provider} */(bağlantı.provider)));
