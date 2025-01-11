import Kapak from "kastro:./cover.svg.jsx";
import Css from "./birim.css";
import OrtakCss from "/birim/ortakcss/birim.jsx";
import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
export const Kartlar = dom.div("kpc");
/** @const {!HTMLDivElement} */
export const Kök = dom.div(Css.Kök);
/** @const {!HTMLAnchorElement} */
export const SolDüğme = dom.a("kpso");
/** @const {!HTMLAnchorElement} */
export const SağDüğme = dom.a("kpsa");

const PersonInfoKartı = () => (
  <div class={Css.BilgiKartı}>
    <div class={Css.BilgiKartıİçi}>
      <div class={Css.Ad}>{{ en: "SSN", tr: "TCKN" }}</div>
      <div id="kplocalIdNumber">{{ en: "555-55-5555", tr: "22345678902" }}</div>
      <div class={Css.Ad} data-en="Name">Ad</div>
      <div id="kpfirst">{{ en: "John", tr: "Kaan" }}</div>
      <div class={Css.Ad} data-en="Last name">Soyad</div>
      <div id="kplast">{{ en: "Doe", tr: "Ankata" }}</div>
      <div class={Css.Ad} data-en="Date of birth">Doğum tarihi</div>
      <div id="kpdateOfBirth">{{ en: "12.06.1975", tr: "12.06.1975" }}</div>
      <div class={Css.Ad} data-en="City of birth">Doğum yeri</div>
      <div id="kpcityOfBirth">{{ en: "New York", tr: "Ankara" }}</div>
      <div class={Css.Ad} data-en="Gender">Cinsiyet</div>
      <div id="kpgender">{{ en: "M", tr: "E" }}</div>
    </div>
  </div>
);

const ContactInfoKartı = () => (
  <div id="kpibp" class={Css.BilgiKartı} style="display:none">
    <div class={Css.BilgiKartıİçi}>
      <h7 data-en="CONTACT INFO">İLETİŞİM BİLGİLERİ</h7>
      <div class={Css.Ad} data-en="E-mail">E-posta</div>
      <div id="kpemail">abc@abc.com</div>
      <div class={Css.Ad} data-en="Phone">Telefon</div>
      <div id="kpphone">05555555555</div>
    </div>
  </div>);

const AddressInfoKartı = () => (
  <div id="kpabp" class={Css.BilgiKartı} style="display:none">
    <div class={Css.BilgiKartıİçi}>
      <h7 data-en="ADDRESS INFO">ADRES BİLGİLERİ</h7>
      <div class={Css.Ad} id="kpam">Mahalle</div>
      <div class={Css.Ad} id="kpasnd">Sokak No/Daire</div>
      <div class={Css.Ad} id="kpaii">İlçe / İl</div>
      <div class={Css.Ad} id="kpau">Ülke</div>
    </div>
  </div>
);

const KPass = ({ style }) => (
  <Kök style={style}>
    <Css />
    <Kapak bundleName="KPASS.svg" id={Css.KapakYüzü} />
    <div id={Css.BilgiYüzü}>
      <Kartlar>
        <PersonInfoKartı />
        <ContactInfoKartı />
        <AddressInfoKartı />
        <div class={Css.BilgiKartı}>
          <div class={Css.BilgiKartıİçi}>
            <h7 data-en="FAMILY INFO">AİLE BİLGİLERİ</h7>
            <div class={Css.ÇiftSütun}>
              <div>
                <div class={Css.Ad} data-en="Mother’s name">Anne adı</div>
                <div id="kpannead">Ayşe</div>
                <div class={Css.Ad} data-en="Father’s name">Baba adı</div>
                <div id="kpbabaad">Mehmet</div>
                <div class={Css.Ad} data-en="Marital Status">Medeni Hali</div>
                <div id="kpmhali" data-en="Single">Bekar</div>
              </div>
              <div id={Css.SağSütun}>
                <div class={Css.Ad} data-en="Family member">Aile sıra no</div>
                <div id="kpBSN">33</div>
                <div class={Css.Ad} data-en="Folder">Cilt no</div>
                <div id="kpcilt">40</div>
                <div class={Css.Ad} data-en="Household">Hane</div>
                <div id="kphane">7</div>
              </div>
            </div>
          </div>
        </div>
        <div class={Css.BilgiKartı}>
          <div class={Css.BilgiKartıİçi}>
            <h7 data-en="REGISTRY INFO">KÜTÜK KAYIT BİLGİLERİ</h7>
            {/* <div for="kpdin" data-en="Religion">Dini</div>
            <div id="kpdin">-</div> */}
            <div class={Css.Ad} data-en="City">İl</div>
            <div id="kpil">Ankara</div>
            <div class={Css.Ad} data-en="Town">İlçe</div>
            <div id="kpilçe">Çankaya</div>
            <div class={Css.Ad} data-en="District">Mahalle</div>
            <div id="kpmahalle">Anıtkaya Mahallesi</div>
            <div class={Css.Ad} data-en="Registration date">Tescil tarihi</div>
            <div id="kptescil">13.06.1975</div>
          </div>
        </div>
      </Kartlar>
      <svg id={Css.Logo} height={24} width={24}>
        <use href={"#" + OrtakCss.Başlık.Logomark} width={24} height={24} />
      </svg>
      <SolDüğme href="javascript:" class={[Css.Düğme, "kpso"]} />
      <SağDüğme href="javascript:" class={[Css.Düğme, "kpsa"]} />
    </div>
  </Kök >
);

export default KPass;
