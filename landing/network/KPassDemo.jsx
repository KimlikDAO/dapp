import HeaderCss from "/components/header/Header.css";
import KPass from "/components/kpass/KPass";
import { css } from "/lib/kastro/stylesheet";

/** @enum {string} */
const Css = css`
  #KPassDemo {
    width: 280px;
    height: 145px;
    margin: -20px auto 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 5px rgb(0 0 0 / 15%);
    position: relative;
  }`;

const KPassDemo = () => (
  <div id={Css.KPassDemo}>
    <Css />
    <div class={KPass.Css.CardContent}>
      <div class={KPass.Css.Label}>{{ tr: "Doğum yeri", en: "City of birth" }}</div>
      <div>{{ tr: "İstanbul", en: "Palo Alto, CA" }}</div>
      <div class={KPass.Css.Label}>{{ tr: "Cinsiyet", en: "Gender" }}</div>
      <div>{{ tr: "K", en: "F" }}</div>
    </div>
    <svg height={24} width={24} class={KPass.Css.Logo}>
      <use href={`#${HeaderCss.Logomark}`} width={24} height={24} />
    </svg>
    <div class={KPass.Css.Nav}>
      <button class={[KPass.Css.Button, KPass.Css.LeftButton]}>
        <KPass.LeftArrow />
      </button>
      1 / 5
      <button class={[KPass.Css.Button, KPass.Css.RightButton]}>
        <KPass.RightArrow />
      </button>
    </div>
  </div>
);

export default KPassDemo;
