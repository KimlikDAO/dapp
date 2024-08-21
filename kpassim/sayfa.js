/**
 * @fileoverview İncele sayfası giriş noktası
 *
 */
import { roleRequestChallenge } from "./discord.js";
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
import { Signer } from "/lib/crosschain/signer";
import { fromUnlockableNFT } from "/lib/did/KPass";
import KPass from "/lib/ethereum/KPass";
import evm from "/lib/ethereum/evm";
import dom from "/lib/util/dom";

/** @const {!HTMLAnchorElement} */
const DiscordDüğmesi = /** @type {!HTMLAnchorElement} */(dom.adla("inbtn0"));
/** @const {!Element} */
const İmeceİptalDüğmesi = dom.adla("inbtn1");
/** @const {!Element} */
const EşikAzaltmaDüğmesi = dom.adla("inbtn2");
/** @const {!Element} */
const SilDüğmesi = dom.adla("inbtn3");
/** @const {!Element} */
const AçDüğmesi = dom.adla("intcktb");
/** @const {!Element} */
const KpassYok = dom.adla("inn");

/** @const {!Object<string, !did.DecryptedSections>} */
const Bellek = {};

/**
 * @param {!did.DecryptedSections} açıkKPass
 */
const açıkYüzGöster = (açıkKPass) => {
  Kpass.açıkKPassGöster(açıkKPass);
  AçDüğmesi.innerText = dom.TR ? "Gizle" : "Hide";
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
  AçDüğmesi.innerText = dom.TR ? "Aç" : "Unlock";

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
        Bellek[ağ + adres] = açıkKPass;
        açıkYüzGöster(açıkKPass);
      })
      .catch(() => console.log);
}

/** @type {?string} */
let DiscordDüğmesiMetni;

const discordRolüAl = () => {
  window["onmessage"] = (event) => {
    if (event.origin != "https://discord.kimlikdao.org") return;
    DiscordDüğmesiMetni ||= DiscordDüğmesi.innerText;
    DiscordDüğmesi.innerText = DiscordDüğmesiMetni + " ⏳";
    /**
     * @const
     * @type {!Signer}
     */
    const imzacı = Cüzdan.bağlantı();
    /** @const {ChainId} */
    const ağ = Cüzdan.ağ();
    /** @const {string} */
    const adres = /** @type {string} */(Cüzdan.adres());
    /** @const {!discord.SignedID} */
    const discordID = /** @type {!discord.SignedID} */(event.data);
    /** @const {string} */
    const role = "KPASS HOLDER";
    imzacı.signMessage(roleRequestChallenge(discordID, role, dom.TR), adres)
      .then((signature) => fetch("//discord.kimlikdao.org", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(/** @type {!discord.RoleRequest} */({
          discordID,
          role,
          chainID: ağ,
          signature: evm.compactSignature(signature),
          lang: dom.TR ? "tr" : "en"
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
  const popup = window.open("//discord.com/api/oauth2/authorize?client_id=1068629633970487428"
    + "&redirect_uri=https://discord.kimlikdao.org"
    + "&response_type=code"
    + "&scope=identify", "_blank",
    "menubar=no,toolbar=no,status=no,width=500,height=650," +
    `left=${screen.width / 2 - 250},top=${screen.height / 2 - 325}`);
  if (window.focus) popup.focus();
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
  dom.gösterGizle(KpassYok, !kpassVar);

  if (kpassVar)
    kapalıYüzGöster();
  else
    dom.gösterGizle(KpassYok.firstElementChild, Cüzdan.adres() != null);
}

kpassDeğişti("", null);

Cüzdan.kpassDeğişince(kpassDeğişti);
Cüzdan.bağlantıDeğişince((bağlantı) =>
  KPass.setProvider(/** @type {!eth.Provider} */(bağlantı.provider)));
