import { İptalci } from "/al/imeceİptal/birim.jsx";

export default () =>
  <div id="inbd" style="display:none">
    <div id="inmc">
      <div id="inx" class="kux"></div>
      <div id="inmii" class="inm" style="display:none">{{
        en: "Enter an address and a weight to add a revoker to your KPass.",
        tr: "KPass’inize yeni bir iptalci eklemek için adres ve ağırlık girin."
      }}
        <div id="iniilbl">
          <b data-en="Address">Adres</b>
          <b data-en="Weight">Ağırlık</b>
        </div>
        <İptalci />
        <div class="inorc">
          <a href="javascript:" id="iniio" class="act btn lft dis" data-en="Confirm in wallet">Cüzdana istek yolla</a>
          <a href="javascript:" id="iniir" class="btn" data-en="Cancel">İptal</a>
        </div>
      </div>
      <div id="inmes" class="inm" style="display:none"><span data-phantom
        data-en="Set the new revoke threshold for your KPass. Note: you may only decrease this threshold due to security reasons.">KPass’inizin
        yeni iptal eşik değerini belirleyin. Güvenlik sebebiyle eşik sadece azaltılabilir.
      </span>
        <div id="inmesc" class="inmic">
          <a href="javascript:" id="inesm" class="iniibtn minus">-</a>
          <input id="inesw" class="inmwi" type="number" value="1" />
          <a href="javascript:" id="inesp" class="iniibtn plus">+</a>
        </div>
        <div class="inorc">
          <a href="javascript:" id="ineso" class="act btn lft" data-en="Confirm in wallet">Cüzdana istek yolla</a>
          <a href="javascript:" id="inesr" class="btn" data-en="Cancel">İptal</a>
        </div>
      </div>
      <div id="inmsy" class="inm" style="display:none">
        <span data-phantom data-en="You don't need to revoke your KPass to get a new one.">Yeni
          bir KPass almak için eskisini iptal etmeye gerek yok.</span><br /><br />
        <span data-phantom data-en="Only revoke your KPass if you think your private key was exposed.">Sadece
          cüzdanınızın gizli anahtarını başkasına verdiğinizi düşünüyorsanız KPass’inizi iptal etmeniz
          gerekir.</span><br /><br />
        <span data-phatnom data-en="Confirm below to proceed.">Devam etmek için onay verin.</span>
        <div class="inorc">
          <a href="javascript:" id="insyo" class="btn lft danger" data-en="Confirm in wallet">Cüzdana istek yolla</a>
          <a href="javascript:" id="insyr" class="btn" data-en="Cancel">İptal</a>
        </div>
      </div>
    </div>
  </div>;
