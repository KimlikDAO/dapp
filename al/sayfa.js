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
      }).catch(console.log);
    }
  }
}

/**
 * @param {Promise<string>} açıkTCKTSözü
 */
const tcktYarat = (açıkTCKTSözü) => {
  açıkAnahtarAlVe((açıkAnahtar) => {
    İmeceİptal.göster();
    /** @const {Promise<string>} */
    const cidSözü = açıkTCKTSözü.then((açıkTCKT) => {
      const encoder = new TextEncoder();
      const gizlenecek = new Uint8Array(1000);
      encoder.encodeInto(TCKT_ADDR, gizlenecek);
      gizlenecek[42] = 10;
      encoder.encodeInto(açıkTCKT, gizlenecek.subarray(43));
      const [nonce, ephemPubKey, ciphertext] = kutula(açıkAnahtar, gizlenecek);

      const TCKTData = {
        name: "TCKT",
        description: "KimlikDAO TC Kimlik Tokeni",
        image: KIMLIKDAO_URL + "/TCKT.svg",
        external_url: KIMLIKDAO_URL,
        animation_url: KIMLIKDAO_URL + "/TCKT.mp4",
        unlockable: {
          user_prompt: {
            "en-US": ["{1} wants to view your TCKT.", "OK", "Reject"],
            "tr-TR": ["{1} TCKT'nizi istiyor. İzin veriyor musunuz?", "Evet", "Hayır"]
          },
          algorithm: "x25519-xsalsa20-poly1305",
          nonce: nonce,
          ephem_pub_key: ephemPubKey,
          ciphertext: ciphertext
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
    s1a.style.display = "none";
    dom.adla("s1").classList.add("done");
    Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres));
    Tanışma.açıkTcktAlVe(tcktYarat);
  });
  Cüzdan.adresDeğişince(() => location.reload());
  Cüzdan.kopunca(() => location.reload());
}
