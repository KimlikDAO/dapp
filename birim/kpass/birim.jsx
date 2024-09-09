import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
export const Kartlar = dom.div("kpc");
/** @const {!HTMLDivElement} */
export const Kök = dom.div("kp");
/** @const {!HTMLAnchorElement} */
export const SolDüğme = dom.a("kpso");
/** @const {!HTMLAnchorElement} */
export const SağDüğme = dom.a("kpsa");

const PersonInfoKartı = () => (
  <div class="kpp">
    <div class="kpip">
      <div class="kpl">TCKN</div>
      <div id="kplocalIdNumber">22345678902</div>
      <div class="kpl" data-en="Name">Ad</div>
      <div id="kpfirst">Kaan</div>
      <div class="kpl" data-en="Last name">Soyad</div>
      <div id="kplast">Ankara</div>
      <div class="kpl" data-en="Date of birth">Doğum tarihi</div>
      <div id="kpdateOfBirth">12.06.1975</div>
      <div class="kpl" data-en="City of birth">Doğum yeri</div>
      <div id="kpcityOfBirth">Ankara</div>
      <div class="kpl" data-en="Gender">Cinsiyet</div>
      <div id="kpgender" data-en="M">E</div>
    </div>
  </div>
);

const ContactInfoKartı = () => (
  <div id="kpibp" class="kpp" style="display:none">
    <div class="kpip">
      <h7 data-en="CONTACT INFO">İLETİŞİM BİLGİLERİ</h7>
      <div class="kpl" data-en="E-mail">E-posta</div>
      <div id="kpemail">abc@abc.com</div>
      <div class="kpl" data-en="Phone">Telefon</div>
      <div id="kpphone">05555555555</div>
    </div>
  </div>);

const AddressInfoKartı = () => (
  <div id="kpabp" class="kpp" style="display:none">
    <div class="kpip">
      <h7 data-en="ADDRESS INFO">ADRES BİLGİLERİ</h7>
      <div class="kpal" id="kpam">Mahalle</div>
      <div class="kpal" id="kpasnd">Sokak No/Daire</div>
      <div class="kpal" id="kpaii">İlçe / İl</div>
      <div class="kpal" id="kpau">Ülke</div>
    </div>
  </div>
);

const KPass = () => (
  <Kök>
    <link rel="stylesheet" href="/birim/kpass/birim.css" data-shared />
    <img src="/birim/kpass/kapak.m.svg" id="kpk" />
    <div id="kpi">
      <Kartlar>
        <PersonInfoKartı />
        <ContactInfoKartı />
        <AddressInfoKartı />
        <div class="kpp">
          <div class="kpip">
            <h7 data-en="FAMILY INFO">AİLE BİLGİLERİ</h7>
            <div class="kppc">
              <div>
                <div class="kpl" data-en="Mother’s name">Anne adı</div>
                <div id="kpannead">Ayşe</div>
                <div class="kpl" data-en="Father’s name">Baba adı</div>
                <div id="kpbabaad">Mehmet</div>
                <div class="kpl" data-en="Marital Status">Medeni Hali</div>
                <div id="kpmhali" data-en="Single">Bekar</div>
              </div>
              <div id="kpam">
                <div class="kpl" data-en="Family member">Aile sıra no</div>
                <div id="kpBSN">33</div>
                <div class="kpl" data-en="Folder">Cilt no</div>
                <div id="kpcilt">40</div>
                <div class="kpl" data-en="Household">Hane</div>
                <div id="kphane">7</div>
              </div>
            </div>
          </div>
        </div>
        <div class="kpp">
          <div class="kpip">
            <h7 data-en="REGISTRY INFO">KÜTÜK KAYIT BİLGİLERİ</h7>
            {/* <div for="kpdin" data-en="Religion">Dini</div>
            <div id="kpdin">-</div> */}
            <div class="kpl" data-en="City">İl</div>
            <div id="kpil">Ankara</div>
            <div class="kpl" data-en="Town">İlçe</div>
            <div id="kpilçe">Çankaya</div>
            <div class="kpl" data-en="District">Mahalle</div>
            <div id="kpmahalle">Anıtkaya Mahallesi</div>
            <div class="kpl" data-en="Registration date">Tescil tarihi</div>
            <div id="kptescil">13.06.1975</div>
          </div>
        </div>
      </Kartlar>
      <svg id="kplo" height="24" width="24">
        <use href="#bak" width="24" height="24" />
      </svg>
      <SolDüğme href="javascript:" class="kpd kpso"></SolDüğme>
      <SağDüğme href="javascript:" id="kpsa" class="kpd kpsa"></SağDüğme>
    </div>
  </Kök >
);

export default KPass;
