import { Auro } from "./connectors/auro";
import { Core } from "./connectors/core";
import { Dummy } from "./connectors/dummy";
import { MetaMask } from "./connectors/metamask";
import { Rabby } from "./connectors/rabby";
import Css from "./Wallet.css";
import {
  WalletConnector as Connector,
  Provider
} from "/lib/crosschain/walletConnector";
import { EIP6963ProviderDetail } from "/lib/ethereum/provider.d";
import Image from "/lib/kastro/Image";
import dom from "/lib/kastro/dom";

/** @enum {string} */
const ConnectorId = {
  Dummy: "__",
  Core: "co",
  MetaMask: "me",
  Rabby: "ra",
  Auro: "au"
};

/** @type {Record<ConnectorId, Connector>} */
const Connectors = {
  [ConnectorId.Dummy]: Dummy,
  [ConnectorId.Rabby]: Rabby,
  [ConnectorId.Core]: Core,
  [ConnectorId.MetaMask]: MetaMask,
  [ConnectorId.Auro]: Auro
}

/**
 * @param {string} name
 * @return {string} url
 */
const connectorImageSrc = (name) => `components/wallet/img/${name.split(" ")[0].toLowerCase()}.svg`;

/**
 * @noinline
 * @param {{
 *   connectorId: ConnectorId,
 *   name$: string
 * }} props
 */
const ConnectorListItem = ({ connectorId, name$ }) => {
  const Item = dom.li(`${Css.Root}.${connectorId}`);
  const button = Item.children[2];
  const provider = Connectors[connectorId];

  if (provider.isInitialized()) {
    dom.hide(button);
    Item.classList.add(Css.On);
  } else
    button.onclick = () => window.open(provider.downloadURL(), "_blank").focus();

  return (
    <Item>
      <Image src={connectorImageSrc(name$)} width={32} height={32} />
      <div class={Css.ProviderLight}></div> {name$}
      <span class={[Css.Button, Css.DownloadWalletButton]}>{{
        en: "GET",
        tr: "İNDİR"
      }}</span>
    </Item>
  );
}

/**
 * @param {ConnectorId} connectorId
 * @param {Provider} provider
 */
ConnectorListItem.initialize = (connectorId, provider) => {
  const item = dom.li(`${Css.Root}.${connectorId}`);
  dom.hide(item.children[2]);
  item.classList.add(Css.On);
  const connector = Connectors[connectorId];
  if (connector)
    connector.setProvider(provider);
}

/**
 * @param {Event} event
 */
const onAnnounceProvider = (event) => {
  const { info, provider } = /** @type {EIP6963ProviderDetail} */(event["detail"]);
  const idx = info.rdns.indexOf(".");
  const connectorId = /** @type {ConnectorId} */(info.rdns.slice(idx + 1, idx + 3));
  if (connectorId in Connectors)
    ConnectorListItem.initialize(connectorId, provider);
}

window.addEventListener("eip6963:announceProvider", onAnnounceProvider);
window.dispatchEvent(new Event("eip6963:requestProvider"));

const EthereumConnectorList = () => (
  <ul class={Css.DropdownList}>
    <ConnectorListItem connectorId={ConnectorId.Rabby} name$="Rabby Wallet" />
    <ConnectorListItem connectorId={ConnectorId.Core} name$="Core" />
    <ConnectorListItem connectorId={ConnectorId.MetaMask} name$="Metamask" />
  </ul>
);

const MinaConnectorList = () => (
  <ul class={Css.DropdownList}>
    <ConnectorListItem connectorId={ConnectorId.Auro} name$="Auro" />
  </ul>
);

export {
  ConnectorId,
  Connectors,
  EthereumConnectorList,
  MinaConnectorList
};
