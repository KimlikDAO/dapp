import { İptalci } from "/al/imeceİptal/birim.jsx";

const Pencere = () =>
  <div id="inbd" nodisplay>
    <div id="inmc">
      <div id="inx" class="kux"></div>
      <div id="inmii" class="inm" nodisplay>{{
        en: "Enter an address and a weight to add a revoker to your KPass.",
        tr: "KPass’inize yeni bir iptalci eklemek için adres ve ağırlık girin."
      }}
        <div id="iniilbl">
          <b>{{ en: "Address", tr: "Adres" }}</b>
          <b>{{ en: "Weight", tr: "Ağırlık" }}</b>
        </div>
        <İptalci />
        <div class="inorc">
          <a href="javascript:" id="iniio" class="act btn lft dis" data-en="Confirm in wallet">Cüzdana istek yolla</a>
          <a href="javascript:" id="iniir" class="btn" data-en="Cancel">İptal</a>
        </div>
      </div>
      <div id="inmes" class="inm" nodisplay><span data-phantom
        data-en="Set the new revoke threshold for your KPass. Note: you may only decrease this threshold due to security reasons.">KPass’inizin
        yeni iptal eşik değerini belirleyin. Güvenlik sebebiyle eşik sadece azaltılabilir.
      </span>
        <div id="inmesc" class="inmic">
          <a href="javascript:" id="inesm" class="iniibtn minus">-</a>
          <input id="inesw" class="inmwi" type="number" value={1} />
          <a href="javascript:" id="inesp" class="iniibtn plus">+</a>
        </div>
        <div class="inorc">
          <a href="javascript:" id="ineso" class="act btn lft">{{ en: "Confirm in wallet", tr: "Cüzdana istek yolla" }}</a>
          <a href="javascript:" id="inesr" class="btn">{{ en: "Cancel", tr: "İptal" }}</a>
        </div>
      </div>
      <div id="inmsy" class="inm" nodisplay>{{
        en: "You don't need to revoke your KPass to get a new one.",
        tr: "Yeni bir KPass almak için eskisini iptal etmeye gerek yok."
      }}<br /><br />{{
        en: "Only revoke your KPass if you think your private key was exposed.",
        tr: "Sadece cüzdanınızın gizli anahtarını başkasına verdiğinizi düşünüyorsanız KPass’inizi iptal etmeniz gerekir."
      }}<br /><br />{{
        en: "Confirm below to proceed.",
        tr: "Devam etmek için onay verin."
      }}<div class="inorc">
          <a href="javascript:" id="insyo" class="btn lft danger">{{ en: "Confirm in wallet", tr: "Cüzdana istek yolla" }}</a>
          <a href="javascript:" id="insyr" class="btn">{{ en: "Cancel", tr: "İptal" }}</a>
        </div>
      </div>
    </div>
  </div>;

export default Pencere;
