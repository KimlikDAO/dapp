/**
 * @fileoverview Al sayfası giriş noktası
 */
import İmeceİptal from '/al/imeceİptal/birim';
import Tanışma from '/al/tanışma/birim';
import { öde } from '/al/ödeme/birim';
import Cüzdan from '/birim/cüzdan/birim';
import Telefon from '/birim/telefon/birim';
import dom from '/lib/dom';
import ipfs from '/lib/ipfs';
import { hazırla } from '/lib/TCKTVerisi';
import { hex } from '/lib/çevir';

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
    const cidSözü = açıkTCKTSözü
      .then((açıkTckt) => ipfs.yaz(JSON.stringify(hazırla(
        açıkAnahtar, açıkTckt, [
        ["personInfo", "contactInfo", "kütükBilgileri", "adres"],
        ["humanID"]
      ]))))
      .then(hex)
      .catch((e) => {
        console.log(e);
        return "";
      });

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
