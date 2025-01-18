import Css from "./birim.css";

const AddressInfoCard = () => (
  <div id={Css.AddressInfoCard} class={Css.BilgiKartı} nodisplay>
    <div class={Css.BilgiKartıİçi}>
      <h7 data-en="ADDRESS INFO">ADRES BİLGİLERİ</h7>
      <div class={Css.Ad} id="kpam">Mahalle</div>
      <div class={Css.Ad} id="kpasnd">Sokak No/Daire</div>
      <div class={Css.Ad} id="kpaii">İlçe / İl</div>
      <div class={Css.Ad} id="kpau">Ülke</div>
    </div>
  </div>
);

export default AddressInfoCard;
