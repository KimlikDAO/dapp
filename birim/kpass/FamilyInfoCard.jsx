import Css from "./birim.css";
import { setFieldsFrom } from "./util";
import dom from "/lib/util/dom";

/** @const {!Array<string>} */
const LeftFields = ["annead", "babaad", "mhali"];
/** @const {!Array<string>} */
const RightFields = ["BSN", "cilt", "hane"];

const FamilyInfoCard = () => (
  <div class={Css.BilgiKartı}>
    <div class={Css.BilgiKartıİçi}>
      <h7>{{ en: "FAMILY INFO", tr: "AİLE BİLGİLERİ" }}</h7>
      <div class={Css.ÇiftSütun} id={Css.AileBilgileri}>
        <div>
          <div class={Css.Ad}>{{ en: "Mother's name", tr: "Anne adı" }}</div>
          <div>{{ en: "Marry", tr: "Ayşe" }}</div>
          <div class={Css.Ad}>{{ en: "Father's name", tr: "Baba adı" }}</div>
          <div>{{ en: "Paul", tr: "Mehmet" }}</div>
          <div class={Css.Ad}>{{ en: "Marital Status", tr: "Medeni Hali" }}</div>
          <div>{{ en: "Single", tr: "Bekar" }}</div>
        </div>
        <div id={Css.SağSütun}>
          <div class={Css.Ad}>{{ en: "Family member", tr: "Aile sıra no" }}</div>
          <div>33</div>
          <div class={Css.Ad}>{{ en: "Folder", tr: "Cilt no" }}</div>
          <div>40</div>
          <div class={Css.Ad}>{{ en: "Household", tr: "Hane" }}</div>
          <div>7</div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * @param {!did.KütükBilgileri} registryInfo
 */
FamilyInfoCard.set = (registryInfo) => {
  setFieldsFrom(dom.div(Css.BilgiKartıİçi).children[0].children, 1, LeftFields, registryInfo);
  setFieldsFrom(dom.div(Css.BilgiKartıİçi).children[1].children, 1, RightFields, registryInfo);
};

export default FamilyInfoCard;
