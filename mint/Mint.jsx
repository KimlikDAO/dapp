
import Css from "./Mint.css";
import Credentials from "/components/crendentials/Credentials";
import Header, { Wallet } from "/components/header/Header";
import HeaderCss from "/components/header/Header.css";
import Favicon from "/components/icon.svg";
import KPass from "/components/kpass/KPass";
import Lato400 from "/components/lato/l400.ttf";
import Lato700 from "/components/lato/l700.ttf";
import SharedCss from "/components/shared/SharedCss.css";
import { ChainConfig } from "/components/wallet/Wallet";
import { HostUrl, Page } from "/crate";
import { ChainId } from "/lib/crosschain/chains";
import { css } from "/lib/kastro/stylesheet";
import Switch from "/lib/kastro/Switch";
import dom from "/lib/util/dom";
import { LangCode } from "/lib/util/i18n";

/** @type {ChainConfig} */
const MintChainConfig = {
  defaultChain: ChainId.xa4b1,
  chains: [
    ChainId.x1,
    ChainId.xa4b1,
    ChainId.MinaMainnet,
    ChainId.x89,
    ChainId.xa86a,
    ChainId.x38,
  ],
  chainNotes$: {
    [ChainId.xa4b1]: { en: "Signal chain", tr: "Ana ağ" },
    [ChainId.MinaMainnet]: { en: "New ✨", tr: "Yeni ✨" },
  },
};

/** @enum {string} */
const JointCss = css`
  #${HeaderCss.Header} {
    grid-column: 1 / 3;
    grid-row: 1;
  }
`;

const Welcome = () => {
  const Button = dom.button(Css.WelcomeButton);
  return (
    <div id={Css.Welcome}>
      <h2>{{ en: "Welcome, here's your KPass 👋", tr: "Hoşgeldiniz, işte KPass'iniz 👋" }}</h2>
      <p>{{
        en: "You can click on the regenerate button to customize its appearance. For now, it contains no data and it's not written on chain. Let's add some data into it.",
        tr: "Görünümünü özelleştirmek için yeniden oluştur düğmesini kullanabilirsiniz. Şu anda içinde veri yok ve zincire yazılmamış. Haydi içine bazı veriler ekleyelim."
      }}</p>
      <Button
        onClick={(event) => {
          if (!Wallet.address()) Wallet.open();
          Mint.panes.showPane(1);
          event.stopPropagation();
        }}
        class={[SharedCss.Button, SharedCss.Action]}>
        {{ en: "Let's do it!", tr: "Haydi yapalım!" }}
      </Button>
    </div>
  );
}

/**
 * @param {{ Lang: LangCode }} props
 */
const Mint = ({ Lang }) => {
  return (
    <html lang={Lang}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>KimlikDAO | {{ en: "Mint KPass", tr: "KPass al" }}</title>
        <Lato400 shared />
        <Lato700 shared />
        <Favicon raster={32} rel="icon" />
        <SharedCss />
        <Css />
        <JointCss />
      </head>
      <body id={Css.Root}>
        <Header
          chainConfig={MintChainConfig}
          logoUrl$="/"
          title$="KimlikDAO"
          cookieDomain={`.${HostUrl.slice(8)}`}
          mintKPassUrl$={Page.Mint}
          viewKPassUrl={dom.i18n(Page.KPass)} />
        <div id={Css.LeftColumn}>
          <KPass style="" />
        </div>
        <Switch instance={Mint.panes} id={Css.Panes} initialSelected={0}>
          <Welcome />
          <Credentials />
        </Switch>
      </body>
    </html >
  );
}

export default Mint;
