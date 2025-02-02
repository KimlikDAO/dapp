import Css from "./SharedCss.css";
import Header from "/components/header/Header.css";
import KPass from "/components/kpass/KPass.css";
import LangPicker from "/components/langPicker/LangPicker.css";
import Wallet from "/components/wallet/Wallet.css";

const SharedCss = () => (<>
  <Css shared />
  <Header shared />
  <Wallet shared />
  <LangPicker shared />
  <KPass shared />
</>);

Object.assign(SharedCss, Css);
/** @enum {string} */
SharedCss.Header = Header;
/** @enum {string} */
SharedCss.Wallet = Wallet;
/** @enum {string} */
SharedCss.LangPicker = LangPicker;
/** @enum {string} */
SharedCss.KPass = KPass;

export default SharedCss;
