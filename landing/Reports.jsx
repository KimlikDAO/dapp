import LandingCss from "./page.css";
import Feb25 from "/components/blog/2025.02/birim";
import SharedCss from "/components/sharedCss/SharedCss.css";

const Reports = () => (
  <div class={LandingCss.ThreeColumn}>
    <div></div>
    <Feb25 href={""} loading="lazy" />
    <div class={LandingCss.RightAligned}>
      <h2 class={SharedCss.Purple}>{{
        en: "KimlikDAO progress reports.",
        tr: "KimlikDAO ilerleme raporları."
      }}</h2>
      <span class={LandingCss.Description}>{{
        en: <>
          Read about the progress at KimlikDAO, from advancements in the KimlikDAO
          protocol to new uses of KPass, from the events we participate in, to the
          new partnerships we establish, in our monthly progress reports</>,
        tr: <>
          KimlikDAO’nun protokolündeki gelişmelerden yeni kullanım alanlarına
          katıldığımız etkinliklerden, kurduğumuz yeni ortaklıklara tüm
          gelişmelerini aylık ilerleme raporlarından okuyun.</>
      }}</span><br />
      <a href="//blog.kimlikdao.org" class={[SharedCss.Button, SharedCss.Blue, LandingCss.TopSpaced]}>{{
        en: "All progress reports",
        tr: "Tüm ilerleme raporları"
      }}</a>
    </div>
  </div>
);

export default Reports;
