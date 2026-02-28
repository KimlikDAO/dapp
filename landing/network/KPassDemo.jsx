import HeaderCss from "/components/header/Header.css";
import KPass from "/components/kpass/KPass";
import { css } from "/lib/kastro/StyleSheet";

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
    <div class={KPass.Css.CardContent}>
      <div class={KPass.Css.Label}>{{ en: "City of birth", tr: "Doğum yeri" }}</div>
      <div>{{ en: "Palo Alto, CA", tr: "İstanbul" }}</div>
      <div class={KPass.Css.Label}>{{ en: "Gender", tr: "Cinsiyet" }}</div>
      <div>{{ en: "F", tr: "K" }}</div>
    </div>
    <svg height={24} width={24} class={KPass.Css.Logo}>
      <use href={`#${HeaderCss.Logomark}`} width={24} height={24} />
    </svg>
    <div class={KPass.Css.Nav}>
      <button class={KPass.Css.Button}>
        <KPass.LeftArrow />
      </button>
      1 / 5
      <button class={KPass.Css.Button}>
        <KPass.RightArrow />
      </button>
    </div>
  </div>
);

export default KPassDemo;
