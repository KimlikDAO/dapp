import Yazar from "birim/blog/yazar/birim.jsx";
import BlogCss from "../birim.css";
import BannerResmi from "./banner.png";

export default ({ href, piggyback, loading }) => (
  <a href={href} class="blp">
    <BlogCss />
    <div>
      <BannerResmi piggyback={piggyback} class="blpp" width="100%" loading={loading}
        quality={60} bundleWidth={36 * 13} bundleHeight={19 * 13} />
      <h4 data-en="January 2025 progress report">Ocak 2025 ilerleme raporu</h4>
      <Yazar ad="KimlikDAO" />
      <div class="bly">{{
        en: "KimlikDAO January 2025 progress report will be published on January 31st.",
        tr: "KimlikDAO Ocak 2025 aylık ilerleme raporu 31 Ocak'ta yayıma alınacak."
      }}</div>
    </div>
    <div class="blf">
      <button class="bloku blmav" data-en="Read">Oku</button>
    </div>
  </a>
);
