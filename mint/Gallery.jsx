import Css from "./Gallery.css";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
const GalleryGrid = dom.div(Css.GalleryGrid);

const Gallery = () => (
  <div id={Css.Gallery}>
    <Css />
    <div>
      <h2 id={Css.GalleryTitle}>{{ en: "Add info", tr: "Bilgi ekle" }}</h2>
      <input
        type="search"
        id={Css.GallerySearch}
        placeholder={{ en: "Type country, state, or source", tr: "Ülke veya kaynak gir" }}
      />
      <GalleryGrid>
        <div class={Css.InfoSource}>{{ en: "Passport", tr: "Pasaport" }}</div>
        <div class={Css.InfoSource}>{{ en: "Population registry", tr: "Nüfus kayıt örneği" }}</div>
        <div class={Css.InfoSource}>ID.me</div>
        <div class={Css.InfoSource}>{{ en: "National ID card", tr: "Kimlik Kartı" }}</div>
        <div class={Css.InfoSource}>REAL ID</div>
        <div class={Css.InfoSource}>login.gov</div>
      </GalleryGrid>
    </div>
    <div nodisplay>
      <button>
        {{ en: "Back", tr: "Geri" }}
      </button>
    </div>
  </div>
);

export default Gallery;
