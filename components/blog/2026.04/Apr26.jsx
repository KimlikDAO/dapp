import Author from "../Author";
import BlogCss from "../blog.css";
import BannerImage from "./banner.png";
import { css } from "/lib/kastro/StyleSheet";

/** @enum {string} */
const Css = css`
  .Blue {
    color: #3182ce;
    background-color: #eaf3fa
  }
  .Blue:hover {
    background-color: #d6e8f7
  }
`;

/**
 * @param {{
 *   href: string,
 *   piggyback?: string,
 *   loading?: string
 * }} props
 */
const Apr26 = ({ href, piggyback, loading }) => (
  <a href={href} class={BlogCss.Preview}>
    <div>
      <BannerImage piggyback={piggyback} class={BlogCss.PreviewBanner} width="100%"
        loading={loading}
        quality={60}
        bundleWidth={36 * 13}
        bundleHeight={19 * 13} />
      <h4>{{
        en: "April 2026 progress report", tr: "Nisan 2026 ilerleme raporu"
      }}</h4>
      <Author name="KimlikDAO" />
      <div class={BlogCss.PreviewText}>{{
        en: "KimlikDAO April 2026 progress report will be published on April 26th.",
        tr: "KimlikDAO Nisan 2026 aylık ilerleme raporu 26 Nisan’da yayıma alınacak."
      }}</div>
    </div>
    <div class={BlogCss.PreviewFooter}>
      <button class={[BlogCss.ReadButton, Css.Blue]}>{{
        en: "Read", tr: "Oku"
      }}</button>
    </div>
  </a>
);

export default Apr26;
