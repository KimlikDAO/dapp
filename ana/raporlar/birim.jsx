import AnaCss from "../sayfa.css";
import Jan25 from "/birim/blog/2025.01/birim.jsx";
import OrtakCss from "/birim/ortakcss/birim.css";

export default () => (
  <div id="ra" class={AnaCss.Üçlü}>
    <div></div>
    <Jan25 href={{ en: "", tr: "" }} loading="lazy" />
    <div class={AnaCss.SağaYaslı}>
      <h2 data-en="KimlikDAO progress reports." class={OrtakCss.Mor}>KimlikDAO ilerleme raporları.</h2>
      <span class={AnaCss.Açıklama}>{{
        en:
          "Read about the progress at KimlikDAO, from advancements in the KimlikDAO " +
          "protocol to new uses of KPass, from the events we participate in, to the " +
          "new partnerships we establish, in our monthly progress reports",
        tr:
          "KimlikDAO’nun protokolündeki gelişmelerden yeni kullanım alanlarına, " +
          "katıldığımız etkinliklerden, kurduğumuz yeni ortaklıklara tüm " +
          "gelişmelerini aylık ilerleme raporlarından okuyun."
      }}</span><br />
      <a href="//blog.kimlikdao.org" class={[OrtakCss.Düğme, "more", "anust"]}>{{
        en: "All progress reports",
        tr: "Tüm ilerleme raporları"
      }}</a>
    </div>
  </div >
);
