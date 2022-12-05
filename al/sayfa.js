/**
 * @fileoverview Al sayfası giriş noktası
 */
import İmeceİptal from '/al/imeceİptal/birim';
import Tanışma from '/al/tanışma/birim';
import { öde } from '/al/ödeme/birim';
import Cüzdan from '/birim/cüzdan/birim';
import Telefon from '/birim/telefon/birim';
import { hazırla } from '/lib/did/TCKTVerisi';
import ipfs from '/lib/ipfs';
import dom from '/lib/util/dom';
import { hex } from '/lib/util/çevir';


const İmzaİsteğiTR = `TCKT Erişim İsteği:
-------------------------------------------------
Bu mesajı imzaladığınızda, bağlı uygulama TCKT’nizin

{}

bölümlerine erişebilecek. Bu mesajı sadece bu bilgileri paylaşmak istiyorsanız imzalayın.
`
const İmzaİsteğiEN = `TCKT Access Request:
-------------------------------------------------
When you sign this message, the connected app will have access to

{}

sections of your TCKT. Only sign this message if you would like to share this information.`

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
      const bölümler = ["personInfo", "contactInfo"];
      const satırlar = "    " + bölümler.join(",\n    ");
      const mesaj = (dom.TR
        ? İmzaİsteğiTR + "\n\n" + İmzaİsteğiEN
        : İmzaİsteğiEN + "\n\n" + İmzaİsteğiTR).replaceAll("{}", satırlar);

      ethereum.request(/** @type {!eth.Request} */({
        method: "personal_sign",
        params: [mesaj, Cüzdan.adres()]
      }));
      return;
      ethereum.request(/** @type {eth.Request} */({
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
 * @param {Promise<did.DecryptedDID>} açıkTcktSözü
 */
const tcktYarat = (açıkTcktSözü) => {
  açıkAnahtarAlVe((açıkAnahtar) => {
    İmeceİptal.göster();
    /** @const {Promise<string>} */
    const cidSözü = açıkTcktSözü
      .then((açıkTckt) => ipfs.yaz(JSON.stringify(hazırla(
        açıkAnahtar, açıkTckt, [{
          sections: ["personInfo", "contactInfo", "addressInfo", "kütükBilgileri"],
          userPrompt: {
            "en-US": ["{1} wants to view your TCKT.", "Provide", "Reject"],
            "tr-TR": ["{1} TCKT’nize erişmek istiyor. İzin veriyor musunuz?", "Evet", "Hayır"]
          },
          signPrompt: "",
        }, {
          sections: ["contactInfo", "humanID"],
          userPrompt: {
            "en-US": ["{1} wants to view your KimlikDAO HumanID, email and phone number.", "Provide", "Reject"],
            "tr-TR": ["{1} KimlikDAO HumanID, email ve telefon numaranıza erişmek istiyor. İzin veriyor musunuz?", "Evet", "Hayır"]
          },
          signPrompt: "",
        }, {
          sections: ["humanID"],
          userPrompt: {
            "en-US": ["{1} wants to view your KimlikDAO HumanID.", "Provide", "Reject"],
            "tr-TR": ["{1} KimlikDAO HumanID’nize erişmek istiyor. İzin veriyor musunuz?", "Evet", "Hayır"]
          },
          signPrompt: ""
        }
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
