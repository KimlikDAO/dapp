import Css from "./birim.css";

const Kaydol = ({ id }) => (
  <form id={id}>
    <Css />
    <input inputmode="email" autocomplete="email" name="email" class="kayi" type="email"
      placeholder={{ en: "Your email address", tr: "E-posta adresiniz" }} /><button class="act btn kayb"
        data-en="Subscribe" type="submit">Kaydol</button>
  </form>
);

export default Kaydol;
