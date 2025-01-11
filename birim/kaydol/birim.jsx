import Css from "./birim.css";
import OrtakCss from "/birim/ortakcss/birim.jsx";

const Kaydol = ({ id }) => (
  <form id={id}>
    <Css />
    <input inputmode="email" autocomplete="email" name="email" class={Css.Girdi} type="email"
      placeholder={{ en: "Your email address", tr: "E-posta adresiniz" }} />
    <button class={[OrtakCss.Düğme, "act", "kayb"]} type="submit">{{
      en: "Subscribe", tr: "Kaydol"
    }}</button>
  </form >
);

export default Kaydol;
