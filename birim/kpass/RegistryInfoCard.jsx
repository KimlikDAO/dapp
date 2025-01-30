import Css from "./birim.css";
import { setFieldsFrom } from "./util";
import dom from "/lib/util/dom";
import { css } from "/lib/kastro/stylesheet";

const Ids = css`
  /** @export */ #RegistryInfoCard {}
`;

/** @const {!Array<string>} */
const Fields = ["il", "ilçe", "mahalle", "tescil"];

const RegistryInfoCard = () => (
  <div class={Css.BilgiKartı}>
    <div class={Css.BilgiKartıİçi} id={Ids.RegistryInfoCard}>
      <h7>{{ en: "REGISTRY INFO", tr: "KÜTÜK KAYIT BİLGİLERİ" }}</h7>
      <div class={Css.Ad}>{{ en: "City", tr: "İl" }}</div>
      <div>Ankara</div>
      <div class={Css.Ad}>{{ en: "Town", tr: "İlçe" }}</div>
      <div>Çankaya</div>
      <div class={Css.Ad}>{{ en: "District", tr: "Mahalle" }}</div>
      <div>Anıtkaya Mahallesi</div>
      <div class={Css.Ad}>{{ en: "Registration date", tr: "Tescil tarihi" }}</div>
      <div>13.06.1975</div>
    </div>
  </div>
);

/**
 * @param {!did.KütükBilgileri} kütükBilgileri
 */
RegistryInfoCard.set = (kütükBilgileri) => setFieldsFrom(
  dom.div(Ids.RegistryInfoCard).children, 2, Fields, kütükBilgileri);

export default RegistryInfoCard;
