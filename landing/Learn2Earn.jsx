import LandingCss from "./page.css";
import ECDSA from "/components/blog/ecdsa/ECDSA";
import EliptikEğriler from "/components/blog/eliptik-egriler/birim";
import SharedCss from "/components/ortakcss/birim.css";
import { ExternalPage } from "/crate";
import { css } from "/lib/kastro/stylesheet";

/** @enum {string} */
const Css = css`
  #Content {
    padding: 20px;
  }
`;

const Learn2Earn = () => (
  <div class={LandingCss.Üçlü}>
    <Css />
    <div id={Css.Content}>
      <h2 class={SharedCss.Mavi}>{{
        en: "Learn & Earn with your KPass.",
        tr: "KPass’inle öğren ve kazan."
      }}</h2>
      <span class={LandingCss.Description}>{{
        en: <>Explore KimlikDAO's blog for in-depth articles on cryptography and the
          mathematical aspects of cryptocurrencies. Answer a few simple questions and present
          your KPass’s completely anonymous HumanID section to claim your reward from a pool
          worth tens of thousands of dollars. Coming soon!</>,
        tr: <>KimlikDAO blog’un bilgi dolu ve ödüllü makalelerini oku, basit soruları cevapla,
          KPass’inin %100 anonim HumanID kısmını sunarak on binlerce dolarlık havuzdan ödülünü
          topla. Çok yakında!</>
      }}</span>
      <br />
      <a href={ExternalPage.Blog} class={[SharedCss.Düğme, SharedCss.Bilgi, LandingCss.TopSpaced]}>{{
        en: "Learn & earn (Soon!)",
        tr: "Öğren ve kazan (Yakında!)"
      }}</a>
    </div>
    <ECDSA href="" />
    <EliptikEğriler href="" />
  </div>
);

export default Learn2Earn;
