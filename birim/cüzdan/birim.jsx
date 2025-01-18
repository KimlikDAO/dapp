import { AğBilgileri, ağResmi } from "../ağlar/birim";
import { Bağlantı, BağlantıAdı, Bağlantılar, BoşBağlantı } from "./bağlantılar";
import Css from "./birim.css";
import QmarkResmi from "/birim/cüzdan/img/qmark.svg";
import KopyalaResmi from "/birim/paste.svg";
import { HostUrl } from "/crate";
import { ChainGroup, ChainGroups, ChainId, chainIdToGroup } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";
import "/lib/ethereum/ERC721Unlockable.d";
import KPass from "/lib/ethereum/KPassLite";
import { Image } from "/lib/kastro/image";
import ipfs from "/lib/node/ipfs";
import dom from "/lib/util/dom";
import hex from "/lib/util/hex";
import { I18nString } from "/lib/util/i18n";

/** @define {ChainId} */
const DefaultChain = ChainId.x1;
/** @define {!Array<ChainId>} */
const Chains = [ChainId.x1, ChainId.MinaMainnet, ChainId.xa4b1, ChainId.x89, ChainId.xa86a, ChainId.x38];

/** @const {string} */
const KIMLIKDAO_IPFS_URL = "//ipfs.kimlikdao.org";
/** @const {!HTMLButtonElement} */
const AdresDüğmesi = dom.button(Css.AdresDüğmesi);
/** @const {!HTMLButtonElement} */
const AğDüğmesi = dom.button(Css.AğDüğmesi);
/** @const {!HTMLDivElement} */
const CüzdanAdresi = dom.div(Css.CüzdanAdresi);
/** @const {!HTMLSpanElement} */
const DebankLinki = dom.span(Css.DebankLinki);
/** @const {!HTMLDivElement} */
const Menü = dom.div(Css.Menü);
/** @const {!HTMLDivElement} */
const SağPanel = dom.div(Css.SağPanel);

/** @const {!Set<ChainId>} */
const Ağlar = new Set(Chains);
/** @const {string} */
const BağlaMetni = AdresDüğmesi.innerText;
/** @type {!Array<function(?string)>} */
const AdresDeğişince = [];
/** @const {!Array<function()>} */
const Kopunca = [];
/** @const {!Array<function(ChainId)>} */
const AğDeğişince = [];
/** @const {!Array<function(?string, Promise<!eth.ERC721Unlockable>)>} */
const KPassDeğişince = [];
/** @const {!Array<function(!Provider)>} */
const BağlantıDeğişince = [];
/** @type {!Provider} */
let Bağlı = BoşBağlantı;
/** @type {?string} */
let Adres = null;
/** @type {ChainId} */
let Ağ = DefaultChain;
/** @type {?string} */
let KPassYokResmi;

/**
 * @param {ChainId} yeniAğ harf dizisi olarak yeni ağ adı.
 */
const ağDeğişti = (yeniAğ) => {
  if (!Ağlar.has(yeniAğ)) {
    // Kullanıcı desteklemediğimiz bir ağa geçerse (uzantı cüzdanı
    // arabiriminden), en son seçili ağa geri geçme isteği yolluyoruz.
    // Eğer cüzdanı cookie'den bağlamışsak, son seçili ağ bulunduğumuz
    // sayfada desteklenmiyor olabilir; bu durumda `ağSeçildi()` cüzdanın
    // kopmasını sağlıyor.
    ağSeçildi(Ağ);
  } else if (yeniAğ != Ağ) {
    /** @const {!HTMLLIElement} */
    const yeniAğLi = dom.li(Css.AğListesi + yeniAğ);
    dom.li(Css.AğListesi + Ağ).classList.remove("sel");
    yeniAğLi.classList.add("sel");
    AğDüğmesi.replaceChild(
      yeniAğLi.firstElementChild.cloneNode(true), AğDüğmesi.firstElementChild);
    /** @const {boolean} */
    const ağGrubuDeğişti = !Ağ.startsWith(yeniAğ.slice(0, 2));
    Ağ = yeniAğ;
    if (ağGrubuDeğişti)
      bağlantıSeçiciGöster();
    kpassDeğişti();
    for (const f of AğDeğişince) f(yeniAğ);
  }
}

const kpassDeğişti = () => {
  if (!Adres) return;
  /** @const {!HTMLDivElement} */
  const kpassDüğmesi = dom.div(Css.KPassDüğmesi);
  /** @const {!HTMLImageElement} */
  const kpassResmi = dom.img(Css.ProfilResmi);

  /** @const {ChainId} */
  const ağ = Ağ;
  /** @const {!eth.Provider} */
  const provider = /** @type {!eth.Provider} */(Bağlı.provider);
  /** @const {string} */
  const adres = Adres;

  KPass.handleOf(provider, ağ, Adres).then((cidHex) => {
    if (ağ != Ağ || adres != Adres) return;
    /** @const {boolean} */
    const varMı = cidHex.replaceAll("0", "") != "x";
    kpassDüğmesi.innerText = varMı
      ? dom.i18n({ tr: "KPASS’İNİ İNCELE", en: "VIEW KPASS" })
      : dom.i18n({ tr: "KPASS AL", en: "MINT KPASS" });
    kpassDüğmesi.onclick = kpassResmi.onclick = () =>
      window.location.href = "//kimlikdao.org/" + (varMı
        ? dom.i18n({ tr: "kpassim", en: "kpass" })
        : dom.i18n({ tr: "al", en: "mint" }));
    if (!varMı && KPassYokResmi) kpassResmi.src = KPassYokResmi;
    /** @const {Promise<!eth.ERC721Unlockable>} */
    const dosyaSözü = varMı
      ? ipfs.cidBytetanOku(KIMLIKDAO_IPFS_URL, hex.toUint8Array(cidHex.slice(2)))
        .then((/** @type {string} */ dosya) => {
          if (ağ != Ağ || adres != Adres) return Promise.reject();
          const kpassDosyası = /** @type {!eth.ERC721Unlockable} */(JSON.parse(dosya))
          KPassYokResmi ||= kpassResmi.src;
          kpassResmi.src = kpassDosyası.image;
          return kpassDosyası;
        })
      : null;
    for (const f of KPassDeğişince) f(cidHex, dosyaSözü);
  })
}

/**
 * @param {!Array<string>} adresler cüzdandan gelen adresler dizisi.
 */
const adresDeğişti = (adresler) => {
  if (!adresler || !adresler.length)
    Cüzdan.kopar();
  else if (adresler[0] != Adres) {
    /** @const {?string} */
    const eskiAdres = Adres;
    Adres = adresler[0];
    CüzdanAdresi.firstElementChild.innerText =
      AdresDüğmesi.innerText = Adres.slice(0, 6) + "..." + Adres.slice(-4);
    kpassDeğişti();
    if (!eskiAdres) {
      dom.gösterGizle(DebankLinki, Ağ.startsWith(ChainGroup.EVM));
      bağlantıSeçiciGizle();
      dom.göster(SağPanel);
    }
    for (const f of AdresDeğişince) f(Adres);
  }
}

BoşBağlantı.connect(ChainId.x1, ağDeğişti, adresDeğişti);

/**
 * @param {ChainId} ağ
 */
const ağSeçildi = (ağ) => {
  if (!Bağlı.isChainSupported(ağ)) Cüzdan.kopar();
  Bağlı.switchChain(ağ);
}

/**
 * @param {string} bağlantıAdı
 * @param {!Provider} bağlantı
 */
const bağlantıSeçildi = (bağlantıAdı, bağlantı) => {
  /** @const {!Provider} */
  const eskiBağlantı = Bağlı;
  if (eskiBağlantı == bağlantı) return;
  Bağlı = bağlantı;
  bağlantı.connect(Ağ, ağDeğişti, adresDeğişti)
    .then(() => {
      document.cookie = `cu=${bağlantıAdı};domain=.${HostUrl.slice(8)};SameSite=Strict;max-age=` + 1e6;
      eskiBağlantı.disconnect();
      for (const f of BağlantıDeğişince) f(bağlantı);
    })
    .catch((e) => {
      console.log(e);
      Bağlı = eskiBağlantı;
    });
}

const bağlantıSeçiciGizle = () => {
  for (const grup of ChainGroups)
    dom.adlaGizle(Css.BağlantıListesi + grup);
}

const bağlantıSeçiciGöster = () => {
  /** @const {ChainGroup} */
  const ağGrubu = chainIdToGroup(Ağ);
  for (const grup of ChainGroups)
    dom.adlaGösterGizle(Css.BağlantıListesi + grup, grup == ağGrubu)

  /** @const {!HTMLUListElement} */
  const seçici = dom.ul(Css.BağlantıListesi + ağGrubu);

  /** @const {!NodeList<!Element>} */
  const satırlar = seçici.children;
  for (const satır of satırlar) {
    /** @const {BağlantıAdı} */
    const bağlantıAdı = /** @type {BağlantıAdı} */(satır.id.slice(2))
    /** @const {!Provider} */
    const bağlantı = Bağlantılar[bağlantıAdı];
    /** @const {boolean} */
    const varMı = bağlantı.initIfAvailable();
    satır.classList.toggle("on", varMı);
    satır.onclick = varMı ? () => bağlantıSeçildi(bağlantıAdı, bağlantı) : null;
    /** @const {Element} */
    const düğmeMi = satır.lastElementChild;
    /** @const {string} */
    const indirURLi = varMı ? "" : bağlantı.downloadURL();
    /** @const {boolean} */
    const düğmeGöster = indirURLi != "" && düğmeMi.classList.contains(Css.Cüzdanİndir);
    dom.gösterGizle(düğmeMi, düğmeGöster);
    düğmeMi.onclick = düğmeGöster
      ? () => window.open(indirURLi, "_blank").focus()
      : null;
  }
}

const izinliyseBağla = () => {
  /** @const {string} */
  const cookie = document.cookie;
  /** @const {number} */
  const idx = cookie.indexOf("cu=");
  /** @const {Provider} */
  const bağlantı = Bağlantılar[cookie.slice(idx + 3, idx + 5)];
  if (bağlantı && bağlantı.initIfAvailable()) {
    Bağlı = bağlantı;
    bağlantı.connect(Ağ, ağDeğişti, adresDeğişti, true)
      .then(() => BağlantıDeğişince.forEach((f) => f(Bağlı)))
      .catch(() => {
        Bağlı = BoşBağlantı;
        bağlantıSeçiciGöster()
      });
  } else
    bağlantıSeçiciGöster();
}

/**
 * @param {{
 *   DefaultChain: ChainId,
 *   Chains: !Array<ChainId>,
 *   ChainNotes: !Object<ChainId, I18nString>,
 *   children: *,
 *   piggyback: string
 * }=} props
 * @return {Promise<string>}
 */
const Cüzdan = ({ DefaultChain: defaultChain, Chains: chains, ChainNotes: chainNotes, children, piggyback }) => {
  /** @const {!HTMLLIElement} */
  const seçiliAğ = dom.li(Css.AğListesi + DefaultChain);
  seçiliAğ.replaceChild(AğDüğmesi.firstElementChild.cloneNode(true),
    seçiliAğ.firstElementChild);

  AdresDüğmesi.onclick = AğDüğmesi.onclick;
  Menü.onclick = (event) => {
    /** @type {HTMLLIElement} */
    const maybeLi = /** @type {HTMLLIElement} */(event.target.closest("li"));
    if (maybeLi && maybeLi.id && maybeLi.id.startsWith(Css.AğListesi))
      ağSeçildi(/** @type {ChainId} */(maybeLi.id.slice(3)));
    event.stopPropagation();
  }
  CüzdanAdresi.onclick = () => navigator.clipboard.writeText(/** @type {string} */(Adres));
  dom.span(Css.ExplorerLinki).onclick = () => {
    const adresEki = Ağ.startsWith("mi") ? "wallet" : "address";
    const url = `//${AğBilgileri[Ağ].izleyici}/${adresEki}/${Adres}`;
    window.open(url, "_blank");
  }
  DebankLinki.onclick = () => {
    const url = "//debank.com/profile/" + Adres;
    window.open(url, "_blank");
  }
  dom.schedule(izinliyseBağla, 200);

  return (
    <div id={Css.Kök}>
      <Css />
      <AğDüğmesi controlsDropdown={Menü}>
        <Image src={ağResmi(defaultChain)} height={32} width={32} inline />
      </AğDüğmesi>
      <AdresDüğmesi onClick={AğDüğmesi.onclick}>{{
        tr: "Cüzdan bağla", en: "Connect wallet"
      }}</AdresDüğmesi>
      <Menü nodisplay>
        <ul id={Css.AğListesi}>
          {chains.map((id) => (
            <li id={Css.AğListesi + id} class={id == defaultChain ? "sel" : ""}>
              {id == defaultChain
                ? <span></span>
                : <Image src={ağResmi(id)} width={32} height={32} bundleWidth={64} bundleHeight={64} piggyback={piggyback} />}
              {" "}
              {chainNotes[id]
                ? <div>{AğBilgileri[id].ad}<div class={Css.AğNotu}>{chainNotes[id]}</div></div>
                : AğBilgileri[id].ad}
            </li>
          ))}
        </ul>
        <ul id={Css.BağlantıListesi + ChainGroup.EVM} class={Css.BağlantıListesi}>
          <Bağlantı idx={BağlantıAdı.Rabby} name="Rabby Wallet" />
          <Bağlantı idx={BağlantıAdı.Core} name="Core" />
          <Bağlantı idx={BağlantıAdı.MetaMask} name="Metamask" />
        </ul>
        <ul id={Css.BağlantıListesi + ChainGroup.MINA} class={Css.BağlantıListesi} nodisplay>
          <Bağlantı idx={BağlantıAdı.Auro} name="Auro" />
        </ul>
        <SağPanel nodisplay>
          <div id={Css.Profil}>
            <QmarkResmi id={Css.ProfilResmi} height={80} width={80} />
            <div>
              <CüzdanAdresi>
                <span>0xcCc...cCc</span><span id="cuadi"><KopyalaResmi inline /></span>
              </CüzdanAdresi>
              <DebankLinki>DeBank</DebankLinki> <span id={Css.ExplorerLinki}>Explorer</span>
              <div id={Css.KPassDüğmesi}>{{ en: "MINT KPASS", tr: "KPASS AL" }}</div>
            </div>
          </div>
          <hr />
          {children}
        </SağPanel>
      </Menü>
    </div>
  );
}

Cüzdan.aç = () => AğDüğmesi.click();

Cüzdan.kopar = () => {
  Adres = null;
  AdresDüğmesi.innerText = BağlaMetni;
  bağlantıSeçildi("", BoşBağlantı);
  dom.gizle(SağPanel);
  bağlantıSeçiciGöster();
  for (const f of Kopunca) f();
}

/** @return {ChainId} */
Cüzdan.ağ = () => Ağ;

/**
 * @param {function(ChainId)} f Ağ değişince yeni ağın adıyla çağırılacak
 *                             fonksiyon.
 */
Cüzdan.ağDeğişince = (f) => AğDeğişince.push(f);

/** @return {?string} */
Cüzdan.adres = () => Adres;

/** @param {function(?string)} f */
Cüzdan.adresDeğişince = (f) => AdresDeğişince.push(f);

/** @param {function()} f */
Cüzdan.kopunca = (f) => Kopunca.push(f);

/** @param {function(!Provider)} f */
Cüzdan.bağlantıDeğişince = (f) => BağlantıDeğişince.push(f);

/**
 * @param {function(?string, Promise<!eth.ERC721Unlockable>)} f
 */
Cüzdan.kpassDeğişince = (f) => {
  KPassDeğişince.push(f);
  Kopunca.push(() => f(null, null));
}

export default Cüzdan;
