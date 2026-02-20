import Wallet from "../Wallet";
import WalletCss from "../Wallet.css";
import {
  Briefcase2,
  Revoke,
  SwitchWallet,
  Vote
} from "/components/icons/Icons";
import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";
import { I18nString } from "/lib/util/i18n";

const Css = css`
  /** @export */
  #Root {}

  #Root > li > a {
    display: flex;
    align-items: center;
    height: 45px;
    width: 100%;
    padding: 6px 12px;
    margin: -6px -12px;  /* compensate for li padding */
    color: inherit;
    text-decoration: none;
    border-radius: 8px;
  }
`;

/**
 * @param {{
 *   ambassadorUrl$: I18nString,
 *   voteUrl$: I18nString,
 *   revokeUrl$: I18nString,
 * }} props
 */
export default ({ ambassadorUrl$, voteUrl$, revokeUrl$ }) => {
  /** @const {HTMLUListElement} */
  const Root = dom.ul(Css.Root);

  return (
    <Root class={WalletCss.DropdownList}>
      <Css />
      <li>
        <a href={ambassadorUrl$}>
          <Briefcase2 height={16} width={16} />{" "}{{
            en: "Ambassador program",
            tr: "Ambassador ol"
          }}
        </a>
      </li>
      <li>
        <a href={voteUrl$}>
          <Vote height={16} width={16} />{" "}{{
            en: "Vote",
            tr: "Oy kullan"
          }}
        </a>
      </li>
      <li>
        <a href={revokeUrl$}>
          <Revoke height={16} width={16} />{" "}{{
            en: "Revoke KPass",
            tr: "İptal işlemleri"
          }}
        </a>
      </li>
      <li onClick={() => Wallet.disconnect()}>
        <SwitchWallet height={16} width={16} />{" "}{{
          en: "Switch wallet",
          tr: "Cüzdan değiştir"
        }}
      </li>
    </Root >
  );
}
