import {
  Adres,
  AnaEkran,
  DüğmeliNft,
  Kutu,
  NftDüğmesi
} from "./birim.jsx";
import KPass from "/birim/kpass/birim";
import dom from "/lib/util/dom";

/**
 * @param {?string} adres Telefonda gösterilecek adres.
 */
const adresGir = (adres = "0xcCc0cCc") =>
  Adres.innerText = adres.slice(0, 6) + "..." + adres.slice(-4);

/**
 * @param {string} metin İletişim kutusunda gösterilecek metin.
 * @param {string=} sağDüğme
 */
const kutuGöster = (metin, sağDüğme) => {
  if (sağDüğme) dom.adla("tey").innerText = sağDüğme;
  Kutu.style.opacity = "";
  Kutu.firstElementChild.innerText = metin;
  Kutu.classList.add("teg");
  AnaEkran.classList.add("tem");
  DüğmeliNft.classList.add("tem");
}

/**
 * Telefondaki iletişim kutusunu kapatır.
 */
const kutuKapat = () => {
  Kutu.classList.remove("teg");
  DüğmeliNft.classList.remove("tem");
  AnaEkran.classList.remove("tem");
}

/**
 * Ana sayfa Telefon görselinin içinde temsili nft'yi gösterir.
 *
 * @param {boolean} kutudaGöster NFT tek başına kutuda gösterilsin mi.
 * @param {boolean} bilgiYüzü NFT'nin bilgi yüzü gösterilsin.
 */
const nftGöster = (kutudaGöster, bilgiYüzü) => {
  KPass.yüzGöster(bilgiYüzü);

  const yüzGöster = () => {
    KPass.yüzGöster(bilgiYüzü);
    NftDüğmesi.innerText = bilgiYüzü
      ? dom.i18n({ tr: "Gizle", en: "Encrypt" })
      : dom.i18n({ tr: "Aç", en: "Decrypt" });
  }
  yüzGöster();
  if (kutudaGöster) {
    KPass.Kök.style.opacity = "";
    dom.göster(NftDüğmesi);
    NftDüğmesi.onclick ||= () => {
      bilgiYüzü = !bilgiYüzü;
      yüzGöster();
    }
  }

  KPass.Kök.classList.toggle("tew", !kutudaGöster);
  NftDüğmesi.classList.toggle("teg", kutudaGöster);
}

const nftGeriAl = () => {
  KPass.Kök.classList.add("tex");
  nftGöster(true, false);
}

export default {
  adresGir,
  kutuGöster,
  kutuKapat,
  nftGöster,
  nftGeriAl,
};
