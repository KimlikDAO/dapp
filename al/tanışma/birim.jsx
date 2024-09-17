import Bağlantı from "./external-link.svg";
import UploadResmi from "./upload.svg";
import Css from "./birim.css";

const Tanışma = () => (
  <div id="ta" class="step disabled">
    <Css />
    <b data-en="2. Introduce yourself.">2. Kendinizi tanıtın.</b>{{
      en: "Authenticate by uploading a verifiable e-devlet PDF.",
      tr: "Kendinizi e-devlet’ten alınmış nüfus kayıt örneği yükleyerek veya e-devlet girişi ile tanıtabilirsiniz."
    }}<br />
    <br />
    <a href="javascript:" class="act btn lft" id="tab" data-en="PDF authentication">PDF ile tanıt</a>
    <a class="btn" id="taa" title={{tr: "Çok Yakında!", en: "Soon!"}}>{{
      tr: "E-devlet ile giriş (Yakında!)",
      en: "Login with e-devlet (Soon!)"
    }}</a>
    <div id="tadc" style="display:none">
      <div id="taip" class="kux"></div>
      <div id="tada">
        <input type="file" id="tain" accept="application/pdf" />{{
          en: "We need a registry certificate from e-devlet, to be presented to KimlikDAO.",
          tr: <>E-devlet’ten <b>Kuruma İbraz</b> için nüfus kayıt örneği almanız gerekiyor.</>
        }}
        <table id="tabi">
          <tr>
            <td data-en="Certificate type">Nüfus Kayıt Örneği Tipi</td>
            <td data-en="Self">Kişi</td>
          </tr>
          <tr>
            <td data-en="Include former spouse list">Eski Eş Listesi</td>
            <td data-en="No">Hayır</td>
          </tr>
          <tr>
            <td data-en="Include background check">Vukuatlı Belge (Olayları Göster)</td>
            <td data-en="No">Hayır</td>
          </tr>
          <tr>
            <td data-en="Purpose">Belgenin Neden Verileceği</td>
            <td data-en="Present to institution">Kuruma İbraz</td>
          </tr>
          <tr>
            <td data-en="Institution name">Kurum adı</td>
            <td><b id="tano" data-en="Calculating...">Hesaplanıyor...</b><a href="javascript:" id="tacopy"
                data-en:title="Copy" title="Kopyala" style="display:none"><img src="/al/paste.svg" data-inline /></a>
            </td>
          </tr>
        </table>{{
          en: "Please enter the information above at ", tr: ""
        }}<a class="lnk" target="_blank" href="//www.turkiye.gov.tr/nvi-nufus-kayit-ornegi-belgesi-sorgulama">
          {{ en: "e-devlet registry", tr: "E-devlet Nüfus Kayıt Örneği" }}
          <Bağlantı data-inline />
        </a>{{
          en: " to obtain a verifiable PDF. Once you have the file, drag and drop it here.",
          tr: " sayfasından yukarıdaki bilgileri girerek bir PDF dosyası alın. Aldığınız dosyayı bu kutuya sürükleyin."
        }}
        <div class="tastt">
          <div id="taimg">
            <UploadResmi alt="" width={48} height={48} />
          </div>
          <div id="tal" style="display:none"></div>
          <div id="tafail" style="display:none"></div>
        </div>
        <div id="tafb"></div>
        <a href="javascript:" id="tadsbtn" class="btn act lft" data-en="Select file">Dosya seç</a>
        <a href="javascript:" id="tabip" class="btn" data-en="Cancel">İptal</a>
      </div>
    </div>
  </div>
);

export default Tanışma;
