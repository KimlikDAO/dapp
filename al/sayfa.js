/**
 * @fileoverview Al sayfası giriş noktası
 *
 */
import İmeceİptal from '/al/imeceİptal/birim';
import Tanışma from '/al/tanışma/birim';
import { öde } from '/al/ödeme/birim';
import Cüzdan from '/birim/cüzdan/birim';
import Telefon from '/birim/telefon/birim';
import dom from '/lib/dom';
import { encrypt } from '/lib/encrypt';
import ipfs from '/lib/ipfs';
import { hex } from '/lib/çevir';

/**
 * @const {string}
 * @noinline
 */
const KIMLIK_DAO_URL = "https://kimlikdao.org";

const TCKTYarat = () => {
  const s3a = dom.adla("s3a");
  dom.adla("s3").classList.remove("disabled");
  s3a.classList.remove("disabled");

  const açıkTCKTSözü = Tanışma.tanı();

  s3a.onclick = () => {
    /** @const {Promise<string>} */
    const açıkAnahtarSözü = ethereum.request(/** @type {RequestParams} */({
      method: "eth_getEncryptionPublicKey",
      params: [Cüzdan.adres()],
    })).then((pubKey) => {
      Telefon.kutuKapat();
      s3a.innerText = "Açık anahtarınızı aldık ✓";
      s3a.classList.remove("act");
      dom.butonDurdur(s3a);
      dom.adla("s3").classList.add("done");
      İmeceİptal.göster();
      return pubKey;
    });

    /** @type {Promise<string>} */
    const cidSözü = Promise.all([açıkTCKTSözü, açıkAnahtarSözü])
      .then(([açıkTCKT, açıkAnahtar]) => {
        let gizle = new Uint8Array(1000);
        let { written } = new TextEncoder().encodeInto(açıkTCKT, gizle);
        let dolgu = new Uint8Array(1000 - written);
        crypto.getRandomValues(dolgu);
        gizle.set(dolgu, written);

        const [nonce, ephemPubKey, ciphertext] = encrypt(açıkAnahtar, gizle);

        const TCKTData = {
          name: "TCKT",
          description: "KimlikDAO TC Kimlik Tokeni",
          image: KIMLIK_DAO_URL + "/TCKT.svg",
          external_url: KIMLIK_DAO_URL,
          animation_url: KIMLIK_DAO_URL + "/TCKT.mp4",
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
      })
      .catch((e) => console.log(e + "TCKT oluşturamadık: Kullanıcı reddetti veya IPFS hatası"));

    İmeceİptal.kurVe(
      (adresAğırlığı, eşik) => öde(cidSözü, adresAğırlığı, eşik));
  };
}

Telefon.nftYukarıGönder();

if (window["ethereum"]) {
  /** @const {Element} */
  const s1b = dom.adla("s1b");
  s1b.onclick = Cüzdan.bağla;

  Cüzdan.bağlanınca((adres) => {
    const s1a = dom.adla("s1a");
    s1b.innerText = "Cüzdan bağlandı ✓";
    s1b.classList.remove("act");
    dom.butonDurdur(s1b);
    s1a.style.display = "none";
    dom.adla("s1").classList.add("done");

    Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres));
    Tanışma.göster();

    if (location.search)
      TCKTYarat();
  });

  // İleride cüzdan adresi değiştiğinde kullanıcıya tekrar bilgileri
  // girdirmek yerine arka planda tekrar KimlikAS requesti yollayacağız.
  // Şimdilik kolaylık adına sadece sayfayı yeniliyoruz.
  Cüzdan.adresDeğişince(() => location.reload());
  Cüzdan.kopunca(() => location.reload());
}
