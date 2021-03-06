/**
 * @fileoverview Al sayfası giriş noktası
 *
 */
import İmeceİptal from '/al/imeceİptal/birim';
import { öde } from '/al/ödeme/birim';
import Cüzdan from '/birim/cüzdan/birim';
import Telefon from '/birim/telefon/birim';
import dom from '/lib/dom';
import { encrypt } from '/lib/encrypt';
import ipfs from '/lib/ipfs';
import { base64, hex } from '/lib/çevir';

/** @const {string} */
const KIMLIK_AS_URL = "https://mock-api.kimlikas.com";
/**
 * @const {string}
 * @noinline
 */
const KIMLIK_DAO_URL = "https://kimlikdao.org";

/**
 * Verilen bir `hesap` için `rasgele` bitdizisi ile kriptografik taahhüt
 * oluşturur.
 * 
 * @param {string} hesap EVM adresi.
 * @param {!Uint8Array} rasgele bitdizisi.
 * @return {Promise<string>} Kriptografik taahhüt.
 */
const taahhütOluştur = (hesap, rasgele) => {
  /** @type {!Uint8Array} */
  let concat = new Uint8Array(32 + 20);
  concat.set(rasgele, 0);

  for (let /** number */ i = 1; i <= 20; ++i)
    concat[i + 31] = parseInt(hesap.substring(2 * i, 2 * i + 2), 16);

  return crypto.subtle.digest("SHA-256", concat).then(base64);
}

const TCKTYarat = () => {
  /**
   * Pedersen taahhüdü için rasgele bitdizisi.
   * @type {!Uint8Array}
   */
  let Rasgele = new Uint8Array(32);
  crypto.getRandomValues(Rasgele);

  /** @type {URLSearchParams} */
  const params = new URLSearchParams(location.search);
  /** @type {?string} */
  const code = params.get("code");
  history.replaceState(null, "", location.pathname);

  const s3a = dom.adla("s3a");
  dom.adla("s3").classList.remove("disabled");
  s3a.classList.remove("disabled");

  const açıkTCKTSözü = taahhütOluştur(
    /** @type {string} */(Cüzdan.adres()), Rasgele)
    .then((taahhüt) =>
      fetch(KIMLIK_AS_URL + "?" + new URLSearchParams({ "oauth_code": code, "taahhüt": taahhüt })))
    .then((res) => res.json())
    .then((AçıkTCKT) => {
      for (let ad of "TCKN ad soyad dt annead babaad".split(" ")) {
        dom.adla(ad).innerText = AçıkTCKT[ad];
      }
      dom.adla("nft").classList.add("flipped");
      dom.adla("tefirw").classList.add("show");
      dom.adla("tebg").classList.add("whenmsg");
      const s2a = dom.adla("s2a");
      s2a.innerText = "E-devlet'ten bilgileriniz alındı ✓";
      s2a.onclick = null;
      s2a.classList.remove("act");
      s2a.classList.add("dis");
      s2a.disabled = true;
      s2a.href = "javascript:";
      dom.adla("s2").classList.add("done");
      AçıkTCKT.rasgele = base64(Rasgele);
      // TODO(KimlikDAO-bot): Kullanıcı tarafında gelen TCKT'nin fazladan veri
      // içermediğini denetle. Fazla verileri işaretleme riski yüzünden sil.
      return JSON.stringify(AçıkTCKT);
    });

  s3a.onclick = () => {
    const açıkAnahtarSözü = ethereum.request(/** @type {RequestParams} */({
      method: "eth_getEncryptionPublicKey",
      params: [Cüzdan.adres()],
    })).then((pubKey) => {
      dom.adla("tefirw").classList.remove("show");
      dom.adla("tebg").classList.remove("whenmsg");
      s3a.innerText = "Açık anahtarınızı aldık ✓";
      s3a.classList.remove("act");
      s3a.classList.add("dis");
      s3a.onclick = null;
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

if (window["ethereum"]) {
  const s1b = dom.adla("s1b");
  s1b.onclick = Cüzdan.bağla;

  Cüzdan.bağlanınca((adres) => {
    const s1a = dom.adla("s1a");
    s1b.innerText += "ndı ✓";
    s1b.onclick = null;
    s1b.disabled = true;
    s1b.classList.remove("act");
    s1b.classList.add("dis");

    s1a.style.display = "none";
    dom.adla("s1").classList.add("done");
    dom.adla("s2").classList.remove("disabled");
    dom.adla("s2a").classList.remove("disabled");
    Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres));

    if (!location.search) {
      dom.adla("s2a").classList.add("act");
    } else {
      TCKTYarat();
    }
  });

  // İleride cüzdan adresi değiştiğinde kullanıcıya tekrar bilgileri
  // girdirmek yerine arka planda tekrar KimlikAS requesti yollayacağız.
  // Şimdilik kolaylık adına sadece sayfayı yeniliyoruz.
  Cüzdan.adresDeğişince(() => location.reload());
  Cüzdan.kopunca(() => location.reload());
}
