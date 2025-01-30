import Css from "./birim.css";

const AddressInfoCard = () => (
  <div class={Css.BilgiKartı} nodisplay>
    <div class={Css.BilgiKartıİçi}>
      <h7>{{ en: "ADDRESS INFO", tr: "ADRES BİLGİLERİ" }}</h7>
      <div class={Css.Ad}>Mahalle</div>
      <div class={Css.Ad}>Sokak No/Daire</div>
      <div class={Css.Ad}>İlçe / İl</div>
      <div class={Css.Ad}>Ülke</div>
    </div>
  </div>
);

export default AddressInfoCard;
