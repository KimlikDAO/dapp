import PowWorker from "kastro:./powWorker.ts";
import { getCommitmentPow, getRand, splitCommitment } from "./commitment";
import Css from "./PopulationReg.css";
import ProcessingStatus from "./ProcessingStatus";
import ExternalLink from "/components/arrow.svg";
import CopyButton from "/components/elements/CopyButton";
import NavTitle from "/components/elements/NavTitle";
import SharedCss from "/components/shared/SharedCss.css";
import Wallet from "/components/wallet/Wallet";
import { chainIdToGroup } from "/lib/crosschain/chains";
import { combineMultiple } from "/lib/did/KPass";
import Router from "/lib/kastro/Router";
import protocol from "/lib/protocol/client";
import dom from "/lib/kastro/dom";

const PopulationReg = () => {
  /** @type {boolean} */
  PopulationReg.isVisible = false;
  /** @const {HTMLTableCellElement} */
  PopulationReg.commitment = dom.td(Css.Commitment);
  /** @type {string | null} */
  PopulationReg.commitmentPow;
  /** @type {Uint8Array} */
  PopulationReg.commitmentRand;
  /** @const {HTMLDivElement} */
  const Root = dom.div("pop-reg-root");
  /** @const {HTMLDivElement} */
  const FileDrop = dom.div(Css.FileDrop);
  /** @const {HTMLButtonElement} */
  const Button = dom.button(Css.Button);
  /** @const {HTMLInputElement} */
  const FileInput = dom.input(Css.FileInput);

  Wallet.onAddressChange(PopulationReg.computeCommitment);
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
              Trusted Execution Environment (TEE) içerisinde e-devlet’ten doğrulanır,
              metine çevrilir ve imzalanır. KimlikDAO düğüm operatörleri kişisel
              verilerinize erişemez.</>
          }}</p>
          <FileDrop class={Css.FileDrop} onDrop={PopulationReg.handleFileDrop} onDragOver={PopulationReg.handleDragOver} onDragLeave={PopulationReg.handleDragLeave}>
            {{ en: "Upload Population Registry Document", tr: "Nüfus Kayıt Örneği Belgesi Yükle" }}
            <br />
            <Button class={[SharedCss.Button, SharedCss.Action]} onClick={() => FileInput.click()}>{{
              en: "Upload",
              tr: "Yükle"
            }}</Button>
            <FileInput type="file" accept="application/pdf" onChange={PopulationReg.handleFileSelect} />
          </FileDrop>
          <ProcessingStatus />
        </li>
      </ol>
    </Root>
  );
};

/** @param {string | null} address */
PopulationReg.computeCommitment = (address) => {
  if (!PopulationReg.isVisible || !address) return;
  dom.text.setPreserve(PopulationReg.commitment);
  const chainGroup = chainIdToGroup(Wallet.chainId());

  const rand = getRand(address);
  getCommitmentPow(chainGroup, address, rand, PopulationReg.powWorker)
    .then((commitmentPow) => protocol.nko.getPDFCommitment(commitmentPow)
      .then((pdfCommitment) => {
        PopulationReg.commitmentPow = commitmentPow;
        PopulationReg.commitmentRand = rand;
        pdfCommitment = "KimlikDAO-" + pdfCommitment;
        dom.text.setPreserve(PopulationReg.commitment, pdfCommitment);
        CopyButton.setText(Css.CopyButton, pdfCommitment);
      }));
}

/**
 * Handles file selection from the file input
 * @param {Event | null} event
 */
PopulationReg.handleFileSelect = (event) => {
  const fileInput = /** @type {HTMLInputElement} */(event.target);
  if (fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    if (file.type === "application/pdf") {
      PopulationReg.uploadPDF(file);
    } else {
      ProcessingStatus.showError(7, () => {
        fileInput.value = '';
        ProcessingStatus.hide();
      });
    }
  }
};

/**
 * Handles file drop on the drop zone
 * @param {DragEvent | null} event
 */
PopulationReg.handleFileDrop = (event) => {
  event.preventDefault();
  const dropZone = dom.byId(Css.FileDrop);
  dropZone.classList.remove(Css.Active);

  if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    if (file.type === "application/pdf") {
      PopulationReg.uploadPDF(file);
    } else {
      ProcessingStatus.showError(7, () => {
        ProcessingStatus.hide();
      });
    }
  }
};

/**
 * Handles drag over event on the drop zone
 * @param {DragEvent} event
 */
PopulationReg.handleDragOver = (event) => {
  event.preventDefault();
  dom.byId(Css.FileDrop).classList.add(Css.Active);
};

/**
 * Handles drag leave event on the drop zone
 * @param {DragEvent} event
 */
PopulationReg.handleDragLeave = (event) => {
  event.preventDefault();
  dom.byId(Css.FileDrop).classList.remove(Css.Active);
};

/** @param {File} file */
PopulationReg.uploadPDF = (file) => {
  const commitmentPow = PopulationReg.commitmentPow;
  if (!commitmentPow) return;
  const clientTime = Date.now() / 1000 | 0;
  const { commitmentR, commitmentAnonR } = splitCommitment(
    /** @type {Uint8Array} */(PopulationReg.commitmentRand)
  );

  /** @const {FormData} */
  const formData = new FormData();
  formData.set("f", file);

  ProcessingStatus.startProgress();

  protocol.nko.getCredentialsFromPDF(
    commitmentPow,
    formData,
    clientTime,
    7
  ).then(
    (credentials) => {
      ProcessingStatus.hide();

      const decryptedCredentials = combineMultiple(
        credentials,
        commitmentR,
        commitmentAnonR,
        3
      );
      console.log(decryptedCredentials);
      Router.navigate("sources");
    },
    (error) => ProcessingStatus.showError(/** @type {{ ek: unknown[], kod: number }} */(error))
  )}

PopulationReg.show = () => {
  PopulationReg.isVisible = true;
  PopulationReg.computeCommitment(Wallet.address());
}

PopulationReg.close = () => {
  PopulationReg.isVisible = false;
  Router.navigate("sources");
}

export default PopulationReg;
