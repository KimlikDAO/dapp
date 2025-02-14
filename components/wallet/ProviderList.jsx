import { Auro } from "./providers/auro";
import { Core } from "./providers/core";
import { Dummy } from "./providers/dummy";
import { MetaMask } from "./providers/metamask";
import { Rabby } from "./providers/rabby";
import Css from "./Wallet.css";
import { Provider } from "/lib/crosschain/provider";
import "/lib/ethereum/provider.d";
import { Image } from "/lib/kastro/image";
import dom from "/lib/util/dom";

/** @enum {string} */
const ProviderId = {
  Dummy: "__",
  Core: "co",
  MetaMask: "me",
  Rabby: "ra",
  Auro: "au"
};

/** @type {!Object<ProviderId, !Provider>} */
const Providers = {
  [ProviderId.Dummy]: Dummy,
  [ProviderId.Rabby]: Rabby,
  [ProviderId.Core]: Core,
  [ProviderId.MetaMask]: MetaMask,
  [ProviderId.Auro]: Auro
}

/**
 * @param {string} name
 * @return {string} url
 */
const providerImageSrc = (name) => `components/wallet/img/${name.split(" ")[0].toLowerCase()}.svg`;

/**
 * @noinline
 * @param {{
 *   providerId: ProviderId,
 *   name$: (string|undefined)
 * }} props
 */
const ProviderListItem = ({ providerId, name$ }) => {
  /** @const {!HTMLLIElement} */
  const Item = dom.li(`${Css.Root}.${providerId}`);
  /** @const {!Element} */
  const button = Item.children[2];
  /** @const {!Provider} */
  const provider = Providers[providerId];

  if (provider.isInitialized()) {
    dom.hide(button);
    Item.classList.add(Css.On);
  } else
    button.onclick = () => window.open(provider.downloadURL(), "_blank").focus();

  return (
    <Item>
      <Image src={providerImageSrc(name$)} width={32} height={32} />
      <div class={Css.ProviderLight}></div> {name$}
      <span class={[Css.Button, Css.DownloadWalletButton]}>{{
        en: "GET",
        tr: "İNDİR"
      }}</span>
    </Item>
  );
}

/**
 * @param {ProviderId} providerId
 * @param {*} nativeProvider
 */
ProviderListItem.initialize = (providerId, nativeProvider) => {
  const item = dom.li(`${Css.Root}.${providerId}`);
  dom.hide(item.children[2]);
  item.classList.add(Css.On);
  const provider = Providers[providerId];
  if (provider)
    provider.setNativeProvider(nativeProvider);
}

/**
 * @param {!Event} event
 */
const onAnnounceProvider = (event) => {
  const { info, provider } = /** @type {eth.ProviderDetail} */(event["detail"]);
  /** @const {number} */
  const idx = info.rdns.indexOf(".");
  /** @const {ProviderId} */
  const providerId = /** @type {ProviderId} */(info.rdns.slice(idx + 1, idx + 3));
  if (providerId in Providers)
    ProviderListItem.initialize(providerId, provider);
}
window.addEventListener("eip6963:announceProvider", onAnnounceProvider);
window.dispatchEvent(new Event("eip6963:requestProvider"));

const EvmProviderList = () => (
  <ul class={Css.DropdownList}>
    <ProviderListItem providerId={ProviderId.Rabby} name$="Rabby Wallet" />
    <ProviderListItem providerId={ProviderId.Core} name$="Core" />
    <ProviderListItem providerId={ProviderId.MetaMask} name$="Metamask" />
  </ul>
);

const MinaProviderList = () => (
  <ul class={Css.DropdownList}>
    <ProviderListItem providerId={ProviderId.Auro} name$="Auro" />
  </ul>
);

export {
  EvmProviderList,
  MinaProviderList,
  ProviderId,
  Providers
};
