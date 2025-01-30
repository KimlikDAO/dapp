import AnaCss from "./sayfa.css";
import Jan25 from "/birim/blog/2025.01/birim";
import OrtakCss from "/birim/ortakcss/birim.css";

const Raporlar = () => (
  <div class={AnaCss.Üçlü}>
    <div></div>
    <Jan25 href={""} loading="lazy" />
    <div class={AnaCss.SağaYaslı}>
      <h2 class={OrtakCss.Mor}>{{
        en: "KimlikDAO progress reports.",
        tr: "KimlikDAO ilerleme raporları."
      }}</h2>
      <span class={AnaCss.Açıklama}>{{
        en: <>
          Read about the progress at KimlikDAO, from advancements in the KimlikDAO
          protocol to new uses of KPass, from the events we participate in, to the
          new partnerships we establish, in our monthly progress reports</>,
        tr: <>
          KimlikDAO’nun protokolündeki gelişmelerden yeni kullanım alanlarına
          katıldığımız etkinliklerden, kurduğumuz yeni ortaklıklara tüm
          gelişmelerini aylık ilerleme raporlarından okuyun.</>
      }}</span><br />
      <a href="//blog.kimlikdao.org" class={[OrtakCss.Düğme, OrtakCss.Mavi, AnaCss.ÜstBoşluk]}>{{
        en: "All progress reports",
        tr: "Tüm ilerleme raporları"
      }}</a>
    </div>
  </div>
);

export default Raporlar;
