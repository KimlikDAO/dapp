import Css from "./birim.css";
import EliptikEğriler from "/birim/blog/eliptik-egriler/birim.jsx";
import EliptikImza from "/birim/blog/eliptik-imza/birim.jsx";

export default () => (
  <div id="ka" class="an3">
    <Css />
    <div id="kaa">
      <h2 data-en="Learn & Earn with your KPass." class="oblu">KPass’inle öğren ve kazan.</h2>
      <span class="anac"
        data-en="Delve into KimlikDAO's blog for in-depth articles on cryptography and the mathematical aspects of cryptocurrencies. Answer a few simple questions and present your KPass’s completely anonymous HumanID section to claim your reward from a pool worth tens of thousands of dollars. Coming soon!">
        KimlikDAO blog’un bilgi dolu ve ödüllü makalelerini oku, basit soruları cevapla,
        KPass’inin %100 anonim HumanID kısmını sunarak on binlerce dolarlık havuzdan
        ödülünü topla. Çok yakında!</span><br />
      <a href={{ en: "//blog.kimlikdao.org/en", tr: "//blog.kimlikdao.org/tr" }} class="info btn anust"
        data-en="Learn & earn (Soon!)">Öğren ve kazan (Yakında!)</a>
    </div>
    <EliptikImza href="" />
    <EliptikEğriler href="" />
  </div>
);
