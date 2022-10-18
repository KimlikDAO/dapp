/**
 * @fileoverview Al sayfası giriş noktası
 */
import İmeceİptal from '/al/imeceİptal/birim';
import Tanışma from '/al/tanışma/birim';
import { öde } from '/al/ödeme/birim';
import Cüzdan from '/birim/cüzdan/birim';
import Telefon from '/birim/telefon/birim';
import dom from '/lib/dom';
import { kutula } from '/lib/ed25519';
import ipfs from '/lib/ipfs';
import { TCKT_ADDR } from '/lib/TCKT';
import { hex } from '/lib/çevir';

/**
 * @const {string}
 * @noinline
 */
const KIMLIKDAO_URL = "https://kimlikdao.org";

/**
 * @param {function(string)} sonra
 */
const açıkAnahtarAlVe = (sonra) => {
  const s3a = dom.adla("s3a");
  const kapat = (açıkAnahtar) => {
    s3a.innerText = dom.TR ? "Açık anahtarınızı aldık ✓" : "We got your public key ✓";
    s3a.classList.remove("act");
    dom.butonDurdur(s3a);
    dom.adla("s3").classList.add("done");
    sonra(açıkAnahtar);
  }
  dom.adla("te").style.opacity = 1;
  dom.adla("s3").classList.remove("disabled");
  s3a.classList.remove("disabled");
  const açıkAnahtar = window.localStorage[Cüzdan.adres().toLowerCase() + "pk"];
  if (açıkAnahtar) kapat(açıkAnahtar);
  else {
    Telefon.kutuGöster(dom.TR
      ? "App cüzdanınızın açık anahtarına ulaşmak istiyor. İzin veriyor musunuz?"
      : "This website would like your public encryption key."
    );
    s3a.onclick = () => {
      ethereum.request(/** @type {RequestParams} */({
        method: "eth_getEncryptionPublicKey",
        params: [Cüzdan.adres()],
      })).then((açıkAnahtar) => {
        window.localStorage[Cüzdan.adres().toLowerCase() + "pk"] = açıkAnahtar;
        Telefon.kutuKapat();
        kapat(açıkAnahtar);
      }).catch((e) => {
        if (e.code == -32603) dom.adlaGöster("s3er");
        console.log(e);
      });
    }
  }
}

/**
 * @param {Promise<AçıkTCKT>} açıkTCKTSözü
 */
const tcktYarat = (açıkTCKTSözü) => {
  açıkAnahtarAlVe((açıkAnahtar) => {
    İmeceİptal.göster();
    /** @const {Promise<string>} */
    const cidSözü = açıkTCKTSözü.then((açıkTCKT) => {
      const encoder = new TextEncoder();
      const açıkKimlik = new Uint8Array(1024);
      const açıkHumanID = new Uint8Array(256);
      encoder.encodeInto(TCKT_ADDR, açıkKimlik);
      açıkKimlik[42] = 10;
      açıkHumanID.set(açıkKimlik.subarray(0, 43))

      encoder.encodeInto(
        JSON.stringify(açıkTCKT["HumanID('public')"], null, 2),
        açıkKimlik.subarray(43));
      delete açıkTCKT["HumanID('public')"];
      encoder.encodeInto(
        JSON.stringify(açıkTCKT, null, 2),
        açıkHumanID.subarray(43));
      const [gizliKimlikN, gizliKimlikK, gizliKimlik] = kutula(açıkAnahtar, açıkKimlik);
      const [gizliHumanIDN, gizliHumanIDK, gizliHumanID] = kutula(açıkAnahtar, açıkHumanID);

      const TCKTData = {
        name: "TCKT",
        description: "KimlikDAO TC Kimlik Tokeni",
        image: KIMLIKDAO_URL + "/TCKT.svg",
        external_url: KIMLIKDAO_URL,
        animation_url: KIMLIKDAO_URL + "/TCKT.mp4",
        unlockables: {
          "ID Card": {
            user_prompt: {
              "en-US": ["{1} wants to view your TCKT.", "Provide", "Reject"],
              "tr-TR": ["{1} TCKT’nize erişmek istiyor. İzin veriyor musunuz?", "Evet", "Hayır"]
            },
            algorithm: "x25519-xsalsa20-poly1305",
            nonce: gizliKimlikN,
            ephem_pub_key: gizliKimlikK,
            ciphertext: gizliKimlik
          }
        },
        "HumanID('public')": {
          user_prompt: {
            "en-US": ["{1} wants to view your KimlikDAO HumanID.", "Provide", "Reject"],
            "tr-TR": ["{1} KimlikDAO HumanID’nize erişmek istiyor. İzin veriyor musunuz?", "Evet", "Hayır"]
          },
          algorithm: "x25519-xsalsa20-poly1305",
          nonce: gizliHumanIDN,
          ephem_pub_key: gizliHumanIDK,
          ciphertext: gizliHumanID
        }
      }
      return ipfs.yaz(JSON.stringify(TCKTData)).then(hex);
    }).catch(console.log);

    İmeceİptal.kurVe(
      (adresAğırlığı, eşik) => öde(cidSözü, adresAğırlığı, eşik));
  });
}

Telefon.nftYukarıGönder();
if (window["ethereum"]) {
  /** @const {Element} */
  const s1b = dom.adla("s1b");
  s1b.onclick = Cüzdan.bağla;

  Cüzdan.bağlanınca((adres) => {
    /** @const {Element} */
    const s1a = dom.adla("s1a");
    s1b.innerText = dom.TR ? "Cüzdan bağlandı ✓" : "Wallet connected ✓";
    s1b.href = "javascript:";
    s1b.target = "";
    s1b.classList.remove("act");
    dom.butonDurdur(s1b);
    dom.gizle(s1a);
    dom.adla("s1").classList.add("done");
    Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres));
    Tanışma.açıkTcktAlVe(tcktYarat);
  });
  Cüzdan.adresDeğişince(() => location.reload());
  Cüzdan.kopunca(() => location.reload());
}
