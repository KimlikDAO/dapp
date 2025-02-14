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
 *   defaultChain: ChainId,
 *   chains: !Array<ChainId>,
 *   chainNotes$: (!Object<ChainId, I18nString> | undefined),
 *   piggyback: (string | undefined)
 * }} props
 */
const ChainList = ({ defaultChain, chains, chainNotes$, piggyback }) => {
  /** @const {!Set<ChainId>} */
  ChainList.chains = new Set(chains);
  /** @type {ChainId} */
  ChainList.selected = defaultChain;

  /** @const {!HTMLLIElement} */
  const SelectedChain = dom.li(Css.ChainList + defaultChain);
  SelectedChain.replaceChild(Wallet.chainButton.firstElementChild.cloneNode(true),
    SelectedChain.firstElementChild);

  return (
    <ul id={Css.ChainList} class={Css.DropdownList}>
      {chains.map((id) => (
        <li id={Css.ChainList + id} class={id == defaultChain ? SharedCss.Selected : ""}>
          {id == defaultChain
            ? <span></span>
            : <Image src={chainImageSrc(id)}
              width={32} height={32}
              bundleWidth={64} bundleHeight={64} piggyback={piggyback} />}
          {" "}
          {chainNotes$[id]
            ? <div>{ChainInfos[id].uiName}<div class={Css.ChainNote}>{chainNotes$[id]}</div></div>
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
    for (const f of OnChainChange) f(newChain);
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
  KPass.handleOf(SelectedProvider.provider, chainId, address)
    .then((cidHex) => {
      if (chainId != ChainList.selected || address != Address) return;
      const hasKPass = cidHex.replaceAll("0", "") != "x";
      Profile.setKPass(hasKPass, hasKPass ? Wallet.viewKPassUrl : Wallet.mintKPassUrl);

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

/** @param {ProviderId} providerId */
const providerSelected = (providerId) => {
  const currentProvider = SelectedProvider;
  const provider = Providers[providerId];
  if (currentProvider == provider) return;
  SelectedProvider = provider;
  const connected = provider.connect(ChainList.selected, chainChanged, addressChanged)
  if (!connected) return;
  connected
    .then(() => {
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

/**
 * @param {{
 *   defaultChain: ChainId,
 *   chains: !Array<ChainId>,
 *   chainNotes: !Object<ChainId, I18nString>,
 *   cookieDomain: string,
 *   piggyback: (string | undefined),
 *   children: (!Array<Element> | undefined),
 *   mintKPassUrl: string,
 *   viewKPassUrl: string,
 * }} props
 */
const Wallet = ({
  defaultChain,
  chains,
  chainNotes,
  cookieDomain,
  piggyback,
  children,
  mintKPassUrl,
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
  /** @const {string} */
  Wallet.mintKPassUrl = mintKPassUrl;
  /** @const {string} */
  Wallet.viewKPassUrl = viewKPassUrl;
  /** @const {!HTMLDivElement} */
  const Dropdown = dom.div(Css.Dropdown);
  /** @const {!HTMLDivElement} */
  const ConnectedPane = dom.div(Css.ConnectedPane);

  SelectedProvider.connect(defaultChain, chainChanged, addressChanged);

  return (
    <div id={Css.Root}>
      <Css />
      <Wallet.chainButton class={SharedCss.Button} controlsDropdown={Dropdown}>
        <Image src={chainImageSrc(defaultChain)}
          width={32} height={32}
          bundleWidth={64} bundleHeight={64}
          inline piggyback={piggyback} />
      </Wallet.chainButton>
      <Wallet.addressButton class={SharedCss.Button} onClick={Wallet.chainButton.onclick}>{{
        en: "Connect wallet", tr: "Cüzdan bağla",
      }}</Wallet.addressButton>
      <Dropdown nodisplay onClick={dropdownClicked}>
        <ChainList
          defaultChain={defaultChain} chains={chains} chainNotes$={chainNotes} piggyback={piggyback} />
        <Switch id={Css.RightPane} instance={Wallet.rightPane} initialSelected={0}>
          <EvmProviderList />
          <MinaProviderList />
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
 * @param {function()} f Callback function that will be invoked when the wallet is disconnected.
 */
Wallet.onDisconnect = (f) => OnDisconnect.push(f);

export default Wallet;
