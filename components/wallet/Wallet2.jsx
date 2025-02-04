import { ChainInfos, chainImage } from "../chains/chains";
import OrtakCss from "../shared/SharedCss.css";
import {
  Bağlantı,
  BağlantıAdı,
  Bağlantılar,
  BoşBağlantı,
  EvmBağlantıları,
  MinaBağlantıları
} from "./bağlantılar";
import Css from "./birim.css";
import QmarkResmi from "/components/cüzdan/img/qmark.svg";
import KopyalaResmi from "/components/paste.svg";
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
const ChainButton = dom.button(Css.ChainButton);
/** @const {!HTMLDivElement} */
const Menü = dom.div(Css.Menü);
/** @const {!HTMLDivElement} */
const SağPanel = dom.div(Css.SağPanel);

/** @const {!Set<ChainId>} */
const Ağlar = new Set(Chains);
/** @const {string} */
const BağlaMetni = AdresDüğmesi.innerText;
/** @type {!Array<function(?string)>} */
const OnAddressChange = [];
/** @const {!Array<function()>} */
const OnDisconnect = [];
/** @const {!Array<function(ChainId)>} */
const OnChainChange = [];
/** @const {!Array<function(?string, Promise<!eth.ERC721Unlockable>)>} */
const OnKPassChange = [];
/** @const {!Array<function(!Provider)>} */
const BağlantıDeğişince = [];
/** @type {!Provider} */
let Bağlı = BoşBağlantı;
/** @type {?string} */
let Address = null;
/** @type {ChainId} */
let Chain = DefaultChain;
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
    ağSeçildi(Chain);
  } else if (yeniAğ != Chain) {
    /** @const {!HTMLLIElement} */
    const yeniAğLi = dom.li(Css.AğListesi + yeniAğ);
    dom.li(Css.AğListesi + Chain).classList.remove(OrtakCss.Seçili);
    yeniAğLi.classList.add(OrtakCss.Seçili);
    ChainButton.replaceChild(
      yeniAğLi.firstElementChild.cloneNode(true), ChainButton.firstElementChild);
    /** @const {boolean} */
    const ağGrubuDeğişti = !Chain.startsWith(yeniAğ.slice(0, 2));
    Chain = yeniAğ;
    if (ağGrubuDeğişti)
      ConnectionList.show(chainIdToGroup(yeniAğ));
    kpassDeğişti();
    for (const f of OnChainChange) f(yeniAğ);
  }
}

const kpassDeğişti = () => {
  if (!Address) return;
  /** @const {!HTMLDivElement} */
  const kpassDüğmesi = dom.div(Css.KPassDüğmesi);
  /** @const {!HTMLImageElement} */
  const kpassResmi = dom.img(Css.ProfilResmi);

  /** @const {ChainId} */
  const ağ = Chain;
  /** @const {!eth.Provider} */
  const provider = /** @type {!eth.Provider} */(Bağlı.provider);
  /** @const {string} */
  const adres = Address;

  KPass.handleOf(provider, ağ, Address).then((cidHex) => {
    if (ağ != Chain || adres != Address) return;
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
          if (ağ != Chain || adres != Address) return Promise.reject();
          const kpassDosyası = /** @type {!eth.ERC721Unlockable} */(JSON.parse(dosya))
          KPassYokResmi ||= kpassResmi.src;
          kpassResmi.src = kpassDosyası.image;
          return kpassDosyası;
        })
      : null;
    for (const f of OnKPassChange) f(cidHex, dosyaSözü);
  })
}

/**
 * @param {!Array<string>} adresler cüzdandan gelen adresler dizisi.
 */
const adresDeğişti = (adresler) => {
  if (!adresler || !adresler.length)
    Cüzdan.kopar();
  else if (adresler[0] != Address) {
    /** @const {?string} */
    const eskiAdres = Address;
    Address = adresler[0];
    AdresDüğmesi.innerText = Profil.adresGir(Address.slice(0, 6) + "..." + Address.slice(-4));
    kpassDeğişti();
    if (!eskiAdres) {
      dom.gösterGizle(Profil.DebankLinki, Chain.startsWith(ChainGroup.EVM));
      ConnectionList.hide();
      dom.göster(SağPanel);
    }
    for (const f of OnAddressChange) f(Address);
  }
}

BoşBağlantı.connect(DefaultChain, ağDeğişti, adresDeğişti);

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
  bağlantı.connect(Chain, ağDeğişti, adresDeğişti)
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
  const ağGrubu = chainIdToGroup(Chain);
  for (const grup of ChainGroups)
    dom.adlaGösterGizle(Css.Cüzdan + grup, grup == ağGrubu)

  /** @const {!HTMLUListElement} */
  const seçici = dom.ul(Css.Cüzdan + ağGrubu);

  /** @const {!NodeList<!Element>} */
  const satırlar = seçici.children;
  for (const satır of satırlar) {
    /** @const {BağlantıAdı} */
    const bağlantıAdı = /** @type {BağlantıAdı} */(satır.id.slice(Css.Cüzdan.length))
    /** @const {!Provider} */
    const bağlantı = Bağlantılar[bağlantıAdı];
    /** @const {boolean} */
    const varMı = bağlantı.initIfAvailable();
    satır.classList.toggle(Css.Açık, varMı);
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
    bağlantı.connect(Chain, ağDeğişti, adresDeğişti, true)
      .then(() => BağlantıDeğişince.forEach((f) => f(Bağlı)))
      .catch(() => {
        Bağlı = BoşBağlantı;
        bağlantıSeçiciGöster()
      });
  } else
    ConnectionList.show();
}

const Profile = () => {
  /** @const {!HTMLDivElement} */
  Profile.AdresMetni = dom.div(Css.ProfilAdresMetni);
  /** @const {!HTMLSpanElement} */
  Profile.DebankLinki = dom.span(Css.DebankLinki);
  /** @const {!HTMLSpanElement} */
  const ExplorerLinki = dom.span(Css.ExplorerLinki);

  const explorerAç = () => {
    const adresEki = Chain.startsWith("mi") ? "wallet" : "address";
    const url = `//${ChainInfos[Chain].izleyici}/${adresEki}/${Address}`;
    window.open(url, "_blank");
  }
  return (
    <div id={Css.Profile}>
      <QmarkResmi id={Css.ProfilResmi} height={80} width={80} />
      <div>
        <Profile.AdresMetni
          onClick={() => navigator.clipboard.writeText(/** @type {string} */(Address))}>
          <span>0xcCc...cCc</span><span><KopyalaResmi inline /></span>
        </Profile.AdresMetni>
        <Profile.DebankLinki
          onClick={() => window.open("//debank.com/profile/" + Address, "_blank")}
        >DeBank</Profile.DebankLinki>
        <ExplorerLinki onClick={explorerAç}>Explorer</ExplorerLinki>
        <div id={Css.KPassDüğmesi}>{{ en: "MINT KPASS", tr: "KPASS AL" }}</div>
      </div>
    </div>
  );
}

Profil.adresGir = (adres) => Profil.AdresMetni.firstElementChild.innerText = adres;

/**
 * @param {{
 *   chains: !Array<ChainId>,
 *   chainNotes: !Object<ChainId, I18nString>,
 *   defaultChain: ChainId,
 *   piggyback: string
 * }=} props
 */
const ChainList = ({ chains, chainNotes, defaultChain, piggyback }) => (
  <ul id={Css.AğListesi}>
    {chains.map((id) => (
      <li id={Css.AğListesi + id} class={id == defaultChain ? OrtakCss.Seçili : ""}>
        {id == defaultChain
          ? <span></span>
          : <Image src={ağResmi(id)} width={32} height={32} bundleWidth={64} bundleHeight={64} piggyback={piggyback} />}
        {" "}
        {chainNotes[id]
          ? <div>{ChainInfos[id].uiName}<div class={Css.AğNotu}>{chainNotes[id]}</div></div>
          : ChainInfos[id].uiName}
      </li>
    ))}
  </ul>
);

/**
 * @param {{
 *   DefaultChain: ChainId,
 *   Chains: !Array<ChainId>,
 *   ChainNotes: !Object<ChainId, I18nString>,
 *   children: *,
 *   piggyback: string|undefined
 * }=} props
 */
const Wallet = ({
  DefaultChain: defaultChain,
  Chains: chains,
  ChainNotes: chainNotes,
  children,
  piggyback
}) => {
  /** @const {!HTMLDivElement} */
  const Dropdown = dom.div(Css.Dropdown);

  /** @const {!HTMLLIElement} */
  const seçiliAğ = dom.li(Css.AğListesi + DefaultChain);
  seçiliAğ.replaceChild(ChainButton.firstElementChild.cloneNode(true),
    seçiliAğ.firstElementChild);

  const Switch = dom.div("fornow");

  const dropdownClicked = (event) => {
    /** @const {HTMLLIElement} */
    const maybeLi = /** @type {HTMLLIElement} */(event.target.closest("li"));
    if (maybeLi && maybeLi.id && maybeLi.id.startsWith(Css.AğListesi))
      ağSeçildi(/** @type {ChainId} */(maybeLi.id.slice(3)));
    event.stopPropagation();
  }
  dom.schedule(izinliyseBağla, 200);

  return (
    <div id={Css.Root}>
      <Css />
      <ChainButton controlsDropdown={Dropdown} class={OrtakCss.Düğme}>
        <Image src={ağResmi(defaultChain)} height={32} width={32} inline />
      </ChainButton>
      <AdresDüğmesi onClick={ChainButton.onclick} class={OrtakCss.Düğme}>{{
        tr: "Cüzdan bağla", en: "Connect wallet"
      }}</AdresDüğmesi>
      <Dropdown nodisplay onClick={dropdownClicked}>
        <ChainList chains={chains} chainNotes={chainNotes} defaultChain={defaultChain} piggyback={piggyback} />
        <Switch instance={Wallet.rightPane} id={Css.RightPane} selected={defaultChain == ChainId.MinaMainnet}>
          <EvmConnections />
          <MinaConnections />
          <ConnectedPane>
            <Profile />
            <hr />
            {children}
          </ConnectedPane>
        </Switch>
      </Dropdown>
    </div>
  );
}

Wallet.open = () => ChainButton.click();

Wallet.disconnect = () => {
  Address = null;
  AdresDüğmesi.innerText = BağlaMetni;
  bağlantıSeçildi("", BoşBağlantı);
  dom.gizle(SağPanel);
  ConnectionList.hide()();
  for (const f of OnDisconnect) f();
}

/** @return {ChainId} */
Wallet.chain = () => Chain;

/**
 * @param {function(ChainId)} f Ağ değişince yeni ağın adıyla çağırılacak
 *                             fonksiyon.
 */
Wallet.onChainChange = (f) => OnChainChange.push(f);

/** @return {?string} */
Wallet.address = () => Address;

/** @param {function(?string)} f */
Wallet.onAddressChange = (f) => OnAddressChange.push(f);

/** @param {function()} f */
Wallet.onDisconnect = (f) => OnDisconnect.push(f);

/** @param {function(!Provider)} f */
Wallet.onConnectionChange = (f) => BağlantıDeğişince.push(f);

/**
 * @param {function(?string, Promise<!eth.ERC721Unlockable>)} f
 */
Wallet.onKPassChange = (f) => {
  OnKPassChange.push(f);
  OnDisconnect.push(() => f(null, null));
}

export default Wallet;
