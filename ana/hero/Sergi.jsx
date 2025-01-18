import Css from "./sergi.css";
import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
const Boncuklar = dom.div(Css.Boncuklar);
/** @const {!HTMLUListElement} */
const Kartlar = dom.ul(Css.Kartlar);

/** @type {number} */
let Kart = 0;
/** @type {number} */
let SergiSaati = 0;
/** @type {number} */
let YerleştirSaati = 0;

/**
 * Kartları `Kart` değişkenine göre doğru konuma çeker.
 */
const yerleştir = () => {
  /** @const {number} */
  const width = Kartlar.firstElementChild.getBoundingClientRect().width;
  Kartlar.style.transform = `translate3d(-${Kart * width}px,0,0)`;
}

/**
 * @param {number} yeniKart
 */
const kartDeğiştir = (yeniKart) => {
  if (Kart > 2 && yeniKart == 0) yeniKart = 4;
  const yeniKartDengi = yeniKart % 4;
  Telefon.nftGöster(yeniKartDengi <= 1, !yeniKartDengi);
  yeniKartDengi === 3
    ? Telefon.kutuGöster(dom.i18n({
      tr: "Bağlı app KPass’inizdeki iletişim bilgilerinize erişmek istiyor. İzin veriyor musunuz?",
      en: "The connected app would like to access your contact info section of your KPass."
    }))
    : Telefon.kutuKapat();
  Boncuklar.children[Kart % 4].firstElementChild.classList.remove("sel");
  Boncuklar.children[yeniKartDengi].firstElementChild.classList.add("sel");
  Kart = yeniKart;
  yerleştir();
  if (yeniKart == 4)
    setTimeout(() => {
      Kartlar.style.transition = "none";
      Kart = 0;
      yerleştir();
      setTimeout(() => Kartlar.style.transition = "", 600)
    }, 1200);
}

const sergiSaatiKur = () => {
  if (SergiSaati) clearInterval(SergiSaati);
  SergiSaati = setInterval(() => kartDeğiştir(Kart + 1), 12000);
}

const Sergi = () => {
  window.onresize = () => {
    clearTimeout(YerleştirSaati);
    YerleştirSaati = setTimeout(yerleştir, 100);
  }
  for (let /** number */ i = 0; i < Boncuklar.childElementCount; ++i) {
    Boncuklar.children[i].onclick = () => {
      kartDeğiştir(i);
      sergiSaatiKur();
    }
  }
  Telefon.nftGöster(true, true);
  Cüzdan.adresDeğişince((adres) => Telefon.adresGir(adres));
  Kartlar.appendChild(Kartlar.firstElementChild.cloneNode(true));
  Kartlar.style.width = "500%";
  dom.run(sergiSaatiKur);

  return (
    <div id={Css.Kök}>
      <Css />
      <div id={Css.KartSahnesi}>
        <Kartlar>
          <li class={Css.Kart}>
            <h3>{{
              tr: "Kontrolü tamamen sende olan on-chain bir hesap",
              en: "An on-chain account that you truly own"
            }}</h3>{{
              en: "Mint your KPass and wallet login to all supported on/off-ramps with an account you truly own",
              tr: "Bir kez KPass al, destekleyen tüm platformlarda cüzdanını bağla, gerekli bilgileri güvenle sun, hesap açmadan işlem yap"
            }}
          </li>
          <li class={Css.Kart}>
            <h3>{{
              tr: "İçeriği kendi cüzdan anahtarlarınla şifrelenir",
              en: "Your data is encrypted under your wallet private key"
            }}</h3>{{
              en: "The contents of your KPass is encrypted in your browser under your wallet private key. KimlikDAO will never store your data",
              tr: "KPass içeriği kendi tarayıcında kendi cüzdan anahtarlarınla şifrelenir. KimlikDAO asla bilgilerini göremez ve saklamaz"
            }}
          </li>
          <li class={Css.Kart}>
            <h3 data-en="KPass can be kept in any NFT wallet, such as MetaMask">MetaMask gibi NFT
              destekleyen kripto cüzdanında taşınır</h3>{{
                en: "KPass is an ERC-721 non-fungible token meaning that you can see it in any NFT wallet",
                tr: "KPass ERC-721 standardına uygun bir NFT olduğu için NFT destekleyen her cüzdanda görülebilir"
              }}
          </li>
          <li class={Css.Kart}>
            <h3 data-en="Control who can access your info">dApp’lere istediğin
              bilgileri paylaş, istediklerini gizli tut</h3>{{
                en: "The connected dApp may send you requests for accessing parts of your KPass. Approve the sections you’d like to share, reject others",
                tr: "Bağlı dApp KPass’inin içindeki bölümlere erişim isteği yollayabilir. Paylaşmak istediklerini onayla, gizli tutmak istediklerini onaylama"
              }}
          </li>
        </Kartlar>
      </div>
      <Boncuklar>
        {[...Array(4)].map((_, i) => (
          <div class={Css.Boncuklu}>
            <div class={[Css.Boncuk].concat(i == 0 ? "sel" : [])}></div>
          </div>
        ))}
      </Boncuklar>
    </div>
  );
}

export default Sergi;
