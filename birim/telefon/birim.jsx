import Css from "./birim.css";
import KPass from "/birim/kpass/birim";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
const Adres = dom.div(Css.Adres);
/** @const {!HTMLDivElement} */
const AnaEkran = dom.div(Css.AnaEkran);
/** @const {!HTMLDivElement} */
const DüğmeliNft = dom.div(Css.DüğmeliNft);
/** @const {!HTMLDivElement} */
const Kutu = dom.div(Css.Kutu);
/** @const {!HTMLDivElement} */
const NftDüğmesi = dom.div(Css.NftDüğmesi);
/** @const {!HTMLDivElement} */
const Evet = dom.div(Css.Evet);

/**
 * @param {{ kpassli: boolean, noshow: boolean }=} props
 * @return {Promise<string>}
 */
const Telefon = ({ kpassli = true, noshow }) => {
  return (
    <div id={Css.Kök} noshow={noshow}>
      <Css />
      <AnaEkran>
        <div id={Css.Bakiye}>$1523.74</div>
        <div id={Css.HesapAdı}>KimlikDAO</div>
        <Adres>0xcCc0...0cCc</Adres>
        <div id={Css.CüzdanSekmeler}>
          <div id={Css.Tokenler}>{{ en: "Tokens", tr: "Tokenler" }}</div>
          <div id={Css.Nftler}>{{ en: "NFTs", tr: "NFT’ler" }}</div>
        </div>
        <div id={Css.NftGaleri}>
          <div class={Css.NftÖrnek} />
        </div>
      </AnaEkran >
      <DüğmeliNft>
        {kpassli && <KPass />}
        <NftDüğmesi nodisplay>{{ en: "Hide", tr: "Gizle" }}</NftDüğmesi>
      </DüğmeliNft>
      <Kutu noshow>
        <div id={Css.KutuMetni} />
        <div id={Css.KutuDüğmeleri}>
          <div id={Css.Hayır}>{{ en: "Cancel", tr: "Hayır" }}</div>
          <Evet>{{ en: "Provide", tr: "Evet" }}</Evet>
        </div>
      </Kutu>
    </div >
  );
}

/**
 * @param {?string} adres Telefonda gösterilecek adres.
 */
Telefon.adresGir = (adres = "0xcCc0cCc") =>
  Adres.innerText = adres.slice(0, 6) + "..." + adres.slice(-4);

/**
 * @param {string} metin İletişim kutusunda gösterilecek metin.
 * @param {string=} sağDüğme
 */
Telefon.kutuGöster = (metin, sağDüğme) => {
  if (sağDüğme) Evet.innerText = sağDüğme;
  Kutu.style.opacity = "";
  Kutu.firstElementChild.innerText = metin;
  Kutu.classList.add(Css.Göster);
  AnaEkran.classList.add(Css.Blurred);
  DüğmeliNft.classList.add(Css.Blurred);
}

/**
 * Telefondaki iletişim kutusunu kapatır.
 */
Telefon.kutuKapat = () => {
  Kutu.classList.remove(Css.Göster);
  DüğmeliNft.classList.remove(Css.Blurred);
  AnaEkran.classList.remove(Css.Blurred);
}

/**
 * Ana sayfa Telefon görselinin içinde temsili nft'yi gösterir.
 *
 * @param {boolean} büyükGöster NFT tek başına kutuda gösterilsin mi.
 * @param {boolean} bilgiYüzü NFT'nin bilgi yüzü gösterilsin.
 */
Telefon.nftGöster = (büyükGöster, bilgiYüzü) => {
  KPass.yüzGöster(bilgiYüzü);

  const yüzGöster = () => {
    KPass.yüzGöster(bilgiYüzü);
    NftDüğmesi.innerText = bilgiYüzü
      ? dom.i18n({ tr: "Gizle", en: "Encrypt" })
      : dom.i18n({ tr: "Aç", en: "Decrypt" });
  }
  yüzGöster();
  if (büyükGöster) {
    KPass.Kök.style.opacity = "";
    dom.göster(NftDüğmesi);
    NftDüğmesi.onclick ||= () => {
      bilgiYüzü = !bilgiYüzü;
      yüzGöster();
    }
  }
  KPass.Kök.classList.toggle(Css.BüyükGöster, !büyükGöster);
  NftDüğmesi.classList.toggle(Css.Göster, büyükGöster);
}

/**
 * Telefon görselinde temsili nft'yi geri alır.
 */
Telefon.nftGeriAl = () => {
  KPass.Kök.classList.add("tex");
  Telefon.nftGöster(true, false);
}

export default Telefon;
