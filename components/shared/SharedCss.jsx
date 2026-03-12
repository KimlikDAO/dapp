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
/** @const */
SharedCss.Header = Header;
/** @const */
SharedCss.Wallet = Wallet;
/** @const */
SharedCss.LangPicker = LangPicker;
/** @const */
SharedCss.KPass = KPass;

export default SharedCss;
