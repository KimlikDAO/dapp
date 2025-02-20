import Profile from "./Profile";
import {
  EvmProviderList,
  MinaProviderList,
  ProviderId,
  Providers
} from "./ProviderList";
import Css from "./Wallet.css";
import { chainImageSrc, ChainInfos } from "/components/chains/chains";
import SharedCss from "/components/shared/SharedCss.css";
import {
  ChainGroup,
  ChainId,
  chainIdToGroup
} from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";
import "/lib/ethereum/ERC721Unlockable.d";
import KPass from "/lib/ethereum/KPassLite";
import { Image } from "/lib/kastro/image";
import Switch from "/lib/kastro/Switch";
import ipfs from "/lib/node/ipfs";
import dom from "/lib/util/dom";
import hex from "/lib/util/hex";
import { I18nString } from "/lib/util/i18n";

/** @define {string} */
const KIMLIKDAO_IPFS_URL = "//ipfs.kimlikdao.org";

/** @const {!Array<function(ChainId)>} */
const OnChainChange = [];
/** @const {!Array<function(!Provider)>} */
const OnProviderChange = [];
/** @const {!Array<function(?string)>} */
const OnAddressChange = [];
/** @const {!Array<function(?string, Promise<!eth.ERC721Unlockable>)>} */
const OnKPassChange = [];
/** @const {!Array<function()>} */
const OnDisconnect = [];
/** @type {!Provider} */
let SelectedProvider = Providers[ProviderId.Dummy];
/** @type {?string} */
let Address = null;

/**
 * @param {{
 *   chainConfig: ChainConfig,
 *   piggyback: (string | undefined)
 * }} props
 */
const ChainList = ({ chainConfig, piggyback }) => {
  /** @const {!Set<ChainId>} */
  ChainList.chains = new Set(chainConfig.chains);
  /** @type {ChainId} */
  ChainList.selected = chainConfig.defaultChain;

  /** @const {!HTMLLIElement} */
  const SelectedChain = dom.li(Css.ChainList + chainConfig.defaultChain);
  SelectedChain.replaceChild(Wallet.chainButton.firstElementChild.cloneNode(true),
    SelectedChain.firstElementChild);

  return (
    <ul id={Css.ChainList} class={Css.DropdownList}>
      {chainConfig.chains.map((id) => (
        <li id={Css.ChainList + id} class={id == chainConfig.defaultChain ? SharedCss.Selected : ""}>
          {id == chainConfig.defaultChain
            ? <span></span>
            : <Image src={chainImageSrc(id)}
              width={32} height={32}
              bundleWidth={64} bundleHeight={64} piggyback={piggyback} />}
          {" "}
          {chainConfig.chainNotes$[id]
            ? <div>{ChainInfos[id].uiName}<div class={Css.ChainNote}>{chainConfig.chainNotes$[id]}</div></div>
            : ChainInfos[id].uiName}
        </li>
      ))}
    </ul>
  );
}

/**
 * @param {ChainId} chainId
 */
ChainList.setSelected = (chainId) => {
  dom.li(Css.ChainList + ChainList.selected).classList.remove(SharedCss.Selected);
  /** @const {!HTMLLIElement} */
  const li = dom.li(Css.ChainList + chainId);
  li.classList.add(SharedCss.Selected);
  Wallet.chainButton.replaceChild(
    li.firstElementChild.cloneNode(true), Wallet.chainButton.firstElementChild);
  ChainList.selected = chainId;
}

/** @param {ChainId} newChain */
const chainChanged = (newChain) => {
  const oldChain = ChainList.selected;
  if (!ChainList.chains.has(newChain))
    chainSelected(oldChain);
  else if (newChain != oldChain) {
    ChainList.setSelected(newChain);
    /** @const {ChainGroup} */
    const chainGroup = chainIdToGroup(newChain);
    if (!Address && !oldChain.startsWith(chainGroup))
      Wallet.rightPane.showPane(+(chainGroup == ChainGroup.MINA));
    kpassChanged();
    OnChainChange.forEach((f) => f(newChain));
  }
}

/** @param {!Array<string>} addresses */
const addressChanged = (addresses) => {
  if (!addresses || !addresses.length)
    Wallet.disconnect();
  else if (addresses[0] != Address) {
    Address = addresses[0];
    Wallet.addressButton.innerText = Profile.setAddress(Address, ChainList.selected);
    Wallet.rightPane.showPane(2);
    kpassChanged();
    OnAddressChange.forEach((f) => f(Address));
  }
}

const kpassChanged = () => {
  const chainId = ChainList.selected;
  const address = Address;
  if (!address) return;
  KPass.handleOf(SelectedProvider.nativeProvider, chainId, address)
    .then((cidHex) => {
      if (chainId != ChainList.selected || address != Address) return;
      const hasKPass = cidHex.replaceAll("0", "") != "x";
      Profile.setKPass(hasKPass);

      const filePromise = hasKPass
        ? ipfs.readWithCIDBytes(KIMLIKDAO_IPFS_URL, hex.toUint8Array(cidHex.slice(2)))
          .then((/** @type {string} */ file) => {
            if (chainId != ChainList.selected || address != Address) return Promise.reject();
            const kpassFile = /** @type {!eth.ERC721Unlockable} */(JSON.parse(file))
            Profile.setKPassImage(kpassFile.image);
            return kpassFile;
          })
        : null;
      OnKPassChange.forEach((f) => f(cidHex, filePromise));
    });
}

/** @param {ChainId} chainId */
const chainSelected = (chainId) => {
  if (!SelectedProvider.isChainSupported(chainId))
    Wallet.disconnect();
  SelectedProvider.switchChain(chainId);
}

/**
 * @param {ProviderId} providerId
 * @param {boolean=} gentle
 */
const providerSelected = (providerId, gentle) => {
  const currentProvider = SelectedProvider;
  const provider = Providers[providerId];
  if (currentProvider == provider || !provider || !provider.isInitialized())
    return;
  SelectedProvider = provider;
  const connected = provider.connect(ChainList.selected, chainChanged, addressChanged, gentle)
  if (!connected) return;
  connected
    .then(() => {
      if (!gentle)
        document.cookie = `cu=${providerId};domain=${Wallet.cookieDomain};SameSite=Strict;max-age=` + 1e6;
      currentProvider.disconnect();
      for (const f of OnProviderChange) f(provider);
    })
    .catch(() => SelectedProvider = currentProvider);
}

/** @param {Event} event */
const dropdownClicked = (event) => {
  /** @const {!Element} */
  const targetElem = /** @type {!Element} */(event.target);
  /** @const {HTMLLIElement} */
  const maybeLi = /** @type {HTMLLIElement} */(targetElem.closest("li"));
  if (maybeLi && maybeLi.id) {
    if (maybeLi.id.startsWith(Css.ChainList))
      chainSelected(/** @type {ChainId} */(maybeLi.id.slice(Css.ChainList.length)));
    else if (maybeLi.id.startsWith(Css.Root))
      providerSelected(/** @type {ProviderId} */(maybeLi.id.slice(Css.Root.length + 1)));
  }
  event.stopPropagation();
}

const connectProvider = () => {
  SelectedProvider.connect(ChainId.x1, chainChanged, addressChanged);
  /** @const {string} */
  const cookie = document.cookie;
  /** @const {number} */
  const idx = cookie.indexOf("cu=");
  /** @const {ProviderId} */
  const providerId = /** @type {ProviderId} */(cookie.slice(idx + 3, idx + 5));
  dom.schedule(() => providerSelected(providerId, true), 100);
}

/**
 * @typedef {{
 *   defaultChain: ChainId,
 *   chains: !Array<ChainId>,
 *   chainNotes$: (!Object<ChainId, I18nString> | undefined),
 * }}
 */
export const ChainConfig = {};

/**
 * @param {{
 *   chainConfig: ChainConfig,
 *   cookieDomain: string,
 *   piggyback: (string | undefined),
 *   children: (!Array<Element> | undefined),
 *   mintKPassUrl$: (string | undefined),
 *   viewKPassUrl: string,
 * }} props
 */
const Wallet = ({
  chainConfig,
  cookieDomain,
  piggyback,
  children,
  mintKPassUrl$,
  viewKPassUrl
}) => {
  /** @const {!HTMLButtonElement} */
  Wallet.chainButton = dom.button(Css.ChainButton);
  /** @const {!HTMLButtonElement} */
  Wallet.addressButton = dom.button(Css.AddressButton);
  /** @const {string} */
  Wallet.cookieDomain = cookieDomain;
  /** @const {string} */
  Wallet.connectText = Wallet.addressButton.innerText;
  /** @const {!HTMLDivElement} */
  const Dropdown = dom.div(Css.Dropdown);

  connectProvider();

  return (
    <div id={Css.Root}>
      <Css />
      <Wallet.chainButton class={SharedCss.Button} controlsDropdown={Dropdown}>
        <Image src={chainImageSrc(chainConfig.defaultChain)}
          width={32} height={32}
          bundleWidth={64} bundleHeight={64}
          inline piggyback={piggyback} />
      </Wallet.chainButton>
      <Wallet.addressButton class={SharedCss.Button} onClick={Wallet.chainButton.onclick}>{{
        en: "Connect wallet", tr: "Cüzdan bağla",
      }}</Wallet.addressButton>
      <Dropdown nodisplay onClick={dropdownClicked}>
        <ChainList chainConfig={chainConfig} piggyback={piggyback} />
        <Switch id={Css.RightPane} instance={Wallet.rightPane} initialPane={0}>
          <EvmProviderList />
          <MinaProviderList />
          <div>
            <Profile mintKPassUrl$={mintKPassUrl$} viewKPassUrl={viewKPassUrl} />
            <hr />
            {children}
          </div>
        </Switch>
      </Dropdown>
    </div>
  );
}

/**
 * Opens the wallet dropdown
 */
Wallet.open = () => Wallet.chainButton.click();

Wallet.disconnect = () => {
  Address = null;
  Wallet.addressButton.innerText = Wallet.connectText;
  providerSelected(ProviderId.Dummy);
  Wallet.rightPane.showPane(+ChainList.selected.startsWith(ChainGroup.MINA));
  for (const f of OnDisconnect) f();
}

/** @return {?string} */
Wallet.address = () => Address;

/**
 * Registers a callback function to be called whenever the selected blockchain
 * network changes.
 * 
 * @param {function(ChainId)} f Callback function that will be invoked with the
 *                              new chain ID whenever the chain changes.
 */
Wallet.onChainChange = (f) => OnChainChange.push(f);

/**
 * Registers a callback function to be called whenever the selected provider
 * changes.
 * 
 * @param {function(!Provider)} f Callback function that will be invoked with
 *                                the new provider whenever the user switches
 *                                providers.
 */
Wallet.onProviderChange = (f) => OnProviderChange.push(f);

/**
 * Registers a callback function to be called whenever the selected address
 * changes.
 * 
 * @param {function(?string)} f Callback function that will be invoked with
 *                              the new address whenever the address changes.
 */
Wallet.onAddressChange = (f) => OnAddressChange.push(f);

/**
 * Registers a callback function to be called whenever the selected KPass
 * changes.
 * 
 * @param {function(?string, Promise<!eth.ERC721Unlockable>)} f Callback
 *     function that will be invoked with the new KPass whenever the KPass
 *     changes.
 */
Wallet.onKPassChange = (f) => {
  OnKPassChange.push(f);
  OnDisconnect.push(() => f(null, null));
}

/**
 * Registers a callback function to be called whenever the wallet is
 * disconnected.
 * 
 * @param {function()} f Callback function that will be invoked when the wallet
 *                       is disconnected.
 */
Wallet.onDisconnect = (f) => OnDisconnect.push(f);

export default Wallet;
