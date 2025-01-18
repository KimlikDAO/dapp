import Css from "./birim.css";
import { setFieldsFrom } from "./util";
import dom from "/lib/util/dom";

/** @const {!Array<string>} */
const Fields = ["email", "phone"];

const ContactInfoCard = () => (
  <div id="kpibp" class={Css.BilgiKartı} nodisplay>
    <div class={Css.BilgiKartıİçi}>
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
  dom.div(Css.BilgiKartıİçi).children, 2, Fields, contactInfo);

export default ContactInfoCard;
