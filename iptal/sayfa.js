/**
 * @fileoverview İptal sayfası giriş noktası
 */
import Cüzdan from "/birim/cüzdan/birim";
import "/birim/dil/birim";
import KPass from "/lib/ethereum/KPass";
import dom from "/lib/util/dom";

/** @const {!Element} */
const KiminKutusu = dom.adla("ipssc");
/** @const {!Element} */
const BenDüğmesi = dom.adla("ipbtna");
/** @const {!Element} */
const BaşkasıDüğmesi = dom.adla("ipbtnb");
/** @const {!Element} */
const KimKutusu = dom.adla("ipiic");
/** @const {!Element} */
const AdresKutusu = dom.adla("iptac");

Cüzdan.bağlantıDeğişince((bağlantı) =>
  KPass.setProvider(/** @type {!eth.Provider} */(bağlantı.provider)));

BaşkasıDüğmesi.onclick = () => {
  revokeeAdımınıGöster();
  Cüzdan.ağDeğişince(revokeeAdımınıGöster);
}

const revokeeAdımınıGöster = () => {
  /** @type {?Element} */
  let seçilmişAdres = null;
  KiminKutusu.classList.add("done");
  BenDüğmesi.classList.remove("act");
  BaşkasıDüğmesi.classList.remove("act");
  dom.gizle(AdresKutusu);
  dom.göster(KimKutusu);

  /** @const {!HTMLAnchorElement} */
  const onaylaDüğmesi = /** @type {!HTMLAnchorElement} */(dom.adla("ipiio"));

  const onaylaDüğmesiDüzelt = () => {
    onaylaDüğmesi.classList.add("act");
    onaylaDüğmesi.classList.remove("dis");
    onaylaDüğmesi.innerText = dom.TR ? "Onayla" : "Confirm";
  }

  onaylaDüğmesiDüzelt();

  const hataMesajınıKapat = () => {
    dom.adlaGizle("ipmc");
    dom.adlaGizle("iphm");
    dom.adlaGizle("ipaym");
  }

  const revokeeAdresAra = () => {
    dom.adlaGizle("ipiilc");
    hataMesajınıKapat();
    let innerHTML = "";
    const ul = dom.adla("ipiil");
    dom.adlaGöster("iplc"); // Yükleniyor animasyonu
    const timer = setTimeout(() => {
      dom.adlaGizle("iplc");
      dom.adlaGöster("ipmc");
      dom.adla("iphm").innerText = dom.TR ?
        "İstek zaman aşımına uğradı." :
        "Request timed out.";
      dom.adlaGöster("iphm");
      onaylaDüğmesi.innerText = dom.TR ? "Tekrar Dene" : "Retry";
      onaylaDüğmesi.onclick = () => {
        clearTimeout(timer);
        revokeeAdımınıGöster();
      }
    }, 2000)
    KPass.getRevokeeAddresses(Cüzdan.ağ(), /** @type {string} */(Cüzdan.adres()))
      .then((data) => {
        const filtered = data.map((element) => "0x" + element.topics[1].slice(26));
        clearTimeout(timer);
        if (filtered.length == 0) {
          dom.adlaGöster("ipmc");
          dom.adlaGöster("ipaym");
          dom.adlaGizle("iplc");
          dom.adlaGizle("iphm");
          dom.düğmeDurdur(onaylaDüğmesi);
          onaylaDüğmesi.classList.remove("act");
        } else {
          for (let i = 0; i < filtered.length; ++i) {
            innerHTML += `<li id=ipiia${i} class="ipiia">${filtered[i]}</li>`
          }
          ul.onclick = (e) => {
            let li = e.target;
            if (seçilmişAdres) seçilmişAdres.classList.remove("sel");
            li.classList.add("sel");
            seçilmişAdres = li;
          }
          ul.innerHTML = innerHTML;
          dom.adlaGöster("ipiilc");
          dom.adlaGizle("iplc");
          hataMesajınıKapat();
          onaylaDüğmesiDüzelt();
        }
      }).catch((e) => {
        clearTimeout(timer);
        dom.adlaGöster("ipmc");
        dom.adlaGöster("iphm");
        onaylaDüğmesi.innerText = dom.TR ? "Tekrar Dene" : "Retry";
        onaylaDüğmesi.onclick = () => {
          revokeeAdımınıGöster();
        }
      })
  }

  revokeeAdresAra();

  onaylaDüğmesi.onclick = () => {
    if (seçilmişAdres) {
      KPass.revokeFriend(
        Cüzdan.ağ(),
        /** @type {string} */(Cüzdan.adres()), seçilmişAdres.innerText);
      onaylaDüğmesi.innerText = dom.TR ? "Adres İptal Edildi ✓" : "Address revoked ✓";
      dom.adla("ipiir").innerText = dom.TR ? "Geri" : "Back";
      dom.düğmeDurdur(onaylaDüğmesi);
      onaylaDüğmesi.classList.remove("act");
    }
  }

  dom.adla("ipiir").onclick = () => {
    KiminKutusu.classList.remove("done");
    dom.gizle(KimKutusu);
    BenDüğmesi.classList.add("act");
    BaşkasıDüğmesi.classList.add("act");
  }
}

BenDüğmesi.onclick = () => {
  KiminKutusu.classList.add("done");
  BenDüğmesi.classList.remove("act");
  BaşkasıDüğmesi.classList.remove("act");
  dom.gizle(KimKutusu);
  dom.göster(AdresKutusu);

  dom.adla("ip1a").onclick = () => {
    dom.gizle(AdresKutusu);
    dom.adlaGöster("iptaic");

    dom.adla("ip1c").onclick = () => {
      const adres = /** @type {string} */(Cüzdan.adres());
      KPass.revoke(Cüzdan.ağ(), adres).catch(console.log);
    }

    dom.adla("ip1d").onclick = () => {
      dom.adlaGizle("iptaic");
      dom.göster(AdresKutusu);
    }
  }
}
