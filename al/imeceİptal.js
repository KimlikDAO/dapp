import dom from "/lib/dom";
import evm from "/lib/evm";

/**
 * Kurtarma adresleri basamağında kullanılan girdiler için sayaç
 * @type {number}
 */
let InputIdSayaç = 3;

async function imeceİptalKur() {
  return [{}, 0];

  // dom.adla("s4a").onclick = async () => göster();
  /*dom.adla("s4b").onclick = async () => {
    dom.adla("s4b").innerText = "İmece iptal kurulmadı 🤌";
    dom.adla("sr").classList.add("invisible");
    ödemeAdımınaGeç(cidSözü);
  }*/

  dom.adla("sr").classList.remove("invisible");

  for (let /** number */ i = 0; i < InputIdSayaç; ++i) {
    dom.adla("sr:a" + i).onblur = adresBlurOlunca;
    dom.adla("sr:w" + i).onblur = ağırlıkHesapla;
  }
  dom.adla("s4c").onclick = girdiAlanıEkle;
  dom.adla("s4d").onclick = girdiAlanıÇıkar;
  dom.adla("sr:t").onblur = eşikDeğeriBlurOlunca;
  dom.adla("s4e").onclick = async () => {
    /** @type {!Object<string, number>} */
    let adresAğırlığı = {};
    /** @type {boolean} */
    let geçerli = true;
    /** @type {number} */
    let toplamAğırlık = 0;

    for (let /** number */ i = 0; i < InputIdSayaç; ++i) {
      const adres = dom.adla("sr:a" + i).value;
      if (!evm.adresGeçerli(adres) || adres in adresAğırlığı) {
        geçerli = false;
        console.log("hatalı girdi", i);
        // TODO(MuhammetCoskun): hata bildir kırmızi vs.
      }
      /** @type {number} */
      const ağırlık = parseInt(dom.adla("sr:w" + i).value);
      adresAğırlığı[adres] = ağırlık;
      toplamAğırlık += ağırlık;
    }
    /** @type {number} */
    const eşikDeğeri = parseInt(dom.adla("sr:t").value);
    if (toplamAğırlık < eşikDeğeri) {
      geçerli = false;
      // TODO(MuhammetCoskun): hata bildir
    }
    if (geçerli) {
      dom.adla("s4a").innerHTML = "İmece iptal kuruldu 👍";
      dom.adla("sr").classList.add("invisible");
      dom.adla("s4").classList.add("done");
      dom.adla("s4b").style.display = "none";
      dom.adla("s4a").onclick = null;
      //ödemeAdımınaGeç(cidSözü, adresAğırlığı, eşikDeğeri);
    }
  };
  dom.adla("s4f").onclick = () => {
    dom.adla("sr").classList.add("invisible");
  };
}

async function girdiAlanıEkle() {
  const div = document.createElement("div");
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  div.id = "sr:c" + InputIdSayaç;
  div.classList.add("container");
  input1.id = "sr:a" + InputIdSayaç;
  input1.classList.add("address-input");
  input1.type = "text";
  input1.onblur = adresBlurOlunca;
  input2.id = "sr:w" + InputIdSayaç;
  input2.classList.add("weight-input");
  input2.type = "number";
  input2.onblur = ağırlıkHesapla;
  input2.value = 1;
  div.appendChild(input1);
  div.appendChild(input2);
  dom.adla("sr:f").insertBefore(div, dom.adla("br"));
  InputIdSayaç += 1;
  ağırlıkHesapla();
  console.log("clicked +")
}

function girdiAlanıÇıkar() {
  InputIdSayaç -= 1;
  dom.adla("sr:c" + InputIdSayaç).remove();
  ağırlıkHesapla();
  console.log("clicked -")
}

function eşikDeğeriGecerliMi(değer) {
  const toplamAğırlık = dom.adla("sr:s").value;
  return toplamAğırlık >= değer;
}

function eşikDeğeriBlurOlunca(event) {
  eşikDeğeriGecerliMi(event.target.value);
}

function adresBlurOlunca(event) {
  const yeni = evm.adresDüzelt(event.target.value);
  if (yeni) event.target.value = yeni;
  else console.log("oha"); // TODO(MuhammetCoskun): Arabirimde hata göster
}

function ağırlıkHesapla() {
  /** @type {number} */
  let total = 0;
  for (let /** number */ i = 0; i < InputIdSayaç; ++i) {
    total += parseInt(dom.adla("sr:w" + i).value);
  }
  dom.adla("sr:s").value = total;
}

export { imeceİptalKur };
