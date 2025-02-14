import { Auro } from "./providers/auro";
import { Core } from "./providers/core";
import { Dummy } from "./providers/dummy";
import { MetaMask } from "./providers/metamask";
import { Rabby } from "./providers/rabby";
import Css from "./Wallet.css";
import { Provider } from "/lib/crosschain/provider";
import { Image } from "/lib/kastro/image";
import dom from "/lib/util/dom";

/** @enum {string} */
const ProviderId = {
  Dummy: "__",
  Core: "co",
  MetaMask: "mm",
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
 *   id: ProviderId,
 *   name$: (string|undefined)
 * }} props
 */
const ProviderListItem = ({ id, name$ }) => {
  /** @const {!HTMLLIElement} */
  const Root = dom.li(`${Css.Root}.${id}`);
  /** @const {!Provider} */
  const provider = Providers[id];
  /** @const {boolean} */
  const isAvailable = provider.initIfAvailable();

  if (!isAvailable) {
    console.log(`${id} is unavailable`);
    Root.classList.add(Css.Off);
    /** @const {!Element} */
    const button = Root.children[2];
    button.onclick = () => window.open(provider.downloadURL(), "_blank").focus();
    dom.show(button);
  }

  return (
    <Root>
      <Image src={providerImageSrc(name$)} width={32} height={32} />
      <div class={Css.ProviderLight}></div> {name$}
      <span class={[Css.Button, Css.DownloadWalletButton]} nodisplay>{{
        en: "GET",
        tr: "İNDİR"
      }}</span>
    </Root>
  );
}

const EvmProviderList = () => (
  <ul class={Css.DropdownList}>
    <ProviderListItem id={ProviderId.Rabby} name$="Rabby Wallet" />
    <ProviderListItem id={ProviderId.Core} name$="Core" />
    <ProviderListItem id={ProviderId.MetaMask} name$="Metamask" />
  </ul>
);

const MinaProviderList = () => (
  <ul class={Css.DropdownList}>
    <ProviderListItem id={ProviderId.Auro} name$="Auro" />
  </ul>
);

export {
  EvmProviderList,
  MinaProviderList,
  ProviderId,
  Providers
};
