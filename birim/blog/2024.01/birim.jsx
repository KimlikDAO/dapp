import Yazar from "birim/blog/yazar/birim.jsx";
import BlogCss from "../birim.css";

export default ({ href, loading }) => (
  <a href={href} class="blp">
    <BlogCss />
    <div>
      <img src="/birim/blog/2024.01/banner.png" class="blpp" width="100%" loading={loading} />
      <h4 data-en="January 2024 progress report">Ocak 2024 ilerleme raporu</h4>
      <Yazar ad="KimlikDAO" />
      <div class="bly" data-en="KimlikDAO January 2024 progress report will be published on January 31st.">
        KimlikDAO Ocak 2024 aylık ilerleme raporu 31 Ocak'ta yayıma alınacak.
      </div>
    </div>
    <div class="blf">
      <button class="bloku blmav" data-en="Read">Oku</button>
    </div>
  </a>
);
