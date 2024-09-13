import Jan24 from "birim/blog/2024.01/birim.jsx";

export default () => (
  <div id="ra" class="an3">
    <div></div>
    <Jan24 href={{ en: "", tr: "" }} loading="lazy" />
    <div class="ansag">
      <h2 data-en="KimlikDAO progress reports." class="oprp">KimlikDAO ilerleme raporları.</h2>
      <span class="anac">{{
        "en":
          "Read about the progress at KimlikDAO, from advancements in the KimlikDAO " +
          "protocol to new uses of KPass, from the events we participate in, to the " +
          "new partnerships we establish, in our monthly progress reports",
        "tr":
          "KimlikDAO’nun protokolündeki gelişmelerden yeni kullanım alanlarına, " +
          "katıldığımız etkinliklerden, kurduğumuz yeni ortaklıklara tüm " +
          "gelişmelerini aylık ilerleme raporlarından okuyun."
      }}</span><br />
      <a href="//blog.kimlikdao.org" class="more btn anust" data-en="All progress reports">Tüm ilerleme raporları</a>
    </div>
  </div >
);
