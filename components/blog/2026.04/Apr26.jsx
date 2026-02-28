import Author from "../Author";
import BlogCss from "../blog.css";
import BannerImage from "./banner.png";
import { css } from "/lib/kastro/stylesheet";

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
 *   piggyback: (string | undefined),
 *   loading: (string | undefined)
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
        en: "February 2025 progress report", tr: "Şubat 2025 ilerleme raporu"
      }}</h4>
      <Author name="KimlikDAO" />
      <div class={BlogCss.PreviewText}>{{
        en: "KimlikDAO February 2025 progress report will be published on February 28th.",
        tr: "KimlikDAO Şubat 2025 aylık ilerleme raporu 28 Şubat'ta yayıma alınacak."
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
