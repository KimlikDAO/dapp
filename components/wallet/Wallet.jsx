import Profile from "./Profile";
import {
  EvmProviderList,
  MinaProviderList,
  ProviderId,
  Providers
} from "./ProviderList";
import { DummyProvider } from "./providers/dummyProvider";
import Css from "./Wallet.css";
import { chainImageSrc, ChainInfos } from "/components/chains/chains";
import SharedCss from "/components/shared/SharedCss.css";
import { ChainGroup, ChainId, chainIdToGroup } from "/lib/crosschain/chains";
import { Provider } from "/lib/crosschain/provider";
import { Image } from "/lib/kastro/image";
import Switch from "/lib/kastro/Switch";
import dom from "/lib/util/dom";
import { I18nString } from "/lib/util/i18n";

/** @const {!HTMLButtonElement} */
const ChainButton = dom.button(Css.ChainButton);
/** @const {!Array<function(ChainId)>} */
const OnChainChange = [];
/** @const {!Array<function(!Provider)>} */
const OnProviderChange = [];
/** @const {!Array<function(!Array<string>)>} */
const OnAddressChange = [];
/** @type {!Provider} */
let SelectedProvider = DummyProvider;
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
  SelectedChain.replaceChild(ChainButton.firstElementChild.cloneNode(true),
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
  ChainButton.replaceChild(
    li.firstElementChild.cloneNode(true), ChainButton.firstElementChild);
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
    for (const f of OnChainChange) f(newChain);
  }
}

/** @param {!Array<string>} addresses */
const addressChanged = (addresses) => {
  if (!addresses || !addresses.length)
    Wallet.disconnect();
  else if (addresses[0] != Address) {
    Address = addresses[0];
    Wallet.rightPane.showPane(2);
    for (const f of OnAddressChange) f(addresses);
  }
}

/** @param {ChainId} chainId */
const chainSelected = (chainId) => {
  if (!SelectedProvider.isChainSupported(chainId))
    SelectedProvider.disconnect();
  SelectedProvider.switchChain(chainId);
}

/** @param {ProviderId} providerId */
const providerSelected = (providerId) => {
  const currentProvider = SelectedProvider;
  const provider = Providers[providerId];
  if (currentProvider == provider) return;
  SelectedProvider = provider;
  provider.connect(ChainList.selected, chainChanged, addressChanged)
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
 *   cookieDomain: string,
 *   defaultChain: ChainId,
 *   chains: !Array<ChainId>,
 *   chainNotes: !Object<ChainId, I18nString>,
 *   piggyback: (string | undefined),
 *   children: (!Array<Element> | undefined)
 * }} props
 */
const Wallet = ({ cookieDomain, defaultChain, chains, chainNotes, piggyback, children }) => {
  /** @const {!HTMLButtonElement} */
  const AddressButton = dom.button(Css.AddressButton);
  /** @const {!HTMLDivElement} */
  const Dropdown = dom.div(Css.Dropdown);
  /** @const {!HTMLDivElement} */
  const ConnectedPane = dom.div(Css.ConnectedPane);
  /** @const {string} */
  Wallet.cookieDomain = cookieDomain;
  /** @const {string} */
  Wallet.connectText = AddressButton.innerText;

  DummyProvider.connect(defaultChain, chainChanged, addressChanged);

  return (
    <div id={Css.Root}>
      <Css />
      <ChainButton class={SharedCss.Button} controlsDropdown={Dropdown}>
        <Image src={chainImageSrc(defaultChain)}
          width={32} height={32}
          bundleWidth={64} bundleHeight={64}
          inline piggyback={piggyback} />
      </ChainButton>
      <AddressButton class={SharedCss.Button} onClick={ChainButton.onclick}>{{
        en: "Connect wallet", tr: "Cüzdan bağla",
      }}</AddressButton>
      <Dropdown nodisplay onClick={dropdownClicked}>
        <ChainList
          defaultChain={defaultChain} chains={chains} chainNotes$={chainNotes} piggyback={piggyback} />
        <Switch id={Css.RightPane} instance={Wallet.rightPane} initialSelected={0}>
          <EvmProviderList />
          <MinaProviderList />
          <ConnectedPane>
            <Profile
              copyAddress={() => { }}
              openExplorer={() => { }}
              openDeBank={() => { }} />
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
Wallet.open = () => ChainButton.click();

Wallet.disconnect = () => {

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

export default Wallet;
