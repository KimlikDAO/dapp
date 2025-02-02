import Css from "./birim.css";
import Header from "/components/header/Header.css";
import KPass from "/components/kpass/KPass.css";
import LangPicker from "/components/langPicker/LangPicker.css";
import Wallet from "/components/wallet/Wallet.css";

const OrtakCss = () => (<>
  <Css shared />
  <Header shared />
  <Wallet shared />
  <LangPicker shared />
  <KPass shared />
</>);

Object.assign(OrtakCss, Css);
/** @enum {string} */
OrtakCss.Header = Header;
/** @enum {string} */
OrtakCss.Wallet = Wallet;
/** @enum {string} */
OrtakCss.LangPicker = LangPicker;
/** @enum {string} */
OrtakCss.KPass = KPass;

export default OrtakCss;
