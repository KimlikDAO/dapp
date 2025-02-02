import Css from "./KPass.css";
import { setFieldsFrom } from "./util";
import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";

/** @enum {string} */
const Ids = css`
  /** @export */ #FamilyInfoCard {}
`;

/** @const {!Array<string>} */
const LeftFields = ["annead", "babaad", "mhali"];
/** @const {!Array<string>} */
const RightFields = ["BSN", "cilt", "hane"];

const FamilyInfoCard = () => (
  <div class={Css.Card}>
    <div class={Css.CardContent}>
      <h7>{{ en: "FAMILY INFO", tr: "AİLE BİLGİLERİ" }}</h7>
      <div class={Css.TwoColumn} id={Ids.FamilyInfoCard}>
        <div>
          <div class={Css.Label}>{{ en: "Mother's name", tr: "Anne adı" }}</div>
          <div>{{ en: "Marry", tr: "Ayşe" }}</div>
          <div class={Css.Label}>{{ en: "Father's name", tr: "Baba adı" }}</div>
          <div>{{ en: "Paul", tr: "Mehmet" }}</div>
          <div class={Css.Label}>{{ en: "Marital Status", tr: "Medeni Hali" }}</div>
          <div>{{ en: "Single", tr: "Bekar" }}</div>
        </div>
        <div id={Css.RightColumn}>
          <div class={Css.Label}>{{ en: "Family member", tr: "Aile sıra no" }}</div>
          <div>33</div>
          <div class={Css.Label}>{{ en: "Folder", tr: "Cilt no" }}</div>
          <div>40</div>
          <div class={Css.Label}>{{ en: "Household", tr: "Hane" }}</div>
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
  /** @const {!HTMLDivElement} */
  const div = dom.div(Ids.FamilyInfoCard);
  setFieldsFrom(div.children[0].children, 1, LeftFields, registryInfo);
  setFieldsFrom(div.children[1].children, 1, RightFields, registryInfo);
};

export default FamilyInfoCard;
