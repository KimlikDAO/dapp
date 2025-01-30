import Css from "./birim.css";
import Cüzdan from "/birim/cüzdan/birim";
import SağMenü from "/birim/cüzdan/sağMenü";
import Dil from "/birim/dil/birim";
import Logo from "/birim/logo.svg";
import OkResmi from "/birim/ok.svg";
import OrtakCss from "/birim/ortakcss/birim";
import { ExternalPage, Page } from "/crate";
import { ChainId } from "/lib/crosschain/chains";
import dom from "/lib/util/dom";
import { I18nString } from "/lib/util/i18n";

/**
 * @param {{
 *   Chains: !Array<ChainId>,
 *   ChainNotes: !Object<ChainId, I18nString>,
 *   DefaultChain: ChainId,
 * }=} props
 * @return {Promise<string>}
 */
const Başlık = ({ Chains, ChainNotes, DefaultChain }) => {
  Cüzdan.kpassDeğişince((_, dosyaSözü) => {
    /** @const {!HTMLAnchorElement} */
    const eylemDüğmesi = dom.a(Css.EylemDüğmesi);
    /** @type {!Text} */(eylemDüğmesi.firstChild).data = dosyaSözü
      ? dom.i18n({ tr: "KPass’ini incele", en: "View KPass" })
      : dom.i18n({ tr: "Hemen KPass al", en: "Mint KPass" })
    eylemDüğmesi.href = dosyaSözü
      ? dom.i18n(Page.KPassim)
      : dom.i18n(Page.Al);
  });
  return (
    <div id={Css.Başlık}>
      <Css />
      <a href="/" id={OrtakCss.Başlık.Logo}>
        <Logo id={OrtakCss.Başlık.Logomark} height={35} inline />KimlikDAO</a>
      <div id={OrtakCss.Başlık.Linkler}>
        <a class={OrtakCss.Başlık.Link} href={ExternalPage.Join}>{{
          en: "Join us", tr: "Aramıza katıl"
        }}</a>
        <a class={OrtakCss.Başlık.Link} href={ExternalPage.Discord} target="_blank"
          rel="noreferrer">Discord</a>
        <Dil />
        <Cüzdan Chains={Chains} DefaultChain={DefaultChain} ChainNotes={ChainNotes}>
          <SağMenü />
        </Cüzdan>
        <a id={Css.EylemDüğmesi} href={Page.Al} class={[OrtakCss.Düğme, OrtakCss.Eylem]}>{{
          en: "Mint KPass", tr: "Hemen KPass al"
        }}<OkResmi inline /></a>
      </div>
    </div>
  );
}

export default Başlık;
