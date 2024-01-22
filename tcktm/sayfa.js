/**
 * @fileoverview İncele sayfası giriş noktası
 *
 */
import { roleRequestChallenge } from "./discord.js";
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import Tckt from "/birim/tckt/birim";
import { ChainId } from "/lib/crosschain/chainId";
import { Provider } from "/lib/crosschain/provider";
import { Signer } from "/lib/crosschain/signer";
import { fromUnlockableNFT } from "/lib/did/decryptedSections";
import TCKT from "/lib/ethereum/TCKT";
import evm from "/lib/ethereum/evm";
import dom from "/lib/util/dom";
import {
  eşikKutusuGöster,
  imeceİptalKutusuGöster,
  silKutusuGöster
} from "/tcktm/pencere/birim";

/** @const {!Element} */
const DiscordDüğmesi = /** @const {!Element} */(dom.adla("inbtn0"));
/** @const {!Element} */
const İmeceİptalDüğmesi = /** @const {!Element} */(dom.adla("inbtn1"));
/** @const {!Element} */
const EşikAzaltmaDüğmesi = /** @const {!Element} */(dom.adla("inbtn2"));
/** @const {!Element} */
const SilDüğmesi = /** @const {!Element} */(dom.adla("inbtn3"));
/** @const {!Element} */
const AçDüğmesi = /** @const {!Element} */(dom.adla("intcktb"));
/** @const {!Element} */
const TcktYok = /** @const {!Element} */(dom.adla("inn"));

/** @const {!Object<string, !did.DecryptedSections>} */
const Bellek = {};

/**
 * @param {!did.DecryptedSections} açıkTckt
 */
const açıkYüzGöster = (açıkTckt) => {
  Tckt.açıkTcktGöster(açıkTckt);
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
  Tckt.yüzGöster(false);
  AçDüğmesi.innerText = dom.TR ? "Aç" : "Unlock";

  /** @const {!did.DecryptedSections} */
  const bellektenTckt = Bellek[ağ + adres];
  AçDüğmesi.onclick = bellektenTckt
    ? () => açıkYüzGöster(bellektenTckt)
    : () => DosyaSözü
      .then((dosya) => fromUnlockableNFT(dosya,
        ["personInfo", "contactInfo", "addressInfo", "kütükBilgileri"],
        bağlantı,
        adres
      ))
      .then((açıkTckt) => {
        Bellek[ağ + adres] = açıkTckt;
        açıkYüzGöster(açıkTckt);
      })
      .catch(() => console.log);
}

let DiscordDüğmesiMetni;

const discordRolüAl = () => {
  window.onmessage = (event) => {
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
    const role = "TCKT HOLDER";
    imzacı.signMessage(roleRequestChallenge(discordID, role, dom.TR), adres)
      .then((signature) => fetch("//discord.kimlikdao.org", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(/** @type {!discord.RoleRequest} */({
          discordID,
          role: "TCKT HOLDER",
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
const tcktDeğişti = (_, dosyaSözü) => {
  /** @const {boolean} */
  const tcktVar = dosyaSözü != null;
  DosyaSözü = dosyaSözü;

  DiscordDüğmesi.onclick = tcktVar ? discordRolüAl : Cüzdan.aç;
  İmeceİptalDüğmesi.onclick = tcktVar ? imeceİptalKutusuGöster : Cüzdan.aç;
  EşikAzaltmaDüğmesi.onclick = tcktVar ? eşikKutusuGöster : Cüzdan.aç;
  SilDüğmesi.onclick = tcktVar ? () => silKutusuGöster((ağAdres) => {
    delete Bellek[ağAdres];
    kapalıYüzGöster();
  }) : Cüzdan.aç;
  dom.gösterGizle(AçDüğmesi, tcktVar);
  dom.gösterGizle(Tckt.Kök, tcktVar);
  dom.gösterGizle(TcktYok, !tcktVar);

  if (tcktVar)
    kapalıYüzGöster();
  else
    dom.gösterGizle(TcktYok.firstElementChild, Cüzdan.adres() != null);
}

tcktDeğişti("", null);

Cüzdan.tcktDeğişince(tcktDeğişti);
Cüzdan.bağlantıDeğişince((bağlantı) =>
  TCKT.setProvider(/** @type {!eth.Provider} */(bağlantı.provider)));
