import Css from "./birim.css";
import Başlık from "/birim/başlık/birim.css";
import Cüzdan from "/birim/cüzdan/birim.css";
import Dil from "/birim/dil/birim.css";
import KPass from "/birim/kpass/birim.css";

const OrtakCss = () => <>
  <Css shared />
  <Başlık shared />
  <Cüzdan shared />
  <Dil shared />
  <KPass shared />
</>;

Object.assign(OrtakCss, Css);
OrtakCss.Başlık = Başlık;
OrtakCss.Cüzdan = Cüzdan;
OrtakCss.Dil = Dil;
OrtakCss.KPass = KPass;

export default OrtakCss;
