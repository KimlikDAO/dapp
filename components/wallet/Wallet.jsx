import Css from "./Wallet.css";
import { chainImageSrc, ChainInfos } from "/components/chains/chains";
import SharedCss from "/components/shared/SharedCss";
import { ChainId } from "/lib/crosschain/chains";
import { Image } from "/lib/kastro/image";
import dom from "/lib/util/dom";
import { I18nString } from "/lib/util/i18n";

/**
 * @param {{
 *   defaultChain: ChainId,
 *   chains: !Array<ChainId>,
 *   chainNotes: !Object<ChainId, I18nString>,
 *   piggyback: string
 * }=} props
 */
const ChainList = ({ chains, chainNotes, defaultChain, piggyback }) => (
  <ul id={Css.ChainList} class={Css.DropdownList}>
    {chains.map((id) => (
      <li id={Css.Root + id} class={id == defaultChain ? SharedCss.Selected : ""}>
        {id == defaultChain
          ? <span></span>
          : <Image src={chainImageSrc(id)}
            width={32} height={32}
            bundleWidth={64} bundleHeight={64} piggyback={piggyback} />}
        {" "}
        {chainNotes[id]
          ? <div>{ChainInfos[id].uiName}<div class={Css.ChainNote}>{chainNotes[id]}</div></div>
          : ChainInfos[id].uiName}
      </li>
    ))}
  </ul>
);

/** @define {ChainId} */
const DefaultChain = ChainId.xa4b1;

/**
 * @param {{
 *   defaultChain: ChainId,
 *   chains: !Array<ChainId>,
 *   chainNotes: !Object<ChainId, I18nString>,
 *   piggyback: string,
 * }=} props
 */
const Wallet = ({ defaultChain, chains, chainNotes, piggyback }) => {
  /** @const {!HTMLButtonElement} */
  const ChainButton = dom.button(Css.ChainButton);
  /** @const {!HTMLButtonElement} */
  const AddressButton = dom.button(Css.AddressButton);
  /** @const {!HTMLDivElement} */
  const Dropdown = dom.div(Css.Dropdown);
  /** @const {string} */
  Wallet.connectText = AddressButton.innerText;

  /** @const {!HTMLLIElement} */
  const SelectedChain = dom.li(Css.Root + DefaultChain);
  SelectedChain.replaceChild(ChainButton.firstElementChild.cloneNode(true),
    SelectedChain.firstElementChild);

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
      <Dropdown nodisplay>
        <ChainList
          defaultChain={defaultChain} chains={chains} chainNotes={chainNotes} piggyback={piggyback} />
      </Dropdown>
    </div>
  );
}

export default Wallet;
