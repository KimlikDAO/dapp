import Css from "./KPass.css";

const AddressInfoCard = () => (
  <div class={Css.Card} nodisplay>
    <div class={Css.CardContent}>
      <h7>{{ en: "ADDRESS INFO", tr: "ADRES BİLGİLERİ" }}</h7>
      <div class={Css.Label}>Mahalle</div>
      <div class={Css.Label}>Sokak No/Daire</div>
      <div class={Css.Label}>İlçe / İl</div>
      <div class={Css.Label}>Ülke</div>
    </div>
  </div>
);

export default AddressInfoCard;
