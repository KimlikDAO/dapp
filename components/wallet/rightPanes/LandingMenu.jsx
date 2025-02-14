import Wallet from "../Wallet";
import WalletCss from "../Wallet.css";
import AmbassadorImage from "../img/ambassador.svg";
import SwitchImage from "../img/external-link.svg";
import RevokeImage from "../img/iptal.svg";
import VoteImage from "../img/vote.svg";
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
 *   ambassadorUrl$: (I18nString | undefined),
 *   voteUrl$: (I18nString | undefined),
 *   revokeUrl$: (I18nString | undefined),
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
          <AmbassadorImage inline />{" "}{{
            en: "Ambassador program",
            tr: "Ambassador ol"
          }}
        </a>
      </li>
      <li>
        <a href={voteUrl$}>
          <VoteImage width={16} height={16} />{" "}{{
            en: "Vote",
            tr: "Oy kullan"
          }}
        </a>
      </li>
      <li>
        <a href={revokeUrl$}>
          <RevokeImage inline />{" "}{{
            en: "Revoke KPass",
            tr: "İptal işlemleri"
          }}
        </a>
      </li>
      <li onClick={() => Wallet.disconnect()}>
        <SwitchImage inline />{" "}{{
          en: "Switch wallet",
          tr: "Cüzdan değiştir"
        }}
      </li>
    </Root >
  );
}
