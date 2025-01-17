import Css from "./birim.css";
import { setFieldsFrom } from "./util";
import dom from "/lib/util/dom";

/** @const {!Array<string>} */
const Fields = ["localIdNumber", "first", "last", "dateOfBirth", "cityOfBirth", "gender"];

const PersonInfoCard = () => (
  <div class={Css.BilgiKartı}>
    <div class={Css.BilgiKartıİçi}>
      <div class={Css.Ad}>{{ en: "SSN", tr: "TCKN" }}</div>
      <div>{{ en: "555-55-5555", tr: "22345678902" }}</div>
      <div class={Css.Ad}>{{ en: "First name", tr: "Ad" }}</div>
      <div>{{ en: "John", tr: "Kaan" }}</div>
      <div class={Css.Ad}>{{ en: "Last name", tr: "Soyad" }}</div>
      <div>{{ en: "Doe", tr: "Ankara" }}</div>
      <div class={Css.Ad}>{{ en: "Date of birth", tr: "Doğum tarihi" }}</div>
      <div>{{ en: "06/12/1975", tr: "12.06.1975" }}</div>
      <div class={Css.Ad}>{{ en: "City of birth", tr: "Doğum yeri" }}</div>
      <div>{{ en: "New York", tr: "Ankara" }}</div>
      <div class={Css.Ad}>{{ en: "Gender", tr: "Cinsiyet" }}</div>
      <div>{{ en: "M", tr: "E" }}</div>
    </div>
  </div>
);

/**
 * @param {!did.PersonInfo} personInfo
 */
PersonInfoCard.set = (personInfo) => setFieldsFrom(
  dom.div(Css.BilgiKartıİçi).children, 1, Fields, personInfo);

export default PersonInfoCard;
