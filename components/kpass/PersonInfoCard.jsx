import Css from "./KPass.css";
import { setFieldsFrom } from "./util";
import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";

/** @enum {string} */
const Ids = css`
  /** @export */ #PersonInfoCard {}
`;

/** @const {!Array<string>} */
const Fields = ["localIdNumber", "first", "last", "dateOfBirth", "cityOfBirth", "gender"];

/**
 * @return {Promise<string>}
 */
const PersonInfoCard = () => (
  <div class={Css.Card}>
    <div class={Css.CardContent} id={Ids.PersonInfoCard}>
      <div class={Css.Label}>{{ en: "SSN", tr: "TCKN" }}</div>
      <div>{{ en: "555-55-5555", tr: "22345678902" }}</div>
      <div class={Css.Label}>{{ en: "First name", tr: "Ad" }}</div>
      <div>{{ en: "John", tr: "Kaan" }}</div>
      <div class={Css.Label}>{{ en: "Last name", tr: "Soyad" }}</div>
      <div>{{ en: "Doe", tr: "Ankara" }}</div>
      <div class={Css.Label}>{{ en: "Date of birth", tr: "Doğum tarihi" }}</div>
      <div>{{ en: "06/12/1975", tr: "12.06.1975" }}</div>
      <div class={Css.Label}>{{ en: "City of birth", tr: "Doğum yeri" }}</div>
      <div>{{ en: "New York", tr: "Ankara" }}</div>
      <div class={Css.Label}>{{ en: "Gender", tr: "Cinsiyet" }}</div>
      <div>{{ en: "M", tr: "E" }}</div>
    </div>
  </div>
);

/**
 * @param {!did.PersonInfo} personInfo
 */
PersonInfoCard.set = (personInfo) => setFieldsFrom(
  dom.div(Ids.PersonInfoCard).children, 1, Fields, personInfo);

export default PersonInfoCard;
