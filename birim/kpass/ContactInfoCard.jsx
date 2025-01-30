import Css from "./birim.css";
import { setFieldsFrom } from "./util";
import { css } from "/lib/kastro/stylesheet";
import dom from "/lib/util/dom";

const Ids = css`
  /** @export */ #ContactInfoCard {}
`;

/** @const {!Array<string>} */
const Fields = ["email", "phone"];

const ContactInfoCard = () => (
  <div class={Css.BilgiKartı} nodisplay>
    <div class={Css.BilgiKartıİçi} id={Ids.ContactInfoCard}>
      <h7>{{ en: "CONTACT INFO", tr: "İLETİŞİM BİLGİLERİ" }}</h7>
      <div class={Css.Ad}>{{ en: "E-mail", tr: "E-posta" }}</div>
      <div>{{ en: "abc@abc.com", tr: "abc@abc.com.tr" }}</div>
      <div class={Css.Ad}>{{ en: "Phone", tr: "Telefon" }}</div>
      <div>{{ en: "0(555)555-55-55", tr: "+90 (555) 555-5555" }}</div>
    </div>
  </div>
);

/**
 * @param {!did.ContactInfo} contactInfo 
 */
ContactInfoCard.set = (contactInfo) => setFieldsFrom(
  dom.div(Ids.ContactInfoCard).children, 2, Fields, contactInfo);

export default ContactInfoCard;
