import LandingCss from "../Landing.css";
import Css from "./Holders.css";
import { chainImageSrc } from "/components/chains/chains";
import { Arrow } from "/components/icons/Icons";
import SharedCss from "/components/shared/SharedCss";
import { ChainId } from "/lib/crosschain/chains";
import { ChainId as Ethereum } from "/lib/ethereum/chains";
import Image from "/lib/kastro/Image";
import { ChainId as Mina } from "/lib/mina/chains";
import { Page } from "/mpa";

/**
 * @const {Record<ChainId, {
 *   chainName: string,
 *   chainSuffix: string,
 *   holders: number
 * }>}
 */
const Chains = {
  [Ethereum.x1]: { chainName: "ETHEREUM", chainSuffix: "’DA", holders: 13 },
  [Ethereum.xa86a]: { chainName: "AVALANCHE", chainSuffix: "’TA", holders: 57 },
  [Ethereum.x38]: { chainName: "BNB CHAIN", chainSuffix: "’DE", holders: 5 },
  [Ethereum.xa4b1]: { chainName: "ARBITRUM", chainSuffix: "’DA", holders: 8 },
  [Mina.Mainnet]: { chainName: "MINA", chainSuffix: "’DA", holders: 130 },
  [Ethereum.x89]: { chainName: "POLYGON", chainSuffix: "’DA", holders: 2 },
};

/**
 * @param {{ chainId: ChainId }} props
 */
const Bubble = ({ chainId }) => (
  <div class={[Css.Bubble, Css[chainId == Mina.Mainnet ? "mina" : chainId.slice(1)]]}>
    <Image src={chainImageSrc(chainId)} height={40} width={40} bundleHeight={64} bundleWidth={64} />
    <div>
      <div class={Css.BubbleCount}>{Chains[chainId].holders}</div>
      <span class={Css.BubbleName}>{{
        en: `HOLDERS ON ${Chains[chainId].chainName}`,
        tr: `${Chains[chainId].chainName} ${Chains[chainId].chainSuffix} KPASS`
      }}</span>
    </div>
  </div>
);

const Holders = () => (
  <div id={Css.Holders}>
    <div id={Css.Content}>
      <div class={LandingCss.RightAligned}>
        <h2>{{
          en: <>KPass holders<br />by chain.</>,
          tr: <>Ağlara göre<br />KPass sahipleri.</>,
        }}</h2>
        <span class={[Css.Text, LandingCss.Description]}>{{
          en: `Join over ${Object.values(Chains).reduce((sum, x) => sum + x.holders, 0)
            } KPass holders across ${Object.keys(Chains).length} different chains.`,
          tr: `6 farklı zincirde ${Object.values(Chains).reduce((sum, x) => sum + x.holders, 0)
            } KPass sahibi arasına katılın.`
        }}</span>
        <div id={Css.ActionBox}>
          <a href={Page.Mint} id={Css.ActionButton} class={[SharedCss.Button, SharedCss.Action]}>{{
            en: "Become a KPass holder",
            tr: "Sen de KPass sahibi ol"
          }} <Arrow /></a>
        </div>
      </div>
      <div id={Css.Bubbles}>
        {Object.keys(Chains).map((chainId) => (
          <Bubble key={chainId} chainId={chainId} />
        ))}
      </div>
    </div>
  </div>
);

export default Holders;
