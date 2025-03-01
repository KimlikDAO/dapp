import PowWorker from "kastro:./powWorker.js";
import { getCommitmentPow, getRand } from "./commitment";
import Css from "./PopulationReg.css";
import ExternalLink from "/al/tanışma/external-link.svg";
import CopyButton from "/components/elements/CopyButton";
import NavTitle from "/components/elements/NavTitle";
import SharedCss from "/components/shared/SharedCss.css";
import Wallet from "/components/wallet/Wallet";
import { chainIdToGroup } from "/lib/crosschain/chains";
import Router from "/lib/kastro/Router";
import network from "/lib/node/network";
import dom from "/lib/util/dom";

const PopulationReg = () => {
  /** @type {?string} */
  PopulationReg.calculatingText;
  /** @type {boolean} */
  PopulationReg.isVisible = false;
  /** @const {!HTMLTableCellElement} */
  PopulationReg.commitment = dom.td(Css.Commitment);
  /** @const {!HTMLDivElement} */
  const Root = dom.div("pop-reg-root");
  /** @const {!HTMLDivElement} */
  const FileDrop = dom.div(Css.FileDrop);
  /** @const {!HTMLButtonElement} */
  const Button = dom.button(Css.Button);

  Wallet.onAddressChange((address) => address && PopulationReg.computeCommitment(address));
  return (
    <Root>
      <Css />
      <PowWorker instance={PopulationReg.powWorker} />
      <NavTitle
        id="pop-reg-title"
        title$={{ en: "Add Population Registry", tr: "Nüfus kayıt örneği ekle" }}
        backFn={PopulationReg.close} />

      <ol id={Css.Steps}>
        <li>{{
          en: <>You need a <b>population registry document</b> from Turkish e-Government.
            Use these exact settings when filling out the form:</>,
          tr: <>e-Devlet'ten <b>nüfus kayıt örneği</b> almanız gerekiyor.
            Formu doldururken şu ayarları kullanın:</>
        }}
          <table id={Css.Table}>
            <tr>
              <td>{{ en: "Certificate type", tr: "Belge tipi" }}</td>
              <td>{{ en: "Self", tr: "Kişi" }}</td>
            </tr>
            <tr>
              <td>{{ en: "Former spouse list", tr: "Eski eş listesi" }}</td>
              <td>{{ en: "No", tr: "Hayır" }}</td>
            </tr>
            <tr>
              <td>{{ en: "Background check", tr: "Vukuatlı" }}</td>
              <td>{{ en: "No", tr: "Hayır" }}</td>
            </tr>
            <tr>
              <td>{{ en: "Purpose", tr: "Belgenin veriliş amacı" }}</td>
              <td>{{ en: "Present to institution", tr: "Kuruma ibraz" }}</td>
            </tr>
            <tr>
              <td>{{ en: "Institution name", tr: "Kurum adı" }}</td>
              <PopulationReg.commitment>Calculating...
                <CopyButton width$={16} height$={16} id$={Css.CopyButton} />
              </PopulationReg.commitment>
            </tr>
          </table>
          <p class={Css.Tip}>{{
            en: <>
              <b>Important:</b> You can only request one document per day, so please review
              the required settings above carefully before proceeding.
            </>,
            tr: <>
              <b>Önemli:</b> Günde sadece bir belge talep edebilirsiniz,
              bu nedenle lütfen yukarıdaki bilgileri dikkatlice inceleyin.
            </>
          }}</p>
        </li>

        <li>{{
          en: <>Review the settings above and visit the <a href="https://www.turkiye.gov.tr/nvi-nufus-kayit-ornegi-belgesi-sorgulama"
            target="_blank"
            class={Css.Link}>
            e-Government Portal <ExternalLink inline /></a>{" "}
            and enter them exactly as shown. The institution name must match precisely.</>,
          tr: <>Yukarıdaki tabloyu inceleyin ve <a href="https://www.turkiye.gov.tr/nvi-nufus-kayit-ornegi-belgesi-sorgulama"
            target="_blank"
            class={Css.Link}>
            E-devlet Nüfus Kayıt Örneği sayfası <ExternalLink inline /></a>’na gidip
            ve bilgileri girin. Kurum adının birebir aynı olması gerekiyor.</>
        }}<p class={Css.Tip}>{{
          en: <>
            <b>Tip:</b> If you make a mistake, you can try again with a different "Certificate type".
            You can request one document per day for each type: Individual, Family, or Population Family and we accept all of them.
          </>,
          tr: <>
            <b>İpucu:</b> Eğer bir hata yaparsanız, farklı bir belge tipi ile tekrar deneyebilirsiniz.
            Kişi, Aile veya Nüfus Aile olmak üzere her belge tipi için günde bir belge alabilirsiniz.
          </>
        }}</p>
        </li>
        <li>
          {{
            en: "Download the PDF document and upload it here.",
            tr: "PDF belgesini indirin ve buraya yükleyin."
          }}
          <p class={Css.Tip}>{{
            en: <><b>Note: </b>
              The PDF document is parsed, validated against e-government and signed by KimlikDAO nodes inside
              Trusted Execution Environment (TEE).
              KimlikDAO node operators cannot see your personal data.</>,
            tr: <><b>Not: </b>
              Yüklediğiniz PDF belgesi KimlikDAO düğümleri tarafından
              Trusted Execution Environment (TEE) içerisinde e-devlet'ten doğrulanır,
              metine çevrilir ve imzalanır. KimlikDAO düğüm operatörleri kişisel
              verilerinize erişemez.</>
          }}</p>
          <FileDrop class={Css.FileDrop}>
            {{ en: "Upload Population Registry Document", tr: "Nüfus Kayıt Örneği Belgesi Yükle" }}
            <br />
            <Button class={[SharedCss.Button, SharedCss.Action]}>{{
              en: "Upload",
              tr: "Yükle"
            }}</Button>
          </FileDrop>
        </li>
      </ol>
    </Root>
  );
};

/**
 * @param {string=} text
 */
PopulationReg.setCommitText = (text) => {
  /** @const {!Text} */
  const node = /** @type {!Text} */(PopulationReg.commitment.firstChild);
  if (PopulationReg.calculatingText)
    node.data = text || PopulationReg.calculatingText;
  else {
    PopulationReg.calculatingText = node.data;
    if (text) node.data = text;
  }
}

/** @param {string} address */
PopulationReg.computeCommitment = (address) => {
  if (!PopulationReg.isVisible) return;
  PopulationReg.setCommitText();
  const chainGroup = chainIdToGroup(Wallet.chainId());

  const rand = getRand(address);
  const commitmentPow = getCommitmentPow(chainGroup, address, rand, PopulationReg.powWorker);
  commitmentPow
    .then((commitmentPow) => network.nko.getPDFCommitment(commitmentPow))
    .then((pdfCommitment) => {
      pdfCommitment = "KimlikDAO-" + pdfCommitment;
      /** @type {!Text} */(PopulationReg.commitment.firstChild).data = pdfCommitment;
      CopyButton.setText(Css.CopyButton, pdfCommitment);
    });
}

PopulationReg.show = () => {
  PopulationReg.isVisible = true;
  const address = Wallet.address();
  if (address)
    PopulationReg.computeCommitment(address);
}

PopulationReg.close = () => {
  PopulationReg.isVisible = false;
  Router.navigate("sources");
}

export default PopulationReg;
