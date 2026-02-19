import dom from "/lib/util/dom";
import Css from "./ProcessingStatus.css";
import { LangCode } from "/lib/util/i18n";

const ProcessingStatus = () => {
  /** @const {HTMLDivElement} */
  const Root = dom.div(Css.Root);
  /** @const {HTMLDivElement} */
  const StatusText = dom.div(Css.StatusText);
  /** @const {HTMLDivElement} */
  const ErrorIcon = dom.div(Css.ErrorIcon);
  /** @const {HTMLDivElement} */
  const ProcessingIcon = dom.div(Css.ProcessingIcon);
  /** @const {HTMLButtonElement} */
  const RetryButton = dom.button(Css.RetryButton);

  return (
    <Root nodisplay>
      <Css />
      <ProcessingIcon>
        <div class={Css.Spinner}></div>
      </ProcessingIcon>
      <ErrorIcon>⚠️</ErrorIcon>
      <StatusText></StatusText>
      <RetryButton class={[Css.Button]}>{{
        en: "Try Again",
        tr: "Tekrar Dene"
      }}</RetryButton>
    </Root>
  );
};

/** @type {Array<string>} */
const ProgressMessages = dom.i18n({
  [LangCode.EN]: [
    "Uploading document",
    "Minting your KPass",
    "Computing VerifiableID"
  ],
  [LangCode.TR]: [
    "Belge yükleniyor",
    "KPass'iniz oluşturuluyor",
    "VerifiableID hesaplanıyor"
  ]
});

/** @type {Array<string>} */
const ErrorMessages = dom.i18n({
  [LangCode.EN]: [
    "The document is {} hours old. Please get a new document and upload here within 24 hours.",
    "The registry is invalid",
    "The institution name has to be filled in as exactly KimlikDAO.",
    "Person is not alive",
    "The \"Institution name\" needs to be filled in as KimlikDAO-{}. Make sure you use the same wallet address.",
    "Unable the authenticate the document with e-devlet. If you just got the document, wait for 30 seconds and try again.",
    "Incorrect PoW.",
    "Invalid PDF file"
  ],
  [LangCode.TR]: [
    "Belgenin son 24 saat içinde alınmış olması gerekli. Yüklediğiniz belge {} saat önce alınmış.",
    "Yüklediğiniz belgedeki nüfus kaydı geçersiz.",
    "Kurum adı KimlikDAO olmalı",
    "Kişi sağ değil",
    "Belgeyi alırken \"Kurum adı\" KimlikDAO-{} olarak girilmeli. Son 6 basamağı da doğru girdiniz mi? Farklı bir cüzdana mı geçtiniz?",
    "Belge e-devletten onaylanamadı. Belgeyi yeni aldıysanız 30sn sonra tekrar deneyin.",
    "PoW hatalı.",
    "Geçerli bir PDF dosyası yükleyin."
  ]
});

/**
 * Shows the component in processing state with the given message.
 * 
 * @param {string} message The status message to display
 */
ProcessingStatus.showProcessing = (message) => {
  const root = dom.byId(Css.Root);
  const statusText = dom.byId(Css.StatusText);
  const errorIcon = dom.byId(Css.ErrorIcon);
  const processingIcon = dom.byId(Css.ProcessingIcon);
  const retryButton = dom.byId(Css.RetryButton);

  dom.text.update(statusText, message);
  dom.show(root);
  dom.show(processingIcon);
  dom.show(statusText);
  dom.hide(errorIcon);
  dom.hide(retryButton);

  root.classList.remove(Css.Error);
  root.classList.add(Css.Processing);
};

/**
 * Shows the component in error state.
 * 
 * @param {number | { kod: number, ek: unknown[] }} error Error object or error code
 * @param {() => void=} retryFn Optional function to call when retry button is clicked
 */
ProcessingStatus.showError = (error, retryFn) => {
  const root = dom.byId(Css.Root);
  const statusText = dom.byId(Css.StatusText);
  const errorIcon = dom.byId(Css.ErrorIcon);
  const processingIcon = dom.byId(Css.ProcessingIcon);
  const retryButton = dom.byId(Css.RetryButton);

  // Handle both direct error code and error object
  let errorCode = typeof error === 'number' ? error : (error.kod || 7);
  let params = typeof error === 'number' ? null : (error.ek || []);

  let errorMessage = ErrorMessages[errorCode];

  // Replace placeholders with parameters
  if (params && params.length) {
    params.forEach((param) => {
      errorMessage = errorMessage.replace('{}', param);
    });
  }

  dom.text.update(statusText, errorMessage);
  dom.show(root);
  dom.show(errorIcon);
  dom.show(statusText);
  dom.hide(processingIcon);

  if (retryFn) {
    retryButton.onclick = retryFn;
    dom.show(retryButton);
  } else {
    dom.hide(retryButton);
  }

  root.classList.remove(Css.Processing);
  root.classList.add(Css.Error);
};

/**
 * Starts the automatic progress indication with predefined messages.
 */
ProcessingStatus.startProgress = () => {
  ProcessingStatus.showProcessing(ProgressMessages[0]);
  setTimeout(() => {
    ProcessingStatus.showProcessing(ProgressMessages[1]);
  }, 1500);
  setTimeout(() => {
    ProcessingStatus.showProcessing(ProgressMessages[2]);
  }, 3000);
};

/**
 * Hides the component.
 */
ProcessingStatus.hide = () => {
  dom.hide(dom.byId(Css.Root));
};

export default ProcessingStatus; 