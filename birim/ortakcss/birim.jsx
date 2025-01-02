import Css from "./birim.css";
import Başlık from "/birim/başlık/birim.css";
import Cüzdan from "/birim/cüzdan/birim.css";
import Dil from "/birim/dil/birim.css";
import KPass from "/birim/kpass/birim.css";

export default Object.assign(
  (props) => {
    props.shared = true;
    Css(props);
    Başlık(props);
    Cüzdan(props);
    Dil(props);
    KPass(props);
  },
  Css,
  {
    Başlık,
    Cüzdan,
    Dil,
    KPass
  }
);
