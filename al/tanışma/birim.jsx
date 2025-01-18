import Css from "./birim.css";
import Bağlantı from "./external-link.svg";
import UploadResmi from "./upload.svg";
import KopyalaResmi from "/al/paste.svg";

const Tanışma = () => (
  <div id="ta" class="step disabled">
    <Css />
    <b>{{ en: "2. Introduce yourself.", tr: "2. Kendinizi tanıtın." }}</b>{{
      en: " Authenticate by uploading a verifiable e-devlet PDF.",
      tr: " Kendinizi e-devlet’ten alınmış nüfus kayıt örneği yükleyerek veya e-devlet girişi ile tanıtabilirsiniz."
    }}<br />
    <br />
    <a href="javascript:" class="act btn lft" id="tab">{{
      en: "PDF authentication",
      tr: "PDF ile tanıt"
    }}</a>{" "}
    <a class="btn" id="taa" title={{ tr: "Çok Yakında!", en: "Soon!" }}>{{
      tr: "E-devlet ile giriş (Yakında!)",
      en: "Login with e-devlet (Soon!)"
    }}</a>
    <div id="tadc" nodisplay>
      <div id="taip" class="kux"></div>
      <div id="tada">
        <input type="file" id="tain" accept="application/pdf" />{{
          en: "We need a registry certificate from e-devlet, to be presented to KimlikDAO.",
          tr: <>E-devlet’ten <b>Kuruma İbraz</b> için nüfus kayıt örneği almanız gerekiyor.</>
        }}
        <table id="tabi">
          <tr>
            <td>{{ en: "Certificate type", tr: "Nüfus Kayıt Örneği Tipi" }}</td>
            <td>{{ en: "Self", tr: "Kişi" }}</td>
          </tr>
          <tr>
            <td>{{ en: "Include former spouse list", tr: "Eski Eş Listesi" }}</td>
            <td>{{ en: "No", tr: "Hayır" }}</td>
          </tr>
          <tr>
            <td>{{ en: "Include background check", tr: "Vukuatlı Belge (Olayları Göster)" }}</td>
            <td>{{ en: "No", tr: "Hayır" }}</td>
          </tr>
          <tr>
            <td>{{ en: "Purpose", tr: "Belgenin Neden Verileceği" }}</td>
            <td>{{ en: "Present to institution", tr: "Kuruma İbraz" }}</td>
          </tr>
          <tr>
            <td>{{ en: "Institution name", tr: "Kurum adı" }}</td>
            <td><b id="tano">{{
              en: "Calculating...",
              tr: "Hesaplanıyor..."
            }}</b><a href="javascript:" id="tacopy"
              title={{ tr: "Kopyala", en: "Copy" }} nodisplay><KopyalaResmi inline /></a>
            </td>
          </tr>
        </table>{{
          en: "Please enter the information above at ", tr: ""
        }}<a class="lnk" target="_blank" href="//www.turkiye.gov.tr/nvi-nufus-kayit-ornegi-belgesi-sorgulama">
          {{ en: "e-devlet registry", tr: "E-devlet Nüfus Kayıt Örneği" }}
          <Bağlantı inline />
        </a>{{
          en: " to obtain a verifiable PDF. Once you have the file, drag and drop it here.",
          tr: " sayfasından yukarıdaki bilgileri girerek bir PDF dosyası alın. Aldığınız dosyayı bu kutuya sürükleyin."
        }}
        <div class="tastt">
          <div id="taimg">
            <UploadResmi alt="" width={48} height={48} />
          </div>
          <div id="tal" nodisplay></div>
          <div id="tafail" nodisplay></div>
        </div>
        <div id="tafb"></div>
        <a href="javascript:" id="tadsbtn" class="btn act lft">{{
          en: "Select file",
          tr: "Dosya seç"
        }}</a>{" "}
        <a href="javascript:" id="tabip" class="btn">{{
          en: "Cancel",
          tr: "İptal"
        }}</a>
      </div>
    </div>
  </div>
);

export default Tanışma;
