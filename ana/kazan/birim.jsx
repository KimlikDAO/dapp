import AnaCss from "../sayfa.css";
import Css from "./birim.css";
import EliptikEğriler from "/birim/blog/eliptik-egriler/birim";
import EliptikImza from "/birim/blog/eliptik-imza/birim";
import OrtakCss from "/birim/ortakcss/birim.css";
import { ExternalPage } from "/crate";

const Kazan = () => (
  <div id={Css.Kök} class={AnaCss.Üçlü}>
    <Css />
    <div id={Css.İçerik}>
      <h2 class={OrtakCss.Mavi}>{{
        en: "Learn & Earn with your KPass.",
        tr: "KPass’inle öğren ve kazan."
      }}</h2>
      <span class={AnaCss.Açıklama}>{{
        en: <>Explore KimlikDAO's blog for in-depth articles on cryptography and the
          "mathematical aspects of cryptocurrencies. Answer a few simple questions and present
          "your KPass’s completely anonymous HumanID section to claim your reward from a pool
          "worth tens of thousands of dollars. Coming soon!</>,
        tr: <>KimlikDAO blog’un bilgi dolu ve ödüllü makalelerini oku, basit soruları cevapla,
          KPass’inin %100 anonim HumanID kısmını sunarak on binlerce dolarlık havuzdan ödülünü
          topla. Çok yakında!</>
      }}</span>
      <br />
      <a href={ExternalPage.Blog} class={[OrtakCss.Düğme, OrtakCss.Info, "anust"]}>{{
        en: "Learn & earn (Soon!)",
        tr: "Öğren ve kazan (Yakında!)"
      }}</a>
    </div>
    <EliptikImza href="" />
    <EliptikEğriler href="" />
  </div>
);

export default Kazan;
