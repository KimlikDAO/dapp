import WalletCss from "./Wallet.css";
import AmbassadorImage from "/components/wallet/img/ambassador.svg";
import SwitchImage from "/components/wallet/img/external-link.svg";
import RevokeImage from "/components/wallet/img/iptal.svg";
import VoteImage from "/components/wallet/img/vote.svg";
import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";

const Css = css`
  /** @export */
  #Root {
    margin: 0;
    padding: 0;
  }
`;

export default () => {
  /** @const {HTMLUListElement} */
  const Root = dom.ul(Css.Root);

  return (
    <Root style={WalletCss.DropdownList}>
      <li onClick={() => window.location.href = "//join.kimlikdao.org/#sa-ambassador1"}>
        <AmbassadorImage inline />{" "}{{
          en: "Ambassador program",
          tr: "Ambassador ol"
        }}
      </li>
      <li onClick={() => window.location.href = "//kimlikdao.org/" + dom.i18n({ en: "vote", tr: "oyla" })}>
        <VoteImage width={16} height={16} />{" "}{{
          en: "Vote",
          tr: "Oy kullan"
        }}
      </li>
      <li onClick={() => window.location.href = "//kimlikdao.org/" + dom.i18n({ en: "revoke", tr: "iptal" })}>
        <RevokeImage inline />{" "}{{
          en: "Revoke KPass",
          tr: "İptal işlemleri"
        }}
      </li>
      <li onClick={() => Wallet.disconnect()}>
        <SwitchImage inline />{" "}{{
          en: "Switch wallet",
          tr: "Cüzdan değiştir"
        }}
      </li>
    </Root>
  );
}
