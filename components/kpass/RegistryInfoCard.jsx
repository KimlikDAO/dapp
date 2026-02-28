import Css from "./KPass.css";
import { setFieldsFrom } from "./util";
import { KütükBilgileri } from "/lib/did/section.d";
import { css } from "/lib/kastro/StyleSheet";
import dom from "../../lib/kastro/dom";

const Ids = css`
  /** @export */ #RegistryInfoCard {}
`;

/** @const {string[]} */
const Fields = ["il", "ilçe", "mahalle", "tescil"];

const RegistryInfoCard = () => (
  <div class={Css.Card}>
    <div class={Css.CardContent} id={Ids.RegistryInfoCard}>
      <h7>{{ en: "REGISTRY INFO", tr: "KÜTÜK KAYIT BİLGİLERİ" }}</h7>
      <div class={Css.Label}>{{ en: "City", tr: "İl" }}</div>
      <div>Ankara</div>
      <div class={Css.Label}>{{ en: "Town", tr: "İlçe" }}</div>
      <div>Çankaya</div>
      <div class={Css.Label}>{{ en: "District", tr: "Mahalle" }}</div>
      <div>Anıtkaya Mahallesi</div>
      <div class={Css.Label}>{{ en: "Registration date", tr: "Tescil tarihi" }}</div>
      <div>13.06.1975</div>
    </div>
  </div>
);

/**
 * @param {KütükBilgileri} registryInfo
 */
RegistryInfoCard.set = (registryInfo) => setFieldsFrom(
  dom.div(Ids.RegistryInfoCard).children, 2, Fields, registryInfo);

export default RegistryInfoCard;
