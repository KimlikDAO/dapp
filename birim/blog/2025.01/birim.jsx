import BlogCss from "../birim.css";
import Yazar from "../Yazar";
import BannerResmi from "./banner.png";

/**
 * @param {{
 *   href: string,
 *   piggyback: string,
 *   loading: boolean
 * }=} props
 * @return {Promise<string>}
 */
const Jan25 = ({ href, piggyback, loading }) => (
  <a href={href} class={BlogCss.Preview}>
    <BlogCss />
    <div>
      <BannerResmi piggyback={piggyback} class={BlogCss.PreviewBanner} width="100%"
        loading={loading}
        quality={60}
        bundleWidth={36 * 13}
        bundleHeight={19 * 13} />
      <h4>{{
        en: "January 2025 progress report", tr: "Ocak 2025 ilerleme raporu"
      }}</h4>
      <Yazar ad="KimlikDAO" />
      <div class={BlogCss.PreviewMetni}>{{
        en: "KimlikDAO January 2025 progress report will be published on January 31st.",
        tr: "KimlikDAO Ocak 2025 aylık ilerleme raporu 31 Ocak'ta yayıma alınacak."
      }}</div>
    </div>
    <div class={BlogCss.PreviewFooter}>
      <button class={[BlogCss.OkuDüğmesi, BlogCss.Mavi]}>{{
        en: "Read", tr: "Oku"
      }}</button>
    </div>
  </a>
);

export default Jan25;
